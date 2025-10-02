import { protectPage } from "@/function/protectPage";
import ProfileClient from "./ProfileClient/page";

export default async function ProfilePage() {
  const session = await protectPage(["user", "admin"]);

  return <ProfileClient session={session} />;
}
