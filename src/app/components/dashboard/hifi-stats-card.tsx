import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface HiFiStatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  description?: string
  gradient?: string
}

export function HiFiStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = "neutral",
  description,
  gradient = "from-blue-500 to-purple-600"
}: HiFiStatsCardProps) {
  const changeColor = {
    positive: "text-emerald-600 bg-emerald-50",
    negative: "text-red-600 bg-red-50", 
    neutral: "text-gray-600 bg-gray-50"
  }

  const changeIcon = {
    positive: TrendingUp,
    negative: TrendingDown,
    neutral: TrendingUp
  }

  const ChangeIcon = changeIcon[changeType]

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} shadow-lg`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        {change && (
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${changeColor[changeType]}`}>
            <ChangeIcon className="h-3 w-3" />
            {change}
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
