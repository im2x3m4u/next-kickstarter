"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");

  useEffect(() => {
    const token = tokenFromUrl || localStorage.getItem("token");

    if (!token) {
      router.replace("/login"); // redirect ke login
    } else if (tokenFromUrl && !localStorage.getItem("token")) {
      // simpan token dari URL ke localStorage
      localStorage.setItem("token", tokenFromUrl);
    }
  }, [router, tokenFromUrl]);
}
