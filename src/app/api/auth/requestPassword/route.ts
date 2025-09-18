// src/app/api/auth/requestPassword/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOKEN_EXP = "1h"; // token berlaku 1 jam

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: false, message: "Email wajib diisi" }, { status: 400 });

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    // Buat token (JWT) — bisa juga pakai random string
    const token = jwt.sign({ id_user: user.id_user }, JWT_SECRET, { expiresIn: TOKEN_EXP });

    // Simpan token & tanggal expired ke DB
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam dari sekarang (sama dengan TOKEN_EXP)
    user.reset_token = token;
    await userRepo.save(user);

    // Kirim token via email -> untuk percobaan pakai console.log
    const resetLink = `tokenResetPassword=${token}`;
    console.log("Reset password link (development):", resetLink);

    // TODO: pake nodemailer / mail service untuk kirim email secara nyata

    return NextResponse.json({ ok: true, message: "Link reset password telah dikirim ke email (console)" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
