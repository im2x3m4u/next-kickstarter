// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { User } from "@/entities/user";
// import { UserRole } from "@/entities/userRole";
// import { Role } from "@/entities/role";
// import { createEntity, getEntityById } from "@/function/entityHelp";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { nama, username, password, email, no_telepon, id_role} = body;

//     // Validasi input
//     if (!nama || !username || !password || !email || !no_telepon || !id_role) {
//       return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
//     }

//     // Cek username/email sudah ada
//     const existingUser = await getEntityById(User, "username", username);
//     const existingEmail = await getEntityById(User, "email", email);
//     if (existingUser.ok || existingEmail.ok) {
//       return NextResponse.json({ error: "Username atau email sudah terdaftar" }, { status: 400 });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Buat user baru
//     const newUser = await createEntity(User, {
//       nama,
//       username,
//       password: hashedPassword,
//       email,
//       no_telepon,
//       is_aktif: 1,
//     });

//     // Pastikan entity tunggal
//     const createdUser = Array.isArray(newUser.data) ? newUser.data[0] : newUser.data;

//     // Ambil user penuh (TypeScript strict)
//     const fullUser = await getEntityById(User, "id_user", createdUser.id_user);
//     if (!fullUser.ok || !fullUser.data) {
//       return NextResponse.json({ error: "User tidak ditemukan setelah dibuat" }, { status: 500 });
//     }

//     // Ambil role penuh
//     const role = await getEntityById(Role, "id_role", id_role);
//     if (!role.ok || !role.data) {
//       return NextResponse.json({ error: "Role tidak ditemukan" }, { status: 400 });
//     }

//     // Buat user_role
//     await createEntity(UserRole, {
//       user: fullUser.data,
//       role: role.data,
//     });

//     return NextResponse.json({ message: "User berhasil didaftarkan" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { encryptPassword } from "@/lib/crypto";
import { promisify } from "util";
import { User } from "@/entities/user";
import { UserRole } from "@/entities/userRole";
import { Role } from "@/entities/role";
import { createEntity, getEntityById } from "@/function/entityHelp";

const scrypt = promisify(encryptPassword);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, username, password, email, no_telepon, id_role } = body;

    // Validasi input
    if (!nama || !username || !password || !email || !no_telepon || !id_role) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

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

    // Buat user baru
    const newUser = await createEntity(User, {
      nama,
      username,
      password: encryptedPassword,
      email,
      no_telepon,
      is_aktif: 1,
    });

    // Pastikan entity tunggal
    const createdUser = Array.isArray(newUser.data)
      ? newUser.data[0]
      : newUser.data;

    // Ambil user penuh (TypeScript strict)
    const fullUser = await getEntityById(User, "id_user", createdUser.id_user);
    if (!fullUser.ok || !fullUser.data) {
      return NextResponse.json(
        { error: "User tidak ditemukan setelah dibuat" },
        { status: 500 }
      );
    }

    // Ambil role penuh
    const role = await getEntityById(Role, "id_role", id_role);
    if (!role.ok || !role.data) {
      return NextResponse.json(
        { error: "Role tidak ditemukan" },
        { status: 400 }
      );
    }

    // Buat user_role
    await createEntity(UserRole, {
      user: fullUser.data,
      role: role.data,
    });

    return NextResponse.json({ message: "User berhasil didaftarkan" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
