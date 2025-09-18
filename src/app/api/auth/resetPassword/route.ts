// src/app/api/auth/resetPassword/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const JWT_SECRET = process.env.JWT_SECRET as string; 
const PASSWORD_SECRET = process.env.PASSWORD_SECRET as string; // simpan di .env

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return NextResponse.json(
        { ok: false, message: "Token dan newPassword wajib diisi" },
        { status: 400 }
      );
    }

    // Verifikasi token JWT
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { ok: false, message: "Token tidak valid atau expired" },
        { status: 401 }
      );
    }

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    // Cari user berdasarkan token
    const user = await userRepo.findOne({ where: { reset_token: token } });
    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Token tidak valid" },
        { status: 404 }
      );
    }

    // Hash password baru pakai CryptoJS
    const encryptedPassword = CryptoJS.AES.encrypt(
      newPassword,
      PASSWORD_SECRET
    ).toString();

    user.password = encryptedPassword;
    user.reset_token = null;

    await userRepo.save(user);

    return NextResponse.json({ ok: true, message: "Password berhasil diubah" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
