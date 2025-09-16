import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id_role = params.id;
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { Role } = await import("../../../../entities/role");
  const roleRepo = AppDataSource.getRepository(Role);

  const role = await roleRepo.findOne({ where: { id_role } });
  if (!role) return NextResponse.json({ ok: false, message: "Role tidak ditemukan" }, { status: 404 });

  return NextResponse.json({ ok: true, role });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id_role = params.id;
  const body = await req.json();
  const { nama_role, is_aktif } = body;

  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { Role } = await import("../../../../entities/role");
  const roleRepo = AppDataSource.getRepository(Role);

  const role = await roleRepo.findOne({ where: { id_role } });
  if (!role) return NextResponse.json({ ok: false, message: "Role tidak ditemukan" }, { status: 404 });

  role.nama_role = nama_role ?? role.nama_role;
  if (is_aktif !== undefined) role.is_aktif = is_aktif;

  await roleRepo.save(role);
  return NextResponse.json({ ok: true, message: "Role berhasil diupdate", role });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id_role = params.id;

  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { Role } = await import("../../../../entities/role");
  const roleRepo = AppDataSource.getRepository(Role);

  const role = await roleRepo.findOne({ where: { id_role } });
  if (!role) return NextResponse.json({ ok: false, message: "Role tidak ditemukan" }, { status: 404 });

  await roleRepo.remove(role);
  return NextResponse.json({ ok: true, message: "Role berhasil dihapus" });
}
