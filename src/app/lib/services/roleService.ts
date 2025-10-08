  import { Role } from "@/app/state/roleState";

  // Fetch all roles
  export async function fetchRolesService(params?: {
    search?: string;
    status?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }): Promise<{ ok: boolean; data: Role[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.pageSize) query.append("pageSize", params.pageSize.toString());
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
    if (params?.status) query.append("status", params.status); // opsional, backend bisa handle status filter

    const res = await fetch(`/api/role?${query.toString()}`, {
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
  export async function updateRoleService(
    roleId: string,
    roleData: Partial<Role>
  ) {
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

  // Export Excel
export async function fetchAllRoles(
  sortBy: string = "nama_role",
  sortOrder: "ASC" | "DESC" = "DESC"
): Promise<Role[]> {
  try {
    const params = new URLSearchParams({ sortBy, sortOrder });

    const res = await fetch(`/api/role/cetak?${params.toString()}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch roles for export");

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching all roles:", err);
    return [];
  }
}
