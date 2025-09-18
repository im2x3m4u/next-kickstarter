import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../../lib/typeorm";
import { User } from "../../../../entities/user";
import CryptoJS from "crypto-js";

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(User);
}

// GET User berdasarkan ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRepo = await initDB();
    const user = await userRepo.findOneBy({ id_user: params.id });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT Update User
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { nama, username, email, no_telepon, is_aktif, password } = body;

    const userRepo = await initDB();
    const user = await userRepo.findOneBy({ id_user: params.id });
    if (!user)
      return NextResponse.json(
        { ok: false, message: "User tidak ditemukan" },
        { status: 404 }
      );

    // Update nama/email/telp/aktif
    user.nama = nama ?? user.nama;
    user.email = email ?? user.email;
    user.no_telepon = no_telepon ?? user.no_telepon;
    user.is_aktif = is_aktif ?? user.is_aktif;

    // Update username jika berubah, cek unik
    if (typeof username === "string" && username.trim() && username !== user.username) {
      const exists = await userRepo.findOne({ where: { username } });
      if (exists && exists.id_user !== user.id_user) {
        return NextResponse.json(
          { ok: false, message: "Username sudah digunakan" },
          { status: 409 }
        );
      }
      user.username = username;
    }

    // Kalau password dikirim, enkripsi baru
    if (password) {
      user.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET!
      ).toString();
    }

    const saved = await userRepo.save(user);

    // Kembalikan user lengkap dengan roles agar client tidak kehilangan informasi role
    const withRelations = await userRepo.findOne({
      where: { id_user: saved.id_user },
      relations: ["userRoles", "userRoles.role"],
    });

    if (!withRelations) {
      return NextResponse.json({
        ok: true,
        message: "User berhasil diupdate",
        user: saved,
      });
    }

    const userResponse: any = {
      id_user: withRelations.id_user,
      username: withRelations.username,
      nama: withRelations.nama,
      email: withRelations.email,
      no_telepon: withRelations.no_telepon,
      is_aktif: withRelations.is_aktif,
      roles: Array.isArray(withRelations.userRoles)
        ? withRelations.userRoles.map((ur: any) => ({
            id_userRole: ur.id_userRole,
            id_role: ur.role?.id_role,
            role_name: ur.role?.nama_role,
          }))
        : [],
    };

    return NextResponse.json({
      ok: true,
      message: "User berhasil diupdate",
      user: userResponse,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE User
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRepo = await initDB();
    const user = await userRepo.findOneBy({ id_user: params.id });
    if (!user) return NextResponse.json({ ok: false, message: "User tidak ditemukan" }, { status: 404 });

    await userRepo.remove(user);
    return NextResponse.json({ ok: true, message: "User berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
