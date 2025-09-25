"use client"

import { useEffect, Suspense } from "react"
import { useAtom } from "jotai"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoleToolbar } from "@/app/components/role-management/role-toolbar"
import { Shield, Plus, Download, Upload, AlertCircle } from "lucide-react"
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

import {
  rolesAtom,
  filteredRolesAtom,
  loadingAtom,
  errorAtom,
  isFormOpenAtom,
  formModeAtom,
  selectedRoleAtom,
  deleteDialogOpenAtom,
  roleToDeleteAtom,
  searchQueryAtom,
  statusFilterAtom,
  statsAtom,
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
  Role,
} from "@/app/state/roleState"

// Lazy load heavy components
const RoleTable = dynamic(
  () => import("@/app/components/role-management/role-table").then((mod) => ({ default: mod.RoleTable })),
  { loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" /> }
)

const RoleForm = dynamic(
  () => import("@/app/components/role-management/role-form").then((mod) => ({ default: mod.RoleForm })),
  { loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" /> }
)

export default function RoleManagementPage() {
  // 🔹 Atoms
  const [roles, setRoles] = useAtom(rolesAtom)
  const [filteredRoles, setFilteredRoles] = useAtom(filteredRolesAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [error, setError] = useAtom(errorAtom)
  const [isFormOpen, setIsFormOpen] = useAtom(isFormOpenAtom)
  const [formMode, setFormMode] = useAtom(formModeAtom)
  const [selectedRole, setSelectedRole] = useAtom(selectedRoleAtom)
  const [deleteDialogOpen, setDeleteDialogOpen] = useAtom(deleteDialogOpenAtom)
  const [roleToDelete, setRoleToDelete] = useAtom(roleToDeleteAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom)
  const [stats] = useAtom(statsAtom)

  // 🔹 Load roles
  const loadRoles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchRoles()

      let rolesData: Role[] = []
      if (Array.isArray(data)) rolesData = data
      else if (data?.data) rolesData = data.data
      else if (data?.value) rolesData = data.value
      else setError("Failed to fetch roles")

      setRoles(rolesData)
      setFilteredRoles(rolesData)
    } catch (err) {
      setError("Error loading roles")
      console.error("Error fetching roles:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRoles()
  }, [])

  // 🔹 Filter + Search
  const filterRoles = (q: string, status: string) => {
    let filtered = roles

    if (q.trim()) {
      filtered = filtered.filter((role) =>
        role.nama_role.toLowerCase().includes(q.toLowerCase())
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((role) =>
        status === "active" ? role.is_aktif === 1 : role.is_aktif === 0
      )
    }

    setFilteredRoles(filtered)
  }

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    filterRoles(q, statusFilter)
  }

  const handleFilterStatus = (s: string) => {
    setStatusFilter(s)
    filterRoles(searchQuery, s)
  }

  // 🔹 CRUD
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
      await deleteRole(roleToDelete)
      loadRoles()
      setRoleToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = async (roleData: Partial<Role>) => {
    if (formMode === "create") {
      await createRole(roleData)
    } else if (formMode === "edit" && selectedRole) {
      await updateRole(selectedRole.id_role, roleData)
    }
    loadRoles()
    setIsFormOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8" /> Role Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage user roles, permissions, and access controls
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
          <Button variant="outline"><Upload className="h-4 w-4" /> Import</Button>
        </div>
      </div>

      {/* Toolbar */}
      <RoleToolbar
        onAddRole={handleAddRole}
        onSearch={handleSearch}
        onFilterStatus={handleFilterStatus}
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
        totalRoles={stats.total}
        activeRoles={stats.active}
        inactiveRoles={stats.inactive}
      />

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5" /> Roles ({filteredRoles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredRoles.length > 0 ? (
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
              <RoleTable roles={filteredRoles} onEdit={handleEditRole} onDelete={handleDeleteRole} onView={handleViewRole} />
            </Suspense>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p>No roles found</p>
              <Button onClick={handleAddRole}><Plus className="h-4 w-4" /> Add First Role</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}>
        <RoleForm role={selectedRole} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} mode={formMode} />
      </Suspense>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" /> Delete Role
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
