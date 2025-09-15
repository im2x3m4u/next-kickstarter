import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Siap Mengubah Cara Mengelola Talenta?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Bergabunglah dengan ratusan perusahaan yang telah merasakan manfaat
          sistem HR modern kami
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="/register" className="flex items-center gap-2">
              Mulai Gratis Sekarang
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
<section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
{/* Background decoration */}
<div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
<div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
<div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

<div className="container mx-auto px-6 text-center relative z-10">
  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
    Siap Mengubah Cara Mengelola Talenta?
  </h2>
  <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
    Bergabunglah dengan ratusan perusahaan yang telah merasakan manfaat
    sistem HR modern kami
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Button
      asChild
      size="lg"
      className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <a href="/register" className="flex items-center gap-2">
        Mulai Gratis Sekarang
        <ArrowRight className="w-5 h-5" />
      </a>
    </Button>
  </div>
</div>
</section>