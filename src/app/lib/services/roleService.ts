import { Role } from "@/app/state/roleState";

// Fetch all roles
export async function fetchRolesService(): Promise<{ ok: boolean; data: Role[] }> {
  const res = await fetch("/api/role", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch roles: ${res.status}`);
  return res.json();
}

// Create role
export async function createRoleService(roleData: Partial<Role>) {
  const res = await fetch("/api/role", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roleData),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to create role: ${res.status}`);
  return res.json();
}

// Update role
export async function updateRoleService(roleId: string, roleData: Partial<Role>) {
  const res = await fetch(`/api/role/${roleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roleData),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to update role: ${res.status}`);
  return res.json();
}

// Delete role
export async function deleteRoleService(roleId: string) {
  const res = await fetch(`/api/role/${roleId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to delete role: ${res.status}`);
  return res.json();
}
