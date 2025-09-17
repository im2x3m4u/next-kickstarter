import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/typeorm";

export async function GET() {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { Role } = await import("../../../entities/role");
  const roleRepo = AppDataSource.getRepository(Role);

  const roles = await roleRepo.find();
  return NextResponse.json({ ok: true, roles });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama_role } = body;
  if (!nama_role) return NextResponse.json({ ok: false, message: "Nama role wajib diisi" }, { status: 400 });

  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { Role } = await import("../../../entities/role");
  const roleRepo = AppDataSource.getRepository(Role);

  const role = roleRepo.create({ nama_role });
  await roleRepo.save(role);

  return NextResponse.json({ ok: true, message: "Role berhasil dibuat", role });
}
