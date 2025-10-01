"use client"

import { CheckCircle2, Sparkles, ShieldCheck, BarChart3, ThumbsUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-violet-400/30 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-400/25 to-sky-400/25 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
        <Badge
        variant="secondary"
        className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
      >
        <Sparkles className="h-3 w-3 text-violet-600" />
        Mengapa Memilih Kami
      </Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Solusi Manajemen Talenta yang Terpercaya dan Siap Bertumbuh
          </h2>
          <p className="mt-4 text-gray-700">
            Kami menghadirkan platform yang modern, aman, dan mudah digunakan untuk membantu tim HR Anda bekerja lebih cepat dan terukur.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">UI/UX Modern</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Antarmuka intuitif yang memudahkan adopsi pengguna dan mempercepat proses kerja harian tim HR.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Keamanan Enterprise</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Enkripsi data, kontrol akses berbasis peran, dan audit trail untuk menjaga kerahasiaan dan integritas data.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Insight Terukur</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Dashboard performa, analitik, dan laporan otomatis membantu pengambilan keputusan berbasis data.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Kolaborasi Tim</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Alur kerja dan persetujuan lintas divisi yang transparan memudahkan koordinasi dan akuntabilitas.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Implementasi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Onboarding didampingi tim kami dengan template dan best practice sehingga go-live lebih cepat.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-sm">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Support Responsif</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Tim dukungan lokal yang cepat dan proaktif memastikan operasional Anda selalu lancar.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


