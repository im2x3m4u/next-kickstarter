"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoleTable } from "@/app/components/role-management/role-table"
import { RoleForm } from "@/app/components/role-management/role-form"
import { RoleToolbar } from "@/app/components/role-management/role-toolbar"
import { 
  Shield, 
  Plus, 
  Download, 
  Upload,
  AlertCircle
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
  isDefault: boolean
}

// Mock data
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    permissions: ["user.read", "user.create", "user.update", "user.delete", "role.read", "role.create", "role.update", "role.delete", "dashboard.read", "reports.read", "reports.create", "settings.read", "settings.update"],
    userCount: 3,
    createdAt: "2023-01-15",
    isDefault: true
  },
  {
    id: "2", 
    name: "Manager",
    description: "Management access with user and report permissions",
    permissions: ["user.read", "user.create", "user.update", "role.read", "dashboard.read", "reports.read", "reports.create"],
    userCount: 8,
    createdAt: "2023-02-20",
    isDefault: true
  },
  {
    id: "3",
    name: "Employee",
    description: "Basic access for regular employees",
    permissions: ["dashboard.read", "reports.read"],
    userCount: 45,
    createdAt: "2023-03-10",
    isDefault: true
  },
  {
    id: "4",
    name: "HR Specialist",
    description: "Human resources specialist with user management access",
    permissions: ["user.read", "user.create", "user.update", "dashboard.read", "reports.read"],
    userCount: 5,
    createdAt: "2023-06-05",
    isDefault: false
  },
  {
    id: "5",
    name: "Finance Manager",
    description: "Financial management with reporting access",
    permissions: ["dashboard.read", "reports.read", "reports.create", "settings.read"],
    userCount: 2,
    createdAt: "2023-08-15",
    isDefault: false
  }
]

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [filteredRoles, setFilteredRoles] = useState<Role[]>(mockRoles)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create")
  const [selectedRole, setSelectedRole] = useState<Role | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)

  // Filter and search logic
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredRoles(roles)
      return
    }
    
    const filtered = roles.filter(role =>
      role.name.toLowerCase().includes(query.toLowerCase()) ||
      role.description.toLowerCase().includes(query.toLowerCase()) ||
      role.permissions.some(permission => 
        permission.toLowerCase().includes(query.toLowerCase())
      )
    )
    setFilteredRoles(filtered)
  }

  const handleFilterType = (type: string) => {
    if (type === "all") {
      setFilteredRoles(roles)
      return
    }
    
    const filtered = roles.filter(role => {
      if (type === "default") return role.isDefault
      if (type === "custom") return !role.isDefault
      return true
    })
    setFilteredRoles(filtered)
  }

  // CRUD operations
  const handleAddRole = () => {
    setSelectedRole(undefined)
    setFormMode("create")
    setIsFormOpen(true)
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setFormMode("edit")
    setIsFormOpen(true)
  }

  const handleViewRole = (role: Role) => {
    setSelectedRole(role)
    setFormMode("view")
    setIsFormOpen(true)
  }

  const handleDeleteRole = (roleId: string) => {
    setRoleToDelete(roleId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (roleToDelete) {
      setRoles(prev => prev.filter(role => role.id !== roleToDelete))
      setFilteredRoles(prev => prev.filter(role => role.id !== roleToDelete))
      setRoleToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = (roleData: Partial<Role>) => {
    if (formMode === "create") {
      const newRole: Role = {
        id: Date.now().toString(),
        name: roleData.name || "",
        description: roleData.description || "",
        permissions: roleData.permissions || [],
        userCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isDefault: false
      }
      setRoles(prev => [...prev, newRole])
      setFilteredRoles(prev => [...prev, newRole])
    } else if (formMode === "edit" && selectedRole) {
      const updatedRole = { ...selectedRole, ...roleData }
      setRoles(prev => prev.map(role => role.id === selectedRole.id ? updatedRole : role))
      setFilteredRoles(prev => prev.map(role => role.id === selectedRole.id ? updatedRole : role))
    }
    setIsFormOpen(false)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting roles...")
  }

  const handleImport = () => {
    // Implement import functionality
    console.log("Importing roles...")
  }

  // Calculate stats
  const stats = useMemo(() => {
    const total = roles.length
    const defaultRoles = roles.filter(role => role.isDefault).length
    const customRoles = roles.filter(role => !role.isDefault).length
    return { total, defaultRoles, customRoles }
  }, [roles])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Role Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage user roles, permissions, and access controls
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleImport} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      {/* Toolbar and Stats */}
      <RoleToolbar
        onAddRole={handleAddRole}
        onSearch={handleSearch}
        onFilterType={handleFilterType}
        onExport={handleExport}
        onImport={handleImport}
        totalRoles={stats.total}
        defaultRoles={stats.defaultRoles}
        customRoles={stats.customRoles}
      />

      {/* Role Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5" />
            Roles ({filteredRoles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRoles.length > 0 ? (
            <RoleTable
              roles={filteredRoles}
              onEdit={handleEditRole}
              onDelete={handleDeleteRole}
              onView={handleViewRole}
            />
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={handleAddRole} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add First Role
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Form Modal */}
      <RoleForm
        role={selectedRole}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Role
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
              Users assigned to this role will need to be reassigned to other roles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
