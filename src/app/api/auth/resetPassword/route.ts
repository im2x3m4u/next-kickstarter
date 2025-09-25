import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import { verifyToken } from "../../../../function/jwt";
import { encryptPassword } from "../../../../lib/crypto";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword)
      return NextResponse.json(
        {
          ok: false,
          message: "Token dan password baru wajib diisi",
        },
        { status: 400 }
      );

    const decoded: any = verifyToken(token);

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { reset_token: token } });
    if (!user)
      return NextResponse.json(
        { ok: false, message: "Token tidak valid atau user tidak ditemukan" },
        { status: 404 }
      );

    user.password = encryptPassword(newPassword);
    user.reset_token = null;
    await userRepo.save(user);

    return NextResponse.json({
      ok: true,
      message: "Password berhasil diubah. Silakan login dengan password baru.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

