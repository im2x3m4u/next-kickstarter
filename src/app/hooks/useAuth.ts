import { useState } from "react";
import { useAtom } from "jotai";
import { signIn, signOut } from "next-auth/react";
import { userAtom, tokenAtom } from "@/app/state/authState";

export function useAuth() {
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // LOGIN
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError(res.error);
        throw new Error(res.error);
      }

      // Simpan user & token di state global dan localStorage
      const userData = (res as any).user; // pastikan session user tersedia
      setUser(userData);
      setToken(userData?.loginToken || null);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData?.loginToken || "");

      return userData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //   LOGOUT
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Logout: mulai proses signOut");
      await signOut({ redirect: false });
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      console.log("Logout: berhasil, state & localStorage dibersihkan");
      return { success: true, message: "Logout berhasil 🎉" };
    } catch (err: any) {
      setError(err.message || "Logout gagal!");
      return { success: false, message: err.message || "Logout gagal!" };
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, loading, error };
}
