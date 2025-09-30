import { getConnection } from "@/lib/typeorm";
import { Activity } from "@/entities/activity";
import { User } from "@/entities/user";
import { NextRequest } from "next/server";
import fetch from "node-fetch";

// fungsi untuk dapatkan lokasi dari IP
interface IPApiResponse {
  status: "success" | "fail";
  city?: string;
  regionName?: string;
  country?: string;
}

async function getLocationFromIP(ip: string): Promise<string> {
  try {
    // fallback jika localhost
    if (ip === "127.0.0.1" || ip === "::1") return "Localhost";

    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = (await res.json()) as Partial<IPApiResponse>;

    if (data?.status === "success") {
      return `${data.city || ""}, ${data.regionName || ""}, ${data.country || ""}`
        .replace(/^, |, ,|,$/g, "")
        .trim();
    }
  } catch (err) {
    console.error("Failed to get location from IP:", err);
  }
  return "Unknown";
}

export async function logActivity(
  userId: string,
  activity: string,
  req?: NextRequest
) {
  const ds = await getConnection();
  const userRepo = ds.getRepository(User);
  const activityRepo = ds.getRepository(Activity);

  const user = await userRepo.findOne({ where: { id_user: userId } });
  if (!user) return;

  let location = "Unknown";

  if (req) {
    const ipHeader = req.headers.get("x-forwarded-for");
    const ip = ipHeader?.split(",")[0].trim() || "127.0.0.1";
    location = await getLocationFromIP(ip);
  }

  const record = activityRepo.create({
    user,
    activity,
    location,
  });

  await activityRepo.save(record);
}



