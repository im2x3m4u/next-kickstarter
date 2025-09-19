import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, getConnection } from "../../../lib/typeorm";
import { User } from "../../../entities/user";
import { UserRole } from "../../../entities/userRole";
import { Role } from "../../../entities/role";
import CryptoJS from "crypto-js";
import { ILike } from "typeorm";

async function initDB() {
  await getConnection();
  return AppDataSource.getRepository(User);
}

// GET All Users pagination dan search
export async function GET(req: NextRequest) {
  try {
    const userRepo = await initDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const search = searchParams.get("search") || "";

<<<<<<< HEAD
    const where = search
      ? [
          { nama: ILike(`%${search}%`) },
          { username: ILike(`%${search}%`) },
        ]
      : {};
=======
    // Buat query builder untuk pencarian + pagination dengan relasi roles
    const qb = userRepo.createQueryBuilder("user")
      .leftJoinAndSelect("user.userRoles", "userRoles")
      .leftJoinAndSelect("userRoles.role", "role");
>>>>>>> cc4c140 (add: CRUD user management, change password)

    const [users, total] = await userRepo.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { nama: "ASC" },
    });

    return NextResponse.json({
      ok: true,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      users,
    });
  } catch (err) {
    console.error('GET /api/user error:', err);
    return NextResponse.json(
      { 
        ok: false, 
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// POST Create User
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, username, password, email, no_telepon, is_aktif, role } = body;

    const userRepo = await initDB();

    // Encrypt password pakai CryptoJS + secret dari .env
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET!
    ).toString();

    const newUser = userRepo.create({
      nama,
      username,
      password: encryptedPassword, // simpan yg sudah terenkripsi
      email,
      no_telepon,
      is_aktif: is_aktif ?? 1,
    });

    const savedUser = await userRepo.save(newUser);

    // Assign role to the new user
    if (role) {
      const userRoleRepo = AppDataSource.getRepository(UserRole);
      const roleRepo = AppDataSource.getRepository(Role);

      // Find the role
      const selectedRole = await roleRepo.findOne({ where: { nama_role: role } });
      
      if (selectedRole) {
        const newUserRole = userRoleRepo.create({
          user: savedUser,
          role: selectedRole,
        });
        await userRoleRepo.save(newUserRole);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "User berhasil dibuat",
      user: savedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}