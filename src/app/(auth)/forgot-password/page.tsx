"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Tambahkan logic kirim request reset password ke backend
    alert(`Link reset password dikirim ke: ${email}`);
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Reset Button */}
            <Button type="submit" className="w-full">
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
