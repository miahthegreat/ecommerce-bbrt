import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const sessionId = router.query.session_id;

  const getOrderDetails = async (id) => {
    if (id) {
      const data = await fetch(`/api/success?session_id=${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => json);
      const newDataArr = [data];
      setOrder(newDataArr[0]);
    }
  };

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    getOrderDetails(sessionId);
  }, [sessionId]);

  return (
    <>
      {!order && <p>Loading...</p>}
      {order && (
        <main className="relative mt-28 lg:min-h-full">
          <div>
            <div className="mx-auto max-w-2xl py-4 px-4 sm:px-6 sm:py-8 md:px-8 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8 lg:py-12 xl:gap-x-24">
              <div className="lg:col-start-1">
                <h1 className="text-sm font-medium text-sky-600">
                  Payment successful
                </h1>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
                  Thanks for ordering
                </p>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  We appreciate your order, we're currently processing it. So
                  hang tight and we'll send you confirmation very soon!
                </p>

                <ul
                  role="list"
                  className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 dark:divide-slate-800 dark:border-slate-800"
                >
                  {order.items.data.map((item) => (
                    <li key={item.id} className="flex space-x-6 py-6">
                      <div className="flex-auto space-y-1">
                        <h3 className="text-gray-900 dark:text-gray-50 ">
                          {item.description}
                        </h3>
                        <span className="text-xs text-gray-400">
                          (Qty: {item.quantity})
                        </span>
                      </div>
                      <p className="flex-none font-medium text-gray-900 dark:text-gray-50">
                        ${parseFloat(item.amount_total / 100).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500 dark:border-slate-800">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900 dark:text-gray-50">
                      $
                      {parseFloat(order.session.amount_subtotal / 100).toFixed(
                        2
                      )}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="text-gray-900 dark:text-gray-50">
                      $
                      {parseFloat(
                        order.session.total_details.amount_shipping / 100
                      ).toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Taxes</dt>
                    <dd className="text-gray-900 dark:text-gray-50">
                      $
                      {parseFloat(
                        order.session.total_details.amount_tax / 100
                      ).toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900 dark:border-slate-800">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">
                      ${parseFloat(order.session.amount_total / 100).toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <dt className="font-medium text-gray-900 dark:text-gray-50">
                      Shipping Address
                    </dt>
                    <dd className="mt-2">
                      <address className="not-italic">
                        <span className="block">
                          {order.session.shipping.name}
                        </span>
                        <span className="block">
                          {order.session.shipping.address.line1}
                        </span>
                        <span className="block">
                          {order.session.shipping.address.city},{" "}
                          {order.session.shipping.address.state}{" "}
                          {order.session.shipping.address.postal_code}
                        </span>
                      </address>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900 dark:text-gray-50">
                      Payment Information
                    </dt>
                    <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                      <div className="flex-none">
                        <svg
                          aria-hidden="true"
                          width={36}
                          height={24}
                          viewBox="0 0 36 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-auto"
                        >
                          <rect width={36} height={24} rx={4} fill="#224DBA" />
                          <path
                            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                            fill="#fff"
                          />
                        </svg>
                        <p className="sr-only">Visa</p>
                      </div>
                      <div className="flex-auto">
                        <p className="text-gray-900 dark:text-gray-50">
                          Ending with 4242
                        </p>
                        <p>Expires 12 / 21</p>
                      </div>
                    </dd>
                  </div>
                </dl>

                <div className="mt-16 border-t border-gray-200 py-6 text-right dark:border-slate-800">
                  <Link href="/" passHref>
                    <a className="text-sm font-medium text-sky-600 hover:text-sky-500">
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Success;
