import { NextResponse } from "next/server";
import { getConnection } from "@/lib/typeorm";
import { User } from "@/entities/user";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token tidak ditemukan" }, { status: 400 });
    }

    const ds = await getConnection();
    const userRepo = ds.getRepository(User);

    const user = await userRepo.findOne({ where: { login_token: token } });

    if (!user) {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 400 });
    }

    // Verifikasi user
    user.is_aktif = 1;
    user.login_token = null;
    await userRepo.save(user);

    // Redirect ke halaman login 
    return NextResponse.redirect(`${process.env.FRONTEND_URL}/login?verifikasiAktif`);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
