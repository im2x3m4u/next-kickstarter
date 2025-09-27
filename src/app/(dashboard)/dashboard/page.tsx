"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai"
import dynamic from "next/dynamic"
import AdminLayout from "@/app/components/layout/layout"
import { StatsCard } from "@/app/components/dashboard/stats-card"
import { DashboardSkeleton } from "@/app/components/loading-skeleton"
import { Users, Shield, Activity } from "lucide-react"
import { 
  dashboardStatsAtom, 
  dashboardActivitiesAtom, 
  dashboardLoadingAtom, 
  dashboardErrorAtom,
  statsCardsAtom,
  fetchDashboardDataAtom 
} from "@/app/state/dashboardState"

// Lazy load heavy components
const RecentActivity = dynamic(() => import("@/app/components/dashboard/recent-activity").then(mod => ({ default: mod.RecentActivity })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
})



export default function DashboardPage() {
  // Jotai state management
  const stats = useAtomValue(dashboardStatsAtom)
  const activities = useAtomValue(dashboardActivitiesAtom)
  const loading = useAtomValue(dashboardLoadingAtom)
  const statsCards = useAtomValue(statsCardsAtom)
  const fetchDashboardData = useSetAtom(fetchDashboardDataAtom)

  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");


  // Fetch dashboard data on component mount
  // useEffect(() => {
  //   fetchDashboardData()
  // }, [fetchDashboardData])

  useEffect(() => {
    const token = tokenFromUrl || localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // redirect ke login
    } else if (tokenFromUrl && !localStorage.getItem("token")) {
      localStorage.setItem("token", tokenFromUrl); // simpan token dari URL
    } else {
      fetchDashboardData(); // baru fetch data kalau sudah login
    }
  }, [router, tokenFromUrl, fetchDashboardData]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Loading dashboard data...</p>
            </div>
          </div>
          <DashboardSkeleton />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your system.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => {
            const icons = [Users, Shield, Activity]
            return (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={icons[index]}
                change={stat.change}
                changeType={stat.changeType}
                description={stat.description}
              />
            )
          })}
        </div>

        {/* Charts and Activity - Lazy loaded */}
        <Suspense fallback={<DashboardSkeleton />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity activities={activities} />
          </div>
        </Suspense>


      </div>
    </AdminLayout>
  )
}