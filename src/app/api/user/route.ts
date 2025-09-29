import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";
import { encryptPassword } from "@/lib/crypto";

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
  const { password } = body;

  if (!password) {
    return Response.json({ error: "Password harus diisi" }, { status: 400 });
  }

  // Encrypt password sebelum simpan
  const encryptedPassword = encryptPassword(password);

  const newUser = await createEntity(User, {
    ...body,
    password: encryptedPassword,
  });

  return Response.json(newUser, { status: 201 });
}
