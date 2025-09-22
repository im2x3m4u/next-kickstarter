"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useAtom } from "jotai"
import { showPasswordAtom } from "@/app/state/uiState"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  
  const [showPassword, setShowPassword] = useAtom(showPasswordAtom)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (!token) setError("Token tidak ditemukan pada URL.")
  }, [token])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!token) {
      setError("Token tidak ditemukan.")
      return
    }
    if (!password || password.length < 6) {
      setError("Password minimal 6 karakter.")
      return
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password })
      })
      const data = await res.json()
      if (data.ok) {
        setMessage("Password berhasil diubah. Silakan login.")
      } else {
        setError(data.message || "Gagal mengubah password.")
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>
        <p className="mt-1 text-sm text-gray-500">Masukkan password baru Anda.</p>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}
        {message && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Baru</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Menyimpan..." : "Ubah Password"}
          </button>

          <div className="text-center text-sm text-gray-500">
            <Link href="/login" className="text-indigo-600 hover:underline">Kembali ke Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
