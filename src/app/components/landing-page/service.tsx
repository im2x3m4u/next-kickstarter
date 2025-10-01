"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, LineChart, GraduationCap, BadgeCheck, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export default function Service() {
  return (
    <section id="service" className="bg-gradient-to-b from-white via-violet-50 to-fuchsia-50 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
        <Badge
        variant="secondary"
        className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
      >
        <ShieldCheck className="h-3 w-3 text-indigo-600" />
        Layanan Produk
      </Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Fitur Unggulan untuk Transformasi HR yang Modern
          </h2>
          <p className="mt-4 text-gray-600">
            Solusi komprehensif untuk rekrutmen, pengembangan, hingga pengelolaan performa
            dalam satu platform yang mudah digunakan dan siap skala.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Rekrutmen & Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Kelola lowongan kerja, screening kandidat, hingga onboarding karyawan baru
              secara digital dengan alur yang terstandar.
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                <LineChart className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Manajemen Kinerja</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Penilaian berbasis target, feedback 360°, dan laporan performa otomatis untuk
              keputusan yang lebih akurat.
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Pelatihan & Pengembangan</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Sediakan e-learning, pelatihan internal, dan pantau perkembangan skill secara
              real-time.
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-sm">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Perencanaan Karir</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Bangun talent pool, career path, dan kaderisasi untuk posisi strategis secara
              terukur.
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className="group relative overflow-hidden border border-violet-100/80 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight text-black">Absensi & Kehadiran</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Pantau kehadiran, cuti, lembur, dan jadwal kerja karyawan secara akurat dan
              transparan.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
