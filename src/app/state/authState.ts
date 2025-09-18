import { atom } from "jotai";

//menyimpan input username dan password
export const usernameAtom = atom("");
export const passwordAtom = atom("");

//menyimpan status login (false=sudah login, true=belum login)
export const isLoggedInAtom = atom(false);

//state email untuk forgot password
export const forgotPasswordAtom = atom("");

// data user yang sudah login
export type AuthUser = {
  id_user: number;
  username: string;
  nama?: string;
  email?: string;
  no_telepon?: string;
  roles?: Array<{ id_userRole: number; role_name: string }>;
} | null;

export const userAtom = atom<AuthUser>(null);
export const tokenAtom = atom<string | null>(null);

// Profile edit state (Jotai)
export type ProfileDraft = {
  nama: string;
  username: string;
  email: string;
  no_telepon: string;
};

export const profileDraftAtom = atom<ProfileDraft>({
  nama: "",
  username: "",
  email: "",
  no_telepon: "",
});

export const profileEditModeAtom = atom(false);