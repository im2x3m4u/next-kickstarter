import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/function/activityHelp";

/**
 * Tipe untuk handler yang akan dieksekusi setelah validasi berhasil.
 */
type ProtectedHandler = (
  req: NextRequest,
  session: Session,
  params: any
) => Promise<NextResponse>;

/**
 * Opsi untuk konfigurasi handler.
 */
interface ProtectionOptions {
  requiredRoles?: string[];
  activity: string;
}

/**
 * Membungkus sebuah Next.js API Route Handler dengan validasi sesi dan logging aktivitas.
 *
 * @param handler - Fungsi async yang berisi logika inti endpoint.
 * @param options - Opsi untuk validasi (role) dan teks log aktivitas.
 * @returns Next.js API Route Handler yang sudah diamankan.
 */
export function withProtection(
  handler: ProtectedHandler,
  options: ProtectionOptions
) {
  return async (req: NextRequest, { params }: { params: any }) => {
    const session = await getServerSession(authOptions);

    // 1. Cek apakah pengguna sudah login
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    // 2. Cek apakah data esensial di dalam sesi ada
    if (!session.user?.id) {
      return NextResponse.json(
        { message: "Bad Request: Invalid session data" },
        { status: 400 }
      );
    }

    // 3. Cek apakah pengguna memiliki role yang dibutuhkan
    if (options.requiredRoles && options.requiredRoles.length > 0) {
      const userRoles = session.user.roles || [];
      const hasRequiredRole = options.requiredRoles.some((role) =>
        userRoles.includes(role)
      );
      if (!hasRequiredRole) {
        return NextResponse.json(
          { message: "Forbidden: Insufficient permissions" },
          { status: 403 }
        );
      }
    }

    try {
      // 4. Jalankan logika endpoint utama jika semua validasi lolos
      const response = await handler(req, session, params);

      // 5. Catat aktivitas jika handler berhasil (status 2xx)
      if (response.ok) {
        await logActivity(session.user.id, options.activity, req);
      }

      return response;
    } catch (error: any) {
      console.error(`[API_ERROR] in ${options.activity}:`, error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  };
}