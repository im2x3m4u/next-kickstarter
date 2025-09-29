// import {
//   getEntityById,
//   updateEntityById,
//   deleteEntityById,
// } from "../../../../function/entityHelp";
// import { User } from "../../../../entities/user";
// import { logActivity } from "@/function/activityHelp";

// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   const user = await getEntityById(User, "id_user", params.id, ["userRoles"]);
//   if (!user) return new Response("User not found", { status: 404 });
//   return Response.json(user);
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const body = await req.json();
//   const updated = await updateEntityById(User, "id_user", params.id, body);
//   if (!updated) return new Response("User not found", { status: 404 });

//   // Log update profile
//   await logActivity(params.id.toString(), "Update Data User");

//   return Response.json(updated);
// }

// export async function DELETE(
//   _: Request,
//   { params }: { params: { id: string } }
// ) {
//   const deleted = await deleteEntityById(User, "id_user", params.id);
//   if (!deleted) return new Response("User not found", { status: 404 });
//   return new Response("Deleted successfully");
// }

import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { User } from "../../../../entities/user";
import { logActivity } from "@/function/activityHelp";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updated = await updateEntityById(User, "id_user", params.id, body);
  if (!updated) return new Response("User not found", { status: 404 });

  // kirim req supaya logActivity bisa ambil IP
  await logActivity(params.id, "UPDATE_PROFILE", req);

  return Response.json(updated);
}



