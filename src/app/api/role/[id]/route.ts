import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { Role } from "../../../../entities/role";
import { getAuthSession } from "@/function/authPermission";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
      // Cek login dulu
    const session = await getAuthSession();
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const role = await getEntityById(Role, "id_role", params.id);
  if (!role) return new Response("Role not found", { status: 404 });
  return Response.json(role);
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
  const updated = await updateEntityById(Role, "id_role", params.id, body);
  if (!updated) return new Response("Role not found", { status: 404 });
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

  const deleted = await deleteEntityById(Role, "id_role", params.id);
  if (!deleted) return new Response("Role not found", { status: 404 });
  return new Response("Deleted successfully");
}
