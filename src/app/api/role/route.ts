// src/app/api/role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/typeorm";
import { Role } from "../../../entities/role";
import { ILike } from "typeorm";

// Get All Role dengan pagination & search
export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);

    const { search, page = "1", pageSize = "10" } = Object.fromEntries(
      req.nextUrl.searchParams
    );

    const pageNum = parseInt(page as string, 10) || 1;
    const sizeNum = parseInt(pageSize as string, 10) || 10;
    const skip = (pageNum - 1) * sizeNum;

    const where = search
      ? { nama_role: ILike(`%${search}%`) }
      : {};

    const [roles, total] = await roleRepo.findAndCount({
      where,
      skip,
      take: sizeNum,
      order: { nama_role: "ASC" },
    });

    return NextResponse.json({
      data: roles,
      pagination: {
        total,
        page: pageNum,
        pageSize: sizeNum,
        totalPages: Math.ceil(total / sizeNum),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST Create Role
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
