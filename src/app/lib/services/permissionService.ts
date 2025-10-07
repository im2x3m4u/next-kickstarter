export async function fetchAllPermissions() {
    const res = await fetch('/api/permissions');
    if (!res.ok) throw new Error("Failed to fetch permissions");
    return res.json();
}

export async function fetchRolePermissions(roleId: string) {
    const res = await fetch(`/api/role/${roleId}/permissions`);
    if (!res.ok) throw new Error("Failed to fetch role permissions");
    return res.json();
}

export async function updateRolePermissions(roleId: string, permissionIds: string[]) {
    const res = await fetch(`/api/role/${roleId}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissionIds }),
    });
    if (!res.ok) throw new Error("Failed to update permissions");
    return res.json();
}