import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { GiBuffaloHead } from "react-icons/gi";
import { useStateContext } from "../context/StateContext";

import { Cart } from "./";
import { motion } from "framer-motion";
import { slideInFromTop } from "../utils/transitionVariants";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <motion.div
      className="fixed top-0 z-10 flex w-full items-center justify-between bg-slate-200/60 p-8 shadow-md backdrop-blur-lg dark:bg-slate-800/60"
      variants={slideInFromTop}
      initial="offscreen"
      animate="onscreen"
      exit="exit"
    >
      <div className="group flex items-center gap-2 text-base font-thin sm:text-2xl md:text-4xl">
        <span className="group-hover:text-gray-600 dark:group-hover:text-gray-300">
          <GiBuffaloHead />
        </span>
        <Link href="/" scroll={false}>
          <a className="group-hover:text-gray-600 dark:group-hover:text-gray-300">
            Buffalo Bills Revenge Tour
          </a>
        </Link>
      </div>
      <button className="group relative flex scale-95 transform items-center transition duration-300 hover:scale-100">
        <AiOutlineShopping
          className="h-8 w-8"
          onClick={() => setShowCart(true)}
        />
        {totalQuantities > 0 && (
          <span className="flex h-4 w-4">
            <span className="absolute -top-4 right-1 inline-flex h-4 w-4 animate-ping items-center justify-center rounded-full bg-sky-700 p-3 opacity-75"></span>
            <span className="absolute -top-4 right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-700 p-3 text-sm text-white opacity-90">
              {totalQuantities}
            </span>
          </span>
        )}
      </button>
      <Cart />
    </motion.div>
  );
};

export default Navbar;
