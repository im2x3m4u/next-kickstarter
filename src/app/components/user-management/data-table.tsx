"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Calendar
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
  avatar?: string
}

interface DataTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
  onView: (user: User) => void
}

export function DataTable({ users, onEdit, onDelete, onView }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof User>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      inactive: "bg-red-100 text-red-800 hover:bg-red-100",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    }
    
    const labels = {
      active: "Active",
      inactive: "Inactive", 
      pending: "Pending"
    }

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      manager: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      employee: "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }

    return (
      <Badge className={variants[role as keyof typeof variants] || variants.employee}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric"
    })
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-gray-900 font-semibold">Avatar</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("name")}
            >
              Name
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("email")}
            >
              Email
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("role")}
            >
              Role
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("status")}
            >
              Status
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("lastLogin")}
            >
              Last Login
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("createdAt")}
            >
              Created
            </TableHead>
            <TableHead className="w-[50px] text-gray-900 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs text-gray-900 bg-gray-100">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
              <TableCell className="text-gray-700">{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-gray-700">
                {formatDate(user.lastLogin)}
              </TableCell>
              <TableCell className="text-gray-700">
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell className="text-gray-900">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                    <DropdownMenuLabel className="text-gray-900 bg-white">Actions</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => onView(user)} 
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <Eye className="mr-2 h-4 w-4 text-gray-900" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onEdit(user)} 
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <Edit className="mr-2 h-4 w-4 text-gray-900" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
