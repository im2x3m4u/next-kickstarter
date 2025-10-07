"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

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
  onExport,
  onImport,
  totalUsers,
  activeUsers,
  inactiveUsers,
}: ToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Users */}
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#F8EDFF] hover:to-[#EBD4FD] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-[#7A1FC7] transition-colors">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-[#7A1FC7] transition-colors">
                  {totalUsers}
                </p>
              </div>
              <Users className="h-8 w-8 text-[#AD49E1] group-hover:text-[#7A1FC7] transition-colors" />
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#E9F9F1] hover:to-[#D4F4E3] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-green-700 transition-colors">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
                  {activeUsers}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500 group-hover:text-green-700 transition-colors" />
            </div>
          </CardContent>
        </Card>

        {/* Inactive Users */}
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#FFF2F2] hover:to-[#FFE3E3] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-red-700 transition-colors">
                  Inactive Users
                </p>
                <p className="text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors">
                  {inactiveUsers}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-500 group-hover:text-red-700 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 text-gray-700 border-gray-200 focus:border-[#AD49E1] focus:ring-[#AD49E1]"
                />
              </div>

              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-800 hover:border-[#AD49E1] transition-colors">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {["all", "admin", "user"].map((r) => (
                    <SelectItem
                      key={r}
                      value={r}
                      className="text-gray-800 hover:bg-[#F5E8FF] focus:bg-[#F5E8FF] transition-colors"
                    >
                      {r === "all"
                        ? "All Roles"
                        : r.charAt(0).toUpperCase() + r.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-800 hover:border-[#AD49E1] transition-colors">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {["all", "active", "inactive", "pending"].map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="text-gray-800 hover:bg-[#F5E8FF] focus:bg-[#F5E8FF] transition-colors"
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={onAddUser}
                className="flex items-center gap-2 bg-[#AD49E1] text-white hover:bg-[#9B40D9] active:bg-[#7A1FC7] transition-all shadow-sm hover:shadow-md"
              >
                <Plus className="h-4 w-4" />
                Add User
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 bg-[#AD49E1] text-white hover:bg-[#9B40D9] active:bg-[#7A1FC7] transition-all shadow-sm hover:shadow-md">
                    <MoreHorizontal className="h-4 w-4" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border border-gray-200 shadow-lg rounded-lg"
                >
                  <DropdownMenuLabel className="text-gray-700 font-semibold">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={onExport}
                    className="text-gray-800 hover:bg-[#F5E8FF] transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4 text-[#AD49E1]" />
                    Export Users
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onImport}
                    className="text-gray-800 hover:bg-[#F5E8FF] transition-colors"
                  >
                    <Upload className="mr-2 h-4 w-4 text-[#AD49E1]" />
                    Import Users
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
