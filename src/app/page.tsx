import Image from "next/image";
import Navbar from "./components/landing-page/navbar";
import About from "./components/landing-page/about";
import CTA from "./components/landing-page/cta";
import Testimoni from "./components/landing-page/testimonials";
import Footer from "./components/footer";
import Hero from "./components/landing-page/hero";
import Service from "./components/landing-page/service";
import FAQ from "./components/landing-page/faq";
import WhyUs from "./components/landing-page/why-us";

export default function Home() {
  return (
<div>
  <Navbar />
  <Hero />
  <About />
  <Service />
  <WhyUs />
  <Testimoni />
  <FAQ />
  <CTA />
  <Footer />
</div>
  );
}
