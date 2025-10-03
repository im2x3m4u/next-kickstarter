import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { UserRole } from "../../../entities/userRole";
import { getAuthSession } from "@/function/authPermission";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Cek login dulu
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const sortBy = (url.searchParams.get("sortBy") ||
    "created_at") as keyof UserRole;
  const sortOrder = (
    url.searchParams.get("sortOrder") || "ASC"
  ).toUpperCase() as "ASC" | "DESC";
  const usernameFilter = url.searchParams.get("username") || "";

  const result = await getAllEntities<UserRole>(
    UserRole,
    page,
    pageSize,
    sortBy,
    sortOrder,
    undefined,
    undefined, 
    ["user"], 
    usernameFilter
      ? { relation: "user", column: "username", value: usernameFilter }
      : undefined
  );

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const newUserRole = await createEntity(UserRole, body);
  return Response.json(newUserRole, { status: 201 });
}
