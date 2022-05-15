import Link from "next/link";
import React from "react";
import { urlFor } from "../../lib/client";

const TShirts = ({ products }) => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug.current}`}>
              <a className="group scale-95 transition duration-200 ease-in hover:scale-100">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={urlFor(product.image && product.image[0])}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-50">
                  ${product.price}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TShirts;
