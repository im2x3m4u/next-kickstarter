"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import { useAtom } from "jotai";
import {
  usernameAtom,
  passwordAtom,
  userAtom,
  tokenAtom,
} from "@/app/state/authState";
import { validateLogin } from "@/app/lib/validation/authValidation";
import { loginService } from "@/app/lib/services/authService";
import { toast } from "sonner";
import { globalLoadingAtom } from "@/app/state/uiState";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [isLoading, setIsLoading] = useAtom(globalLoadingAtom);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateLogin(username, password);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        toast.error("Login gagal!", {
          description: res.error,
        });
      } else if (res?.ok) {
        toast.success("Login berhasil! 🎉", {
          description: `Selamat datang ${username}!`,
        });

        // Ambil session
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        setUser(session.user);
        localStorage.setItem("user", JSON.stringify(session.user));



        // untuk cek role user
        if (session?.user?.role === "admin") {
          router.push("/dashboard")
        } else {
          router.push("/home")
        }
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Masukkan username Anda"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 h-10 sm:h-11 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-right mt-1">
            <a
              href="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Lupa Password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>

        <p className="text-center text-xs sm:text-sm text-white">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}
