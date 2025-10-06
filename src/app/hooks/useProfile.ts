import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import {
  userAtom,
  profileDraftAtom,
  profileEditModeAtom,
  AuthUser,
} from "@/app/state/authState";
import { toast } from "sonner";

export function useProfile() {
  const [user, setUser] = useAtom(userAtom);
  const [draft, setDraft] = useAtom(profileDraftAtom);
  const [isEdit, setIsEdit] = useAtom(profileEditModeAtom);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // --- Sync user from localStorage if not in atom ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!user) {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const parsed: AuthUser = JSON.parse(raw);
          setUser(parsed);
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
        }
      }
    }
  }, [user, setUser]);

  // --- Sync draft whenever user changes ---
  useEffect(() => {
    if (user) {
      setDraft({
        nama: user.nama || "",
        username: user.username || "",
        email: user.email || "",
        no_telepon: user.no_telepon || "",
      });
    }
  }, [user, setDraft]);

  // --- Handlers ---
  const startEdit = () => {
    if (!user) return;
    setDraft({
      nama: user.nama || "",
      email: user.email || "",
      no_telepon: user.no_telepon || "",
      username: user.username || "",
    });
    setIsEdit(true);
  };

  const cancelEdit = () => setIsEdit(false);
  const startPasswordEdit = () => setShowPasswordForm(true);

  const cancelPasswordEdit = () => {
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // --- Save profile changes ---
  const saveEdit = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/user/${user.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: draft.nama,
          email: draft.email,
          no_telepon: draft.no_telepon,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        return toast.error(data.message || "Gagal menyimpan profil");
      }

      // Pastikan data sesuai dengan tipe AuthUser
      const updatedUser: AuthUser = {
        id_user: data.data.id_user,
        username: data.data.username,
        nama: data.data.nama,
        email: data.data.email,
        no_telepon: data.data.no_telepon,
        roles:
          user?.roles ??
          [
            {
              id_userRole: "",
              id_role: "",
              role_name: "user",
            },
          ],
      };

      console.log("Updated user:", updatedUser);

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profil berhasil diperbarui");
      setIsEdit(false);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Coba lagi.");
    }
  };

  // --- Save new password ---
  const savePassword = async () => {
    if (!user) return;

    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Password baru dan konfirmasi harus diisi");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password baru dan konfirmasi tidak sama");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter");
      return;
    }

    try {
      const res = await fetch(`/api/user/${user.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordData.newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        return toast.error(data.message || "Gagal mengubah password");
      }

      toast.success("Password berhasil diubah");
      cancelPasswordEdit();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Coba lagi.");
    }
  };

  return {
    user,
    draft,
    isEdit,
    setDraft,
    showPasswordForm,
    setShowPasswordForm,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordData,
    setPasswordData,
    startEdit,
    cancelEdit,
    saveEdit,
    startPasswordEdit,
    cancelPasswordEdit,
    savePassword,
  };
}
