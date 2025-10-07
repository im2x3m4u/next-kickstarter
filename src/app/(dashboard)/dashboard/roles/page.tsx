"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleToolbar } from "@/app/components/role-management/role-toolbar";
import { Shield, AlertCircle } from "lucide-react";
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
  const router = useRouter();

  // ---- state atoms ----
  const [roles] = useAtom(rolesAtom);
  const [loading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isFormOpen, setIsFormOpen] = useAtom(isFormOpenAtom);
  const [formMode, setFormMode] = useAtom(formModeAtom);
  const [selectedRole, setSelectedRole] = useAtom(selectedRoleAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useAtom(deleteDialogOpenAtom);
  const [roleToDelete, setRoleToDelete] = useAtom(roleToDeleteAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [pageSize] = useAtom(pageSizeAtom);
  const [total] = useAtom(totalAtom);
  const [stats] = useAtom(statsAtom);
  const [, fetchRoles] = useAtom(fetchRolesAtom);

  // ---- load data ----
  useEffect(() => {
    fetchRoles();
  }, [searchQuery, statusFilter, page, pageSize, fetchRoles]);

  // ---- handlers ----
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage(1);
  };

  const handleFilterStatus = (s: "all" | "active" | "inactive") => {
    setStatusFilter(s);
    setPage(1);
  };

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

  const handleManagePermissions = (role: Role) => {
    const url = `/dashboard/roles/${role.id_role}/permissions?name=${encodeURIComponent(
      role.nama_role
    )}`;
    console.log("Navigating to:", url);
    router.push(url);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    try {
      const { deleteRoleService } = await import(
        "@/app/lib/services/roleService"
      );
      await deleteRoleService(roleToDelete);
      await fetchRoles();
    } catch (err: any) {
      setError(err.message || "Gagal menghapus role");
    } finally {
      setRoleToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (roleData: Partial<Role>) => {
    const { createRoleService, updateRoleService } = await import(
      "@/app/lib/services/roleService"
    );
    try {
      if (formMode === "create") {
        await createRoleService(roleData);
      } else if (formMode === "edit" && selectedRole) {
        await updateRoleService(selectedRole.id_role, roleData);
      }
      await fetchRoles();
      setIsFormOpen(false);
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan role");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  // ---- render ----
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Shield className="h-8 w-8" /> Role Management
          </h1>
          <p className="mt-1 text-gray-600">
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

      {/* Table Section */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5" /> Roles ({roles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
              <p className="text-gray-500">Loading roles...</p>
            </div>
          ) : roles.length > 0 ? (
            <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-gray-200" />}>
              <LazyRoleTable
                roles={roles}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
                onView={handleViewRole}
                onManagePermissions={handleManagePermissions}
              />
            </Suspense>
          ) : (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No roles found
            </div>
          )}

          {/* Pagination */}
          {total > pageSize && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Page {page} of {totalPages} ({total} total roles)
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Modal */}
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-200" />}>
        <LazyRoleForm
          role={selectedRole}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          mode={formMode}
        />
      </Suspense>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Hapus Role
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              Apakah kamu yakin ingin menghapus role ini? Aksi ini tidak dapat
              dibatalkan.
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
