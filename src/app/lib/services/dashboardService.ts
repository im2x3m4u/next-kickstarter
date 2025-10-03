export interface RawUser {
  id_user: string;
  nama: string;
  is_aktif: number;
  userRoles?: Array<{ role?: { nama_role?: string } }>;
  updated_at?: string;
  [k: string]: any;
}

export interface RawRole {
  id_role: string;
  nama_role: string;
  is_aktif?: number;
  [k: string]: any;
}

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

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

export async function getDashboardData(): Promise<{
  stats: DashboardStats;
  activities: DashboardActivity[];
  rawUsers: RawUser[];
  rawRoles: RawRole[];
}> {
  const [usersResp, rolesResp] = await Promise.allSettled([
    fetchJson("/api/user"),
    fetchJson("/api/role"),
  ]);

  const usersData = usersResp.status === "fulfilled" ? usersResp.value : null;
  const rolesData = rolesResp.status === "fulfilled" ? rolesResp.value : null;

  const users: RawUser[] = Array.isArray(usersData)
    ? usersData
    : usersData?.users || usersData?.data || usersData?.value || [];

  const roles: RawRole[] = Array.isArray(rolesData)
    ? rolesData
    : rolesData?.data || rolesData?.value || [];

  // proses stats dan activities...
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_aktif === 1).length;
  const adminUsers = users.filter((u) =>
    (u.userRoles || []).some((ur) => ur.role?.nama_role === "admin")
  ).length;
  const userUsers = users.filter(
    (u) => !(u.userRoles || []).some((ur) => ur.role?.nama_role === "admin")
  ).length;

  const totalRoles = roles.length;

  const stats: DashboardStats = {
    totalUsers,
    activeUsers,
    totalRoles,
    adminUsers,
    userUsers,
  };

  const activities: DashboardActivity[] = users.slice(0, 6).map((u, idx) => ({
    id: u.id_user ?? String(idx),
    user: u.nama ?? "Unknown",
    action:
      idx === 0
        ? "Logged into dashboard"
        : idx === 1
        ? "Updated profile"
        : idx === 2
        ? "Created new account"
        : "Viewed dashboard",
    time: u.updated_at
      ? new Date(u.updated_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : new Date().toLocaleDateString("id-ID"),
  }));

  return { stats, activities, rawUsers: users, rawRoles: roles };
}
