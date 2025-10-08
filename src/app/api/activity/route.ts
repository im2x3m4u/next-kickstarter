import { NextRequest, NextResponse } from "next/server";
import { getAllEntities } from "@/function/entityHelp";
import { Activity } from "@/entities/activity";

// PASTIKAN BARIS INI ADA DI PALING ATAS
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const sortBy = (searchParams.get("sortBy") || "created_at") as keyof Activity;
    const usernameFilter = searchParams.get("username") || "";

    // const getAll = searchParams.get("all") === "true";

    // PASTIKAN NILAI DEFAULT-NYA ADALAH "DESC"
    const sortOrder = (
      searchParams.get("sortOrder") || "DESC"
    ).toUpperCase() as "ASC" | "DESC";

    const filterOptions = usernameFilter
      ? { relation: "user", column: "username", value: usernameFilter }
      : undefined;

    //   if (getAll) {
    //   const result = await getAllEntities<Activity>(
    //     Activity,
    //     1,
    //     99999, // ambil semua data tanpa batas
    //     sortBy,
    //     sortOrder,
    //     undefined,
    //     undefined,
    //     ["user"],
    //     filterOptions
    //   );

    //   return NextResponse.json({
    //     data: result.data,
    //     pagination: { total: result.data.length },
    //   });
    // }

    const result = await getAllEntities<Activity>(
      Activity,
      page,
      pageSize,
      sortBy,
      sortOrder,
      undefined,
      undefined,
      ["user"],
      filterOptions
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error fetching activities:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}