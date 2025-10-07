import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../entities/user";
import { getAuthSession } from "@/function/authPermission";
import { getConnection } from "@/lib/typeorm";
import { Brackets } from "typeorm";
import { UserRole } from "@/entities/userRole";
import { Role } from "@/entities/role";
import { encryptPassword } from "@/lib/crypto";
import { logActivity } from "@/function/activityHelp";
import { validateUserData } from "@/function/validasiHelp";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.roles?.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    let sortBy = (searchParams.get("sortBy") || "nama") as string;
    const sortOrder = (searchParams.get("sortOrder") || "ASC").toUpperCase() as "ASC" | "DESC";
    
    const search = searchParams.get("search") || "";
    const roleFilter = searchParams.get("role") || "all";
    const statusFilter = searchParams.get("status") || "all";

    // Pastikan `sortBy` memiliki alias untuk menghindari ambiguitas
    if (!sortBy.includes('.')) {
      sortBy = `user.${sortBy}`;
    }

    const ds = await getConnection();
    const qb = ds.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.userRoles", "userRole")
      .leftJoinAndSelect("userRole.role", "role");

    // --- Querying Logic ---

    // 1. Search Query
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where("user.nama LIKE :search", { search: `%${search}%` })
            .orWhere("user.username LIKE :search", { search: `%${search}%` })
            .orWhere("user.email LIKE :search", { search: `%${search}%` });
        })
      );
    }

    // 2. Status Filter
    if (statusFilter === 'active') {
        qb.andWhere('user.is_aktif = :status', { status: 1 });
    } else if (statusFilter === 'inactive') {
        qb.andWhere('user.is_aktif = :status', { status: 0 });
    }

    // 3. Role Filter
    if (roleFilter !== 'all') {
        qb.andWhere('role.nama_role = :roleName', { roleName: roleFilter });
    }
    
    // --- Pagination and Sorting ---
    const [users, total] = await qb
      .orderBy(sortBy, sortOrder)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    // Transformasi data agar sesuai dengan frontend dan hapus password
    const data = users.map(({ password, ...user }) => ({
        ...user,
        role: user.userRoles?.[0]?.role?.nama_role || 'user' 
    }));

    return NextResponse.json({
      ok: true,
      data,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });

  } catch (error) {
    console.error("[USER_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ds = await getConnection();
  const queryRunner = ds.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const body = await req.json();
    const { password, id_role, email, no_telepon, username } = body;

    // --- Validation ---
    const validationErrors = validateUserData({ email, no_telepon });
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }
    if (!password) {
      throw new Error('Password harus diisi');
    }
    if (!id_role || !Array.isArray(id_role) || id_role.length === 0) {
      throw new Error('Role harus dipilih');
    }

    // --- Check for existing user ---
    const userRepo = queryRunner.manager.getRepository(User);
    const existingUser = await userRepo.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      // Tidak perlu rollback karena belum ada perubahan
      return NextResponse.json({ error: 'Username atau email sudah terdaftar' }, { status: 409 });
    }

    // --- Create User ---
    const encryptedPassword = encryptPassword(password);
    const newUser = userRepo.create({
      ...body,
      password: encryptedPassword,
    });
    const savedUser = await queryRunner.manager.save(newUser);

    // --- Create UserRole relationship ---
    const roleRepo = queryRunner.manager.getRepository(Role);
    for (const roleId of id_role) {
      const role = await roleRepo.findOne({ where: { id_role: roleId } });
      if (role) {
        const newUserRole = queryRunner.manager.getRepository(UserRole).create({
          user: savedUser,
          role: role,
        });
        await queryRunner.manager.save(newUserRole);
      } else {
        // Jika role tidak ditemukan, batalkan transaksi
        throw new Error(`Role dengan ID ${roleId} tidak ditemukan.`);
      }
    }
    
    // --- Commit transaction ---
    await queryRunner.commitTransaction();

    // --- Log activity ---
    await logActivity(session.user.id_user, 'Menambah Data User', req);
    
    const { password: _, ...userData } = savedUser;
    return NextResponse.json({ ok: true, data: userData }, { status: 201 });

  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    console.error('[USER_POST_ERROR]', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  } finally {
    await queryRunner.release();
  }
}