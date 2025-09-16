// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Initialize datasource sekali saja
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { User } = await import("../../../../entities/user");
    const userRepo = AppDataSource.getRepository(User);

    // Cari user dan load relasi userRoles -> role
    const user = await userRepo.findOne({
      where: { username },
      relations: ["userRoles", "userRoles.role"],
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { ok: false, status: 401, message: "Username atau password salah" },
        { status: 401 }
      );
    }

    if (user.is_aktif !== 1) {
      return NextResponse.json(
        { ok: false, status: 403, message: "Akun tidak aktif" },
        { status: 403 }
      );
    }

    // Buat JWT
    const token = jwt.sign(
      { id_user: user.id_user, username: user.username, nama: user.nama },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      ok: true,
      status: 200,
      user: {
        id_user: user.id_user,
        username: user.username,
        nama: user.nama,
        email: user.email,
        no_telepon: user.no_telepon,
        roles: user.userRoles.map((ur) => ({
          id_userRole: ur.id_userRole,
          role_name: ur.role.nama_role,
        })),
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
