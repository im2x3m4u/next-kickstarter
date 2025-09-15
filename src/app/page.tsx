import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  LineChart,
  GraduationCap,
  BadgeCheck,
  Clock,
  Quote,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";


import Navbar from "./components/navbar";
import Testimonials from "./components/testimonials";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";
import About from "./components/about";
import heroIllustration from "@/assets/undraw_reading_atc8.svg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden scroll-mt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 px-6 py-20 md:flex-row md:gap-16 relative z-10">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <Badge
              variant="secondary"
              className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Solusi HR Terdepan
            </Badge>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent md:text-6xl lg:text-7xl leading-tight">
              Kelola Talenta Perusahaan Anda dengan Mudah
            </h1>

            <p className="mt-8 text-xl text-gray-600 max-w-2xl leading-relaxed">
              Tingkatkan produktivitas, kembangkan potensi, dan capai target
              perusahaan dengan sistem manajemen talenta yang terintegrasi dan
              modern.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-start sm:gap-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="/register" className="flex items-center gap-2">
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                <a href="/about">Pelajari Lebih Lanjut</a>
              </Button>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur-2xl opacity-20 scale-110"></div>
              <Image
                src={heroIllustration}
                alt="Hero Illustration"
                width={600}
                height={500}
                className="object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* Service Section */}
      <section id="service" className="py-24 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 bg-blue-50 text-blue-700 border-blue-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              Fitur Terdepan
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Solusi lengkap untuk mengelola talenta perusahaan Anda dengan
              teknologi terdepan
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Rekrutmen & Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Kelola lowongan kerja, screening kandidat, hingga onboarding
                  karyawan baru secara digital dengan workflow yang efisien.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <LineChart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Manajemen Kinerja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Penilaian berbasis target, feedback 360°, dan laporan performa
                  otomatis untuk pengembangan berkelanjutan.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Pelatihan & Pengembangan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Sediakan e-learning, pelatihan internal, dan pantau progress
                  skill karyawan dengan dashboard yang intuitif.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BadgeCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Perencanaan Karir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Bangun talent pool, career path, dan siapkan kaderisasi untuk
                  posisi strategis dengan perencanaan yang matang.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Absensi & Kehadiran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Pantau kehadiran, cuti, lembur, dan jadwal kerja karyawan
                  dengan akurat menggunakan teknologi terdepan.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Keamanan Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Lindungi data karyawan dengan enkripsi tingkat enterprise dan
                  standar keamanan internasional terbaru.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200"
            >
              <Shield className="w-4 h-4 mr-2" />
              Keunggulan Kami
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Kenapa Memilih Kami?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami hadir untuk membantu perusahaan Anda mengelola talenta dengan
              cara yang lebih efisien, modern, dan terukur dengan teknologi
              terdepan.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Terintegrasi
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Semua proses HR dalam satu platform yang mudah digunakan dengan
                interface yang intuitif dan modern.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LineChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Data Akurat
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Laporan real-time untuk mendukung pengambilan keputusan
                strategis dengan analitik yang mendalam.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Skalabilitas
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Cocok untuk perusahaan kecil hingga besar dengan fleksibilitas
                penuh dan performa yang optimal.
              </p>
            </div>
          </div>
        </div>
      </section>



      <Testimonials/>
      <FAQ />
      <CTA /> 
      <Footer />
    </div>
  );
}
