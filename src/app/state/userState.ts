import { atom } from "jotai";
import type { User } from "./userState";
import {
  fetchUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../lib/services/userService";

// User interface
export interface User {
  id_user: string;
  nama: string;
  username: string;
  email: string;
  no_telepon: string;
  is_aktif: number;
  reset_token?: string | null;
  login_token?: string | null;
  created_at: string;
  updated_at: string;
  userRoles?: { role?: { nama_role: string } }[];
}

// API Response interface
export interface ApiResponse {
  ok: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: User[];
}

// Base atoms
export const usersAtom = atom<User[]>([]);
export const filteredUsersAtom = atom<User[]>([]);
export const loadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// Form state atoms
export const isFormOpenAtom = atom<boolean>(false);
export const formModeAtom = atom<"create" | "edit" | "view">("create");
export const selectedUserAtom = atom<User | null>(null);

// Delete dialog atoms
export const deleteDialogOpenAtom = atom<boolean>(false);
export const userToDeleteAtom = atom<string | null>(null);

// Search and filter atoms
export const searchQueryAtom = atom<string>("");
export const roleFilterAtom = atom<string>("all");
export const statusFilterAtom = atom<string>("all");

// Derived atoms
export const statsAtom = atom((get) => {
  const users = get(usersAtom) ?? [];
  const total = users.length;
  const active = users.filter((user) => user.is_aktif === 1).length;
  const inactive = users.filter((user) => user.is_aktif === 0).length;
  return { total, active, inactive };
});

// Action Atoms (pakai service)
export const fetchUsersAtom = atom(null, async (_get, set) => {
  try {
    set(loadingAtom, true);
    const data = await fetchUsersService();
    if (data.ok) {
      set(usersAtom, data.data);
      set(filteredUsersAtom, data.data);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    set(errorAtom, "Failed to fetch users");
  } finally {
    set(loadingAtom, false);
  }
});

export const createUserAtom = atom(
  null,
  async (get, set, userData: Partial<User>) => {
    try {
      const result = await createUserService(userData);
      set(usersAtom, [...get(usersAtom), result.data]);
    } catch (err) {
      console.error("Error creating user:", err);
      set(errorAtom, "Failed to create user");
    }
  }
);

export const updateUserAtom = atom(
  null,
  async (
    get,
    set,
    { userId, userData }: { userId: string; userData: Partial<User> }
  ) => {
    try {
      const result = await updateUserService(userId, userData);
      set(
        usersAtom,
        get(usersAtom).map((u) => (u.id_user === userId ? result.data : u))
      );
    } catch (err) {
      console.error("Error updating user:", err);
      set(errorAtom, "Failed to update user");
    }
  }
);

export const deleteUserAtom = atom(null, async (get, set, userId: string) => {
  try {
    await deleteUserService(userId);
    set(
      usersAtom,
      get(usersAtom).filter((u) => u.id_user !== userId)
    );
  } catch (err) {
    console.error("Error deleting user:", err);
    set(errorAtom, "Failed to delete user");
  }
});
