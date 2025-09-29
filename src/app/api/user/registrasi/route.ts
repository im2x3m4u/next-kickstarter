import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/typeorm";
import { User } from "@/entities/user";
import { UserRole } from "@/entities/userRole";
import { Role } from "@/entities/role";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, username, password, email, no_tlp, roleId } = body;

    if (!nama || !username || !password || !email || !no_tlp || !roleId) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const ds = await AppDataSource.initialize();

    const userRepo = ds.getRepository(User);
    const roleRepo = ds.getRepository(Role);
    const userRoleRepo = ds.getRepository(UserRole);

    // cek username/email sudah ada atau belum
    const existingUser = await userRepo.findOne({ where: [{ username }, { email }] });
    if (existingUser) {
      await ds.destroy();
      return NextResponse.json({ error: "Username atau email sudah terdaftar" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user baru
    const user = userRepo.create({
      nama,
      username,
      password: hashedPassword,
      email,
      no_tlp,
      is_aktif: 1
    });
    await userRepo.save(user);

    // ambil role
    const role = await roleRepo.findOne({ where: { id_role: roleId } });
    if (!role) {
      await ds.destroy();
      return NextResponse.json({ error: "Role tidak ditemukan" }, { status: 400 });
    }

    // buat entry user_role
    const userRole = userRoleRepo.create({
      user: user,
      role: role
    });
    await userRoleRepo.save(userRole);

    await ds.destroy();

    return NextResponse.json({ message: "User berhasil didaftarkan" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
