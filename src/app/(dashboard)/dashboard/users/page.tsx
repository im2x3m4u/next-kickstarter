"use client";

import { useEffect, Suspense, useCallback } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserToolbar } from "@/app/components/user-management/user-toolbar";
import { Users, Plus, AlertCircle } from "lucide-react";
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

  // stats otomatis dihitung dari usersAtom
  const [stats] = useAtom(statsAtom);

  // load data dari server dengan pagination & sorting
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsersService(
        searchQuery,
        page,
        pageSize,
        sortBy,
        sortOrder
      );
      setUsers(data.data);
      setFilteredUsers(data.data);
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

  // load tiap kali dependency berubah
  useEffect(() => {
    loadUsers();
  }, [
    page,
    pageSize,
    sortBy,
    sortOrder,
    searchQuery,
    roleFilter,
    statusFilter,
  ]);

  // Filter tambahan (di sisi client)
  const filterUsers = (
    searchQuery: string,
    roleFilter: string,
    statusFilter: string
  ) => {
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
  };

  // Trigger filter tiap kali state berubah
  useEffect(() => {
    filterUsers(searchQuery, roleFilter, statusFilter);
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  // CRUD
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
    if (userToDelete) {
      try {
        const response = await fetch(`/api/user/${userToDelete}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.ok) {
          loadUsers();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      setUserToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (userData: Partial<User>) => {
    try {
      if (formMode === "create") {
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      } else if (formMode === "edit" && selectedUser) {
        await fetch(`/api/user/${selectedUser.id_user}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
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
      <Card>
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
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <span>Page {page}</span>
                <Button onClick={() => setPage((p) => p + 1)}>Next</Button>

                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="ml-4 border rounded p-1"
                >
                  <option value={5}>5 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                </select>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
