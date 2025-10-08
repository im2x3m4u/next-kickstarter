"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useAtomValue, useSetAtom } from "jotai";
import { StatsCard } from "@/app/(dashboard)/_components/dashboard/stats-card";
import { DashboardSkeleton } from "@/app/components/loading-skeleton";
import { Users, Shield, Activity } from "lucide-react";
import {
  dashboardStatsAtom,
  dashboardActivitiesAtom,
  dashboardLoadingAtom,
  statsCardsAtom,
  fetchDashboardDataAtom,
} from "@/app/state/dashboardState";

const RecentActivity = dynamic(
  () =>
    import("@/app/(dashboard)/_components/dashboard/recent-activity").then((mod) => ({
      default: mod.RecentActivity,
    })),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    ),
  }
);

export default function DashboardContent() {
  const stats = useAtomValue(dashboardStatsAtom);
  const activities = useAtomValue(dashboardActivitiesAtom);
  const loading = useAtomValue(dashboardLoadingAtom);
  const statsCards = useAtomValue(statsCardsAtom);
  const fetchDashboardData = useSetAtom(fetchDashboardDataAtom);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back! Here's what's happening with your system.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((stat, idx) => {
          const icons = [Users, Shield, Activity];
          return (
            <StatsCard
              key={idx}
              title={stat.title}
              value={stat.value}
              icon={icons[idx]}
              change={stat.change}
              changeType={stat.changeType}
              description={stat.description}
            />
          );
        })}
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid grid-cols-1 gap-6">
          <RecentActivity activities={activities} />
        </div>
      </Suspense>
    </div>
  );
}
