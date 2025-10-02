import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";
import { UserRole } from "@/entities/userRole";
import { Role } from "@/entities/role";
import { encryptPassword } from "@/lib/crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
// import { authPermission } from "../../../function/authPermission";
import { logActivity } from "@/function/activityHelp";
import { getConnection } from "@/lib/typeorm";

export async function GET(req: NextRequest) {
  // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { search, page, pageSize } = Object.fromEntries(
    req.nextUrl.searchParams
  );

  const result = await getAllEntities<User>(
    User,
    Number(page),
    Number(pageSize),
    "nama",
    "username",
    search || ""
  );

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  // Cek login
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { password, id_role } = body;

  if (!password)
    return NextResponse.json(
      { error: "Password harus diisi" },
      { status: 400 }
    );
  if (!id_role || !Array.isArray(id_role) || id_role.length === 0) {
    return NextResponse.json({ error: "error" }, { status: 400 });
  }

  const encryptedPassword = encryptPassword(password);

  const newUserResult = await createEntity(User, {
    ...body,
    password: encryptedPassword,
  });
  const newUser = newUserResult.data;

  try {
    const ds = await getConnection();
    const userRoleRepo = ds.getRepository(UserRole);
    const roleRepo = ds.getRepository(Role);

    for (const roleId of id_role) {
      const role = await roleRepo.findOne({ where: { id_role: roleId } });
      if (!role) continue;

      const userRole = userRoleRepo.create({
        user: newUser,
        role,
      });

      await userRoleRepo.save(userRole);
    }

    // Log activity
    await logActivity(session.user.id_user, "Menambah Data User", req);
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ ok: true, data: newUser }, { status: 201 });
}
