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
  const { page, pageSize } = Object.fromEntries(new URL(req.url).searchParams);

  const result = await getAllEntities<UserRole>(
    UserRole,
    Number(page),
    Number(pageSize),
    "id_userRole"
  );

  return Response.json(result);
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
