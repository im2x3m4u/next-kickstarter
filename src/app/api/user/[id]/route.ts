// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { User } from "../../../../entities/user";
import { logActivity } from "@/function/activityHelp";
import { getAuthSession } from "@/function/authPermission";
import { Role } from "@/entities/role";
import { UserRole } from "@/entities/userRole";
import { getConnection } from "@/lib/typeorm";
import { encryptPassword } from "@/lib/crypto";

// Pastikan route ini tidak pernah di-cache oleh Next.js
export const dynamic = 'force-dynamic';

//GET user berdasarkan id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ds = await getConnection();
  const user = await ds.getRepository(User).findOne({
      where: { id_user: params.id },
      relations: ["userRoles", "userRoles.role"],
  });

  if (!user)
    return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
  
  const { password, ...userData } = user;

  return NextResponse.json({ ok: true, data: userData });
}

//PUT (Update data user)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session || !session.user.roles.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const ds = await getConnection();
  const queryRunner = ds.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const body = await req.json();
    const { id_role, password, ...userData } = body;

    const userRepo = queryRunner.manager.getRepository(User);
    const user = await userRepo.findOneBy({ id_user: id });

    if (!user) {
      throw new Error("User not found");
    }

    // Update data dasar user (nama, email, dll.)
    userRepo.merge(user, userData);
    
    // Jika ada password baru, enkripsi dan update
    if (password) {
      user.password = encryptPassword(password);
    }

    await queryRunner.manager.save(user);

    // Jika ada perubahan role, update relasi UserRole
    if (id_role && Array.isArray(id_role) && id_role.length > 0) {
      const userRoleRepo = queryRunner.manager.getRepository(UserRole);
      const roleRepo = queryRunner.manager.getRepository(Role);
      
      // 1. Hapus semua role lama dari user ini
      await userRoleRepo.delete({ user: { id_user: id } });

      // 2. Tambahkan role baru
      const role = await roleRepo.findOneBy({ id_role: id_role[0] });
      if (!role) {
        throw new Error(`Role with ID ${id_role[0]} not found`);
      }
      
      const newUserRole = userRoleRepo.create({ user, role });
      await queryRunner.manager.save(newUserRole);
    }
    
    // Commit transaksi jika semua berhasil
    await queryRunner.commitTransaction();

    // Gunakan ID dari session (admin yang login) untuk mencatat aktivitas
    await logActivity(session.user.id, "Mengubah Data User", req);
    
    // Ambil data terbaru menggunakan repository baru dari koneksi utama
    const mainUserRepo = ds.getRepository(User);
    const updatedUserWithRelations = await mainUserRepo.findOne({
        where: { id_user: id },
        relations: ["userRoles", "userRoles.role"],
    });

    if (!updatedUserWithRelations) {
      throw new Error("Failed to retrieve updated user data.");
    }

    const { password: _, ...updatedUserData } = updatedUserWithRelations;
    return NextResponse.json({ ok: true, data: updatedUserData });

  } catch (error: any) {
    // Batalkan semua perubahan jika ada error
    await queryRunner.rollbackTransaction();
    console.error("[USER_PUT_ERROR]", error);
    return NextResponse.json({ ok: false, error: error.message || "Internal Server Error" }, { status: 500 });
  } finally {
    await queryRunner.release();
  }
}

//DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await deleteEntityById(User, "id_user", id);
  if (!deleted.ok)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    await logActivity(session.user.id, "Menghapus Data User", req);
  } catch (err) {
    console.error("logActivity DELETE error:", err);
  }

  return NextResponse.json({ ok: true, message: "Deleted successfully" });
}