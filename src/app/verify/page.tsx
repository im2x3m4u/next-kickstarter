"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Token tidak ditemukan!");
      router.push("/login");
      return;
    }

    const verifyUser = async () => {
      try {
        // Panggil API backend langsung
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifikasi?token=${token}`
        );

        if (!res.ok) {
          throw new Error("Token tidak valid atau sudah kadaluarsa");
        }

        toast.success("Akun berhasil diaktivasi! Silakan login.");
        router.push("/login");
      } catch (err: any) {
        toast.error(err.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center h-screen text-white">
      {loading ? "Memverifikasi akun Anda..." : "Selesai"}
    </div>
  );
}
