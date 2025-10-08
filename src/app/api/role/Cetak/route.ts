// src/app/api/role/cetak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllEntities } from "@/function/entityHelp";
import { Activity } from "@/entities/activity";
import { withProtection } from "@/function/authHelp";
import { Role } from "@/entities/role";

// Pastikan halaman ini tidak di-cache
export const dynamic = "force-dynamic";

export const GET = withProtection(
  async (req) => {
    try {
      const { searchParams } = new URL(req.url);

      // Ambil optional filter dan sort dari query
      const sortBy = (searchParams.get("sortBy") || "nama_role") as keyof Role;
      const sortOrder = (searchParams.get("sortOrder") || "DESC").toUpperCase() as "ASC" | "DESC";
      const roleFilter = searchParams.get("nama_role") || "";
    //   const filterOptions = roleFilter
    //     ? { relation: "user", column: "username", value: roleFilter }
    //     : undefined;

      // Ambil semua data tanpa pagination (untuk cetak)
      const result = await getAllEntities<Role>(
        Role,
        1,
        999999, // ambil semua data
        sortBy,
        sortOrder,
        undefined,
        undefined,
        ["nama_role"]
      );

      return NextResponse.json({
        ok: true,
        data: result.data,
        total: result.pagination?.total || result.data.length,
        message: "Data Role siap untuk dicetak.",
      });
    } catch (error) {
      console.error("API Error fetching role for print:", error);
      return NextResponse.json(
        { ok: false, message: "Terjadi kesalahan pada server saat menyiapkan data cetak." },
        { status: 500 }
      );
    }
  },
  {
    requiredRoles: ["admin"],
    activity: "Mencetak Data Role",
  }
);
