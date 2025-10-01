import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Shield, Zap, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-indigo-50 to-violet-50 scroll-mt-20">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-violet-400/30 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-400/25 to-sky-400/25 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-56 w-56 rounded-full bg-gradient-to-tr from-amber-300/20 to-rose-400/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-3 bg-violet-50 text-violet-700 border-violet-200"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan
            tentang sistem kami
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="divide-y rounded-2xl border border-violet-100/70 bg-white/70 backdrop-blur shadow-sm">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="group w-full px-6 py-5 text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline data-[state=open]:bg-violet-50">
                <div className="flex items-center gap-3">
                  <span className="inline-grid size-9 place-items-center rounded-md bg-indigo-100 text-indigo-700">
                    <HelpCircle className="size-5" />
                  </span>
                  Apakah sistem ini cocok untuk perusahaan kecil?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                Ya, sistem kami dirancang dengan fleksibilitas tinggi dan dapat digunakan oleh perusahaan skala kecil hingga besar. Kami menyediakan paket yang disesuaikan dengan kebutuhan dan budget perusahaan Anda.
              </AccordionContent>
              <hr className="mx-6 my-2 border-t border-gray-200" aria-hidden="true" />
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="group w-full px-6 py-5 text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline data-[state=open]:bg-violet-50">
                <div className="flex items-center gap-3">
                  <span className="inline-grid size-9 place-items-center rounded-md bg-green-100 text-green-700">
                    <Shield className="size-5" />
                  </span>
                  Bagaimana keamanan data karyawan dijaga?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                Kami menggunakan enkripsi tingkat enterprise, standar keamanan ISO 27001, dan audit keamanan berkala. Data Anda dilindungi dengan teknologi terdepan dan backup otomatis untuk memastikan keamanan maksimal.
              </AccordionContent>
              <hr className="mx-6 my-2 border-t border-gray-200" aria-hidden="true" />
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="group w-full px-6 py-5 text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline data-[state=open]:bg-violet-50">
                <div className="flex items-center gap-3">
                  <span className="inline-grid size-9 place-items-center rounded-md bg-purple-100 text-purple-700">
                    <Zap className="size-5" />
                  </span>
                  Apakah tersedia fitur integrasi dengan sistem lain?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                Ya, sistem ini mendukung integrasi API dengan berbagai aplikasi HR, payroll, dan sistem enterprise lainnya. Kami juga menyediakan webhook dan connector untuk integrasi yang lebih mudah.
              </AccordionContent>
              <hr className="mx-6 my-2 border-t border-gray-200" aria-hidden="true" />
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="group w-full px-6 py-5 text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline data-[state=open]:bg-violet-50">
                <div className="flex items-center gap-3">
                  <span className="inline-grid size-9 place-items-center rounded-md bg-rose-100 text-rose-700">
                    <Users className="size-5" />
                  </span>
                  Berapa lama waktu implementasi sistem?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                Implementasi biasanya memakan waktu 2-4 minggu tergantung kompleksitas kebutuhan perusahaan. Tim kami akan mendampingi proses migrasi data dan pelatihan pengguna secara menyeluruh.
              </AccordionContent>
            </AccordionItem>
            <hr className="mx-6 my-2 border-t border-gray-200" aria-hidden="true" />
          </Accordion>
        </div>
      </div>
    </section>
  );
}


