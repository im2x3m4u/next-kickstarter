import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { Role } from "../../../entities/role";
import { getAuthSession } from "@/function/authPermission";
import { NextResponse } from "next/server";
import { logActivity } from "@/function/activityHelp";

export async function GET(req: Request) {
  // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { search, page, pageSize } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  const result = await getAllEntities<Role>(
    Role,
    Number(page),
    Number(pageSize),
    "nama_role",
    "nama_role",
    search || ""
  );

  return Response.json(result);
}

export async function POST(req: Request) {
  // Cek login dulu
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const newRole = await createEntity(Role, body);

  try {
    await logActivity(session.user.id_user, "Menambah Data Role", req);
  } catch (err) {
    console.error("logActivity POST error:", err);
  }

  return NextResponse.json(newRole, { status: 201 });
}
