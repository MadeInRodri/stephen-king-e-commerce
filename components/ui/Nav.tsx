import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="flex gap-6">
      <Link
        href="/"
        className="text-[#ff00ff] font-bold border-b-2 border-[#ff00ff] pb-1 hover:text-[#00fbfb] transition-colors duration-300"
      >
        Inicio
      </Link>
      <Link
        href="/login"
        className="text-[#a3a3a3] hover:text-[#00fbfb] transition-colors duration-300"
      >
        Catálogo
      </Link>
      <Link
        href="/login"
        className="text-[#a3a3a3] hover:text-[#00fbfb] transition-colors duration-300"
      >
        Novedades
      </Link>
      <Link
        href="/login"
        className="text-[#a3a3a3] hover:text-[#00fbfb] transition-colors duration-300"
      >
        Autores
      </Link>
    </nav>
  );
}
