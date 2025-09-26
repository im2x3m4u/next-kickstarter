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
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Role } from "@/app/state/roleState"

interface RoleTableProps {
  roles: Role[]
  onEdit: (role: Role) => void
  onDelete: (roleId: string) => void
  onView: (role: Role) => void
}

export function RoleTable({ roles, onEdit, onDelete, onView }: RoleTableProps) {
  const [sortField, setSortField] = useState<keyof Role>("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof Role) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (isAktif: number) => {
    const variants = {
      1: "bg-green-100 text-green-800 hover:bg-green-100",
      0: "bg-red-100 text-red-800 hover:bg-red-100"
    }
    
    const labels = {
      1: "Active",
      0: "Inactive"
    }

    return (
      <Badge className={variants[isAktif as keyof typeof variants]}>
        {labels[isAktif as keyof typeof labels]}
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

  const formatRoleName = (namaRole: string) => {
    return namaRole.charAt(0).toUpperCase() + namaRole.slice(1)
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("nama_role")}
            >
              Role Name
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("is_aktif")}
            >
              Status
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("created_at")}
            >
              Created At
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
              onClick={() => handleSort("updated_at")}
            >
              Updated At
            </TableHead>
            <TableHead className="w-[50px] text-gray-900 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id_role} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {formatRoleName(role.nama_role)}
              </TableCell>
              <TableCell>
                {getStatusBadge(role.is_aktif)}
              </TableCell>
              <TableCell className="text-gray-700">
                {formatDate(role.created_at)}
              </TableCell>
              <TableCell className="text-gray-700">
                {formatDate(role.updated_at)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4 text-gray-900" />
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
                      onClick={() => onDelete(role.id_role)}
                      className="text-red-600 hover:bg-red-50 focus:bg-red-50"
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