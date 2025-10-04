import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  return session; 
}

