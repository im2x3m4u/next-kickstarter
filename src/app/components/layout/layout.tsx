"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const AppSidebar = dynamic(() => import("../Sidebar"), {
  loading: () => <div className="w-64 bg-gray-900 animate-pulse" />,
});

const AppHeader = dynamic(() => import("../Header"), {
  loading: () => <div className="h-16 bg-white border-b animate-pulse" />,
});

interface ReusableLayoutProps {
  children: React.ReactNode;
  role?: "admin" | "user";
  username?: string;
}

export default function ReusableLayout({ children, role, username }: ReusableLayoutProps) {
  const { data: session } = useSession();

  const userRole = role || (session?.user?.role as "admin" | "user") || "user";
  const displayName = username || session?.user?.username || session?.user?.name || "Pengguna";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0">
        <Suspense fallback={<div className="w-64 bg-gray-900 animate-pulse" />}>
          <AppSidebar username={displayName} role={userRole} />
        </Suspense>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 z-50">
          <Suspense fallback={<div className="h-16 bg-white border-b animate-pulse" />}>
            <AppHeader />
          </Suspense>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}
