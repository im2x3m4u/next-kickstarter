"use client";

import { useProfile } from "@/app/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileUser() {
  const {
    user,
    draft,
    isEdit,
    setDraft,
    startEdit,
    cancelEdit,
    saveEdit,
    showPasswordForm,
    startPasswordEdit,
    cancelPasswordEdit,
    savePassword,
    passwordData,
    setPasswordData,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useProfile();

  if (!user) {
    return <p className="text-gray-500">Data user tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Profil Saya</h2>

      {/* Info profil */}
      {!isEdit ? (
        <div className="space-y-2">
          <p>
            <strong>Nama:</strong> {user.nama}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>No Telepon:</strong> {user.no_telepon}
          </p>
          <Button onClick={startEdit} className="mt-4">
            Edit Profil
          </Button>
          <Button
            variant="outline"
            onClick={startPasswordEdit}
            className="mt-2"
          >
            Ubah Password
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            placeholder="Nama"
            value={draft.nama}
            onChange={(e) => setDraft((d) => ({ ...d, nama: e.target.value }))}
          />
          <Input
            placeholder="Email"
            value={draft.email}
            onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
          />
          <Input
            placeholder="No Telepon"
            value={draft.no_telepon}
            onChange={(e) =>
              setDraft((d) => ({ ...d, no_telepon: e.target.value }))
            }
          />
          <div className="flex gap-2">
            <Button onClick={saveEdit}>Simpan</Button>
            <Button variant="outline" onClick={cancelEdit}>
              Batal
            </Button>
          </div>
        </div>
      )}

      {/* Form ubah password */}
      {showPasswordForm && (
        <div className="mt-6 border-t pt-4 space-y-3">
          <h3 className="font-semibold">Ubah Password</h3>
          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="Password Baru"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((d) => ({ ...d, newPassword: e.target.value }))
            }
            className="text-black placeholder-gray-400"
          />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Konfirmasi Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData((d) => ({
                ...d,
                confirmPassword: e.target.value,
              }))
            }
          />
          <div className="flex gap-2">
            <Button onClick={savePassword}>Simpan Password</Button>
            <Button variant="outline" onClick={cancelPasswordEdit}>
              Batal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
