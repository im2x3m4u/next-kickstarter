"use client";

import { useEffect, Suspense, useCallback, useState } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { UserToolbar } from "@/app/(dashboard)/_components/user-management/user-toolbar";
import { Users, AlertCircle } from "lucide-react";
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
import type { User } from "@/app/state/userState";
import {
  usersAtom,
  loadingAtom,
  errorAtom,
  isFormOpenAtom,
  formModeAtom,
  selectedUserAtom,
  deleteDialogOpenAtom,
  userToDeleteAtom,
  searchQueryAtom,
  roleFilterAtom,
  statusFilterAtom,
  statsAtom,
  pageAtom,
  pageSizeAtom,
  sortByAtom,
  sortOrderAtom,
} from "@/app/state/userState";
import { LazyUserForm, LazyUserTable } from "@/app/utils/lazyComponents";
import { fetchUsersService } from "@/app/lib/services/userService";
import { toast } from "sonner";

export default function UserManagementPage() {
  const [users, setUsers] = useAtom(usersAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isFormOpen, setIsFormOpen] = useAtom(isFormOpenAtom);
  const [formMode, setFormMode] = useAtom(formModeAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useAtom(deleteDialogOpenAtom);
  const [userToDelete, setUserToDelete] = useAtom(userToDeleteAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [roleFilter, setRoleFilter] = useAtom(roleFilterAtom);
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [total, setTotal] = useState(0);

  // Stats dihitung di client dari data yang diterima, ini masih oke
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_aktif === 1).length;
  const inactiveUsers = totalUsers - activeUsers;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Load users from backend with all filters
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchUsersService(
        searchQuery,
        page,
        pageSize,
        sortBy,
        sortOrder,
        roleFilter,
        statusFilter
      );

      if (res.ok) {
        setUsers(res.data);
        setTotal(res.pagination.total);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
      toast.error("Gagal memuat data pengguna", { description: err.message });
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    page,
    pageSize,
    sortBy,
    sortOrder,
    roleFilter,
    statusFilter,
    setUsers,
    setError,
    setLoading,
  ]);

  // Re-fetch data whenever dependencies change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // 🔴 CLIENT-SIDE FILTERING DIHAPUS 🔴
  // useEffect untuk filtering di sisi client sudah tidak diperlukan lagi.
  // Backend sekarang yang bertanggung jawab penuh.

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
    setPage(1); // Reset to first page on sort
  };

  // Handlers for search and filter changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterRole = (role: string) => {
    setRoleFilter(role);
    setPage(1);
  };

  const handleFilterStatus = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  // CRUD handlers (tetap sama)
  const handleAddUser = () => {
    setSelectedUser(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setFormMode("view");
    setIsFormOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const response = await fetch(`/api/user/${userToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      toast.success("User berhasil dihapus.");
      loadUsers(); // Re-fetch data
    } catch (error: any) {
      toast.error("Gagal menghapus user.", { description: error.message });
    } finally {
      setUserToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (userData: Partial<User>) => {
    try {
      const url =
        formMode === "create"
          ? "/api/user"
          : `/api/user/${selectedUser?.id_user}`;
      const method = formMode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error(`Failed to ${formMode} user`);

      toast.success(
        `User berhasil di-${formMode === "create" ? "tambahkan" : "perbarui"}.`
      );
      loadUsers();
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(`Gagal menyimpan user.`, { description: error.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8" />
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <UserToolbar
        onAddUser={handleAddUser}
        onSearch={handleSearch}
        onFilterRole={handleFilterRole}
        onFilterStatus={handleFilterStatus}
        totalUsers={total}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        onExport={() => {}}
        onImport={() => {}}
      />

      {/* Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="h-5 w-5" />
            Users ({total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : users.length > 0 ? (
            <>
              <Suspense fallback={<div>Loading Table...</div>}>
                <LazyUserTable
                  users={users} // Gunakan `users` langsung, bukan `filteredUsers`
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onView={handleViewUser}
                />
              </Suspense>

              {/* Pagination */}
              {/* Pagination */}
              <div className="flex justify-center items-center mt-6">
                <Pagination>
                  <PaginationContent className="flex items-center space-x-1">
                    {/* Previous button */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={`cursor-pointer ${
                          page === 1
                            ? "pointer-events-none opacity-50 text-black"
                            : ""
                        }`}
                      />
                    </PaginationItem>

                    {/* Page numbers (with ellipsis logic) */}
                    {(() => {
                      const maxVisible = 5;
                      const startPage = Math.max(
                        1,
                        page - Math.floor(maxVisible / 2)
                      );
                      const endPage = Math.min(
                        totalPages,
                        startPage + maxVisible - 1
                      );
                      const pages = [];

                      if (startPage > 1) {
                        pages.push(
                          <PaginationItem key={1}>
                            <PaginationLink onClick={() => setPage(1)}>
                              1
                            </PaginationLink>
                          </PaginationItem>
                        );
                        if (startPage > 2) {
                          pages.push(
                            <span
                              key="start-ellipsis"
                              className="px-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setPage(i)}
                              isActive={page === i}
                              className={`${
                                page === i
                                  ? "bg-[#AD49E1] hover:bg-[#9328d0] hover:text-white transition-colors"
                                  : "hover:bg-gray-100 text-black"
                              }`}
                            >
                              {i}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span
                              key="end-ellipsis"
                              className="px-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }
                        pages.push(
                          <PaginationItem key={totalPages}>
                            <PaginationLink onClick={() => setPage(totalPages)}>
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      return pages;
                    })()}

                    {/* Next button */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        className={`cursor-pointer ${
                          page === totalPages
                            ? "pointer-events-none opacity-50 text-black"
                            : ""
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 text-center">
                No users found for the current filters.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Modal */}
      <Suspense fallback={<div>Loading Form...</div>}>
        <LazyUserForm
          user={selectedUser}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          mode={formMode}
        />
      </Suspense>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-black">Hapus User</p>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak
              dapat dibatalkan.
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
