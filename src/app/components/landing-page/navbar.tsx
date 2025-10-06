"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Logo
        </Link>

        {/* Menu (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="#service" className="text-gray-700 hover:text-blue-600">
            Service
          </a>
          <a href="#why-us" className="text-gray-700 hover:text-blue-600">
            Why us?
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600">
            Testimonials
          </a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600">
            FAQ
          </a>
        </nav>

        {/* Auth Button (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="bg-white hover:bg-[#AD49E1] text-black border hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col gap-3">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#service"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Service
              </a>
              <a
                href="#why-us"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Why us?
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="bg-white hover:bg-gray-900 text-black border hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
