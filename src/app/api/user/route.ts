import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/typeorm";
import { User } from "../../../entities/user";
import CryptoJS from "crypto-js";
import { ILike } from "typeorm";

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(User);
}

// GET All Users pagination dan search
export async function GET(req: NextRequest) {
  try {
    const userRepo = await initDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const search = searchParams.get("search") || "";

    const where = search
      ? [
          { nama: ILike(`%${search}%`) },
          { username: ILike(`%${search}%`) },
        ]
      : {};

    const [users, total] = await userRepo.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { nama: "ASC" },
    });

    return NextResponse.json({
      ok: true,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      users,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST Create User
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, username, password, email, no_telepon, is_aktif } = body;

    const userRepo = await initDB();

    // Encrypt password pakai CryptoJS + secret dari .env
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET!
    ).toString();

    const newUser = userRepo.create({
      nama,
      username,
      password: encryptedPassword, 
      email,
      no_telepon,
      is_aktif: is_aktif ?? 1,
    });

    const savedUser = await userRepo.save(newUser);
    return NextResponse.json({
      ok: true,
      message: "User berhasil dibuat",
      user: savedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
