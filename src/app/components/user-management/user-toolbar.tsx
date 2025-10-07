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
        {/* Total Users Card */}
        <Card className="group hover:shadow-md transition-shadow bg-white hover:bg-[#C68FE6]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-800 transition-colors">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                  {totalUsers}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500 group-hover:text-blue-800 transition-colors" />
            </div>
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card className="group hover:shadow-md transition-shadow bg-white hover:bg-[#C68FE6]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors">
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

        {/* Inactive Users Card */}
        <Card className="group hover:shadow-md transition-shadow bg-white hover:bg-[#C68FE6]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-red-700 transition-colors">
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
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 text-gray-500"
                />
              </div>

              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-900">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem
                    value="all"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    All Roles
                  </SelectItem>
                  <SelectItem
                    value="admin"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    Admin
                  </SelectItem>
                  <SelectItem
                    value="user"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    User
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-900">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem
                    value="all"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    All Status
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="inactive"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    Inactive
                  </SelectItem>
                  <SelectItem
                    value="pending"
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    Pending
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2 ">
              <Button
                onClick={onAddUser}
                variant="outline"
                className="flex items-center gap-2 bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add User
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    More
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
                    onClick={onExport}
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <Download className="mr-2 h-4 w-4 text-gray-900" />
                    Export Users
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onImport}
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <Upload className="mr-2 h-4 w-4 text-gray-900" />
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
