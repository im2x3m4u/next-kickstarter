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
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Shield,
  UserX,
  Settings,
} from "lucide-react";


interface RoleToolbarProps {
  onAddRole: () => void;
  onSearch: (query: string) => void;
  onFilterStatus: (status: string) => void;
  onExport: () => void;
  onImport: () => void;
  totalRoles: number;
  activeRoles: number;
  inactiveRoles: number;
}

export function RoleToolbar({
  onAddRole,
  onSearch,
  onFilterStatus,
  onExport,
  onImport,
  totalRoles,
  activeRoles,
  inactiveRoles,
}: RoleToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    onFilterStatus(value);
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#F8EDFF] hover:to-[#EBD4FD] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-[#7A1FC7] transition-colors">
                  Total Roles
                </p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-[#7A1FC7] transition-colors">
                  {totalRoles}
                </p>
              </div>
              <Shield className="h-8 w-8 text-[#AD49E1] group-hover:text-[#7A1FC7] transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#E9F9F1] hover:to-[#D4F4E3] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-green-700 transition-colors">
                  Active Roles
                </p>
                <p className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
                  {activeRoles}
                </p>
              </div>
              <Settings className="h-8 w-8 text-green-500 group-hover:text-green-700 transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-[#FFF2F2] hover:to-[#FFE3E3] border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-red-700 transition-colors">
                  Inactive Roles
                </p>
                <p className="text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors">
                  {inactiveRoles}
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
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

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
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={onAddRole}
                variant="outline"
                className="flex items-center gap-2 bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
              >
                <Plus className="h-4 w-4 " />
                Add Role
              </Button>

              {/* Export Button */}
              <div className="flex items-center gap-2">
                <Button
                  // onClick={handleExportExcel}
                  variant="outline"
                  className="flex items-center gap-2 bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
                  // disabled={loading}
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