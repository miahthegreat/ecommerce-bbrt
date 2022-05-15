import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { motion } from "framer-motion";
import { slideInFromBottom } from "../utils/transitionVariants";
import Trending from "./Trending";

const HeroBanner = ({ banner }) => {
  return (
    <motion.div
      className="relative overflow-hidden bg-white dark:bg-slate-900"
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
        variants={slideInFromBottom}
        className="flex h-full flex-col justify-between"
      >
        {/* Decorative background image and gradient */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden">
            <img
              src={urlFor(banner.image)}
              alt={banner.largeText1}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white dark:from-slate-900 dark:via-slate-900" />
        </div>

        {/* Callout */}
        <section
          aria-labelledby="sale-heading"
          className="relative mx-auto flex max-w-7xl flex-col px-4 pt-32 text-center sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2
              id="sale-heading"
              className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl lg:text-6xl"
            >
              {banner.largeText1}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600 dark:text-gray-400">
              {banner.largeText2}
            </p>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default HeroBanner;
