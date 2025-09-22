"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { forgotPasswordAtom } from "@/app/state/authState";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useAtom(forgotPasswordAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email tidak valid!");
      return;
    }

    try {
      const res = await fetch("/api/auth/requestPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(
          data.message || "Link reset password telah dikirim ke email Anda."
        );
      } else {
        toast.error(data.message || "Gagal mengirim link reset password.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Lupa Password 🔑
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Masukkan email Anda untuk menerima tautan reset password
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Reset Button */}
            <Button
              type="submit"
              className="w-full h-10 sm:h-11"
            >
              Kirim Link Reset
            </Button>

            {/* Back to Login */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Ingat password Anda?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Masuk
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
