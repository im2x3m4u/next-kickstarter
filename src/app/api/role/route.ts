import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { Role } from "../../../entities/role";

export async function GET(req: Request) {
  const { search, page, pageSize } = Object.fromEntries(new URL(req.url).searchParams);

  const result = await getAllEntities<Role>(
    Role,
    Number(page),
    Number(pageSize),
    "nama_role",
    "nama_role",
    search || ""
  );

  return Response.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newRole = await createEntity(Role, body);
  return Response.json(newRole, { status: 201 });
}
