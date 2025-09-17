// src/app/api/role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/typeorm";
import { Role } from "../../../entities/role";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);
    const roles = await roleRepo.find();
    return NextResponse.json(roles);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);

    const newRole = roleRepo.create(body);
    await roleRepo.save(newRole);

    return NextResponse.json(newRole, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
