import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Token wajib diisi" },
        { status: 400 }
      );
    }

    // Verifikasi signature dan expiry JWT
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { ok: false, message: "Token tidak valid atau sudah expired" },
        { status: 401 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(User);

    // Pastikan token masih yang terbaru di DB
    const user = await userRepo.findOne({ where: { id_user: (decoded as any).id_user } });
    if (!user || user.reset_token !== token) {
      return NextResponse.json(
        { ok: false, message: "Token tidak valid atau user tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, nama: user.nama });
  } catch (err) {
    console.error("Verify Reset Token Error:", err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



