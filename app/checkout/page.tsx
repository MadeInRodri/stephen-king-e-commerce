"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaFilePdf, FaEnvelope } from "react-icons/fa"; // Iconos para los botones
import Footer from "@/components/ui/Footer";
import Nav from "@/components/ui/Nav";

interface cartBook {
  id: number;
  title: string;
  price: number;
  urlImage: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<cartBook[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shipping = 5.0;
  const finalTotal = total > 0 ? total + shipping : 0;

  return (
    <div className="text-[#e5e2e1] min-h-screen flex flex-col relative overflow-x-hidden bg-[#050505] font-sans">
      <header className="bg-[#131313]/90 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 z-50">
        <div className="flex justify-between items-center px-4 md:px-16 py-4 w-full max-w-7xl mx-auto hidden md:flex">
          <div className="text-[#ff00ff] font-extrabold text-2xl tracking-tighter uppercase">
            EL BAZAR DE LAS PESADILLAS
          </div>
          <Nav />
          <div className="flex gap-6 text-[#ff00ff]">
            <button className="hover:text-[#00fbfb] transition-colors duration-300 text-xl">
              <FaShoppingCart />
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center px-4 py-4 border-b border-white/10">
          <div className="text-[#ff00ff] font-extrabold text-lg tracking-tighter uppercase">
            EL BAZAR DE LAS <br /> PESADILLAS
          </div>
          <button className="text-[#ff00ff] hover:text-[#00fbfb] transition-colors duration-300 text-xl">
            <FaShoppingCart />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-32 px-4 md:px-16 max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Finalizar Compra
          </h1>
          <p className="text-[#a3a3a3] mt-2">
            Revisa los detalles de tu orden antes de generar la factura.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <div className="w-full lg:col-span-4 order-1 lg:order-2 sticky top-[120px]">
            <div className="bg-[#131313] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                Resumen de Factura
              </h2>

              <div className="space-y-4 text-sm text-[#a3a3a3]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Envío (A la niebla)</span>
                  <span className="text-white">${shipping.toFixed(2)} USD</span>
                </div>
                <hr className="border-t border-dashed border-white/10 my-4" />
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-bold">Total Final</span>
                  <span className="text-[#00fbfb] font-mono font-bold">
                    ${finalTotal.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <button className="w-full bg-[#ff00ff] text-black font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#d900d9] transition-colors active:scale-95 text-sm">
                  <FaFilePdf className="text-lg" />
                  Descargar Factura PDF
                </button>

                <button className="w-full border border-[#00fbfb] text-[#00fbfb] font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00fbfb]/10 transition-colors active:scale-95 text-sm">
                  <FaEnvelope className="text-lg" />
                  Enviar al Correo
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-8 order-2 lg:order-1">
            <div className="bg-[#131313] border border-white/10 rounded-xl p-2 md:p-6 overflow-x-auto">
              <table
                id="factura-table"
                className="w-full text-left border-collapse min-w-[500px]"
              >
                <thead>
                  <tr className="border-b border-white/10 text-[#a3a3a3] uppercase text-xs font-mono tracking-widest">
                    <th className="py-4 px-2 font-normal">Producto</th>
                    <th className="py-4 px-2 font-normal text-center">Cant.</th>
                    <th className="py-4 px-2 font-normal text-right">
                      Precio Unit.
                    </th>
                    <th className="py-4 px-2 font-normal text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {cartItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-[#a3a3a3]"
                      >
                        El carrito está vacío.
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-2">
                          <span className="font-bold text-white block">
                            {item.title}
                          </span>
                          <span className="text-xs text-[#a3a3a3] font-mono">
                            ID: {item.id}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-center text-white">
                          {item.quantity}
                        </td>
                        <td className="py-4 px-2 text-right text-[#a3a3a3] font-mono">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-2 text-right text-[#00fbfb] font-mono font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
