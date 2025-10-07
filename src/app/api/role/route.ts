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

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const sortBy = (url.searchParams.get("sortBy") || "nama_role") as keyof Role;
  const sortOrder = (
    url.searchParams.get("sortOrder") || "ASC"
  ).toUpperCase() as "ASC" | "DESC";

  const result = await getAllEntities<Role>(
    Role,
    page,
    pageSize,
    sortBy,
    sortOrder,
    "nama_role",
    search
  );

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  // Cek login dulu
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const newRole = await createEntity(Role, body);

  try {
    await logActivity(session.user.id, "Menambah Data Role", req);
  } catch (err) {
    console.error("logActivity POST error:", err);
  }

  return NextResponse.json(newRole, { status: 201 });
}
