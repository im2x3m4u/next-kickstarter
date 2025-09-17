// src/app/api/role/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { Role } from "../../../../entities/role";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);
    const role = await roleRepo.findOne({ where: { id_role: params.id } });

    if (!role) return NextResponse.json({ error: "Role not found" }, { status: 404 });

    return NextResponse.json(role);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);

    let role = await roleRepo.findOne({ where: { id_role: params.id } });
    if (!role) return NextResponse.json({ error: "Role not found" }, { status: 404 });

    roleRepo.merge(role, body);
    const updated = await roleRepo.save(role);

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);

    const role = await roleRepo.findOne({ where: { id_role: params.id } });
    if (!role) return NextResponse.json({ error: "Role not found" }, { status: 404 });

    await roleRepo.remove(role);
    return NextResponse.json({ message: "Role deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
