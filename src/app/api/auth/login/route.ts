// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../lib/typeorm";
import { signToken } from "../../../../function/jwt";
import { verifyPassword } from "../../../../lib/crypto";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const ds = await getConnection();
    const { User } = await import("../../../../entities/user");
    const userRepo = ds.getRepository(User);

    const user = await userRepo.findOne({
      where: { username },
      relations: ["userRoles", "userRoles.role"],
    });

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Username atau password salah",
        },
        { status: 401 }
      );
    }

    if (user.is_aktif !== 1) {
      return NextResponse.json(
        {
          ok: false,
          message: "Akun tidak aktif",
        },
        { status: 403 }
      );
    }

    const token = signToken({
      id_user: user.id_user,
      username: user.username,
      nama: user.nama,
    });
    user.login_token = token;
    await userRepo.save(user);

    return NextResponse.json({
      ok: true,
      user: {
        id_user: user.id_user,
        username: user.username,
        nama: user.nama,
        email: user.email,
        no_telepon: user.no_telepon,
        roles: user.userRoles.map((ur) => ({
          id_userRole: ur.id_userRole,
          role_name: ur.role.nama_role,
        })),
      },
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
