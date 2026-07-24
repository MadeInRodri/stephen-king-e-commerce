"use client";
import "./globals.css";
import { useEffect, useState } from "react";

//Next
import { useRouter } from "next/navigation";

//Componentes
import HeroSection from "@/components/ui/HeroSection";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/product/ProductCard";
import DesktopHeader from "@/components/ui/DesktopHeader";
import MobileHeader from "@/components/ui/MobileHeader";

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
  const route = useRouter();

  const exit = () => {
    route.push("/login");
  };

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
        <DesktopHeader
          userName={"A EL BAZAR DE LAS PESADILLAS"}
          action={exit}
          cartAction={() => {
            route.push("/cart");
          }}
        />

        <MobileHeader
          userName={"A EL BAZAR DE LAS PESADILLAS"}
          action={exit}
          cartAction={() => {
            route.push("/cart");
          }}
        />
      </header>

      <main className="flex-grow pt-24 pb-32">
        <HeroSection />

        <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-12">
          <h2 className="text-3xl font-bold text-white mb-10 border-b border-white/15 pb-4">
            Más Populares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newBooks.map((b) => (
              <ProductCard b={b} action={exit} key={b.id} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
