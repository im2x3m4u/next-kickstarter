import { getConnection } from "@/lib/typeorm";
import { Activity } from "@/entities/activity";
import { User } from "@/entities/user";
import { NextRequest } from "next/server";

export async function logActivity(
  userId: string,
  activity: string,
  req?: NextRequest | { url?: string }
) {
  const ds = await getConnection();
  const userRepo = ds.getRepository(User);
  const activityRepo = ds.getRepository(Activity);

  const user = await userRepo.findOne({ where: { id_user: userId } });
  if (!user) return;

  let location = "Unknown";

  if (req) {
    try {
      if ("nextUrl" in req && req.nextUrl) {
        // dari NextRequest
        location = req.nextUrl.href; // full URL
      } else if ("url" in req && req.url) {
        // fallback dari req.url
        location = req.url;
      }
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
}


