import React from "react";
import { client } from "../lib/client";
import { motion } from "framer-motion";
import { groq } from "next-sanity";

import { HeroBanner } from "../components";
import MensSection from "../components/MensSection";
import WomensSection from "../components/WomensSection";
import { slideInFromBottom } from "../utils/transitionVariants";

export default function Home({ banner, mens, womens }) {
  return (
    <motion.div
      className="mx-auto mt-[96px] flex max-w-7xl flex-col gap-8 md:mt-[104px]"
      variants={slideInFromBottom}
      initial="offscreen"
      animate="onscreen"
      exit="exit"
    >
      <HeroBanner banner={banner.length && banner[0]} />
      <MensSection products={mens} />
      <WomensSection products={womens} />
    </motion.div>
  );
}

export const getServerSideProps = async () => {
  const mensQuery = groq`
  *[_type == "product" && "mens" in category[]->slug.current]  | order(_createdAt asc) {
      ...,
      category[]->
  }
  `;

  const womensQuery = groq`
  *[_type == "product" && "womens" in category[]->slug.current]  | order(_createdAt asc) {
      ...,
      category[]->
  }
  `;

  const mens = await client.fetch(mensQuery);
  const womens = await client.fetch(womensQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { banner, mens, womens },
  };
};
