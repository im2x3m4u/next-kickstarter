import { NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
import { getAllEntities } from "@/function/entityHelp";
import { Permission } from "@/entities/permission";

export async function GET() {
  const session = await getAuthSession();
  if (!session || !session.user.roles.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const permissions = await getAllEntities(Permission, 1, 100, "nama_permission", "ASC");
  return NextResponse.json(permissions.data);
}