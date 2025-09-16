// src/app/api/auth/requestResetPassword/route.ts

import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123"; // ganti dengan secret lebih aman
const TOKEN_EXP = "1h"; // token berlaku 1 jam

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: false, message: "Email wajib diisi" }, { status: 400 });

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    // Buat token sementara
    const token = jwt.sign({ id_user: user.id_user }, JWT_SECRET, { expiresIn: TOKEN_EXP });

    // TODO: kirim token via email, misal: sendEmail(user.email, token)
    console.log("Token reset password:", token);

    return NextResponse.json({ ok: true, message: "Link reset password telah dikirim ke email" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
