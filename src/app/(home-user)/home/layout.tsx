import { ReactNode } from "react";
import { protectPage } from "@/function/protectPage";
import ReusableLayout from "@/app/components/layout/layout";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await protectPage(["user"]);

  return (
    <ReusableLayout username={session.user.username} role="user">
      {children}
    </ReusableLayout>
  );
}
