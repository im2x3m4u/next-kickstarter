"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomeContent() {
  const { data: session } = useSession();
  const username = session?.user?.username ?? "Guest";

  return (
    // <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Selamat datang
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {username}
              </span>
            </h1>
            <p className="text-xl text-gray-600 sm:text-2xl">
              Pantau aktivitas mu sekarang!
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center gap-3 justify-center pt-4">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <div className="h-1 w-6 rounded-full bg-purple-600"></div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <Link href="/dashboard/activity">
              <button className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-2xl hover:scale-105">
                <span>Lihat Activity</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
