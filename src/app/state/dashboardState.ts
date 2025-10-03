import { atom } from "jotai";
import { getDashboardData } from "../lib/services/dashboardService";

// Dashboard data interfaces
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRoles: number;
  adminUsers: number;
  userUsers: number;
}

export interface DashboardActivity {
  id: string;
  user: string;
  action: string;
  time: string;
}

// Dashboard state atoms
export const dashboardStatsAtom = atom<DashboardStats>({
  totalUsers: 0,
  activeUsers: 0,
  totalRoles: 0,
  adminUsers: 0,
  userUsers: 0,
});

export const dashboardActivitiesAtom = atom<DashboardActivity[]>([]);

export const dashboardLoadingAtom = atom<boolean>(true);

export const dashboardErrorAtom = atom<string | null>(null);

// Derived atoms for stats cards
export const statsCardsAtom = atom((get) => {
  const stats = get(dashboardStatsAtom);

  return [
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      change: `${stats.activeUsers} active`,
      changeType: "positive" as const,
      description: "Total registered users",
    },
    {
      title: "Total Roles",
      value: stats.totalRoles.toString(),
      change: "Role management",
      changeType: "neutral" as const,
      description: "Available role types",
    },
  ];
});

// Action atoms for API calls
export const fetchDashboardDataAtom = atom(null, async (get, set) => {
  try {
    set(dashboardLoadingAtom, true);
    set(dashboardErrorAtom, null);

    const { stats, activities } = await getDashboardData();

    set(dashboardStatsAtom, stats);
    set(dashboardActivitiesAtom, activities);
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    set(dashboardErrorAtom, "Failed to load dashboard data");
  } finally {
    set(dashboardLoadingAtom, false);
  }
});
