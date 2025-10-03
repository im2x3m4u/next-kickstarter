import { NextRequest, NextResponse } from "next/server";
import { getAllEntities } from "@/function/entityHelp";
import { Activity } from "@/entities/activity";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const sortBy = (url.searchParams.get("sortBy") ||
      "created_at") as keyof Activity;
    const sortOrder = (
      url.searchParams.get("sortOrder") || "ASC"
    ).toUpperCase() as "ASC" | "DESC";
    const usernameFilter = url.searchParams.get("username") || "";

    const result = await getAllEntities<Activity>(
      Activity,
      page,
      pageSize,
      sortBy,
      sortOrder,
      undefined, // searchField di entity
      undefined, // search value di entity
      ["user"], // relations
      usernameFilter
        ? { relation: "user", column: "username", value: usernameFilter }
        : undefined // search di relasi jika ada filter
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Activity GET error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
