"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import { toast } from "sonner";
import { useAtom } from "jotai";
import {
  regUsernameAtom,
  regNamaAtom,
  regEmailAtom,
  regNoTeleponAtom,
  regPasswordAtom,
  regConfirmPasswordAtom,
  regRoleAtom,
  regSubmittingAtom,
} from "@/app/state/authState";
import { validateRegister } from "@/app/lib/validation/authValidation";
import { registerService } from "@/app/lib/services/authService";

export default function RegisterForm() {
  const [username, setUsername] = useAtom(regUsernameAtom);
  const [nama, setNama] = useAtom(regNamaAtom);
  const [email, setEmail] = useAtom(regEmailAtom);
  const [noTelepon, setNoTelepon] = useAtom(regNoTeleponAtom);
  const [password, setPassword] = useAtom(regPasswordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(regConfirmPasswordAtom);
  const [role, setRole] = useAtom(regRoleAtom);
  const [submitting, setSubmitting] = useAtom(regSubmittingAtom);
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [telpError, setTelpError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateRegister(
      username,
      email,
      noTelepon,
      password,
      confirmPassword
    );
    if (error) {
      toast.error(error);
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerService(
        nama,
        username,
        password,
        email,
        noTelepon,
        role
      );

      toast.success(
        "Registrasi berhasil! Silakan cek email untuk aktivasi akun."
      );
      // router.push("/login");
      // arahkan ke halaman info cek email
      router.push("/check-email");
    } catch (err) {
      if (err.response) {
        console.error("API Error:", err.response.data)
      }
      const message = err instanceof Error ? err.message : "Registrasi gagal";
      if (message.toLowerCase().includes("sudah terdaftar")) {
        toast.error(
          "Akun dengan username atau email tersebut sudah terdaftar."
        );
      } else {
        toast.error(message);
      }
      console.error("Register gagal:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Validation email
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError("Email harus mengandung '@'");
    } else {
      setEmailError("");
    }
  };

  // Validation no telepon
  const handleTelpChange = (value: string) => {
    // hanya angka
    if (!/^\d*$/.test(value)) return;

    setNoTelepon(value);

    if (value.length > 12) {
      setTelpError("No Telepon maksimal 12 digit!");
    } else {
      setTelpError("");
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleRegister}>
        {/* Username */}
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

        {/* Nama */}
        <div>
          <Label htmlFor="nama" className="text-white">
            Nama
          </Label>
          <Input
            id="nama"
            type="text"
            placeholder="Masukkan Nama Anda"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 h-10 sm:h-11 text-white"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan Email Anda"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="mt-1 h-10 sm:h-11 text-white"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Telepon */}
        <div>
          <Label htmlFor="telp" className="text-white">
            No Telp
          </Label>
          <Input
            id="no_telepon"
            type="text"
            placeholder="Masukkan No Telepon Anda"
            value={noTelepon}
            onChange={(e) => {
              // Hanya izinkan angka
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              handleTelpChange(onlyNums);
            }}
            className="mt-1 h-10 sm:h-11 text-white"
            required
          />
          {telpError && (
            <p className="text-red-500 text-sm mt-1">{telpError}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Konfirmasi Password */}
        <div>
          <Label htmlFor="confirm-password" className="text-white">
            Konfirmasi Password
          </Label>
          <PasswordInput
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {submitting ? "Memproses..." : "Register"}
        </Button>

        <p className="text-center text-xs sm:text-sm text-white">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
