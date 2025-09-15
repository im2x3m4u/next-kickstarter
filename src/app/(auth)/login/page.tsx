"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

import IlustrationLogin from "@/assets/IlustrationLogin.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      {/* Left Section (Image) */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <Image
          src={IlustrationLogin}
          alt="Ilustration Login"
          width={600}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Section (Login Form) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-6 sm:p-10">
        <Card className="w-full max-w-sm sm:max-w-md shadow-lg rounded-xl sm:rounded-2xl">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Selamat Datang 👋
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 h-10 sm:h-11"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10 sm:h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 sm:top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="text-right mt-1">
                    <a
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Lupa Password?
                    </a>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full h-10 sm:h-11">
                Masuk
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <hr className="flex-1 border-gray-200" />
                <span className="text-sm text-gray-400">atau</span>
                <hr className="flex-1 border-gray-200" />
              </div>

              {/* Social Login (opsional) */}
              <Button variant="outline" className="w-full h-10 sm:h-11">
                Masuk dengan Google
              </Button>

              {/* Link ke Register */}
              <p className="text-center text-xs sm:text-sm text-gray-500">
                Belum punya akun?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Daftar
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
