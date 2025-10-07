import { atom } from "jotai";

export interface Permission {
  id_permission: string;
  nama_permission: string;
  deskripsi: string;
}

export const allPermissionsAtom = atom<Permission[]>([]);
export const rolePermissionsAtom = atom<Permission[]>([]);
export const permissionsLoadingAtom = atom(true);