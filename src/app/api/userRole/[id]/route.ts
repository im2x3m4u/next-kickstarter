import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { UserRole } from "../../../../entities/userRole";
import { getAuthSession } from "@/function/authPermission";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    // Cek login dulu
    const session = await getAuthSession();
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const userRole = await getEntityById(UserRole, "id_userRole", params.id, [
    "user",
    "role",
  ]);
  if (!userRole) return new Response("UserRole not found", { status: 404 });
  return Response.json(userRole);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
    // Cek login dulu
    const session = await getAuthSession();
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const body = await req.json();
  const updated = await updateEntityById(
    UserRole,
    "id_userRole",
    params.id,
    body
  );
  if (!updated) return new Response("UserRole not found", { status: 404 });
  return Response.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const deleted = await deleteEntityById(UserRole, "id_userRole", params.id);
  if (!deleted) return new Response("UserRole not found", { status: 404 });
  return new Response("Deleted successfully");
}
