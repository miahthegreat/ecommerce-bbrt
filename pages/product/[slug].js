import React from "react";
import { client, urlFor } from "../../lib/client";
import { Tab } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import { groq } from "next-sanity";
import RelatedProducts from "../../components/RelatedProducts";
import { slideInFromBottom } from "../../utils/transitionVariants";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = ({ product, relatedProducts }) => {
  const { image, name, details, price, category, slug } = product;
  const { incQty, decQty, qty, addToCart } = useStateContext();
  const alsoLikedProducts = relatedProducts.filter((item) => {
    if (item._id !== product._id) {
      return {
        ...item,
      };
    }
  });

  return (
    <motion.div
      className="mt-[96px] bg-white dark:bg-slate-900 lg:mt-[104px]"
      variants={slideInFromBottom}
      initial="offscreen"
      animate="onscreen"
      exit="exit"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <nav className="flex py-8" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <Link href="/">
                  <a className="text-gray-400 hover:text-gray-500">
                    <FiHome
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Home</span>
                  </a>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <Link href={`/shop/${category[0].slug.current}`}>
                  <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {category[0].title}
                  </a>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <Link href={`/product/${slug.current}`}>
                  <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {name}
                  </a>
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {image.map((img, idx) => (
                  <Tab
                    key={idx}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{idx}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={urlFor(img)}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {image.map((img, idx) => (
                <Tab.Panel key={idx}>
                  <img
                    src={urlFor(img)}
                    alt={idx}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 flex h-full flex-col justify-start px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                {name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900 dark:text-gray-50">
                  ${price}
                </p>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700 dark:text-gray-400">
                  <p>{details}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <p>Quantity</p>
                <span className="relative z-0 inline-flex rounded-md shadow-sm">
                  <button
                    onClick={decQty}
                    type="button"
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-slate-700"
                  >
                    <span className="sr-only">Minus</span>
                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <span className="relative inline-flex items-center  border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-slate-700">
                    <span className="sr-only">Quantity</span>
                    {qty}
                  </span>
                  <button
                    onClick={incQty}
                    type="button"
                    className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-slate-700"
                  >
                    <span className="sr-only">Plus</span>
                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </span>
              </div>

              <div className="mt-5 flex">
                <button
                  onClick={() => addToCart(product, qty)}
                  type="button"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={alsoLikedProducts} />
      </div>
    </motion.div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    ...,
    category[]->
  }`;
  const product = await client.fetch(query);

  const alsoLiked = groq`
  *[_type == "product"] | order(_createdAt asc) {
      ...,
      category[]->
  }
  `;

  const relatedProducts = await client.fetch(alsoLiked);

  return {
    props: { product, relatedProducts },
  };
};
