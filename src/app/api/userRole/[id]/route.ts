// CRUD by ID: GET by ID, PUT update, DELETE
import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../lib/typeorm";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id_userRole = params.id;
  const ds = await getConnection();
  const { UserRole } = await import("../../../../entities/userRole");
  const userRoleRepo = ds.getRepository(UserRole);

  const userRole = await userRoleRepo.findOne({
    where: { id_userRole },
    relations: ["user", "role"],
  });

  if (!userRole)
    return NextResponse.json({ ok: false, message: "UserRole tidak ditemukan" }, { status: 404 });

  return NextResponse.json({ ok: true, userRole });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id_userRole = params.id;
  const body = await req.json();
  const { id_user, id_role } = body;

  const ds = await getConnection();
  const { UserRole } = await import("../../../../entities/userRole");
  const { User } = await import("../../../../entities/user");
  const { Role } = await import("../../../../entities/role");

  const userRoleRepo = ds.getRepository(UserRole);
  const userRepo = ds.getRepository(User);
  const roleRepo = ds.getRepository(Role);

  const userRole = await userRoleRepo.findOne({ where: { id_userRole }, relations: ["user", "role"] });
  if (!userRole)
    return NextResponse.json({ ok: false, message: "UserRole tidak ditemukan" }, { status: 404 });

  if (id_user) {
    const userEntity = await userRepo.findOne({ where: { id_user } });
    if (!userEntity)
      return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });
    userRole.user = userEntity;
  }

  if (id_role) {
    const roleEntity = await roleRepo.findOne({ where: { id_role } });
    if (!roleEntity)
      return NextResponse.json({ ok: false, message: "Role tidak ditemukan" }, { status: 404 });
    userRole.role = roleEntity;
  }

  await userRoleRepo.save(userRole);

  return NextResponse.json({ ok: true, message: "UserRole berhasil diupdate", userRole });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id_userRole = params.id;

  const ds = await getConnection();
  const { UserRole } = await import("../../../../entities/userRole");
  const userRoleRepo = ds.getRepository(UserRole);

  const userRole = await userRoleRepo.findOne({ where: { id_userRole } });
  if (!userRole)
    return NextResponse.json({ ok: false, message: "UserRole tidak ditemukan" }, { status: 404 });

  await userRoleRepo.remove(userRole);
  return NextResponse.json({ ok: true, message: "UserRole berhasil dihapus" });
}
