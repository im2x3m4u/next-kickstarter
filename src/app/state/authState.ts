import { atom } from "jotai";

//menyimpan input username dan password
export const usernameAtom = atom("");
export const passwordAtom = atom("");

//untuk konfirmasi password
export const confirmAtom = atom("");

//menyimpan status submit form (false=tidak submit, true=sedang submit)
export const submittingAtom = atom(false);

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
  roles?: Array<{ id_userRole: number; id_role?: string; role_name: string }>;
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

// --- Register state ---
export const regUsernameAtom = atom("");
export const regNamaAtom = atom("");
export const regEmailAtom = atom("");
export const regNoTeleponAtom = atom("");
export const regPasswordAtom = atom("");
export const regConfirmPasswordAtom = atom("");
export const regRoleAtom = atom<"user" | "admin">("user");

// status submit
export const regSubmittingAtom = atom(false);
