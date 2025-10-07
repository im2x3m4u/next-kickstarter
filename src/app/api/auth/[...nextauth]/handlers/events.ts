import { getConnection } from "@/lib/typeorm";
import { User } from "@/entities/user";
import { logActivity } from "@/function/activityHelp";
// import { UserSession } from "@/entities/UserSession";

// signIn
export const signIn = async ({ user }: { user: any }) => {
  if (!user?.id) return;

  const redirectUrl = user.roles.includes("admin") ? "/dashboard" : "/home";
  await logActivity(user.id.toString(), "Pengguna Login", { url: redirectUrl });
};

// signOut
export const signOut = async ({ token }: { token: any }) => {
  if (!token?.id) return;

  const ds = await getConnection();
  const userRepo = ds.getRepository(User);
  const user = await userRepo.findOne({ where: { id_user: token.id } });
  if (!user) return;

  user.login_token = null;
  await userRepo.save(user);

  await logActivity(token.id.toString(), "Pengguna Logout", { url: "/logout" });
};

// export const signOut = async ({ token }: { token: any }) => {
//    if (!token?.id || !token?.loginToken) return;
//   try {
//     const ds = await getConnection();
//     const sessionRepo = ds.getRepository(UserSession);

//     // Hapus hanya sesi yg cocok
//     await sessionRepo.delete({ token: token.loginToken });

//     await logActivity(token.id.toString(), "Pengguna Logout", { url: "/logout" });
//   } catch (err) {
//     console.error("Failed to log logout activity:", err);
//   }
// };

