// src/app/api/activity/cetak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllEntities } from "@/function/entityHelp";
import { Activity } from "@/entities/activity";
import { withProtection } from "@/function/authHelp";

// Pastikan halaman ini tidak di-cache
export const dynamic = "force-dynamic";

export const GET = withProtection(
  async (req) => {
    try {
      const { searchParams } = new URL(req.url);

      // Ambil optional filter dan sort dari query
      const sortBy = (searchParams.get("sortBy") || "created_at") as keyof Activity;
      const sortOrder = (searchParams.get("sortOrder") || "DESC").toUpperCase() as "ASC" | "DESC";
      const usernameFilter = searchParams.get("username") || "";

      // Filter opsional: hanya activity dari username tertentu
      const filterOptions = usernameFilter
        ? { relation: "user", column: "username", value: usernameFilter }
        : undefined;

      // Ambil semua data tanpa pagination (untuk cetak)
      const result = await getAllEntities<Activity>(
        Activity,
        1,
        999999, // ambil semua data
        sortBy,
        sortOrder,
        undefined,
        undefined,
        ["user"],
        filterOptions
      );

      return NextResponse.json({
        ok: true,
        data: result.data,
        total: result.pagination?.total || result.data.length,
        message: "Data aktivitas siap untuk dicetak.",
      });
    } catch (error) {
      console.error("API Error fetching activities for print:", error);
      return NextResponse.json(
        { ok: false, message: "Terjadi kesalahan pada server saat menyiapkan data cetak." },
        { status: 500 }
      );
    }
  },
  {
    requiredRoles: ["admin"],
    activity: "Mencetak Data Aktivitas",
  }
);
