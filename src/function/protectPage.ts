import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function protectPage(requiredRoles: string[] = []) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // cek role
  const userRoles = session.user.roles as string[];
  const hasRole =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => userRoles.includes(role));

  if (!hasRole) {
    // user tidak sesuai role redirect default
    if (userRoles.includes("admin")) redirect("/dashboard");
    if (userRoles.includes("user")) redirect("/home");
    redirect("/login"); // fallback
  }

  return session;
}
