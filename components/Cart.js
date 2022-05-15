import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, PlusSmIcon, MinusSmIcon } from "@heroicons/react/outline";
import { FaStripe, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

const Cart = () => {
  const cartRef = useRef();
  const {
    showCart,
    setShowCart,
    totalQuantities,
    totalPrice,
    cartItems,
    toggleCartItemQty,
    removeCartItem,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <Transition.Root show={showCart} as="div" ref={cartRef} className="fixed">
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-hidden"
        onClose={setShowCart}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-slate-900">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-50">
                        {" "}
                        Shopping cart{" "}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setShowCart(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200 dark:divide-gray-500/60"
                        >
                          {cartItems.length < 1 && (
                            <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                              <FaShoppingCart className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                              <h1 className="text-2xl text-gray-900 dark:text-gray-50">
                                Shopping Cart is empty
                              </h1>
                              <Link href="/" passHref>
                                <button
                                  onClick={() => setShowCart(false)}
                                  className="cursor-pointer rounded bg-sky-700 p-2 text-gray-50 transition duration-300 hover:bg-sky-600"
                                >
                                  Continue Shopping
                                </button>
                              </Link>
                            </div>
                          )}
                          {cartItems.length > 0 &&
                            cartItems
                              .sort((a, b) => a.name > b.name)
                              .map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={urlFor(product?.image[0])}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-50">
                                        <h3>
                                          <Link
                                            href={`/product/${product.slug.current}`}
                                          >
                                            {product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                    </div>
                                    <div className="mt-2 flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-600 dark:text-gray-300">
                                        <p>Quantity</p>
                                        <span className="relative z-0 mt-2 inline-flex rounded-md shadow-sm">
                                          <button
                                            onClick={() =>
                                              toggleCartItemQty(
                                                product._id,
                                                "dec"
                                              )
                                            }
                                            type="button"
                                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-slate-700"
                                          >
                                            <span className="sr-only">
                                              Minus
                                            </span>
                                            <MinusSmIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </button>
                                          <span className="relative inline-flex items-center  border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-slate-700">
                                            <span className="sr-only">
                                              Quantity
                                            </span>
                                            {product.quantity}
                                          </span>
                                          <button
                                            onClick={() =>
                                              toggleCartItemQty(
                                                product._id,
                                                "inc"
                                              )
                                            }
                                            type="button"
                                            className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-slate-700"
                                          >
                                            <span className="sr-only">
                                              Plus
                                            </span>
                                            <PlusSmIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </span>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeCartItem(product)
                                          }
                                          className="font-medium text-sky-600 hover:text-sky-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4 dark:border-gray-600/60 sm:px-6">
                      <>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-50">
                          <p>Subtotal</p>
                          <p>${totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                      </>
                      <div className="mt-4">
                        <button
                          onClick={handleCheckout}
                          type="button"
                          className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 py-2 text-gray-50 shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:ring-offset-1"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <div className="text-xl font-semibold">
                              Checkout
                            </div>
                            <div className="text-xs font-light text-gray-200">
                              <span className="-m-2 flex items-center justify-center gap-1">
                                <span>Powered by</span>
                                <FaStripe className="h-8 w-8" />
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-sky-600 hover:text-sky-500"
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
