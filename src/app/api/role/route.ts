// src/app/api/role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../lib/typeorm";
import { Role } from "../../../entities/role";
import { ILike } from "typeorm";

// GET All Roles dengan pagination + search
export async function GET(req: NextRequest) {
  try {
    const ds = await getConnection();
    const roleRepo = ds.getRepository(Role);

    const search = req.nextUrl.searchParams.get("search") || "";
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;

    const where = search ? { nama_role: ILike(`%${search}%`) } : {};

    const [roles, total] = await roleRepo.findAndCount({
      where,
      skip,
      take: pageSize,
      order: { nama_role: "ASC" },
    });

    return NextResponse.json({
      ok: true,
      data: roles,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error("GET /api/role error:", err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST Create Role
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ds = await getConnection();
    const roleRepo = ds.getRepository(Role);

    const newRole = roleRepo.create(body);
    await roleRepo.save(newRole);

    return NextResponse.json(newRole, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
