// src/function/activityHelp.ts
import { getConnection } from "@/lib/typeorm";
import { Activity } from "@/entities/activity";
import { User } from "@/entities/user";
import { NextRequest } from "next/server";

export async function logActivity(
  userId: string,
  activity: string,
  req?: NextRequest | { url?: string }
) {
  try {
    const ds = await getConnection();
    const userRepo = ds.getRepository(User);
    const activityRepo = ds.getRepository(Activity);

    const user = await userRepo.findOne({ where: { id_user: userId } });
    if (!user) {
      console.warn("logActivity not found", userId);
      return;
    }

    let location = "Unknown";
    if (req) {
      try {
        if ("nextUrl" in req && req.nextUrl) location = req.nextUrl.href;
        else if ("url" in req && req.url) location = req.url;
      } catch {
        location = "Unknown";
      }
    }

    const record = activityRepo.create({
      user,
      activity,
      location,
    });

    await activityRepo.save(record);
  } catch (err) {
    console.error("logActivity error:", err);
  }
}

