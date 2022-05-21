import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";

const Layout = ({ children, data }) => {
  return (
    <>
      <CommandPalette products={data.products} />
      <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-50">
        <Head>
          <title>Buffalo Bills Revenge Tour</title>
        </Head>
        <header>
          <Navbar />
        </header>
        <div className="px-4">{children}</div>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
