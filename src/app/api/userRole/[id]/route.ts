import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { UserRole } from "../../../../entities/userRole";
import { getAuthSession } from "@/function/authPermission";
import { NextResponse } from "next/server";
import { withProtection } from "@/function/authHelp";

// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   // Cek login dulu
//   const session = await getAuthSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const userRole = await getEntityById(UserRole, "id_userRole", params.id, [
//     "user",
//     "role",
//   ]);
//   if (!userRole) return new Response("UserRole not found", { status: 404 });
//   return Response.json(userRole);
// }

//GET
export const GET = withProtection(
  async (req, session, context) => {
    const { id } = context.params;
    const userRole = await getEntityById(UserRole, "id_userRole", id, [
      "user",
      "role",
    ]);

    if (!userRole)
      return NextResponse.json({ ok: false, error: "UserRole not found" }, { status: 404 });

    return NextResponse.json({ ok: true, data: userRole });
  },
  {
    requiredRoles: ["admin"],
    activity: "Melihat Data UserRole",
  }
);

//PUT
export const PUT = withProtection(
  async (req, session, context) => {
    const { id } = context.params;
    const body = await req.json();

    const updated = await updateEntityById(UserRole, "id_userRole", id, body);

    if (!updated)
      return NextResponse.json({ ok: false, error: "UserRole not found" }, { status: 404 });

    return NextResponse.json({ ok: true, data: updated });
  },
  {
    requiredRoles: ["admin"],
    activity: "Mengubah Data UserRole",
  }
);


// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   // Cek login dulu
//   const session = await getAuthSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const body = await req.json();
//   const updated = await updateEntityById(
//     UserRole,
//     "id_userRole",
//     params.id,
//     body
//   );
//   if (!updated) return new Response("UserRole not found", { status: 404 });
//   return Response.json(updated);
// }

// export async function DELETE(
//   _: Request,
//   { params }: { params: { id: string } }
// ) {
//   // Cek login dulu
//   const session = await getAuthSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const deleted = await deleteEntityById(UserRole, "id_userRole", params.id);
//   if (!deleted) return new Response("UserRole not found", { status: 404 });
//   return new Response("Deleted successfully");
// }

//DELETE
export const DELETE = withProtection(
  async (_req, session, context) => {
    const { id } = context.params;

    const deleted = await deleteEntityById(UserRole, "id_userRole", id);

    if (!deleted)
      return NextResponse.json({ ok: false, error: "UserRole not found" }, { status: 404 });

    return NextResponse.json({ ok: true, message: "Deleted successfully" });
  },
  {
    requiredRoles: ["admin"],
    activity: "Menghapus Data UserRole",
  }
);