"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Home, Users, Shield } from "lucide-react"
import Link from "next/link"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Role Management", url: "/roles", icon: Shield },
]

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarGroupLabel className="p-4 text-lg font-semibold">
          Halo, admin!
        </SidebarGroupLabel>
        <SidebarContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 px-2 py-2"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
