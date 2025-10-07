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

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onView: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete, onView }: UserTableProps) {
  // --- FUNGSI INI TELAH DIPERBAIKI ---
  const getRoleBadge = (
    userRoles?: Array<{ role?: { nama_role: string } }>
  ) => {
    // 1. Ambil nama role dari data, default ke 'user' jika tidak ada.
    const roleName = userRoles?.[0]?.role?.nama_role?.toLowerCase() || 'user';
    
    // 2. Buat nama yang akan ditampilkan dengan huruf kapital di awal.
    const displayName = roleName.charAt(0).toUpperCase() + roleName.slice(1);

    // 3. Definisikan warna untuk setiap role.
    const variants: { [key: string]: string } = {
      admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      user: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      guest: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      // Tambahkan role lain di sini jika perlu warna berbeda
    };

    return (
      // 4. Gunakan `displayName` untuk teks dan `variants` untuk warna.
      <Badge className={variants[roleName] || variants.user}>
        {displayName}
      </Badge>
    );
  };

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

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("id-ID", options);
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 font-semibold">Name</TableHead>
            <TableHead className="text-gray-900 font-semibold">Username</TableHead>
            <TableHead className="text-gray-900 font-semibold">Email</TableHead>
            <TableHead className="text-gray-900 font-semibold">Role</TableHead>
            <TableHead className="text-gray-900 font-semibold">Status</TableHead>
            <TableHead className="text-gray-900 font-semibold">Created</TableHead>
            <TableHead className="w-[50px] text-gray-900 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id_user} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">{user.nama}</TableCell>
              <TableCell className="text-gray-700">{user.username}</TableCell>
              <TableCell className="text-gray-700">{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.userRoles)}</TableCell>
              <TableCell>{getStatusBadge(user.is_aktif)}</TableCell>
              <TableCell className="text-gray-700">{formatDateTime(user.created_at)}</TableCell>
              <TableCell>
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
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
                    >
                      <Eye className="mr-2 h-4 w-4 text-gray-900" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(user)}
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4 text-gray-900" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(user.id_user)}
                      className="text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
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
