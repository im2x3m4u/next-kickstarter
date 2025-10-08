"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Profile from "../../../components/Profile";

export default function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Talent Start
            </Link>
          </div>

          {/* Spacer biar profile ke kanan */}
          <div className="ml-auto flex items-center gap-4">
            {/* Profile */}
            <Profile />

            {/* Mobile Menu Button */}
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
      </div>
    </nav>
  );
}
