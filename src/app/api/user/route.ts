import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";
import { encryptPassword } from "@/lib/crypto";
// import { authPermission } from "../../../function/authPermission";

export async function GET(req: Request) {
  // const auth = await authPermission(req as any);
  // if (!auth.ok) return new Response(JSON.stringify(auth), { status: 401 });

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
