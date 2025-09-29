import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";

export async function GET(req: Request) {
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
  const body = await req.json();
  const newUser = await createEntity(User, body);
  return Response.json(newUser, { status: 201 });
}
