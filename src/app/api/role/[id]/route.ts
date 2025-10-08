import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { Role } from "../../../../entities/role";
import { getAuthSession } from "@/function/authPermission";
import { NextResponse } from "next/server";
import { logActivity } from "@/function/activityHelp";
import { withProtection } from "@/function/authHelp";

// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   // Cek login dulu
//   const session = await getAuthSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const role = await getEntityById(Role, "id_role", params.id);
//   if (!role) return new Response("Role not found", { status: 404 });
//   return Response.json(role);
// }

//GET
export const GET = withProtection(
  async (_req, _session, context) => {
    const { id } = context.params;
    const role = await getEntityById(Role, "id_role", id);

    if (!role) return NextResponse.json({ ok: false, error: "Role not found" }, { status: 404 });

    return NextResponse.json({ ok: true, data: role });
  },
  {
    requiredRoles: ["admin"],
    activity: "Melihat Data Role",
  }
);

// export async function PUT(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   const session = await getAuthSession();
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   const updated = await updateEntityById(Role, "id_role", id, body);
//   if (!updated) return new Response("Role not found", { status: 404 });

//   try {
//     await logActivity(session.user.id, "Mengubah Data Role", req);
//   } catch (err) {
//     console.error("logActivity PUT error:", err);
//   }

//   return NextResponse.json(updated);
// }

//PUT
export const PUT = withProtection(
  async (req, _session, context) => {
    const { id } = context.params;
    const body = await req.json();

    const updated = await updateEntityById(Role, "id_role", id, body);

    if (!updated) return NextResponse.json({ ok: false, error: "Role not found" }, { status: 404 });

    return NextResponse.json({ ok: true, data: updated });
  },
  {
    requiredRoles: ["admin"],
    activity: "Mengubah Data Role",
  }
);

//DELETE
export const DELETE = withProtection(
  async (_req, _session, context) => {
    const { id } = context.params;
    const deleted = await deleteEntityById(Role, "id_role", id);

    if (!deleted) return NextResponse.json({ ok: false, error: "Role not found" }, { status: 404 });

    return NextResponse.json({ ok: true, message: "Deleted successfully" });
  },
  {
    requiredRoles: ["admin"],
    activity: "Menghapus Data Role",
  }
);

// //DELETE
// export async function DELETE(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;
//   const session = await getAuthSession();
//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const deleted = await deleteEntityById(Role, "id_role", id);
//   if (!deleted) return new Response("Role not found", { status: 404 });

//   try {
//     await logActivity(session.user.id, "Menghapus Data Role", req);
//   } catch (err) {
//     console.error("logActivity DELETE error:", err);
//   }

//   return new Response("Deleted successfully");
// }
