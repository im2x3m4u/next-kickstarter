import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from "lucide-react"

export function PasswordForm({
  passwordData,
  setPasswordData,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onCancel,
  onSave
}: any) {
  return (
    <div className="p-6 mt-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="space-y-4">
        {["newPassword", "confirmPassword"].map((key) => (
          <div key={key}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {key === "newPassword" ? "Password Baru" : "Konfirmasi Password Baru"}
            </label>
            <div className="relative">
              <Input
                type={(key === "newPassword" ? showNewPassword : showConfirmPassword) ? "text" : "password"}
                value={passwordData[key]}
                onChange={(e) => setPasswordData({ ...passwordData, [key]: e.target.value })}
                placeholder={key === "newPassword" ? "Masukkan password baru" : "Konfirmasi password baru"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => key === "newPassword" ? setShowNewPassword(!showNewPassword) : setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {(key === "newPassword" ? showNewPassword : showConfirmPassword) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <Button onClick={onCancel} variant="outline">Batal</Button>
          <Button onClick={onSave} className="bg-yellow-600 hover:bg-yellow-700 text-white">Simpan Password</Button>
        </div>
      </div>
    </div>
  )
}
