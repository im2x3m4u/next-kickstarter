import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/typeorm";
import { Activity } from "@/entities/activity";

export async function GET(req: NextRequest) {
  try {
    const ds = await getConnection();
    const repo = ds.getRepository(Activity);

    const activities = await repo.find({
      order: { created_at: "DESC" },
      take: 10,
      relations: ["user"], 
    });

    return NextResponse.json(activities);
  } catch (err) {
    console.error("Activity GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
