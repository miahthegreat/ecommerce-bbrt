import React from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps, router }) {
  return (
    <StateContext>
      <Layout data={pageProps}>
        <Toaster
          toastOptions={{
            style: {
              "background-color": "rgb(3 105 161 / 1)",
              color: "white",
            },
          }}
        />
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => {
            if (typeof window !== "undefined") {
              window.scrollTo(0, 0);
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </StateContext>
  );
}

export default MyApp;
