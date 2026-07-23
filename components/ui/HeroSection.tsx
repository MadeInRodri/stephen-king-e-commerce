import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-24 flex flex-col md:flex-row items-center gap-8 relative">
      <div className="w-full md:w-1/2 z-10 text-center md:text-left flex flex-col items-center md:items-start">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          El Maestro <br /> <span className="text-[#ff00ff]">del Terror</span>
        </h1>
        <p className="text-[#a3a3a3] text-base md:text-lg mb-8 max-w-md">
          Adéntrate en el universo del autor que redefinió el miedo. Descubre
          ediciones exclusivas, clásicos inmortales y el vacío que se esconde
          detrás de cada página.
        </p>
        <Link
          href="/login"
          className="bg-[#ff00ff] text-black font-bold px-8 py-4 rounded-md hover:bg-[#d900d9] transition-colors"
        >
          Ver Catálogo →
        </Link>
      </div>
      <div className="w-full md:w-1/2 relative mt-8 md:mt-0 h-[400px] md:h-[600px]">
        <div className="relative w-full h-full rounded-xl overflow-hidden glass-card">
          <Image
            src="/stephen-king.jpg"
            alt="Stephen King Vibe"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
