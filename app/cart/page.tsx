"use client";
import "../globals.css";

import { useState, useEffect } from "react";
import { toast } from "sonner";

//Next
import { useRouter } from "next/navigation";

//Componentes
import Cart from "@/components/cart/Cart";
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
    "A EL BAZAR DE LAS PESADILLAS",
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

    //Mandamos a traer los libros
    const fetchBooks = async () => {
      const activeSession = sessionStorage.getItem("activeUser");
      if (!activeSession) {
        route.push("/login");
      }
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
      <header className="bg-[#131313]/90 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 z-30">
        <DesktopHeader
          userName={userName}
          action={exit}
          cartAction={() => setIsCartOpen(true)}
        />

        <MobileHeader
          userName={userName}
          action={exit}
          cartAction={() => setIsCartOpen(true)}
        />
      </header>

      <main className="flex-grow pt-24 pb-32">
        <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-12">
          <h2 className="text-3xl font-bold text-white mb-10 border-b border-white/15 pb-4">
            Nuestro catálogo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((b) => (
              <ProductCard
                b={b}
                action={() => {
                  addCartItem(b.id);
                }}
                key={b.id}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

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
