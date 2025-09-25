import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { UserRole } from "@/entities/userRole";

export async function GET(req: Request) {
  const { page, pageSize } = Object.fromEntries(new URL(req.url).searchParams);

  const result = await getAllEntities(
    UserRole,
    Number(page),
    Number(pageSize),
    "id_userRole"
  );

  return Response.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newUserRole = await createEntity(UserRole, body);
  return Response.json(newUserRole, { status: 201 });
}
