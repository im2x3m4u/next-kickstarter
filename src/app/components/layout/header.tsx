import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-8 w-[220px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right text-sm">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full border flex items-center justify-center">
            👤
          </div>
        </div>
      </div>
    </header>
  )
}
