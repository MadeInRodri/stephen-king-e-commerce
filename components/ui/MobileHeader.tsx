import React from "react";
import { BiSolidExit } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

interface DesktopHeaderProps {
  userName: string;
  action: () => void;
  cartAction: () => void;
}

export default function MobileHeader({
  userName,
  action,
  cartAction,
}: DesktopHeaderProps) {
  return (
    <div className="md:hidden flex justify-between items-center px-4 py-4 border-b border-white/10">
      <div className="text-[#ff00ff] font-extrabold text-lg tracking-tighter uppercase">
        BIENVENID@, <br />
        <span className="text-amber-500 font-extrabold text-lg tracking-tighter uppercase">
          {userName}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={cartAction}
          className="text-[#ff00ff] hover:text-[#00fbfb] transition-colors duration-300 text-xl"
        >
          <FaShoppingCart />
        </button>
        <button
          onClick={action}
          className="text-[#ff00ff] hover:text-[#00fbfb] transition-colors duration-300 text-xl"
        >
          <BiSolidExit />
        </button>
      </div>
    </div>
  );
}
