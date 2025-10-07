import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-fuchsia-50 to-indigo-50">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-violet-500/30 via-fuchsia-400/25 to-pink-400/25 blur-3xl hidden sm:block" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-400/25 via-violet-400/25 to-sky-400/20 blur-3xl hidden sm:block" />
        <div className="absolute -top-12 -right-20 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-400/25 to-amber-300/20 blur-3xl hidden md:block" />
        <div className="absolute -bottom-16 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-300/20 to-teal-300/20 blur-3xl hidden md:block" />
      </div>

      <div className="container mx-auto px-6 py-16 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
          {/* Left content */}
          <div className="order-2 text-center md:text-left md:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
              Rilis Fitur Baru: Performance Dashboard
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
              Kelola Talenta Perusahaan Anda dengan
              <span className="block bg-gradient-to-r from-violet-700 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                Mudah, Cepat, dan Terukur
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Tingkatkan produktivitas, kembangkan potensi, dan capai target
              perusahaan dengan platform manajemen talenta yang modern,
              terintegrasi, dan siap skala untuk kebutuhan enterprise.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start sm:gap-4 md:items-stretch md:gap-5">
              <Button asChild className="h-11 px-6 text-base shadow-sm">
                <a
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Mulai Sekarang
                  <span aria-hidden>→</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-11 px-6 text-base">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#AD49E1] text-black border hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Pelajari Lebih Lanjut
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm text-gray-500 sm:flex-row sm:justify-start">
              <div>Dipercaya tim HR di 50+ perusahaan</div>
              <span className="hidden sm:block">•</span>
              <div>Implementasi cepat & dukungan lokal</div>
            </div>
          </div>

          {/* Right content */}
          <div className="order-1 relative mx-auto w-full max-w-xl md:mx-0 md:order-2">
            <div className="relative">
              <div className="">
                <Image
                  src="/undraw_reading_atc8.svg"
                  alt="Hero Illustration"
                  width={640}
                  height={480}
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 480px"
                  className="mx-auto h-auto w-full max-w-sm sm:max-w-md md:max-w-none object-contain"
                  priority
                />
              </div>
            </div>
            {/* Subtle glow */}
            <div className="absolute -inset-x-6 -bottom-6 h-16 bg-gradient-to-t from-violet-500/20 to-transparent blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
