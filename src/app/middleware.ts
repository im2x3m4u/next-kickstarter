// // import { withAuth } from "next-auth/middleware";
// // import { NextResponse } from "next/server";

// // export default withAuth(
// //   function middleware(req) {
// //     const role = req.nextauth.token?.role;
// //     const path = req.nextUrl.pathname;

// //     // User tidak boleh akses dashboard
// //     if (role === "user" && path.startsWith("/dashboard")) {
// //       return NextResponse.redirect(new URL("/home", req.url));
// //     }

// //     // Admin tidak boleh akses home
// //     if (role === "admin" && path.startsWith("/home")) {
// //       return NextResponse.redirect(new URL("/dashboard", req.url));
// //     }

// //     return NextResponse.next();
// //   },
// //   {
// //     callbacks: {
// //       authorized: ({ token }) => !!token, // hanya user login yang bisa lewat
// //     },
// //   }
// // );

// // // Terapkan ke route yang perlu proteksi
// // export const config = {
// //   matcher: ["/dashboard/:path*", "/home/:path*"],
// // };

// // src/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const url = req.nextUrl.clone();

//   if (!token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // cast roles jadi string[]
//   const roles = (token as any).roles as string[] || [];

//   // role-based protection
//   if (url.pathname.startsWith("/dashboard") && !roles.includes("admin")) {
//     url.pathname = "/home"; // user biasa tidak boleh masuk /dashboard
//     return NextResponse.redirect(url);
//   }

//   if (url.pathname.startsWith("/home") && roles.includes("admin")) {
//     url.pathname = "/dashboard"; // admin tidak boleh masuk /home
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/home/:path*", "/dashboard/:path*"],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  // jika belum login redirect ke /login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const roles = (token as any).roles as string[] || [];

  // proteksi halaman berdasarkan role
  if (url.pathname.startsWith("/dashboard") && !roles.includes("admin")) {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/home") && roles.includes("admin")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/dashboard/:path*"],
};
