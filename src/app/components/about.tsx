import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200 inline-flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Tentang Kami
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Bayangkan HR yang Lebih Cerdas dan Manusiawi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Platform manajemen talenta terpadu untuk menghubungkan tujuan bisnis
            dengan pertumbuhan karyawan melalui pengalaman modern dan data real‑time.
          </p>
        </div>
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">500+</p>
            <p className="text-sm text-gray-500">Perusahaan</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-purple-600">50K+</p>
            <p className="text-sm text-gray-500">Pengguna aktif</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-green-600">99%</p>
            <p className="text-sm text-gray-500">Kepuasan</p>
          </div>
        </div>

      </div>
    </section>
  );
}


