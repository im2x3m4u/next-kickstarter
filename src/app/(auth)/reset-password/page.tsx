"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import {
  passwordAtom,
  confirmAtom,
  submittingAtom,
} from "@/app/state/authState";
import { resetPassword, verifyResetToken } from "@/app/lib/services/authService";
import { notify } from "@/app/utils/notify";
import { validateResetPassword } from "@/app/lib/validation/authValidation";
import { showPasswordAtom } from "@/app/state/uiState";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  

  const [password, setPassword] = useAtom(passwordAtom);
  const [confirm, setConfirm] = useAtom(confirmAtom);
  const [submitting, setSubmitting] = useAtom(submittingAtom);
  const [showPassword, setShowPassword] = useAtom(showPasswordAtom);

  const [namaUser, setNamaUser] = useState<string>("");

  useEffect(() => {
    if (!token) {
      notify.error("Token reset password tidak ditemukan. Silakan cek email Anda.");
      router.push("/forgot-password");
      return;
    }

    // verifikasi token ke backend untuk ambil nama user
    verifyResetToken(token)
      .then((res) => {
        if (res.ok) {
          setNamaUser(res.nama);
        } else {
          notify.error(res.message || "Token tidak valid.");
          router.push("/forgot-password");
        }
      })
      .catch(() => {
        notify.error("Link reset password tidak valid atau sudah kadaluarsa.");
        router.push("/forgot-password");
      });
  }, [token, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateResetPassword(password, confirm, token);
    if (error) {
      notify.error(error);
      return;
    }

    try {
      setSubmitting(true);
      await resetPassword(token, password);
      notify.success("Password berhasil diubah", "Silakan login.");
      router.push("/login");
    } catch (err: any) {
      if (err.response?.status === 401) {
        notify.error("Link reset password sudah kadaluarsa. Silakan minta link baru.");
        router.push("/forgot-password");
      } else {
        notify.error("Gagal!", err.message || "Terjadi kesalahan.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-500">
            {namaUser
              ? `Hai ${namaUser}, silakan buat password baru Anda.`
              : "Memvalidasi link reset password..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Password baru */}
            <div className="space-y-2 text-gray-800">
              <Label htmlFor="password">Password Baru</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi password */}
            <div className="space-y-2 text-gray-800">
              <Label htmlFor="confirm">Konfirmasi Password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ulangi password baru"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-10 sm:h-11"
            >
              {submitting ? "Menyimpan..." : "Ubah Password"}
            </Button>

            {/* Back to login */}
            <p className="text-center text-sm text-gray-500">
              <Link href="/login" className="text-indigo-600 hover:underline">
                Kembali ke Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
