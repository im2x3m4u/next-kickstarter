import { getAllEntities, createEntity } from "../../../function/entityHelp";
import { User } from "../../../entities/user";
import { encryptPassword } from "@/lib/crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/function/authPermission";
// import { authPermission } from "../../../function/authPermission";


export async function GET(req: NextRequest) {
  // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { search, page, pageSize } = Object.fromEntries(
    req.nextUrl.searchParams
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
    // Cek login dulu
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
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
