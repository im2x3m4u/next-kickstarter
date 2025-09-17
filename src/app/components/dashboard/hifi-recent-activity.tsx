import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, UserPlus, Shield, Trash2, LogIn } from "lucide-react"

interface Activity {
  id: string
  user: string
  action: string
  time: string
  avatar?: string
  type: "create" | "update" | "delete" | "login"
}

interface HiFiRecentActivityProps {
  activities: Activity[]
}

const getActionIcon = (type: string) => {
  switch (type) {
    case "create":
      return <UserPlus className="h-3 w-3" />
    case "update":
      return <Shield className="h-3 w-3" />
    case "delete":
      return <Trash2 className="h-3 w-3" />
    case "login":
      return <LogIn className="h-3 w-3" />
    default:
      return <Clock className="h-3 w-3" />
  }
}

const getActionColor = (type: string) => {
  switch (type) {
    case "create":
      return "bg-emerald-100 text-emerald-700 border-emerald-200"
    case "update":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "delete":
      return "bg-red-100 text-red-700 border-red-200"
    case "login":
      return "bg-purple-100 text-purple-700 border-purple-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function HiFiRecentActivity({ activities }: HiFiRecentActivityProps) {
  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <div className="p-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
            <Clock className="h-4 w-4 text-white" />
          </div>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <Avatar className="h-10 w-10 ring-2 ring-gray-100 group-hover:ring-gray-200 transition-all">
                <AvatarFallback className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none text-gray-900">
                    {activity.user}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0.5 ${getActionColor(activity.type)}`}
                  >
                    {getActionIcon(activity.type)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {activity.action}
                </p>
              </div>
              <div className="text-xs text-gray-400 font-medium">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
