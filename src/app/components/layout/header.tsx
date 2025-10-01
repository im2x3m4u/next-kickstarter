"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LogOut, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutService } from "@/app/lib/services/authService";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/app/state/authState";

export function AppHeader() {
  const [open, setOpen] = useState(false);
    const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);

  const handleLogout = async () => {
    try {
      // Panggil API logout
      // await logoutService();
      await signOut({ redirect: false });

      // Bersihkan state & localStorage
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Logout berhasil 🎉");

      // Redirect ke halaman login
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout gagal:", err);
      toast.error("Logout gagal!");
    }
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input type="text" placeholder="Search" className="pl-8 w-[220px]" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-2"
              suppressHydrationWarning
            >
              <div className="h-10 w-10 rounded-full border flex items-center justify-center">
                👤
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border border-gray-200 shadow-lg"
            suppressHydrationWarning
          >
            <DropdownMenuLabel className="text-gray-900 bg-white">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuItem
              asChild
              className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
            >
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-900" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Logout dengan trigger manual */}
            <DropdownMenuItem
              className="text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
              onClick={() => setOpen(true)} // buka alert dialog
            >
              <LogOut onClick={handleLogout} className="mr-2 h-4 w-4 text-red-600" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* AlertDialog */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin keluar dari akun ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={async () => {
                  // const res = await logout();
                  // toast.success(res.message);
                  toast.success("Logout berhasil");
                  window.location.href = "/";
                }}
              >
                Ya, Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}
