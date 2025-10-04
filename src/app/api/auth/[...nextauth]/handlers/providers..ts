import Credentials from "next-auth/providers/credentials";
import { randomBytes } from "crypto";
import { getConnection } from "@/lib/typeorm";
import { verifyPassword } from "@/lib/crypto";
import { User } from "@/entities/user";

export const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: any) {
      const ds = await getConnection();
      const userRepo = ds.getRepository(User);

      const user = await userRepo.findOne({
        where: { username: credentials.username },
        relations: ["userRoles", "userRoles.role"],
      });

      if (!user || !verifyPassword(credentials.password, user.password)) {
        throw new Error("Username atau password salah");
      }

      if (user.is_aktif !== 1) {
        throw new Error("Akun tidak aktif");
      }

      const loginToken = randomBytes(32).toString("hex");
      user.login_token = loginToken;
      await userRepo.save(user);

      return {
        id: user.id_user,
        username: user.username,
        nama: user.nama,
        email: user.email,
        no_telepon: user.no_telepon,
        roles: user.userRoles.map((ur) => ur.role.nama_role),
        loginToken,
      };
    },
  }),
];
