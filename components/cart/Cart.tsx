import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import CartItem from "./CartItem";

interface cartBook {
  id: number;
  title: string;
  price: number;
  urlImage: string;
  quantity: number;
}

interface CartProps {
  cartItems: cartBook[];
  total: number;
  setIsCartOpen: (isOpen: boolean) => void;
  addCartItem: (id: number) => void;
  substractCartItem: (id: number) => void;
  handleRemoveClick: (id: number) => void;
}

// 3. Desestructuramos las props directamente en los parámetros de la función
export default function Cart({
  cartItems,
  total,
  setIsCartOpen,
  addCartItem,
  substractCartItem,
  handleRemoveClick,
}: CartProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden md:block"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 w-full md:w-[450px] bg-[#050505] md:border-l md:border-white/10 z-50 flex flex-col shadow-2xl">
        <div className="pt-8 pb-4 px-6 flex items-center justify-between border-b border-white/10">
          <h2 className="text-2xl font-extrabold text-[#ff00ff] uppercase tracking-tighter">
            Carrito
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#a3a3a3] hover:text-white transition-colors text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
          {cartItems.map((b) => (
            <CartItem
              b={b}
              substractCartItem={substractCartItem}
              addCartItem={addCartItem}
              handleRemoveClick={handleRemoveClick}
              key={b.id}
            />
          ))}
        </div>

        <div className="bg-[#131313] border-t border-white/10 p-6">
          <div className="flex justify-between items-end mb-6">
            <span className="text-[#a3a3a3] uppercase tracking-widest text-xs font-bold">
              Total
            </span>
            <span className="text-xl font-bold text-[#ff00ff] font-mono">
              ${total}
            </span>
          </div>
          <button className="w-full bg-[#ff00ff] text-black font-bold py-4 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#d900d9] transition-colors active:scale-95">
            Finalizar Compra →
          </button>
        </div>
      </div>
    </>
  );
}
