import AdminLayout from "@/app/components/layout/layout"
import { HiFiStatsCard } from "@/app/components/dashboard/hifi-stats-card"
import { HiFiRecentActivity } from "@/app/components/dashboard/hifi-recent-activity"
import { HiFiChartPlaceholder } from "@/app/components/dashboard/hifi-chart-placeholder"
import { Users, UserCheck, Shield, Activity, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data
const statsData = [
  {
    title: "Total Users",
    value: "2,543",
    icon: Users,
    change: "+12% from last month",
    changeType: "positive" as const,
    description: "Active users in the system",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Active Sessions",
    value: "1,234",
    icon: UserCheck,
    change: "+8% from last week",
    changeType: "positive" as const,
    description: "Currently online users",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Admin Roles",
    value: "15",
    icon: Shield,
    change: "No change",
    changeType: "neutral" as const,
    description: "Total admin roles configured",
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "System Health",
    value: "99.9%",
    icon: Activity,
    change: "+0.1% uptime",
    changeType: "positive" as const,
    description: "System availability",
    gradient: "from-green-500 to-emerald-600"
  }
]

const recentActivities = [
  {
    id: "1",
    user: "John Doe",
    action: "Created new user account",
    time: "2 minutes ago",
    type: "create" as const
  },
  {
    id: "2", 
    user: "Jane Smith",
    action: "Updated role permissions",
    time: "15 minutes ago",
    type: "update" as const
  },
  {
    id: "3",
    user: "Mike Johnson", 
    action: "Logged into dashboard",
    time: "1 hour ago",
    type: "login" as const
  },
  {
    id: "4",
    user: "Sarah Wilson",
    action: "Deleted inactive user",
    time: "2 hours ago",
    type: "delete" as const
  },
  {
    id: "5",
    user: "Alex Brown",
    action: "Created new admin role",
    time: "3 hours ago",
    type: "create" as const
  }
]

export default function HiFiDashboardPage() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="space-y-8 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Welcome back! Here's what's happening with your system.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last 30 days
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <HiFiStatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
                changeType={stat.changeType}
                description={stat.description}
                gradient={stat.gradient}
              />
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HiFiChartPlaceholder
              title="User Growth Trend"
              type="line"
              description="Monthly user registration trends over the past 12 months"
              gradient="from-blue-500 to-purple-600"
            />
            <HiFiRecentActivity activities={recentActivities} />
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HiFiChartPlaceholder
              title="Role Distribution"
              type="pie"
              description="Breakdown of users by role type"
              gradient="from-purple-500 to-pink-600"
            />
            <HiFiChartPlaceholder
              title="Activity Overview"
              type="bar"
              description="Daily activity metrics for the past 30 days"
              gradient="from-emerald-500 to-teal-600"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Add User</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <Shield className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">Create Role</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2 hover:bg-green-50 hover:border-green-200 transition-colors">
                <Activity className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">View Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2 hover:bg-orange-50 hover:border-orange-200 transition-colors">
                <Download className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">Export Data</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
