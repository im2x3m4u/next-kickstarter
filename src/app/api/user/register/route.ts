import { NextResponse } from "next/server";
import { encryptPassword } from "@/lib/crypto";
import { randomBytes } from "crypto";
import { User } from "@/entities/user";
import { UserRole } from "@/entities/userRole";
import { Role } from "@/entities/role";
import { createEntity, getEntityById } from "@/function/entityHelp";
import { sendEmail } from "@/lib/mailer";
import { validateUserData } from "@/function/validasiHelp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, username, password, email, no_telepon, id_role } = body;

    // Validasi input
    if (!nama || !username || !password || !email || !no_telepon) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const check = validateUserData({ email, no_telepon });
    if (check.length > 0)
      return NextResponse.json({ check }, { status: 400 });

    // Cek username/email sudah ada
    const existingUser = await getEntityById(User, "username", username);
    const existingEmail = await getEntityById(User, "email", email);
    if (existingUser.ok || existingEmail.ok) {
      return NextResponse.json(
        { error: "Username atau email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Encrypt password
    const encryptedPassword = encryptPassword(password);

    // Generate login token untuk verifikasi email
    const loginToken = randomBytes(32).toString("hex");

    // Buat user baru dengan is_aktif = 0 (menunggu verifikasi)
    const newUser = await createEntity(User, {
      nama,
      username,
      password: encryptedPassword,
      email,
      no_telepon,
      is_aktif: 0,
      login_token: loginToken,
    });

    const createdUser = Array.isArray(newUser.data)
      ? newUser.data[0]
      : newUser.data;

    // Ambil role default user
    let roleData;
    if (id_role) {
      const role = await getEntityById(Role, "id_role", id_role);
      if (!role.ok || !role.data) {
        return NextResponse.json(
          { error: "Role tidak ditemukan" },
          { status: 400 }
        );
      }
      roleData = role.data;
    } else {
      const role = await getEntityById(Role, "nama_role", "user");
      if (!role.ok || !role.data) {
        return NextResponse.json(
          { error: "Role default 'user' tidak ditemukan" },
          { status: 500 }
        );
      }
      roleData = role.data;
    }

    // Buat relasi user-role
    await createEntity(UserRole, {
      user: createdUser,
      role: roleData,
    });

    // Kirim email verifikasi
    const verifyUrl = `${process.env.FRONTEND_URL}/api/user/verifikasi?token=${loginToken}`;
    await sendEmail(
      email,
      "Verifikasi Akun Anda",
      `
  <p>Halo ${nama},</p>
  <p>Terima kasih telah mendaftar. Silakan klik link di bawah untuk memverifikasi akun Anda:</p>
  <p><a href="${verifyUrl}">${verifyUrl}</a></p>
  <p>Jika tidak mendaftar, abaikan email ini.</p>
  `
    );

    return NextResponse.json({
      message: "User berhasil didaftarkan. Silakan cek email untuk verifikasi.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
