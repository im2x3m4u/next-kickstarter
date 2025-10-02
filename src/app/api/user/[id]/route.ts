import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { User } from "../../../../entities/user";
import { logActivity } from "@/function/activityHelp";
import { getAuthSession } from "@/function/authPermission";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getEntityById(User, "id_user", params.id, ["userRoles"]);
  if (!user) return new Response("User not found", { status: 404 });
  return Response.json(user);
}

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // console.log("PUT params.id:", params.id);
  const { params } = context;
  const id = params.id;
  const body = await req.json();
  const updated = await updateEntityById(User, "id_user", id, body);
  if (!updated.ok) return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    await logActivity(id, "Mengubah Data User", req);
  } catch (err) {
    console.error("logActivity PUT error:", err);
  }

  return NextResponse.json({ ok: true, data: updated.data });
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
  const deleted = await deleteEntityById(User, "id_user", params.id);
  if (!deleted) return new Response("User not found", { status: 404 });
  return new Response("Deleted successfully");
}
