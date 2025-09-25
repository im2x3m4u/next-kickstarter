import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import { signToken } from "../../../../function/jwt";
import { sendEmail } from "../../../../lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json(
        {
          ok: false,
          message: "Email wajib diisi",
        },
        { status: 400 }
      );

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { email },
    });
    if (!user)
      return NextResponse.json(
        {
          ok: false,
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );

    const token = signToken({ id_user: user.id_user }, "1h");
    user.reset_token = token;
    await userRepo.save(user);

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail(
      user.email,
      "Reset Password",
      `<p>Halo ${user.nama}, 
      klik link berikut untuk reset password: 
      <a href="${resetLink}" target="_blank">
      ${resetLink}</a></p>`
    );

    return NextResponse.json({
      ok: true,
      message: "Link reset password telah dikirim ke email",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
