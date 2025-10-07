"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Eye, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Role } from "@/app/state/roleState";

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
  onView: (role: Role) => void;
  onManagePermissions: (role: Role) => void;
}

export function RoleTable({
  roles,
  onEdit,
  onDelete,
  onView,
  onManagePermissions,
}: RoleTableProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // 🔹 Fungsi sorting sederhana
  const handleSort = (field: keyof Role) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const sortedRoles = [...roles].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });

  // 🔹 Badge status aktif/tidak aktif
  const getStatusBadge = (isAktif: number) => {
    const variants = {
      1: "bg-green-100 text-green-800 hover:bg-green-100",
      0: "bg-red-100 text-red-800 hover:bg-red-100",
    };
    const labels = { 1: "Aktif", 0: "Nonaktif" };
    return (
      <Badge className={variants[isAktif as keyof typeof variants]}>
        {labels[isAktif as keyof typeof labels]}
      </Badge>
    );
  };

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString("id-ID", options);
  };

  const formatRoleName = (namaRole: string) =>
    namaRole.charAt(0).toUpperCase() + namaRole.slice(1);

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="text-gray-900 font-semibold cursor-pointer"
              onClick={() => handleSort("nama_role")}
            >
              Role Name
            </TableHead>
            <TableHead
              className="text-gray-900 font-semibold cursor-pointer"
              onClick={() => handleSort("is_aktif")}
            >
              Status
            </TableHead>
            <TableHead
              className="text-gray-900 font-semibold cursor-pointer"
              onClick={() => handleSort("created_at")}
            >
              Created At
            </TableHead>
            <TableHead
              className="text-gray-900 font-semibold cursor-pointer"
              onClick={() => handleSort("updated_at")}
            >
              Updated At
            </TableHead>
            <TableHead className="w-[50px] text-gray-900 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedRoles.map((role) => (
            <TableRow key={role.id_role} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {formatRoleName(role.nama_role)}
              </TableCell>
              <TableCell>{getStatusBadge(role.is_aktif)}</TableCell>
              <TableCell className="text-gray-700">
                {formatDateTime(role.created_at)}
              </TableCell>
              <TableCell className="text-gray-700">
                {formatDateTime(role.updated_at)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4 text-gray-900" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="bg-white border border-gray-200 shadow-lg"
                  >
                    <DropdownMenuLabel className="text-gray-900">
                      Aksi
                    </DropdownMenuLabel>

                    {/* View */}
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => onView(role)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-gray-900 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4" />
                        Lihat Detail
                      </button>
                    </DropdownMenuItem>

                    {/* Edit */}
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => onEdit(role)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-gray-900 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Role
                      </button>
                    </DropdownMenuItem>

                    {/* Manage Permission */}
                    {role.nama_role.toLowerCase() !== "admin" && (
                      <DropdownMenuItem asChild>
                        <button
                          onClick={() => onManagePermissions(role)}
                          className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-gray-900 hover:bg-gray-50"
                        >
                          <Shield className="h-4 w-4" />
                          Kelola Permission
                        </button>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    {/* Delete */}
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => onDelete(role.id_role)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus Role
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
