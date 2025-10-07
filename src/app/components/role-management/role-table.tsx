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
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const getStatusBadge = (isAktif: number) => {
    const variants = {
      1: "bg-green-100 text-green-800 hover:bg-green-100",
      0: "bg-red-100 text-red-800 hover:bg-red-100",
    };
    const labels = { 1: "Active", 0: "Inactive" };
    return (
      <Badge className={variants[isAktif as keyof typeof variants]}>
        {labels[isAktif as keyof typeof labels]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatRoleName = (namaRole: string) =>
    namaRole.charAt(0).toUpperCase() + namaRole.slice(1);

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-gray-900">Role Name</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
            <TableHead className="font-semibold text-gray-900">Created At</TableHead>
            <TableHead className="font-semibold text-gray-900">Updated At</TableHead>
            <TableHead className="w-[50px] font-semibold text-gray-900">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id_role} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {formatRoleName(role.nama_role)}
              </TableCell>
              <TableCell>{getStatusBadge(role.is_aktif)}</TableCell>
              <TableCell className="text-gray-700">{formatDate(role.created_at)}</TableCell>
              <TableCell className="text-gray-700">{formatDate(role.updated_at)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4 text-gray-900" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                    <DropdownMenuLabel className="text-gray-900">Actions</DropdownMenuLabel>

                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => onView(role)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-gray-900 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => onEdit(role)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-gray-900 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Role
                      </button>
                    </DropdownMenuItem>

                    {role.nama_role.toLowerCase() !== "admin" && (
                      <DropdownMenuItem asChild>
                        <button
                          onClick={() => onManagePermissions(role)}
                          className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-gray-900 hover:bg-gray-50"
                        >
                          <Shield className="h-4 w-4" />
                          Manage Permissions
                        </button>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => onDelete(role.id_role)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Role
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
