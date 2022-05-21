import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";

const CommandPalette = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKeydown(e) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  const filteredProducts =
    query && products
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];
  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-[99999] overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm dark:bg-gray-700/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            onChange={(product) => {
              setIsOpen(false);
              router.push(`/product/${product.slug.current}`);
            }}
            className="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-gray-50 shadow-2xl ring-1 ring-black/5 dark:divide-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center px-4">
              <SearchIcon className="h-6 w-6 text-gray-700 dark:text-gray-500" />
              <Combobox.Input
                className="h-12 w-full rounded-xl border-0 bg-transparent text-sm focus:ring-0 dark:text-gray-50 dark:placeholder-gray-500"
                placeholder="Search products..."
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            {filteredProducts.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filteredProducts.map((product, idx) => {
                  return (
                    <Combobox.Option key={idx} value={product}>
                      {({ active }) => (
                        <div
                          className={`mx-2 cursor-pointer space-x-1 rounded-xl px-4 py-2 ${
                            active
                              ? "bg-gray-200 dark:bg-gray-800"
                              : "bg-transparent"
                          }`}
                        >
                          <span className="cursor-pointer font-medium text-gray-900 dark:text-gray-50">
                            {product.name}
                          </span>
                          <span className="cursor-pointer text-gray-400 dark:text-gray-500">
                            in {product.category[0].title}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  );
                })}
              </Combobox.Options>
            )}
            {query && filteredProducts.length === 0 && (
              <p className="p-4 text-sm text-gray-500 dark:text-gray-600">
                No results found
              </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
