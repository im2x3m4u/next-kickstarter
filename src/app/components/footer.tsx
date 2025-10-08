import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xl font-bold text-blue-600">Logo</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 pr-6">
              Platform untuk mengelola talenta, kinerja, dan pengembangan SDM
              secara modern dan efisien.
            </p>
            <div className="flex items-center gap-3 text-neutral-500">
              <Link
                href="#"
                aria-label="GitHub"
                className="hover:text-neutral-900"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="hover:text-neutral-900"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="hover:text-neutral-900"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
              Produk
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>
                <Link className="hover:text-neutral-900" href="#">
                  Fitur
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="#">
                  Harga
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="#">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
              Perusahaan
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>
                <Link className="hover:text-neutral-900" href="#">
                  Tentang
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="#">
                  Karir
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="#">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-6 flex items-center justify-center text-neutral-500 text-sm">
          <p>
            © {new Date().getFullYear()} Next Kickstarter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
