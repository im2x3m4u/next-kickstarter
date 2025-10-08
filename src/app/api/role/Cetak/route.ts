import { NextResponse } from "next/server";
import { getConnection } from "@/lib/typeorm";
import { Role } from "@/entities/role";
import { withProtection } from "@/function/authHelp";

export const dynamic = "force-dynamic";

export const GET = withProtection(
  async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const sortBy = (searchParams.get("sortBy") || "nama_role") as keyof Role;
      const sortOrder = (searchParams.get("sortOrder") || "DESC").toUpperCase() as "ASC" | "DESC";
      const roleFilter = searchParams.get("nama_role") || "";

      const ds = await getConnection();
      const repo = ds.getRepository(Role);

      const query = repo.createQueryBuilder("role")
        .orderBy(`role.${sortBy}`, sortOrder as "ASC" | "DESC");

      if (roleFilter) {
        query.where("role.nama_role LIKE :nama", { nama: `%${roleFilter}%` });
      }

      const allRoles = await query.getMany();

      return NextResponse.json({
        ok: true,
        data: allRoles,
        total: allRoles.length,
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