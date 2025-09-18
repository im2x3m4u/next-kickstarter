"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useAtom } from "jotai";
import { useState } from "react";
import IlustrationLogin from "@/assets/IlustrationLogin.png";
import { showPasswordAtom } from "@/app/state/uiState";
import { usernameAtom, passwordAtom, isLoggedInAtom, userAtom, tokenAtom } from "@/app/state/authState";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (username === "" || password === "") {
      toast.error("Username atau password tidak boleh kosong!", {
        description: "Silakan isi kedua field dengan benar",
        duration: 4000,
      });
      return;
    }
    
    if (username.length < 3) {
      toast.error("Username minimal 3 karakter!", {
        description: "Username harus lebih dari 3 karakter",
        duration: 4000,
      });
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter!", {
        description: "Password harus lebih dari 6 karakter",
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        // Simpan token ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Set ke Jotai atoms
        setUser(data.user);
        setToken(data.token);
        
        toast.success("Login berhasil! 🎉", {
          description: `Selamat datang ${data.user.nama}!`,
          duration: 3000,
        });

        // Redirect ke dashboard setelah 1.5 detik
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        toast.error(data.message || "Login gagal!", {
          description: "Silakan cek username dan password Anda",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan!", {
        description: "Silakan coba lagi nanti",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };


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
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Username */}
              <div>
                <Label htmlFor="username" className="text-gray-900">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 h-10 sm:h-11 text-gray-800"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-900">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 sm:h-11 pr-10 text-gray-800"
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
              <Button 
                type="submit" 
                variant="default" 
                className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
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
};
