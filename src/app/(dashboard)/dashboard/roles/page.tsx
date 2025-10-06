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
  loadingAtom,
  errorAtom,
  isFormOpenAtom,
  formModeAtom,
  selectedRoleAtom,
  deleteDialogOpenAtom,
  roleToDeleteAtom,
  searchQueryAtom,
  statusFilterAtom,
  pageAtom,
  pageSizeAtom,
  totalAtom,
  statsAtom,
  fetchRolesAtom,
  Role,
} from "@/app/state/roleState";

import { LazyRoleTable, LazyRoleForm } from "@/app/utils/lazyComponents";

export default function RoleManagementPage() {
  const [roles] = useAtom(rolesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isFormOpen, setIsFormOpen] = useAtom(isFormOpenAtom);
  const [formMode, setFormMode] = useAtom(formModeAtom);
  const [selectedRole, setSelectedRole] = useAtom(selectedRoleAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useAtom(deleteDialogOpenAtom);
  const [roleToDelete, setRoleToDelete] = useAtom(roleToDeleteAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [total] = useAtom(totalAtom);
  const [stats] = useAtom(statsAtom);
  const [, fetchRoles] = useAtom(fetchRolesAtom); // async atom

  // Load roles whenever query changes
  useEffect(() => {
    fetchRoles();
  }, [searchQuery, statusFilter, page, pageSize]);

  // Search and filter handlers
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage(1); // reset page
  };

  const handleFilterStatus = (s: "all" | "active" | "inactive") => {
    setStatusFilter(s);
    setPage(1); // reset page
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
      const { deleteRoleService } = await import(
        "@/app/lib/services/roleService"
      );
      await deleteRoleService(roleToDelete);
      fetchRoles();
    } catch (err: any) {
      setError(err.message || "Failed to delete role");
    } finally {
      setRoleToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(total / pageSize);

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
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5" /> Roles ({roles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading roles...</p>
            </div>
          ) : roles.length > 0 ? (
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
              }
            >
              <LazyRoleTable
                roles={roles}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
                onView={handleViewRole}
              />
            </Suspense>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 text-center">No roles found</div>
            </div>
          )}

          {/* Pagination */}
          {total > pageSize && (
            <div className="flex items-center justify-between mt-4">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  variant="outline"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
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
          onSubmit={async (roleData: Partial<Role>) => {
            const { createRoleService, updateRoleService } = await import(
              "@/app/lib/services/roleService"
            );
            try {
              if (formMode === "create") await createRoleService(roleData);
              else if (formMode === "edit" && selectedRole)
                await updateRoleService(selectedRole.id_role, roleData);
              fetchRoles();
              setIsFormOpen(false);
            } catch (err: any) {
              setError(err.message || "Failed to save role");
            }
          }}
          mode={formMode}
        />
      </Suspense>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 hover:text-red-700 " /> <p className="text-black"> Hapus Role</p> 
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              Apakah kamu yakin ingin menghapus role?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
