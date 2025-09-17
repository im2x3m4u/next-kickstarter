import Image from "next/image";
import Navbar from "./components/navbar";
import About from "./components/about";
import CTA from "./components/cta";
import Testimoni from "./components/testimonials";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Service from "./components/service";
import FAQ from "./components/faq";
import WhyUs from "./components/why-us";

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
