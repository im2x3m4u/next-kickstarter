import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";
import { UserRole } from "@/entities/userRole";
import { Role } from "@/entities/role";
import { encryptPassword } from "@/lib/crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
import { logActivity } from "@/function/activityHelp";
import { getConnection } from "@/lib/typeorm";
import { validateUserData } from "@/function/validasiHelp";
import { withProtection } from "@/function/authHelp";

// export async function GET(req: NextRequest) {
//   // Cek login dulu
//   const session = await getAuthSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const url = new URL(req.url);
//   const search = url.searchParams.get("search") || "";
//   const page = parseInt(url.searchParams.get("page") || "1");
//   const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
//   const sortBy = (url.searchParams.get("sortBy") || "nama") as keyof User;
//   const sortOrder = (
//     url.searchParams.get("sortOrder") || "ASC"
//   ).toUpperCase() as "ASC" | "DESC";

//   const result = await getAllEntities<User>(
//     User,
//     page,
//     pageSize,
//     sortBy,
//     sortOrder, 
//     "username", 
//     search 
//   );

//   return NextResponse.json(result);
// }

export const GET = withProtection(
  async (req, session) => {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const sortBy = (url.searchParams.get("sortBy") || "nama") as keyof User;
    const sortOrder = (
      url.searchParams.get("sortOrder") || "ASC"
    ).toUpperCase() as "ASC" | "DESC";

    const result = await getAllEntities<User>(
      User,
      page,
      pageSize,
      sortBy,
      sortOrder,
      "username",
      search
    );

    return NextResponse.json(result);
  },
  {
    requiredRoles: ["admin"],
    activity: "Melihat Data User",
  }
);

export const POST = withProtection(
  async (req, session) => {
    const body = await req.json();
    const { password, id_role, email, no_telepon } = body;

    const check = validateUserData({ email, no_telepon });
    if (check.length > 0)
      return NextResponse.json({ check }, { status: 400 });

    if (!password)
      return NextResponse.json(
        { error: "Password harus diisi" },
        { status: 400 }
      );

    if (!id_role || !Array.isArray(id_role) || id_role.length === 0) {
      return NextResponse.json(
        { error: "Role harus diisi" },
        { status: 400 }
      );
    }

    const encryptedPassword = encryptPassword(password);
    const newUserResult = await createEntity(User, {
      ...body,
      password: encryptedPassword,
    });
    const newUser = newUserResult.data;

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

    return NextResponse.json({ ok: true, data: newUser }, { status: 201 });
  },
  {
    requiredRoles: ["admin"],
    activity: "Menambah Data User",
  }
);

// export async function POST(req: NextRequest) {
//   // Cek login
//   const session = await getAuthSession();
//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const body = await req.json();
//   const { password, id_role, email, no_telepon } = body;

//   const check = validateUserData({ email, no_telepon });
//   if (check.length > 0) return NextResponse.json({ check }, { status: 400 });

//   if (!password)
//     return NextResponse.json(
//       { error: "Password harus diisi" },
//       { status: 400 }
//     );
//   if (!id_role || !Array.isArray(id_role) || id_role.length === 0) {
//     return NextResponse.json({ error: "error" }, { status: 400 });
//   }

//   const encryptedPassword = encryptPassword(password);

//   const newUserResult = await createEntity(User, {
//     ...body,
//     password: encryptedPassword,
//   });
//   const newUser = newUserResult.data;

//   try {
//     const ds = await getConnection();
//     const userRoleRepo = ds.getRepository(UserRole);
//     const roleRepo = ds.getRepository(Role);

//     for (const roleId of id_role) {
//       const role = await roleRepo.findOne({ where: { id_role: roleId } });
//       if (!role) continue;

//       const userRole = userRoleRepo.create({
//         user: newUser,
//         role,
//       });

//       await userRoleRepo.save(userRole);
//     }

//     // Log activity
//     await logActivity(session.user.id_user, "Menambah Data User", req);
//   } catch (err) {
//     console.error(err);
//   }

//   return NextResponse.json({ ok: true, data: newUser }, { status: 201 });
// }
