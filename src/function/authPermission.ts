// src/function/authPermission.ts

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../lib/typeorm";
import { verifyToken } from "./jwt";
import { User } from "../entities/user";

export async function authPermission(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { ok: false, message: "Token tidak ditemukan" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  let decoded: any;

  try {
    decoded = verifyToken(token);
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Token tidak valid atau expired" },
      { status: 401 }
    );
  }

  const ds = await getConnection();
  const userRepo = ds.getRepository(User);

  const user = await userRepo.findOne({
    where: { id_user: decoded.id_user, login_token: token },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, message: "User tidak ditemukan" },
      { status: 401 }
    );
  }

  // Return user kalau valid
  return { ok: true, user, token };
}
