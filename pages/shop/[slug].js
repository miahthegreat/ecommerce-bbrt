import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiChevronRight } from "react-icons/fi";
import { client } from "../../lib/client";
import { motion } from "framer-motion";
import { groq } from "next-sanity";
import TShirts from "../../components/Mens/TShirts";
import { slideInFromBottom } from "../../utils/transitionVariants";

const ShopByCategory = ({ products }) => {
  const router = useRouter();
  return (
    <motion.div
      className="mt-[96px] p-8 lg:mt-[104px]"
      variants={slideInFromBottom}
      initial="offscreen"
      animate="onscreen"
      exit="exit"
    >
      <nav className="flex" aria-label="Breadcrumb">
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
              <Link href={router.asPath}>
                <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {products && products[0].category[0].title}
                </a>
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <TShirts products={products} />
    </motion.div>
  );
};

export default ShopByCategory;

export const getStaticPaths = async () => {
  const categoryQuery = groq`
    *[_type == "category"] {
      slug {
        current
      }
    }
    `;
  const categories = await client.fetch(categoryQuery);

  const paths = categories.map((category) => ({
    params: {
      slug: category.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = groq`
  *[_type == "product" && "${slug}" in category[]->slug.current]  | order(_createdAt desc) {
      ...,
      category[]->
  }
  `;
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
