import { Suspense } from "react"
import dynamic from "next/dynamic"

// Lazy load sidebar untuk mengurangi initial bundle
const AppSidebar = dynamic(() => import("./sidebar").then(mod => ({ default: mod.AppSidebar })), {
  loading: () => <div className="w-64 bg-indigo-600 animate-pulse" />
})

const AppHeader = dynamic(() => import("./header").then(mod => ({ default: mod.AppHeader })), {
  loading: () => <div className="h-16 bg-white border-b animate-pulse" />
})

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Suspense fallback={<div className="w-64 bg-indigo-600 animate-pulse" />}>
        <AppSidebar />
      </Suspense>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<div className="h-16 bg-white border-b animate-pulse" />}>
          <AppHeader />
        </Suspense>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
