"use client";

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const AppSidebar = dynamic(() => import("../Sidebar"), {
  ssr: false,
  loading: () => <div className="w-64 bg-gray-900 animate-pulse" />,
});

const AppHeader = dynamic(() => import("../Header"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b animate-pulse" />,
});

interface ReusableLayoutProps {
  children: React.ReactNode;
  role?: "admin" | "user";
  username?: string;
}

export default function ReusableLayout({
  children,
  role,
  username,
}: ReusableLayoutProps) {
  const { data: session, status } = useSession();

  // selalu dipanggil di semua render
  useEffect(() => {
    console.log("✅ ReusableLayout active as client layout");
  }, []);

  // kalau session masih loading, render skeleton — tapi hook tetap sudah dipanggil di atas
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  const userRole = role || (session?.user?.role as "admin" | "user") || "user";
  const displayName =
    username || session?.user?.username || session?.user?.name || "Pengguna";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-screen border-r border-gray-200 bg-white">
        <Suspense fallback={<div className="w-64 bg-gray-900 animate-pulse" />}>
          <AppSidebar username={displayName} role={userRole} />
        </Suspense>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col ml-64">
        <header className="fixed top-0 left-64 right-0 z-40">
          <Suspense fallback={<div className="h-16 bg-white border-b animate-pulse" />}>
            <AppHeader />
          </Suspense>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}
