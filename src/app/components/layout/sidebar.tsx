"use client"

import { useEffect, useState } from "react"
import { Home, Users, Shield, CalendarCheck } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Role Management", url: "/roles", icon: Shield },
  { title: "Activity Management", url: "/activities", icon: CalendarCheck },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem("user")
      if (!raw) return
      const user = JSON.parse(raw) as { nama?: string; username?: string }
      setDisplayName(user?.username || user?.username || null)
    } catch {
      // ignore parse errors
    }
  }, [])

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white" suppressHydrationWarning>{displayName ? `Halo, ${displayName}!` : "Halo, Pengguna!"}</h2>
      <p className="italic text-gray-300">Admin</p>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.url
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}