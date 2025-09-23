import { atom } from 'jotai'

// Dashboard data interfaces
export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRoles: number
  adminUsers: number
  userUsers: number
}

export interface DashboardActivity {
  id: string
  user: string
  action: string
  time: string
}

// Dashboard state atoms
export const dashboardStatsAtom = atom<DashboardStats>({
  totalUsers: 0,
  activeUsers: 0,
  totalRoles: 0,
  adminUsers: 0,
  userUsers: 0
})

export const dashboardActivitiesAtom = atom<DashboardActivity[]>([])

export const dashboardLoadingAtom = atom<boolean>(true)

export const dashboardErrorAtom = atom<string | null>(null)

// Derived atoms for stats cards
export const statsCardsAtom = atom((get) => {
  const stats = get(dashboardStatsAtom)
  
  return [
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      change: `${stats.activeUsers} active`,
      changeType: "positive" as const,
      description: "Total registered users"
    },
    {
      title: "Total Roles",
      value: stats.totalRoles.toString(),
      change: "Role management",
      changeType: "neutral" as const,
      description: "Available role types"
    }
  ]
})

// Action atoms for API calls
export const fetchDashboardDataAtom = atom(
  null,
  async (get, set) => {
    try {
      set(dashboardLoadingAtom, true)
      set(dashboardErrorAtom, null)
      
      // Fetch users data
      const usersResponse = await fetch('/api/user')
      const usersData = await usersResponse.json()
      
      // Fetch roles data
      const rolesResponse = await fetch('/api/role')
      const rolesData = await rolesResponse.json()
      
      // Process users data
      const users = usersData.users || []
      const totalUsers = users.length
      const activeUsers = users.filter((user: any) => user.is_aktif === 1).length
      const adminUsers = users.filter((user: any) => {
        if (!user.userRoles || user.userRoles.length === 0) return false
        return user.userRoles.some((ur: any) => ur.role?.nama_role === "admin")
      }).length
      const userUsers = users.filter((user: any) => {
        if (!user.userRoles || user.userRoles.length === 0) return true
        return !user.userRoles.some((ur: any) => ur.role?.nama_role === "admin")
      }).length
      
      // Process roles data
      const roles = Array.isArray(rolesData) ? rolesData : rolesData.data || rolesData.value || []
      const totalRoles = roles.length
      
      set(dashboardStatsAtom, {
        totalUsers,
        activeUsers,
        totalRoles,
        adminUsers,
        userUsers
      })
      
      // Generate recent activities from users data
      const recentActivities: DashboardActivity[] = users.slice(0, 4).map((user: any, index: number) => ({
        id: user.id_user,
        user: user.nama,
        action: index === 0 ? "Logged into dashboard" : 
                index === 1 ? "Updated profile" : 
                index === 2 ? "Created new account" : "Viewed dashboard",
        time: new Date(user.updated_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      }))
      
      set(dashboardActivitiesAtom, recentActivities)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      set(dashboardErrorAtom, 'Failed to load dashboard data')
    } finally {
      set(dashboardLoadingAtom, false)
    }
  }
)

