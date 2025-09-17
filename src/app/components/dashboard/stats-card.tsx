import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  description?: string
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = "neutral",
  description 
}: StatsCardProps) {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600", 
    neutral: "text-gray-600"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <p className={`text-xs ${changeColor[changeType]} mt-1`}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
