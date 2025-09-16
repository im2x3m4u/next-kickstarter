// src/app/api/auth/resetPassword/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) return NextResponse.json({ ok: false, message: "Token dan password wajib diisi" }, { status: 400 });

    // Verifikasi token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ ok: false, message: "Token tidak valid atau expired" }, { status: 401 });
    }

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id_user: decoded.id_user } });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    // Update password
    user.password = newPassword;
    await userRepo.save(user);

    return NextResponse.json({ ok: true, message: "Password berhasil diubah" }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
