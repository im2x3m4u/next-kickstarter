"use client";

import dynamic from "next/dynamic";

// LAZY LOAD ROLE MANAGEMENT COMPONENTS
export const LazyRoleTable = dynamic(
  () =>
    import("@/app/(dashboard)/_components/role-management/role-table").then(
      (mod) => ({
        default: mod.RoleTable,
      })
    ),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
    ),
  }
);

export const LazyRoleForm = dynamic(
  () =>
    import("@/app/(dashboard)/_components/role-management/role-form").then(
      (mod) => ({
        default: mod.RoleForm,
      })
    ),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
    ),
  }
);

// LAZY LOAD USER MANAGEMENT COMPONENTS
export const LazyUserTable = dynamic(
  () =>
    import("@/app/(dashboard)/_components/user-management/user-table").then(
      (mod) => ({
        default: mod.UserTable,
      })
    ),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
    ),
  }
);

export const LazyUserForm = dynamic(
  () =>
    import("@/app/(dashboard)/_components/user-management/user-form").then(
      (mod) => ({
        default: mod.UserForm,
      })
    ),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
    ),
  }
);
