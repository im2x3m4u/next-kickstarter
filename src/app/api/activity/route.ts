import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/typeorm";
import { Activity } from "@/entities/activity";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const ds = await getConnection();
    const repo = ds.getRepository(Activity);

    const activities = await repo.find({
      where: { user: { id_user: userId } },
      order: { created_at: "DESC" },
      take: 5,
      relations: ["user"],
    });

    return NextResponse.json(activities);
  } catch (err) {
    console.error("Activity GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


