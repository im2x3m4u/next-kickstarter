import AdminLayout from "@/app/components/layout/layout"
import { StatsCard } from "@/app/components/dashboard/stats-card"
import { RecentActivity } from "@/app/components/dashboard/recent-activity"
import { ChartPlaceholder } from "@/app/components/dashboard/chart-placeholder"
import { Users, UserCheck, Shield, TrendingUp } from "lucide-react"

// Mock data
const statsData = [
  {
    title: "Total Users",
    value: "2,543",
    icon: Users,
    change: "+12% from last month",
    changeType: "positive" as const,
    description: "Active users in the system"
  },
  {
    title: "Active Sessions",
    value: "1,234",
    icon: UserCheck,
    change: "+8% from last week",
    changeType: "positive" as const,
    description: "Currently online users"
  },
  {
    title: "Admin Roles",
    value: "15",
    icon: Shield,
    change: "No change",
    changeType: "neutral" as const,
    description: "Total admin roles configured"
  }
]

const recentActivities = [
  {
    id: "1",
    user: "John Doe",
    action: "Created new user account",
    time: "2 minutes ago"
  },
  {
    id: "2", 
    user: "Jane Smith",
    action: "Updated role permissions",
    time: "15 minutes ago"
  },
  {
    id: "3",
    user: "Mike Johnson", 
    action: "Logged into dashboard",
    time: "1 hour ago"
  },
  {
    id: "4",
    user: "Sarah Wilson",
    action: "Deleted inactive user",
    time: "2 hours ago"
  }
]

export default function DashboardPage() {
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
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType}
              description={stat.description}
            />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPlaceholder
            title="User Growth Trend"
            type="line"
            description="Monthly user registration trends over the past 12 months"
          />
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPlaceholder
            title="Role Distribution"
            type="pie"
            description="Breakdown of users by role type"
          />
          <ChartPlaceholder
            title="Activity Overview"
            type="bar"
            description="Daily activity metrics for the past 30 days"
          />
        </div>
      </div>
    </AdminLayout>
  )
}
