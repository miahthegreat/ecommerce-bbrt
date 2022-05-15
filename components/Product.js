import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="flex h-full scale-[0.95] transform flex-col items-stretch rounded-md bg-gray-100 shadow transition duration-300 hover:scale-100 hover:cursor-pointer dark:bg-gray-800">
          <img
            src={urlFor(image && image[0])}
            className="aspect-square h-full rounded-t-md object-cover shadow-md"
          />
          <div className="p-2">
            <p>{name}</p>
            <p className="font-bold">${price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
