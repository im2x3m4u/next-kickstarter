import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { UserRole } from "../../../entities/userRole";
import { authPermission } from "../../../function/authPermission";

export async function GET(req: Request) {
  const auth = await authPermission(req as any);
  if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });
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
  const auth = await authPermission(req as any);
  if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });
  const body = await req.json();
  const newUserRole = await createEntity(UserRole, body);
  return Response.json(newUserRole, { status: 201 });
}
