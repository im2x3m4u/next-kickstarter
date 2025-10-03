"use client";
import Image from "next/image";

export default function HomeContent({ name }: { name: string }) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
      {/* Left */}
      <div className="order-2 text-center md:text-left md:order-1">
        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
          Selamat Datang, {name}! 👋
        </h1>
        <p className="mt-4 text-gray-600">
          di website manajemen talent
        </p>
      </div>

      {/* Right */}
      <div className="order-1 relative mx-auto w-full max-w-xl md:mx-0 md:order-2">
        <Image
          src="/undraw_reading_atc8.svg"
          alt="Hero Illustration"
          width={640}
          height={480}
          priority
          className="mx-auto h-auto w-full max-w-sm sm:max-w-md md:max-w-none object-contain"
        />
      </div>
    </div>
  );
}
