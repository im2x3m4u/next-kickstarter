import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getConnection } from "@/lib/typeorm";
import { verifyPassword } from "@/lib/crypto";
import { randomBytes } from "crypto";
import { User } from "@/entities/user";

export const authOptions = {
  providers: [
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

        // Generate login_token server-side
        const loginToken = randomBytes(32).toString("hex");
        user.login_token = loginToken;
        await userRepo.save(user);

        return {
          id: user.id_user,
          username: user.username,
          nama: user.nama,
          email: user.email,
          roles: user.userRoles.map((ur) => ur.role.nama_role),
          loginToken,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.nama = user.nama;
        token.email = user.email;
        token.roles = user.roles;
        token.loginToken = user.loginToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          nama: token.nama,
          email: token.email,
          roles: token.roles,
          loginToken: token.loginToken,
        };
      }
      return session;
    },
  },
  events: {
    // Logout server-side: hapus login_token di database
    async signOut({ token }) {
      if (!token?.id) return;
      const ds = await getConnection();
      const userRepo = ds.getRepository(User);
      const user = await userRepo.findOne({ where: { id_user: token.id } });
      if (user) {
        user.login_token = null;
        await userRepo.save(user);
      }
    },
  },
};

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;

