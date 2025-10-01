"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Token tidak ditemukan.");
      router.push("/login");
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Token tidak valid atau sudah kadaluarsa.");
        }

        const data = await res.json();
        toast.success(`Akun ${data.username} berhasil diaktivasi!`);
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
      {loading ? "Memverifikasi akun..." : "Redirecting..."}
    </div>
  );
}
