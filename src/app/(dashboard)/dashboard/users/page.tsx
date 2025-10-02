"use client";

import { useEffect, Suspense } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toolbar } from "@/app/components/user-management/role-toolbar";
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
  fetchUsersAtom,
} from "@/app/state/userState";
import { LazyUserForm, LazyUserTable } from "@/app/utils/lazyComponents";
import { fetchUsersService } from "@/app/lib/services/userService";

export default function UserManagementPage() {
  const [users, setUsers] = useAtom(usersAtom);
  const [filteredUsers, setFilteredUsers] = useAtom(filteredUsersAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [isFormOpen, setIsFormOpen] = useAtom(isFormOpenAtom);
  const [formMode, setFormMode] = useAtom(formModeAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useAtom(deleteDialogOpenAtom);
  const [userToDelete, setUserToDelete] = useAtom(userToDeleteAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [roleFilter, setRoleFilter] = useAtom(roleFilterAtom);
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);

  // stats otomatis dihitung dari usersAtom
  const [stats] = useAtom(statsAtom);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsersService(); // ambil data dari service
      setUsers(data.data); // set ke usersAtom
      setFilteredUsers(data.data); // agar filtered juga ter-update
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);
  // Filter and search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(query, roleFilter, statusFilter);
  };

  const handleFilterRole = (role: string) => {
    setRoleFilter(role);
    filterUsers(searchQuery, role, statusFilter);
  };

  const handleFilterStatus = (status: string) => {
    setStatusFilter(status);
    filterUsers(searchQuery, roleFilter, status);
  };

  const handleAddRole = () => {
    setSelectedRole(undefined);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const filterUsers = (
    searchQuery: string,
    roleFilter: string,
    statusFilter: string
  ) => {
    let filtered = users;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.no_telepon.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
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

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (statusFilter === "active") return user.is_aktif === 1;
        if (statusFilter === "inactive") return user.is_aktif === 0;
        return true;
      });
    }

    setFilteredUsers(filtered);
  };

  // CRUD operations
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
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (result.ok) {
          loadUsers();
        }
      } else if (formMode === "edit" && selectedUser) {
        const response = await fetch(`/api/user/${selectedUser.id_user}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (result.ok) {
          loadUsers();
        }
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleExport = () => {
    console.log("Exporting users...");
  };

  const handleImport = () => {
    console.log("Importing users...");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
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

      {/* Toolbar and Stats */}
      <Toolbar
        onAddUser={handleAddUser}
        onSearch={handleSearch}
        onFilterRole={handleFilterRole}
        onFilterStatus={handleFilterStatus}
        onExport={handleExport}
        onImport={handleImport}
        totalUsers={stats.total}
        activeUsers={stats.active}
        inactiveUsers={stats.inactive}
      />

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="h-5 w-5" />
            Users ({filteredUsers?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading users...</p>
            </div>
          ) : (filteredUsers?.length ?? 0) > 0 ? (
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
              }
            >
              <LazyUserTable
                users={filteredUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onView={handleViewUser}
              />
            </Suspense>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </h3>
              <Button onClick={handleAddRole}>
                <Plus className="h-4 w-4" /> Add First Role
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Form Modal */}
      <Suspense
        fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}
      >
        <LazyUserForm
          user={selectedUser}
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
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone. The user will be permanently removed from the system.
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
