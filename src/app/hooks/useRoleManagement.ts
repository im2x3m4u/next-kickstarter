"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
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
} from "@/app/state/roleState";

export function useRoleManagement() {
  // Atoms
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
  const [stats, setStats] = useAtom(statsAtom);

  // Load roles from API
  const loadRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRoles();

      let rolesData: Role[] = [];
      if (Array.isArray(data)) rolesData = data;
      else if (data?.data) rolesData = data.data;
      else if (data?.value) rolesData = data.value;
      else setError("Failed to fetch roles");

      setRoles(rolesData);
      setFilteredRoles(rolesData);
      setStats({
        total: rolesData.length,
        active: rolesData.filter((r) => r.is_aktif === 1).length,
        inactive: rolesData.filter((r) => r.is_aktif === 0).length,
      });
    } catch (err) {
      setError("Error loading roles");
      console.error("Error fetching roles:", err);
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
    if (roleToDelete) {
      await deleteRole(roleToDelete);
      loadRoles();
      setRoleToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (roleData: Partial<Role>) => {
    if (formMode === "create") {
      await createRole(roleData);
    } else if (formMode === "edit" && selectedRole) {
      await updateRole(selectedRole.id_role, roleData);
    }
    loadRoles();
    setIsFormOpen(false);
  };

  return {
    roles,
    filteredRoles,
    stats,
    loading,
    error,
    isFormOpen,
    formMode,
    selectedRole,
    deleteDialogOpen,
    setIsFormOpen,
    setDeleteDialogOpen,
    handleAddRole,
    handleEditRole,
    handleViewRole,
    handleDeleteRole,
    handleFormSubmit,
    confirmDelete,
    handleSearch,
    handleFilterStatus,
  };
}
