"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { BiSolidExit } from "react-icons/bi";
import "../globals.css";
import Cart from "@/components/cart/Cart";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  urlImage: string;
  category: string;
  description: string;
}

interface userData {
  fullName: string;
  email: string;
}

interface cartBook {
  id: number;
  title: string;
  price: number;
  urlImage: string;
  quantity: number;
}

export default function CartPage() {
  //States
  const [books, setBooks] = useState<Book[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userName, setUserName] = useState<string>(
    "EL BAZAR DE LAS PESADILLAS",
  );
  const [cartItems, setCartItems] = useState<cartBook[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  //Calculando el total...
  const total = cartItems.reduce((acumulador, item) => {
    return acumulador + item.price * item.quantity;
  }, 0);

  //Agregar al carrito
  const addCartItem = (id: number) => {
    //Existe el libro? sino, fuera
    const book = books.find((b) => b.id === id);
    if (!book) return;

    //Ya está en mi carrito?
    const existingItem = cartItems.find((item) => item.id === id);
    let updatedCart: cartBook[];

    //Sisi, solo le sumamos 1 a la cantidad
    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      toast.success(`Se ha añadido otro ${book.title} al carrito`);

      //Si no, agregamos uno nuevo
    } else {
      const newItem: cartBook = {
        id: Number(book.id),
        title: book.title,
        price: book.price,
        urlImage: book.urlImage,
        quantity: 1,
      };

      //Reescribiendo el array
      updatedCart = [...cartItems, newItem];
      toast.success(`Se ha agregado ${book.title} al carrito`);
    }

    //Seteamos y guardamos en el local
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  //Borrar libro del carrito
  const removeCartItem = (id: number) => {
    //Solo filtramos el arreglo
    const updatedCart = cartItems.filter((book) => book.id !== id);

    //Y lo reescribimos en todos lados
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  //Alerta para remover
  const handleRemoveClick = (id: number) => {
    toast.error("¿Deseas eliminar este libro del carrito?", {
      description: "Esta acción no se puede deshacer.",
      duration: 5000,
      action: {
        label: "Sí, eliminar",
        onClick: () => removeCartItem(id),
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  //Restar libros del carrito
  const substractCartItem = (id: number) => {
    //Si no existe, fuera
    const existingItem = cartItems.find((item) => item.id === id);
    if (!existingItem) return;

    //Si si, pero hay más de uno
    if (existingItem.quantity > 1) {
      //Restamos 1 al quantity
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );

      //Seteamos todo
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      toast.success(
        `Se ha retirado una copia de ${existingItem.title} del carrito`,
      );
    } else {
      //Sino, removemos con la función ya hecha
      handleRemoveClick(id);
    }
  };

  const route = useRouter();

  //Cerrar sesión
  const exit = () => {
    //Destruimos la sesión
    sessionStorage.clear();
    toast.info("Se ha cerrado sesión exitosamente, redirigiendo...");
    setTimeout(() => {
      route.push("/");
    }, 2000);
  };

  //Effect para verificar sesión activa y data
  useEffect(() => {
    //Si no hay sesión, para el login
    const activeSession = sessionStorage.getItem("activeUser");
    if (!activeSession) {
      route.push("/login");
    }

    //Mandamos a traer los libros
    const fetchBooks = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Error de conexión");

        //De paso traemos los datos del usuario
        const books: Book[] = await response.json();
        const user: userData = JSON.parse(activeSession as string);

        setBooks(books);
        setUserName(user.fullName);
      } catch (error) {
        console.error("Error cargando los libros:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="text-[#e5e2e1] min-h-screen flex flex-col relative overflow-x-hidden bg-[#050505] font-sans">
      {/* Header */}
      <header className="bg-[#131313]/90 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 z-30">
        <div className="flex justify-between items-center px-4 md:px-16 py-4 w-full max-w-7xl mx-auto hidden md:flex">
          <div className="text-[#ff00ff] font-extrabold text-2xl tracking-tighter uppercase">
            BIENVENID@,{" "}
            <span className="text-amber-500 font-extrabold text-2xl tracking-tighter uppercase">
              {userName}
            </span>
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
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[#00fbfb] transition-colors duration-300 text-xl"
            >
              <FaShoppingCart />
            </button>
            <button
              onClick={exit}
              className="hover:text-[#00fbfb] transition-colors duration-300 text-xl"
            >
              <BiSolidExit />
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center px-4 py-4 border-b border-white/10">
          <div className="text-[#ff00ff] font-extrabold text-lg tracking-tighter uppercase">
            BIENVENID@, <br />
            <span className="text-amber-500 font-extrabold text-lg tracking-tighter uppercase">
              {userName}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-[#ff00ff] hover:text-[#00fbfb] transition-colors duration-300 text-xl"
            >
              <FaShoppingCart />
            </button>
            <button
              onClick={exit}
              className="text-[#ff00ff] hover:text-[#00fbfb] transition-colors duration-300 text-xl"
            >
              <BiSolidExit />
            </button>
          </div>
        </div>
      </header>

      {/* Catálogo Principal */}
      <main className="flex-grow pt-24 pb-32">
        <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-12">
          <h2 className="text-3xl font-bold text-white mb-10 border-b border-white/15 pb-4">
            Nuestro catálogo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((b) => (
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
                    <button
                      className="border border-[#00fbfb] text-[#00fbfb] text-sm font-bold px-4 py-2 rounded hover:bg-[#00fbfb]/10 transition-colors"
                      onClick={() => {
                        addCartItem(b.id);
                      }}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
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

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          total={total}
          setIsCartOpen={setIsCartOpen}
          addCartItem={addCartItem}
          substractCartItem={substractCartItem}
          handleRemoveClick={handleRemoveClick}
        />
      )}
    </div>
  );
}
