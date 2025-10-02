import AdminLayout from "@/app/components/layout/layout";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardContent from "./dashboardContent/page";
import { protectPage } from "@/function/protectPage"

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);
   const session = await protectPage(["admin"])

  // Proteksi halaman di server
  // if (!session || !session.user.roles.includes("admin")) {
  //   redirect("/login");
  // }

  return (
    <AdminLayout username={session.user.username}>
      <DashboardContent />
    </AdminLayout>
  );
}
