import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(User);
}

// GET User berdasarkan ID
export async function GET(req: NextRequest, { params }: { params: { id_user: string } }) {
  try {
    const userRepo = await initDB();
    const user = await userRepo.findOneBy({ id_user: params.id_user });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT Update User
export async function PUT(req: NextRequest, { params }: { params: { id_user: string } }) {
  try {
    const body = await req.json();
    const { nama, email, no_telepon, is_aktif } = body;

    const userRepo = await initDB();
    const user = await userRepo.findOneBy({ id_user: params.id_user });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    user.nama = nama ?? user.nama;
    user.email = email ?? user.email;
    user.no_telepon = no_telepon ?? user.no_telepon;
    user.is_aktif = is_aktif ?? user.is_aktif;

    const updatedUser = await userRepo.save(user);
    return NextResponse.json({ ok: true, message: "User berhasil diupdate", user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE User
export async function DELETE(req: NextRequest, { params }: { params: { id_user: string } }) {
  try {
    const userRepo = await initDB();
    const user = await userRepo.findOneBy({ id_user: params.id_user });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    await userRepo.remove(user);
    return NextResponse.json({ ok: true, message: "User berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
