import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] w-full mt-auto border-t border-dashed border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-6 gap-4 w-full max-w-7xl mx-auto">
        <div className="font-extrabold text-xl text-[#ff00ff] text-center md:text-left tracking-tighter">
          EL BAZAR DE LAS PESADILLAS
        </div>
        <div className="text-[#00fbfb] font-mono text-xs text-center">
          By: MadeInRodri
        </div>
      </div>
    </footer>
  );
}
