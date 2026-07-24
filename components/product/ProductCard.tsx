import Image from "next/image";
import React from "react";

import { Book } from "@/types/index";

interface ProductCardProps {
  b: Book;
  action: () => void;
}

export default function ProductCard({ b, action }: ProductCardProps) {
  return (
    <article
      className="glass-card rounded-lg flex flex-col md:flex-row overflow-hidden group h-full"
      key={b.id}
    >
      <div className="w-full md:w-2/5 h-[300px] md:h-auto relative shrink-0 bg-black/20">
        <Image src={b.urlImage} alt={b.title} fill className="object-contain" />
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff00ff]"></span>
            <span className="text-xs text-[#a3a3a3] uppercase tracking-widest font-mono">
              {b.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff00ff] transition-colors">
            {b.title}
          </h3>
          <p className="text-[#a3a3a3] text-sm mb-4 line-clamp-3">
            {b.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <span className="text-[#00fbfb] font-bold font-mono">
            ${b.price.toFixed(2)}
          </span>
          <button
            className="border border-[#00fbfb] text-[#00fbfb] text-sm font-bold px-4 py-2 rounded hover:bg-[#00fbfb]/10 transition-colors"
            onClick={action}
          >
            + Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
