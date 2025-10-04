// // src/function/activityHelp.ts
import { getConnection } from "@/lib/typeorm";
import { Activity } from "@/entities/activity";
import { User } from "@/entities/user";

export async function logActivity(
  userId: string,
  activity: string,
  reqOrUrl?: { url?: string } | string
) {
  try {
    const ds = await getConnection();
    const userRepo = ds.getRepository(User);
    const activityRepo = ds.getRepository(Activity);

    const user = await userRepo.findOne({ where: { id_user: userId } });
    if (!user) return console.warn("User not found", userId);

    let location = "Unknown";
    if (typeof reqOrUrl === "string") location = reqOrUrl;
    else if (reqOrUrl && "url" in reqOrUrl && reqOrUrl.url) location = reqOrUrl.url;

    const record = activityRepo.create({ user, activity, location });
    await activityRepo.save(record);
  } catch (err) {
    console.error("logActivity error:", err);
  }
}

