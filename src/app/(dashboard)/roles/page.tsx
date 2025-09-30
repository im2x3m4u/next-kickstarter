"use client";

import { useEffect, Suspense } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleToolbar } from "@/app/components/role-management/role-toolbar";
import { Shield, Plus, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  Role,
} from "@/app/state/roleState"; // tetap dari roleState.ts

import {
  fetchRolesService,
  createRoleService,
  updateRoleService,
  deleteRoleService,
} from "@/app/lib/services/roleService"; 


import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { LazyRoleTable, LazyRoleForm } from "@/app/utils/lazyComponents";

export default function RoleManagementPage() {
  useAuthGuard();
  const [roles, setRoles] = useAtom(rolesAtom);
  const [filteredRoles, setFilteredRoles] = useAtom(filteredRolesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isFormOpen, setIsFormOpen] = useAtom(isFormOpenAtom);
  const [formMode, setFormMode] = useAtom(formModeAtom);
  const [selectedRole, setSelectedRole] = useAtom(selectedRoleAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useAtom(deleteDialogOpenAtom);
  const [roleToDelete, setRoleToDelete] = useAtom(roleToDeleteAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);
  const [stats] = useAtom(statsAtom);

  // Load roles
  const loadRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRolesService();
      const rolesData = data.data || [];
      setRoles(rolesData);
      setFilteredRoles(rolesData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  // Filter + Search
  const filterRoles = (q: string, status: string) => {
    let filtered = roles;
    if (q.trim()) {
      filtered = filtered.filter((role) =>
        role.nama_role.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (status !== "all") {
      filtered = filtered.filter((role) =>
        status === "active" ? role.is_aktif === 1 : role.is_aktif === 0
      );
    }
    setFilteredRoles(filtered);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    filterRoles(q, statusFilter);
  };

  const handleFilterStatus = (s: string) => {
    setStatusFilter(s);
    filterRoles(searchQuery, s);
  };

  // CRUD
  const handleAddRole = () => {
    setSelectedRole(undefined);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setFormMode("view");
    setIsFormOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoleToDelete(roleId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    try {
      await deleteRoleService(roleToDelete);
      await loadRoles();
    } catch (err: any) {
      console.error("Error deleting role:", err);
      setError(err.message || "Failed to delete role");
    } finally {
      setRoleToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (roleData: Partial<Role>) => {
    try {
      if (formMode === "create") {
        await createRoleService(roleData);
      } else if (formMode === "edit" && selectedRole) {
        await updateRoleService(selectedRole.id_role, roleData);
      }
      await loadRoles();
      setIsFormOpen(false);
    } catch (err: any) {
      console.error("Error saving role:", err);
      setError(err.message || "Failed to save role");
    }
  };

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
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading roles...</p>
            </div>
          ) : filteredRoles.length > 0 ? (
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
              }
            >
              <LazyRoleTable
                roles={filteredRoles}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
                onView={handleViewRole}
              />
            </Suspense>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No roles found
              </h3>
              <Button onClick={handleAddRole}>
                <Plus className="h-4 w-4" /> Add First Role
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form */}
      <Suspense
        fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}
      >
        <LazyRoleForm
          role={selectedRole}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          mode={formMode}
        />
      </Suspense>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" /> Delete Role
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be
              undone.
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
  );
}
