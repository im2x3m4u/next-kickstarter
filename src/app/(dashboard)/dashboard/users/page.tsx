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
import { UserToolbar } from "@/app/components/user-management/user-toolbar";
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
  filteredUsersAtom,
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

export default function UserManagementPage() {
  const [users, setUsers] = useAtom(usersAtom);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredUsersAtom);
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

  const [stats] = useAtom(statsAtom);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Load users with pagination
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchUsersService(
        searchQuery,
        page,
        pageSize,
        sortBy,
        sortOrder
      );

      // Expected: { data: User[], total: number }
      const data = res?.data ?? [];
      const totalCount = res?.total ?? data.length;

      setUsers(data);
      setFilteredUsers(data);
      setTotal(totalCount);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    page,
    pageSize,
    sortBy,
    sortOrder,
    setUsers,
    setFilteredUsers,
    setError,
    setLoading,
  ]);

  // Load whenever dependencies change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Client-side filters
  useEffect(() => {
    let filtered = users;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.no_telepon.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (roleFilter === "admin") {
          return user.userRoles?.some((ur) => ur.role?.nama_role === "admin");
        } else if (roleFilter === "user") {
          return (
            !user.userRoles ||
            user.userRoles.length === 0 ||
            !user.userRoles[0]?.role?.nama_role
          );
        }
        return true;
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (statusFilter === "active") return user.is_aktif === 1;
        if (statusFilter === "inactive") return user.is_aktif === 0;
        return true;
      });
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter, statusFilter, setFilteredUsers]);

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  // CRUD handlers
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
      const result = await response.json();
      if (result.ok) loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setUserToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (userData: Partial<User>) => {
    try {
      const roleId = userData.role === "admin" ? 1 : 2;
      const payload = { ...userData, id_role: [roleId] };

      if (formMode === "create") {
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (formMode === "edit" && selectedUser) {
        await fetch(`/api/user/${selectedUser.id_user}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      loadUsers();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
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
        onSearch={(q) => setSearchQuery(q)}
        onFilterRole={(role) => setRoleFilter(role)}
        onFilterStatus={(status) => setStatusFilter(status)}
        totalUsers={stats.total}
        activeUsers={stats.active}
        inactiveUsers={stats.inactive}
      />

      {/* Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="h-5 w-5" />
            Users ({filteredUsers?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (filteredUsers?.length ?? 0) > 0 ? (
            <>
              <Suspense fallback={<div>Loading Table...</div>}>
                <LazyUserTable
                  users={filteredUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onView={handleViewUser}
                  onSort={handleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </Suspense>

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
              <div className="text-gray-500 text-center">No users found</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form */}
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
              <AlertCircle className="h-5 w-5 text-red-500 hover:text-red-7000" />{" "}
              <p className="text-black">Hapus User</p>
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
