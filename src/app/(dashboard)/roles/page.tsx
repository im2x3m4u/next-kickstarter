"use client"

import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Role } from "@/app/state/roleState"

// Lazy load heavy components
const RoleTable = dynamic(() => import("@/app/components/role-management/role-table").then(mod => ({ default: mod.RoleTable })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
})

const RoleForm = dynamic(() => import("@/app/components/role-management/role-form").then(mod => ({ default: mod.RoleForm })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
})

export default function RoleManagementPage() {
  // State management with useState (simplified approach)
  const [roles, setRoles] = useState<Role[]>([])
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create")
  const [selectedRole, setSelectedRole] = useState<Role | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Calculate stats
  const stats = {
    total: roles.length,
    active: roles.filter(role => role.is_aktif === 1).length,
    inactive: roles.filter(role => role.is_aktif === 0).length
  }

  // Load roles from API
  const loadRoles = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/role')
      const data = await response.json()
      
      // Handle different response formats
      let rolesData = []
      if (Array.isArray(data)) {
        rolesData = data
      } else if (data && Array.isArray(data.data)) {
        rolesData = data.data
      } else if (data && Array.isArray(data.value)) {
        rolesData = data.value
      } else {
        setError('Failed to fetch roles')
        return
      }
      
      setRoles(rolesData)
      setFilteredRoles(rolesData)
    } catch (err) {
      setError('Error loading roles')
      console.error('Error fetching roles:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load roles on component mount
  useEffect(() => {
    loadRoles()
  }, [])

  // Filter and search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterRoles(query, statusFilter)
  }

  const handleFilterStatus = (status: string) => {
    setStatusFilter(status)
    filterRoles(searchQuery, status)
  }

  const filterRoles = (searchQuery: string, statusFilter: string) => {
    let filtered = roles
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(role =>
        role.nama_role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(role => {
        if (statusFilter === "active") return role.is_aktif === 1
        if (statusFilter === "inactive") return role.is_aktif === 0
        return true
      })
    }
    
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

  const confirmDelete = async () => {
    if (roleToDelete) {
      try {
        const response = await fetch(`/api/role/${roleToDelete}`, {
          method: 'DELETE'
        })
        const result = await response.json()
        if (result.ok) {
          loadRoles() // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting role:', error)
      }
      setRoleToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = async (roleData: Partial<Role>) => {
    try {
      if (formMode === "create") {
        const response = await fetch('/api/role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roleData)
        })
        const result = await response.json()
        if (result.ok) {
          loadRoles() // Refresh the list
        }
      } else if (formMode === "edit" && selectedRole) {
        const response = await fetch(`/api/role/${selectedRole.id_role}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roleData)
        })
        const result = await response.json()
        if (result.ok) {
          loadRoles() // Refresh the list
        }
      }
      setIsFormOpen(false)
    } catch (error) {
      console.error('Error saving role:', error)
    }
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting roles...")
  }

  const handleImport = () => {
    // Implement import functionality
    console.log("Importing roles...")
  }

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
        onFilterStatus={handleFilterStatus}
        onExport={handleExport}
        onImport={handleImport}
        totalRoles={stats.total}
        activeRoles={stats.active}
        inactiveRoles={stats.inactive}
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
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading roles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading roles</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={loadRoles} className="flex items-center gap-2">
                Try Again
              </Button>
            </div>
          ) : filteredRoles.length > 0 ? (
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
              <RoleTable
                roles={filteredRoles}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
                onView={handleViewRole}
              />
            </Suspense>
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
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}>
        <RoleForm
          role={selectedRole}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          mode={formMode}
        />
      </Suspense>

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