"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Download, Users, UserCheck, UserX } from "lucide-react";
import DownloadExcel from "@/app/components/DownloadExcel";
import { fetchAllUsers } from "@/app/lib/services/userService";

interface Role {
  id_role: string;
  nama_role: string;
}

interface ToolbarProps {
  onAddUser: () => void;
  onSearch: (query: string) => void;
  onFilterRole: (role: string) => void;
  onFilterStatus: (status: string) => void;
  onExport: () => void;
  onImport: () => void;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export function UserToolbar({
  onAddUser,
  onSearch,
  onFilterRole,
  onFilterStatus,
  totalUsers,
  activeUsers,
  inactiveUsers,
}: ToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  // Ambil semua role dari API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/role");
        const result = await res.json();
        if (result.ok && Array.isArray(result.data)) {
          setRoles(result.data);
        } else {
          setRoles([]);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleRoleFilter = (value: string) => {
    setRoleFilter(value);
    onFilterRole(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    onFilterStatus(value);
  };

  const handleExportExcel = async () => {
    try {
      setLoading(true);

      const allUsers = await fetchAllUsers(searchQuery);

      if (!allUsers.length) {
        alert("Tidak ada data user untuk diekspor");
        return;
      }

      // Format data, misal status
      const formattedData = allUsers.map((user) => ({
        ...user,
        status: user.is_aktif ? "Aktif" : "Nonaktif",
      }));

      // Kolom Excel
      const columns = [
        { header: "ID User", key: "id_user" },
        { header: "Nama", key: "nama" },
        { header: "Email", key: "email" },
        { header: "Role", key: "role" },
        { header: "Status", key: "status" },
        { header: "Tanggal Dibuat", key: "created_at" },
        { header: "Tanggal Update", key: "updated_at" },
      ];

      await DownloadExcel({
        data: formattedData,
        columns,
        title: "Data User",
        fileName: "user_report.xlsx",
      });
    } catch (err) {
      console.error("Gagal mengekspor user:", err);
      alert("Terjadi kesalahan saat mengekspor data user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* === Statistik Pengguna === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Users */}
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#F8EDFF] hover:to-[#EBD4FD] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-[#7A1FC7]">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-[#7A1FC7]">
                  {totalUsers}
                </p>
              </div>
              <Users className="h-8 w-8 text-[#AD49E1]" />
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#E9F9F1] hover:to-[#D4F4E3] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-green-700">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-green-600 group-hover:text-green-700">
                  {activeUsers}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Inactive Users */}
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#FFF2F2] hover:to-[#FFE3E3] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-red-700">
                  Inactive Users
                </p>
                <p className="text-2xl font-bold text-red-600 group-hover:text-red-700">
                  {inactiveUsers}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* === Toolbar === */}
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#AD49E1] focus:ring-[#AD49E1]"
                />
              </div>

              {/* === Filter Role === */}
              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-[180px] bg-white border-gray-200 text-gray-800 hover:border-[#AD49E1]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem
                    value="all"
                    className="text-gray-800 hover:bg-[#F5E8FF]"
                  >
                    All Roles
                  </SelectItem>
                  {roles.map((role) => (
                    <SelectItem
                      key={role.id_role}
                      value={role.nama_role}
                      className="text-gray-800 hover:bg-[#F5E8FF]"
                    >
                      {role.nama_role
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* === Filter Status === */}
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-800 hover:border-[#AD49E1]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {["all", "active", "inactive", "pending"].map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="text-gray-800 hover:bg-[#F5E8FF]"
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* === Actions === */}
            <div className="flex gap-2">
              <Button
                onClick={onAddUser}
                className="flex items-center gap-2 bg-[#AD49E1] text-white hover:bg-[#9B40D9] shadow-sm hover:shadow-md"
              >
                <Plus className="h-4 w-4" />
                Add User
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleExportExcel}
                  variant="outline"
                  className="flex items-center gap-2 bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
                  disabled={loading}
                >
                  <Download className="h-4 w-4" />
                  {loading ? "Exporting..." : "Export Excel"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
