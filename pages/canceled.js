import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useStateContext } from "../context/StateContext";

const Cancel = () => {
  return (
    <div className="mx-auto mt-28 flex max-w-2xl flex-col items-center justify-center py-4 px-4 sm:px-6 sm:py-8 md:px-8 lg:gap-x-8 lg:px-8 lg:py-12 xl:gap-x-24">
      <h1 className="text-base font-medium text-sky-600">Checkout canceled</h1>
      <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
        Your cart is still available and ready for checkout.
      </p>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
        We are sorry to see your checkout was canceled, your cart is still
        available. We are ready for your order when you are!
      </p>

      <div className="mt-16 border-t border-gray-200 py-6 text-right">
        <Link href="/" passHref>
          <a className="text-sm font-medium text-sky-600 hover:text-sky-500">
            Continue Shopping<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
