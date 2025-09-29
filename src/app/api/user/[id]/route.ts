import {
  getEntityById,
  updateEntityById,
  deleteEntityById,
} from "../../../../function/entityHelp";
import { User } from "../../../../entities/user";
// import { authPermission } from "../../../../function/authPermission";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  // const auth = await authPermission(_ as any);
  // if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });

  const user = await getEntityById(User, "id_user", params.id, ["userRoles"]);
  if (!user) return new Response("User not found", { status: 404 });
  return Response.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // const auth = await authPermission(req as any);
  // if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });
  const body = await req.json();
  const updated = await updateEntityById(User, "id_user", params.id, body);
  if (!updated) return new Response("User not found", { status: 404 });
  return Response.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  // const auth = await authPermission(_ as any);
  // if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });
  const deleted = await deleteEntityById(User, "id_user", params.id);
  if (!deleted) return new Response("User not found", { status: 404 });
  return new Response("Deleted successfully");
}
