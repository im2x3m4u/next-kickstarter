// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../lib/typeorm";
import { verifyToken } from "../../../../function/jwt";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    // 1. Cek apakah header Authorization ada dan diawali Bearer
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { ok: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 2. Verifikasi token
    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return NextResponse.json(
        { ok: false, message: "Token tidak valid atau expired" },
        { status: 401 }
      );
    }

    // 3. Inisialisasi DB
    const ds = await getConnection();
    const { User } = await import("../../../../entities/user");
    const userRepo = ds.getRepository(User);

    // 4. Cari user dengan id dan login_token dari token
    const user = await userRepo.findOne({
      where: { id_user: decoded.id_user, login_token: token },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User tidak ditemukan atau token tidak cocok" },
        { status: 404 }
      );
    }

    // 5. Hapus login_token (logout)
    user.login_token = null;
    await userRepo.save(user);

    return NextResponse.json({ ok: true, message: "Logout berhasil" });
  } catch (err: any) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
