import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideInFromBottom } from "../utils/transitionVariants";

export default function Custom404() {
  return (
    <motion.div
      className="min-h-screen bg-white px-4 py-16 dark:bg-slate-900 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
      initial="offscreen"
      whileInView="onscreen"
      animate="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      exit={{
        y: "100vh",
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      variants={slideInFromBottom}
    >
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-sky-600 sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href="/">
                <a className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                  Go Back Home
                </a>
              </Link>
              <Link href="/contact">
                <a className="inline-flex items-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                  Contact Support
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
