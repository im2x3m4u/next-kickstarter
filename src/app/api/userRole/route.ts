// GET all UserRole & POST create new UserRole
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/typeorm";

export async function GET() {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { UserRole } = await import("../../../entities/userRole");
  const userRoleRepo = AppDataSource.getRepository(UserRole);

  const userRoles = await userRoleRepo.find({ relations: ["user", "role"] });
  return NextResponse.json({ ok: true, userRoles });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id_user, id_role } = body;

  if (!id_user || !id_role)
    return NextResponse.json(
      { ok: false, message: "id_user dan id_role wajib diisi" },
      { status: 400 }
    );

  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const { UserRole } = await import("../../../entities/userRole");
  const userRoleRepo = AppDataSource.getRepository(UserRole);

  const userRole = userRoleRepo.create({ user: { id_user }, role: { id_role } });
  await userRoleRepo.save(userRole);

  return NextResponse.json({ ok: true, message: "Role berhasil diberikan ke user", userRole });
}
