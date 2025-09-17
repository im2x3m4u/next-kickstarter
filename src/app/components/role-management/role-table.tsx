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
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Users
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
  isDefault: boolean
}

interface RoleTableProps {
  roles: Role[]
  onEdit: (role: Role) => void
  onDelete: (roleId: string) => void
  onView: (role: Role) => void
}

export function RoleTable({ roles, onEdit, onDelete, onView }: RoleTableProps) {
  const [sortField, setSortField] = useState<keyof Role>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof Role) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }


  const getRoleBadge = (role: Role) => {
    if (role.isDefault) {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Default
        </Badge>
      )
    }
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric"
    })
  }

  const formatPermissions = (permissions: string[]) => {
    if (permissions.length <= 3) {
      return permissions.join(", ")
    }
    return `${permissions.slice(0, 3).join(", ")} +${permissions.length - 3} more`
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("name")}
            >
              Role Name
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("description")}
            >
              Description
            </TableHead>
            <TableHead className="text-gray-900 font-semibold">Permissions</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("userCount")}
            >
              Users
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("createdAt")}
            >
              Created
            </TableHead>
            <TableHead className="text-gray-900 font-semibold">Status</TableHead>
            <TableHead className="w-[50px] text-gray-900 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">{role.name}</TableCell>
              <TableCell className="text-gray-700 max-w-xs truncate">
                {role.description}
              </TableCell>
              <TableCell className="text-gray-700 max-w-xs">
                <div className="truncate" title={role.permissions.join(", ")}>
                  {formatPermissions(role.permissions)}
                </div>
              </TableCell>
              <TableCell className="text-gray-700">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {role.userCount}
                </div>
              </TableCell>
              <TableCell className="text-gray-700">
                {formatDate(role.createdAt)}
              </TableCell>
              <TableCell>
                {getRoleBadge(role)}
              </TableCell>
              <TableCell>
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
                      onClick={() => onView(role)} 
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <Eye className="mr-2 h-4 w-4 text-gray-900" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onEdit(role)} 
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <Edit className="mr-2 h-4 w-4 text-gray-900" />
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(role.id)}
                      className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                      disabled={role.isDefault}
                    >
                      <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                      Delete Role
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
