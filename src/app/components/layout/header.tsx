import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, LogOut, User, Settings } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-8 w-[220px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-2">
              <div className="h-10 w-10 rounded-full border flex items-center justify-center">
                👤
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
            <DropdownMenuLabel className="text-gray-900 bg-white">My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-900" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}