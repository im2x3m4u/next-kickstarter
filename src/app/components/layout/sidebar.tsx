// layout/sidebar.tsx
"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, Shield, CalendarCheck } from "lucide-react"

interface AppSidebarProps {
  username?: string
}

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Role Management", url: "/roles", icon: Shield },
  { title: "Activity Management", url: "/activity", icon: CalendarCheck },
]

export default function AppSidebar({ username }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-64 min-h-screen text-white bg-gray-900">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white" suppressHydrationWarning>
          {username ? `Halo, ${username}!` : "Halo, Pengguna!"}
        </h2>
        <p className="italic text-gray-300">Admin</p>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.title}>
              <Link
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.url
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
