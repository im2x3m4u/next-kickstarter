import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load sidebar untuk mengurangi initial bundle
const AppSidebar = dynamic(
  () => import("./sidebar"),
  {
    loading: () => <div className="w-64 bg-indigo-600 animate-pulse" />,
  }
);


const AppHeader = dynamic(
  () => import("./header").then((mod) => ({ default: mod.default })),
  {
    // 🔑 ambil default
    loading: () => <div className="h-16 bg-white border-b animate-pulse" />,
  }
);

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0">
        <Suspense fallback={<div className="w-64 bg-indigo-600 animate-pulse" />}>
          <AppSidebar />
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

