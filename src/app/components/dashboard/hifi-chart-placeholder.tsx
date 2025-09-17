import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BarChart3, PieChart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HiFiChartPlaceholderProps {
  title: string
  type: "line" | "bar" | "pie"
  description?: string
  gradient?: string
}

export function HiFiChartPlaceholder({ title, type, description, gradient = "from-blue-500 to-purple-600" }: HiFiChartPlaceholderProps) {
  const getIcon = () => {
    switch (type) {
      case "line":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />
      case "bar":
        return <BarChart3 className="h-5 w-5 text-blue-500" />
      case "pie":
        return <PieChart className="h-5 w-5 text-purple-500" />
    }
  }

  const getChartPattern = () => {
    switch (type) {
      case "line":
        return (
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-8">
            {[40, 60, 45, 80, 55, 70, 65, 85, 75, 90, 80, 95].map((height, i) => (
              <div 
                key={i}
                className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-sm opacity-20"
                style={{ height: `${height}%`, width: '8px' }}
              />
            ))}
          </div>
        )
      case "bar":
        return (
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-8">
            {[60, 80, 45, 70, 55, 90, 65, 75, 85, 60, 70, 80].map((height, i) => (
              <div 
                key={i}
                className="bg-gradient-to-t from-emerald-500 to-teal-600 rounded-t-sm opacity-20"
                style={{ height: `${height}%`, width: '12px' }}
              />
            ))}
          </div>
        )
      case "pie":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 opacity-20"></div>
          </div>
        )
    }
  }

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} shadow-lg`}>
            {getIcon()}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
          {getChartPattern()}
          <div className="relative z-10 text-center">
            <div className="text-gray-400 mb-3">
              {getIcon()}
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Interactive Chart</p>
            <p className="text-xs text-gray-400">
              {description || `${type.charAt(0).toUpperCase() + type.slice(1)} chart with real-time data`}
            </p>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="text-xs">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
