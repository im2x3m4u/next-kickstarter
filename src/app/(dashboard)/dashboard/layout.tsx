import { ReactNode } from "react";
import { protectPage } from "@/function/protectPage";
import AdminLayout from "@/app/components/layout/layout";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await protectPage(["admin"]);

  return (
    <AdminLayout username={session.user.username}>
      {children}
    </AdminLayout>
  );
}
