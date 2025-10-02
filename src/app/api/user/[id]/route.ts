// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { User } from "../../../../entities/user";
import { logActivity } from "@/function/activityHelp";
import { getAuthSession } from "@/function/authPermission";

//GET user berdasarkan id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getEntityById(User, "id_user", params.id, ["userRoles"]);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ ok: true, data: user });
}


//PUT (Update data user)
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

// DELETE user
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  console.log("DELETE params.id:", params.id);

  const deleted = await deleteEntityById(User, "id_user", params.id);
  if (!deleted) return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    await logActivity(session.user.id_user, "Menghapus Data User", req);
  } catch (err) {
    console.error("logActivity DELETE error:", err);
  }

  return NextResponse.json({ ok: true, message: "Deleted successfully" });
}
