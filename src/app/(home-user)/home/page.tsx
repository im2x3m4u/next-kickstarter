import WelcomeSection from "@/app/components/home-user/WelcomeSection";
import ActivitySection from "@/app/components/home-user/ActivitySection";
import NavbarUser from "@/app/components/home-user/Navbar";

export default function HomeUser() {
  return (
    <div className=" mx-auto px-6 py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-violet-50 via-fuchsia-50 to-indigo-50">
      <NavbarUser />
      <WelcomeSection name="Shela" />
      <ActivitySection />
    </div>
  );
}
