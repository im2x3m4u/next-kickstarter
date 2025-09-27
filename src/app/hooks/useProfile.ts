import { useAtom } from "jotai"
import { useState, useEffect } from "react"
import { userAtom, profileDraftAtom, profileEditModeAtom } from "@/app/state/authState"
import { toast } from "sonner"

export function useProfile() {
  const [user, setUser] = useAtom(userAtom)
  const [draft, setDraft] = useAtom(profileDraftAtom)
  const [isEdit, setIsEdit] = useAtom(profileEditModeAtom)

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

//   Handlers
  useEffect(() => {
    if (user) return
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem("user")
      if (!raw) return
      const parsed = JSON.parse(raw)
      setUser(parsed)
      setDraft({
        nama: parsed?.nama || "",
        username: parsed?.username || "",
        email: parsed?.email || "",
        no_telepon: parsed?.no_telepon || "",
      })
    } catch {}
  }, [user, setUser])

  const startEdit = () => {
    if (!user) return
    setDraft({
      nama: user.nama || "",
      username: user.username || "",
      email: user.email || "",
      no_telepon: user.no_telepon || "",
    })
    setIsEdit(true)
  }

  const cancelEdit = () => setIsEdit(false)
  const cancelPasswordEdit = () => {
    setShowPasswordForm(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }
  const startPasswordEdit = () => setShowPasswordForm(true)

  const saveEdit = async () => {
    if (!user) return
    try {
      const res = await fetch(`/api/user/${user.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: draft.nama,
          email: draft.email,
          no_telepon: draft.no_telepon,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) return toast.error(data.message || "Gagal menyimpan profil")
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success("Profil berhasil diperbarui")
      setIsEdit(false)
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.")
    }
  }

  const savePassword = async () => {
    if (!user) return
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Password baru dan konfirmasi harus diisi")
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password baru dan konfirmasi tidak sama")
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter")
      return
    }

    try {
      const res = await fetch(`/api/user/${user.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordData.newPassword }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) return toast.error(data.message || "Gagal mengubah password")
      toast.success("Password berhasil diubah")
      cancelPasswordEdit()
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.")
    }
  }

  return {
    user, draft, isEdit, setDraft,
    showPasswordForm, setShowPasswordForm,
    showNewPassword, setShowNewPassword,
    showConfirmPassword, setShowConfirmPassword,
    passwordData, setPasswordData,
    startEdit, cancelEdit, saveEdit,
    startPasswordEdit, cancelPasswordEdit, savePassword
  }
}
