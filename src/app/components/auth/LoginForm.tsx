"use client";

import { useState } from "react";
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
      const data = await loginService(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);

      toast.success("Login berhasil! 🎉", {
        description: `Selamat datang ${data.user.nama}!`,
      });

      setTimeout(() => {
        window.location.href = `/dashboard?token=${data.token}`;
      }, 1500);
    } catch (err) {
      toast.error("Login gagal!", {
        description: "Silakan cek username & password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <Label htmlFor="username" className="text-gray-900">
          Username
        </Label>
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

      <div>
        <Label htmlFor="password" className="text-gray-900">
          Password
        </Label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-right mt-1">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
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

      <p className="text-center text-xs sm:text-sm text-gray-500">
        Belum punya akun?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Daftar
        </a>
      </p>
    </form>
  );
}
