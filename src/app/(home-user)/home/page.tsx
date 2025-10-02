import WelcomeSection from "@/app/components/home-user/WelcomeSection";
import ActivitySection from "@/app/components/home-user/ActivitySection";
import NavbarUser from "@/app/components/home-user/Navbar";
import { protectPage } from "@/function/protectPage";

export default async function HomeUser() {
  const session = await protectPage(["user"]);

  return (
    <div className=" mx-auto px-6 py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-violet-50 via-fuchsia-50 to-indigo-50">
      <NavbarUser />
      <WelcomeSection
        name={session.user.username || session.user.nama || "Pengguna"}
      />
      <ActivitySection />
    </div>
  );
}
