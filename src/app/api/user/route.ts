import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";
import { authPermission } from "../../../function/authPermission";

export async function GET(req: Request) {
  const auth = await authPermission(req as any);
  if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });

  const { search, page, pageSize } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  const result = await getAllEntities<User>(
    User,
    Number(page),
    Number(pageSize),
    "nama",
    "username",
    search || ""
  );

  return Response.json(result);
}

export async function POST(req: Request) {
  const auth = await authPermission(req as any);
  if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });
  
  const body = await req.json();
  const newUser = await createEntity(User, body);
  return Response.json(newUser, { status: 201 });
}
