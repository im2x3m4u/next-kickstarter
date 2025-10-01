"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

export default function Testimoni() {
  return (
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden scroll-mt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm"
            >
              <Quote className="w-4 h-4 mr-2" />
              Testimoni
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dengar pengalaman langsung dari klien yang telah merasakan manfaat
              sistem kami
            </p>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-6 pb-16"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <Card className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 p-8 h-[420px] lg:h-[420px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                  "Sistem ini sangat membantu HR dalam mengelola karyawan lebih
                  efisien. Interface yang modern dan fitur yang lengkap."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-white">Andi</p>
                    <p className="text-blue-200 text-sm">HR Manager</p>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <Card className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 p-8 h-[420px] lg:h-[420px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                  "Pelatihan karyawan jadi lebih terukur dengan progress yang
                  jelas. Dashboard yang informatif dan mudah dipahami."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sinta</p>
                    <p className="text-green-200 text-sm">Learning Officer</p>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <Card className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 p-8 h-[420px] lg:h-[420px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                  "Membantu kami merencanakan karir karyawan secara strategis.
                  ROI yang terlihat jelas dalam produktivitas tim."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <div>
                    <p className="font-semibold text-white">Budi</p>
                    <p className="text-purple-200 text-sm">CEO</p>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <Card className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 p-8 h-[420px] lg:h-[420px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                  "Onboarding karyawan jadi lebih cepat dan terstruktur. Tim kami bisa produktif sejak hari pertama."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <p className="font-semibold text-white">Rani</p>
                    <p className="text-orange-200 text-sm">People Partner</p>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            {/* Slide 5 */}
            <SwiperSlide>
              <Card className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 p-8 h-[420px] lg:h-[420px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                  "Analitik performa membantu kami mengambil keputusan lebih cepat. Sangat rekomendasi!"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    N
                  </div>
                  <div>
                    <p className="font-semibold text-white">Nadia</p>
                    <p className="text-pink-200 text-sm">Head of HR</p>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
  );
}
