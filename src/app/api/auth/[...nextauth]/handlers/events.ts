import { getConnection } from "@/lib/typeorm";
import { User } from "@/entities/user";
import { logActivity } from "@/function/activityHelp";

// signIn modular
export const signIn = async (user: any) => {
  if (!user?.id) return;
  try {
    const redirectUrl = user.roles.includes("admin") ? "/dashboard" : "/home";
    await logActivity(user.id.toString(), "Pengguna Login", { url: redirectUrl });
  } catch (err) {
    console.error("Failed to log login activity:", err);
  }
};

// signOut modular
export const signOut = async (token: any) => {
  if (!token?.id) return;
  try {
    const ds = await getConnection();
    const userRepo = ds.getRepository(User);
    const user = await userRepo.findOne({ where: { id_user: token.id } });
    if (user) {
      user.login_token = null;
      await userRepo.save(user);
    }
    await logActivity(token.id.toString(), "Pengguna Logout", { url: "/logout" });
  } catch (err) {
    console.error("Failed to log logout activity:", err);
  }
};
