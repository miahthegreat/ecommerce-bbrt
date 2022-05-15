import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { motion } from "framer-motion";
import { slideInFromBottom } from "../utils/transitionVariants";

const Trending = ({ products }) => {
  const product1 = products[0];
  const product2 = products[1];
  const product3 = products[2];
  return (
    <motion.div
      className="bg-white dark:bg-slate-900"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      exit={{
        y: "100vh",
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={slideInFromBottom}
      >
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            New Arrivals
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <Link href={`/product/${product1.slug.current}`} scroll={false}>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg transition duration-200 ease-in hover:cursor-pointer sm:aspect-h-1 sm:aspect-w-1 sm:col-start-2 sm:row-span-2">
              <img
                src={urlFor(product1.image && product1.image[0])}
                alt={product1.details}
                className="object-cover object-center transition duration-200 ease-in group-hover:opacity-75"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50"
              />
              <div className="flex items-end p-6">
                <div>
                  <h3 className="font-semibold text-white">
                    <a>
                      <span className="absolute inset-0" />
                      {product1.name}
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    ${product1.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={`/product/${product2.slug.current}`} scroll={false}>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg transition duration-200 ease-in hover:cursor-pointer sm:aspect-none sm:relative sm:h-full">
              <img
                src={urlFor(product2.image && product2.image[0])}
                alt={product2.details}
                className="object-cover object-center transition duration-200 ease-in group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a>
                      <span className="absolute inset-0" />
                      {product2.name}
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    ${product2.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={`/product/${product3.slug.current}`} scroll={false}>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg transition duration-200 ease-in hover:cursor-pointer sm:aspect-none sm:relative sm:row-start-1 sm:h-full">
              <img
                src={urlFor(product3.image && product3.image[0])}
                alt={product3.details}
                className="object-cover object-center transition duration-200 ease-in group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a>
                      <span className="absolute inset-0" />
                      {product3.name}
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    ${product3.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Trending;
