// src/app/api/auth/logout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123";

export async function POST(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { User } = await import("../../../../entities/user");
    const userRepo = AppDataSource.getRepository(User);

    // Ambil token dari header Authorization
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { ok: false, status: 401, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verifikasi token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { ok: false, status: 401, message: "Token tidak valid" },
        { status: 401 }
      );
    }

    // Cari user berdasarkan id + token
    const user = await userRepo.findOne({
      where: { id_user: decoded.id_user, login_token: token },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, status: 404, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus login_token (destroy session)
    user.login_token = null;
    await userRepo.save(user);

    return NextResponse.json({
      ok: true,
      status: 200,
      message: "Logout berhasil",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { ok: false, status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
