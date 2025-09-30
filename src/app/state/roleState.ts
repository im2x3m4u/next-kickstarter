// import { atom } from 'jotai'

// // Role interface based on API response
// export interface Role {
//   id_role: string
//   nama_role: string
//   is_aktif: number
//   created_at: string
//   updated_at: string
// }

// // Base atoms
// export const rolesAtom = atom<Role[]>([])
// export const filteredRolesAtom = atom<Role[]>([])
// export const loadingAtom = atom<boolean>(false)
// export const errorAtom = atom<string | null>(null)

// // Form state atoms
// export const isFormOpenAtom = atom<boolean>(false)
// export const formModeAtom = atom<"create" | "edit" | "view">("create")
// export const selectedRoleAtom = atom<Role | undefined>(undefined)

// // Delete dialog atoms
// export const deleteDialogOpenAtom = atom<boolean>(false)
// export const roleToDeleteAtom = atom<string | null>(null)

// // Search and filter atoms
// export const searchQueryAtom = atom<string>("")
// export const statusFilterAtom = atom<string>("all")

// // Derived atoms
// export const statsAtom = atom((get) => {
//   const roles = get(rolesAtom)
//   const total = roles.length
//   const active = roles.filter(role => role.is_aktif === 1).length
//   const inactive = roles.filter(role => role.is_aktif === 0).length
//   return { total, active, inactive }
// })

// // Helper functions for API calls
// export const fetchRolesAtom = atom(
//   null,
//   async (get, set) => {
//     set(loadingAtom, true)
//     try {
//       const response = await fetch('/api/role')
//       const data = await response.json()
//       set(rolesAtom, data.ok ? data.data : [])
//     } catch (err) {
//       console.error('Error fetching roles:', err)
//     } finally {
//       set(loadingAtom, false)
//     }
//   }
// )

// export const createRole = async (roleData: Partial<Role>) => {
//   try {
//     const response = await fetch('/api/role', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(roleData)
//     })
//     return await response.json()
//   } catch (error) {
//     console.error('Error creating role:', error)
//     throw error
//   }
// }

// export const updateRole = async (roleId: string, roleData: Partial<Role>) => {
//   try {
//     const response = await fetch(`/api/role/${roleId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(roleData)
//     })
//     return await response.json()
//   } catch (error) {
//     console.error('Error updating role:', error)
//     throw error
//   }
// }

// export const deleteRole = async (roleId: string) => {
//   try {
//     const response = await fetch(`/api/role/${roleId}`, {
//       method: 'DELETE'
//     })
//     return await response.json()
//   } catch (error) {
//     console.error('Error deleting role:', error)
//     throw error
//   }
// }

// src/app/state/roleState.ts
import { atom } from "jotai";

export interface Role {
  id_role: string;
  nama_role: string;
  is_aktif: number;
  created_at: string;
  updated_at: string;
}

// Base atoms
export const rolesAtom = atom<Role[]>([]);
export const filteredRolesAtom = atom<Role[]>([]);
export const loadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// Form state atoms
export const isFormOpenAtom = atom<boolean>(false);
export const formModeAtom = atom<"create" | "edit" | "view">("create");
export const selectedRoleAtom = atom<Role | undefined>(undefined);

// Delete dialog atoms
export const deleteDialogOpenAtom = atom<boolean>(false);
export const roleToDeleteAtom = atom<string | null>(null);

// Search and filter atoms
export const searchQueryAtom = atom<string>("");
export const statusFilterAtom = atom<string>("all");

// Derived atoms
export const statsAtom = atom((get) => {
  const roles = get(rolesAtom);
  const total = roles.length;
  const active = roles.filter((role) => role.is_aktif === 1).length;
  const inactive = roles.filter((role) => role.is_aktif === 0).length;
  return { total, active, inactive };
});

// Fetch roles atom (optional, bisa dipakai jika ingin Jotai async atom)
export const fetchRolesAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);
  try {
    const { fetchRolesService } = await import("../services/roleService");
    const result = await fetchRolesService();
    set(rolesAtom, result.data || []);
    set(filteredRolesAtom, result.data || []);
  } catch (err: any) {
    set(errorAtom, err.message || "Failed to fetch roles");
    console.error(err);
  } finally {
    set(loadingAtom, false);
  }
});
