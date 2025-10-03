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

export const rawUsersAtom = atom<any[]>([]);

// Derived atoms for stats cards
export const statsCardsAtom = atom((get) => {
  const stats = get(dashboardStatsAtom);
  const dailyActivity = get(dailyUserActivityAtom);

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
    {
      title: "User Activity Today",
      value: dailyActivity[0]?.count.toString() || "0",
      change: `${dailyActivity[0]?.date || "-"}`,
      changeType: "neutral" as const,
      description: "Total user activities today",
    },
  ];
});

// Action atoms for API calls
export const fetchDashboardDataAtom = atom(null, async (get, set) => {
  try {
    set(dashboardLoadingAtom, true);
    set(dashboardErrorAtom, null);

    const { stats, activities, rawUsers  } = await getDashboardData();

    set(dashboardStatsAtom, stats);
    set(dashboardActivitiesAtom, activities);
    set(rawUsersAtom, rawUsers);
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    set(dashboardErrorAtom, "Failed to load dashboard data");
  } finally {
    set(dashboardLoadingAtom, false);
  }
});

// Derived atom untuk menghitung total aktivitas per hari
export const dailyUserActivityAtom = atom((get) => {
  const rawUsers = get(rawUsersAtom);
  if (!rawUsers || rawUsers.length === 0) return [];

  const activityMap: Record<string, number> = {};
  rawUsers.forEach((user) => {
    const date = user.updated_at
      ? new Date(user.updated_at).toLocaleDateString("id-ID")
      : new Date().toLocaleDateString("id-ID");
    activityMap[date] = (activityMap[date] || 0) + 1;
  });

  const result = Object.entries(activityMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return result;
});

