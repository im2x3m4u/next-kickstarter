import { getConnection } from "@/lib/typeorm";
import { User } from "@/entities/user";
import { logActivity } from "@/function/activityHelp";

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
