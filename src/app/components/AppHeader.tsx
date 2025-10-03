"use client";

import { useSession } from "next-auth/react";
import Header from "./Header";

export default function AppHeader() {
  const { data: session } = useSession();
  const role = session?.user?.role as "admin" | "user";

  return <Header role={role || "user"} />;
}
