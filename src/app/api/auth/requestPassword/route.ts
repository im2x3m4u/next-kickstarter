import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../../lib/mailer";

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_EXP = "1h"; 

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: false, message: "Email wajib diisi" }, { status: 400 });

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    // Buat token JWT
    const token = jwt.sign({ id_user: user.id_user }, JWT_SECRET, { expiresIn: TOKEN_EXP });

    // Simpan token ke database
    user.reset_token = token;
    await userRepo.save(user);

    // Buat link reset password
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Kirim email
    await sendEmail(
      user.email,
      "Reset Password",
      `<p>Halo ${user.nama},</p>
       <p>Silakan klik link berikut untuk mereset password Anda:</p>
       <a href="${resetLink}" target="_blank">${resetLink}</a>
       <p>Link berlaku 1 jam.</p>`
    );

    return NextResponse.json({ ok: true, message: "Link reset password telah dikirim ke email" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
