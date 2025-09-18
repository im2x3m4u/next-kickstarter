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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email tidak valid!");
      return;
    }

    // TODO: Tambahkan logic kirim request reset password ke backend
    toast.success(`Silahkan cek email Anda untuk reset password di ${email}`);
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
              <Label htmlFor="email" className="text-gray-900">Email</Label>
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
            <Button type="submit" variant="outline" className="text-white w-full h-10 sm:h-11">
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
