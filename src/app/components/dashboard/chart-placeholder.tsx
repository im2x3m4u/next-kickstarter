import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BarChart3, PieChart } from "lucide-react"

interface ChartPlaceholderProps {
  title: string
  type: "line" | "bar" | "pie"
  description?: string
}

export function ChartPlaceholder({ title, type, description }: ChartPlaceholderProps) {
  const getIcon = () => {
    switch (type) {
      case "line":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "bar":
        return <BarChart3 className="h-5 w-5 text-green-500" />
      case "pie":
        return <PieChart className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              {getIcon()}
            </div>
            <p className="text-sm text-gray-700 font-medium">Chart Placeholder</p>
            <p className="text-xs text-gray-600 mt-1">
              {description || `${type.charAt(0).toUpperCase() + type.slice(1)} chart will be displayed here`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
