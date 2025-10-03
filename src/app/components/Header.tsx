"use client";

import Link from "next/link"; 
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Profile from "./Profile";

type HeaderProps = {
  role?: "admin" | "user";
};

export default function Header({ role = "user" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // konfigurasi berbeda tiap role
  const config = {
    admin: {
      href: "/dashboard",
      label: "Talent Start Admin",
      color: "text-blue-600",
    },
    user: {
      href: "/home",
      label: "Talent Start",
      color: "text-green-600",
    },
  };

  const { href, label, color } = config[role];

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={href} className={`text-xl font-bold ${color}`}>
            {label}
          </Link>

          {/* Profile */}
          <Profile />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
