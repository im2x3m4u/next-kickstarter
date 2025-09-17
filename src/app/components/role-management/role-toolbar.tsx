"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload,
  MoreHorizontal,
  Shield,
  Users,
  Settings
} from "lucide-react"

interface RoleToolbarProps {
  onAddRole: () => void
  onSearch: (query: string) => void
  onFilterType: (type: string) => void
  onExport: () => void
  onImport: () => void
  totalRoles: number
  defaultRoles: number
  customRoles: number
}

export function RoleToolbar({
  onAddRole,
  onSearch,
  onFilterType,
  onExport,
  onImport,
  totalRoles,
  defaultRoles,
  customRoles
}: RoleToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value)
    onFilterType(value)
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900">{totalRoles}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Default Roles</p>
                <p className="text-2xl font-bold text-green-600">{defaultRoles}</p>
              </div>
              <Settings className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Custom Roles</p>
                <p className="text-2xl font-bold text-purple-600">{customRoles}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card>
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
              
              <Select value={typeFilter} onValueChange={handleTypeFilter}>
                <SelectTrigger className="w-[140px] bg-white border-gray-200 text-gray-900">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="all" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">All Types</SelectItem>
                  <SelectItem value="default" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Default</SelectItem>
                  <SelectItem value="custom" className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={onAddRole} className="flex items-center gap-2 text-gray-900">
                <Plus className="h-4 w-4 text-gray-900" />
                Add Role
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MoreHorizontal className="h-4 w-4" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                  <DropdownMenuLabel className="text-gray-900 bg-white">Actions</DropdownMenuLabel>
                  <DropdownMenuItem 
                    onClick={onExport} 
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <Download className="mr-2 h-4 w-4 text-gray-900" />
                    Export Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onImport} 
                    className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <Upload className="mr-2 h-4 w-4 text-gray-900" />
                    Import Roles
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
