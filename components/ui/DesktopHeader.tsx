import React from "react";
import Nav from "./Nav";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidExit } from "react-icons/bi";

interface DesktopHeaderProps {
  userName: string;
  action: () => void;
  cartAction: () => void;
}

export default function DesktopHeader({
  userName,
  action,
  cartAction,
}: DesktopHeaderProps) {
  return (
    <div className="flex justify-between items-center px-4 md:px-16 py-4 w-full max-w-7xl mx-auto hidden md:flex">
      <div className="text-[#ff00ff] font-extrabold text-2xl tracking-tighter uppercase">
        BIENVENID@,{" "}
        <span className="text-amber-500 font-extrabold text-2xl tracking-tighter uppercase">
          {userName}
        </span>
      </div>
      <Nav />
      <div className="flex gap-6 text-[#ff00ff]">
        <button
          onClick={cartAction}
          className="hover:text-[#00fbfb] transition-colors duration-300 text-xl"
        >
          <FaShoppingCart />
        </button>
        <button
          onClick={action}
          className="hover:text-[#00fbfb] transition-colors duration-300 text-xl"
        >
          <BiSolidExit />
        </button>
      </div>
    </div>
  );
}
