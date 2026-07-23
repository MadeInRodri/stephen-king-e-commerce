"use client";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/ui/HeroSection";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  urlImage: string;
  category: string;
  description: string;
}

export default function LandingPage() {
  //Libros
  const [newBooks, setNewBooks] = useState<Book[]>([]);

  useEffect(() => {
    //Función para traer el json
    const fetchRandomBooks = async () => {
      try {
        //Lo traemos
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Error de conexión");

        const books: Book[] = await response.json();

        const max = books.length - 1;
        const min = 0;
        const cantidad = 6;

        const numeros = new Set<number>();

        while (numeros.size < cantidad) {
          const num = Math.floor(Math.random() * (max - min + 1)) + min;
          numeros.add(num);
        }

        const randomBooksArray: Book[] = [];

        for (const index of numeros) {
          randomBooksArray.push(books[index]);
        }

        setNewBooks(randomBooksArray);
      } catch (error) {
        console.error("Error cargando los libros:", error);
      }
    };

    // Llamamos a la función
    fetchRandomBooks();
  }, []);

  return (
    <div className="text-[#e5e2e1] min-h-screen flex flex-col relative overflow-x-hidden bg-[#050505] font-sans">
      <header className="bg-[#131313]/90 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 z-50">
        <div className="flex justify-between items-center px-4 md:px-16 py-4 w-full max-w-7xl mx-auto hidden md:flex">
          <div className="text-[#ff00ff] font-extrabold text-2xl tracking-tighter uppercase">
            EL BAZAR DE LAS PESADILLAS
          </div>
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
          <div className="flex gap-6 text-[#ff00ff]">
            <Link
              href="/login"
              className="hover:text-[#00fbfb] transition-colors duration-300"
            >
              <FaShoppingCart />
            </Link>
          </div>
        </div>

        <div className="md:hidden flex justify-center items-center py-4 border-b border-white/10">
          <div className="text-[#ff00ff] font-extrabold text-xl tracking-tighter uppercase text-center">
            EL BAZAR DE LAS <br /> PESADILLAS
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32">
        <HeroSection />

        <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-12">
          <h2 className="text-3xl font-bold text-white mb-10 border-b border-white/15 pb-4">
            Más Populares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newBooks.map((b) => (
              <article
                className="glass-card rounded-lg flex flex-col md:flex-row overflow-hidden group h-full"
                key={b.id}
              >
                <div className="w-full md:w-2/5 h-[300px] md:h-auto relative shrink-0 bg-black/20">
                  <Image
                    src={b.urlImage}
                    alt={b.title}
                    fill
                    className="object-contain"
                  />
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
                      ${b.price}
                    </span>
                    <Link
                      href="/login"
                      className="border border-[#00fbfb] text-[#00fbfb] text-sm font-bold px-4 py-2 rounded hover:bg-[#00fbfb]/10 transition-colors"
                    >
                      + Agregar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
