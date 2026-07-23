import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

interface cartBook {
  id: number;
  title: string;
  price: number;
  urlImage: string;
  quantity: number;
}

interface CartItemProps {
  b: cartBook;
  substractCartItem: (id: number) => void;
  addCartItem: (id: number) => void;
  handleRemoveClick: (id: number) => void;
}

export default function CartItem({
  b,
  substractCartItem,
  addCartItem,
  handleRemoveClick,
}: CartItemProps) {
  return (
    <article
      className="cart-item-panel rounded-xl flex p-3 gap-4 items-center group"
      key={b.id}
    >
      <div className="w-[70px] h-[100px] relative shrink-0 bg-[#0e0e0e] rounded overflow-hidden">
        <Image
          src={b.urlImage}
          alt="El Resplandor"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="text-lg font-bold text-white leading-tight mb-1">
            {b.title}
          </h3>
          <p className="text-[#00fbfb] text-sm font-mono font-bold mb-3">
            ${b.price}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 bg-[#050505] rounded-md px-2 py-1 border border-white/10">
            <button
              className="text-[#a3a3a3] hover:text-[#ff00ff] transition-colors font-bold px-1"
              onClick={() => substractCartItem(b.id)}
            >
              −
            </button>
            <span className="text-white text-sm font-mono">{b.quantity}</span>
            <button
              className="text-[#a3a3a3] hover:text-[#ff00ff] transition-colors font-bold px-1"
              onClick={() => {
                addCartItem(b.id);
              }}
            >
              +
            </button>
          </div>
          <button
            className="text-[#a3a3a3] hover:text-red-500 transition-colors p-1"
            onClick={() => handleRemoveClick(b.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}
