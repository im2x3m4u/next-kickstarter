"use client";

import { useMemo, useState } from "react";
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
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/app/state/userState";

interface RoleUserProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onView: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete, onView }: RoleUserProps) {
  const [sortField, setSortField] = useState<keyof User>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (isAktif: number) => {
    const variants = {
      1: "bg-green-100 text-green-800 hover:bg-green-100",
      0: "bg-red-100 text-red-800 hover:bg-red-100",
    };

    const labels = {
      1: "Active",
      0: "Inactive",
    };

    return (
      <Badge className={variants[isAktif as keyof typeof variants]}>
        {labels[isAktif as keyof typeof labels]}
      </Badge>
    );
  };

  const getRoleBadge = (
    userRoles?: Array<{ role?: { nama_role: string } }>
  ) => {
    // Check if user has roles and if the first role exists
    if (
      !userRoles ||
      userRoles.length === 0 ||
      !userRoles[0]?.role?.nama_role
    ) {
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          User
        </Badge>
      );
    }

    const roleName = userRoles[0].role.nama_role.toLowerCase();
    const variants = {
      admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      manager: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      employee: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      user: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };

    const displayName = roleName === "admin" ? "Admin" : "User";

    return (
      <Badge
        className={variants[roleName as keyof typeof variants] || variants.user}
      >
        {displayName}
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

  const sortedUsers = useMemo(() => {
    const list = Array.isArray(users) ? [...users] : [];
    return list.sort((a, b) => {
      const aVal = String(a[sortField] ?? "").toLowerCase();
      const bVal = String(b[sortField] ?? "").toLowerCase();
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortField, sortDirection]);

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="text-gray-900 font-semibold"
              onClick={() => handleSort("nama")}
            >
              Name
            </TableHead>
            <TableHead
              className="text-gray-900 font-semibold"
              onClick={() => handleSort("username")}
            >
              Username
            </TableHead>
            <TableHead
              className="text-gray-900 font-semibold"
              onClick={() => handleSort("email")}
            >
              Email
            </TableHead>
            <TableHead className="text-gray-900 font-semibold">Role</TableHead>
            <TableHead
              className=" text-gray-900 font-semibold"
              onClick={() => handleSort("is_aktif")}
            >
              Status
            </TableHead>
            <TableHead
              className="text-gray-900 font-semibold"
              onClick={() => handleSort("created_at")}
            >
              Created
            </TableHead>
            <TableHead className="w-[50px] text-gray-900 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id_user} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {user.nama}
              </TableCell>
              <TableCell className="text-gray-700">{user.username}</TableCell>
              <TableCell className="text-gray-700">{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.userRoles)}</TableCell>
              <TableCell>{getStatusBadge(user.is_aktif)}</TableCell>
              <TableCell className="text-gray-700">
                {formatDateTime(user.created_at)}
              </TableCell>
              <TableCell className="text-gray-900">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4 text-gray-900" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border border-gray-200 shadow-lg"
                  >
                    <DropdownMenuLabel className="text-gray-900 bg-white">
                      Actions
                    </DropdownMenuLabel>
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
                      onClick={() => onDelete(user.id_user)}
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
  );
}
