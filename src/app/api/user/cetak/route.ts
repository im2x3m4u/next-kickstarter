import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/typeorm";
import { User } from "@/entities/user";
import { withProtection } from "@/function/authHelp";

export const dynamic = "force-dynamic";

export const GET = withProtection(
  async (req: NextRequest) => {
    try {
      const { searchParams } = new URL(req.url);
      const sortBy = (searchParams.get("sortBy") || "nama") as keyof User;
      const sortOrder = (searchParams.get("sortOrder") || "ASC").toUpperCase() as "ASC" | "DESC";
      const userFilter = searchParams.get("nama") || "";

      const ds = await getConnection();
      const repo = ds.getRepository(User);

      // Gunakan backtick agar template literal dikenali
      const query = repo.createQueryBuilder("user").orderBy(`user.${sortBy}`, sortOrder);

      // Tambahkan filter jika ada
      if (userFilter) {
        query.where("user.nama LIKE :nama", { nama: `%${userFilter}%` });
      }

      const allUsers = await query.getMany();

      return NextResponse.json({
        ok: true,
        data: allUsers,
        total: allUsers.length,
        message: "Data User siap untuk dicetak.",
      });
    } catch (error) {
      console.error("[API_ERROR] fetching User for print:", error);
      return NextResponse.json(
        { ok: false, message: "Terjadi kesalahan pada server saat menyiapkan data cetak." },
        { status: 500 }
      );
    }
  },
  {
    requiredRoles: ["admin"],
    activity: "Mencetak Data User",
  }
);
