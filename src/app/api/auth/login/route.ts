// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../lib/typeorm";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const JWT_SECRET = process.env.JWT_SECRET as string; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const ds = await getConnection();
    const { User } = await import("../../../../entities/user");
    const userRepo = ds.getRepository(User);

    const user = await userRepo.findOne({
      where: { username },
      relations: ["userRoles", "userRoles.role"],
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, status: 401, message: "Username atau password salah" },
        { status: 401 }
      );
    }

//     console.log("password input:", password);
// console.log("password DB:", user.password);

// const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET!);
// const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
// console.log("decrypted password:", decryptedPassword);


    // 🔑 decrypt password dari DB
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET!);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
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

    // Cek role "admin"
    const roles = user.userRoles.map((ur) => ur.role.nama_role);
    if (!roles.includes("admin")) {
      return NextResponse.json(
        { ok: false, status: 403, message: "Anda bukan admin" },
        { status: 403 }
      );
    }

    // Buat JWT
    const token = jwt.sign(
      { id_user: user.id_user, username: user.username, nama: user.nama },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Simpan token login ke database
    user.login_token = token;
    await userRepo.save(user);

    return NextResponse.json({
      ok: true,
      status: 200,
      user: {
        id_user: user.id_user,
        username: user.username,
        nama: user.nama,
        email: user.email,
        no_telepon: user.no_telepon,
        roles,
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