import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/typeorm";
import { User } from "../../../entities/user";

// Helper init DB
async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(User);
}

// GET All Users
export async function GET(req: NextRequest) {
  try {
    const userRepo = await initDB();
    const users = await userRepo.find();
    return NextResponse.json({ ok: true, users });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// POST Create User
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, username, password, email, no_telepon, is_aktif } = body;

    const userRepo = await initDB();

    const newUser = userRepo.create({
      nama,
      username,
      password,
      email,
      no_telepon,
      is_aktif: is_aktif ?? 1,
    });

    const savedUser = await userRepo.save(newUser);
    return NextResponse.json({ ok: true, message: "User berhasil dibuat", user: savedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
