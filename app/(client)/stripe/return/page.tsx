"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { retriveCheckoutSession } from "@/app/lib/actions";
import Stripe from "stripe";
import Link from "next/link";

export default function Return() {
  const [status, setStatus] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] =
    useState<Stripe.Checkout.Session.CustomerDetails | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [isFirstRendered, setIsFirstRendered] = useState(true);
  const [orderUiud, setOrderUiud] = useState<string>();

  useEffect(() => {
    setIsFirstRendered(false);
    (async () => {
      if (isFirstRendered) return;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");
      const orderUiud = urlParams.get("order_uuid");
      const guest = urlParams.get("guest");
      if (!Boolean(Number(guest))) setIsGuest(true);
      const formData = new FormData();
      setOrderUiud(orderUiud as string);

      formData.append("session_id", sessionId as string);
      formData.append("order_uuid", orderUiud as string);

      const result = await retriveCheckoutSession(formData);

      setStatus(result.status);
      setCustomerDetails(result.customer_details);
    })();
  }, [isFirstRendered]);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && isGuest) {
    return (
      <section id="success-guest">
        <div className="bg-gray-50">
          <h2 className="sr-only">Successful buy</h2>
          <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
            <div className="mx-auto flex justify-center items-center">
              <div
                key={"successful buy"}
                className="flex flex-col justify-center items-center"
              >
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="h-24 w-28"
                      src={
                        "https://tailwindui.com/img/ecommerce/icons/icon-warranty-light.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    Compra realizada com sucesso!
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-[500px] md:text-center">
                    O acompanahamento do seu pedido vai ser feito via e-mail com{" "}
                    {customerDetails?.email}. Para receber notificações e ter
                    acesso a mais funcionalidades termine o seu cadastro.
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                  <Link
                    href={`/register?isFromGuestBuy=1&${new URLSearchParams(
                      customerDetails as unknown as Record<string, string>
                    ).toString()}`}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Termine o seu cadastro
                  </Link>
                  <Link
                    href={"/"}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium  whitespace-nowrap text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Continue.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === "complete" && !isGuest) {
    return (
      <section id="success-client">
        <div className="bg-gray-50">
          <h2 className="sr-only">Successful buy</h2>
          <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
            <div className="mx-auto flex justify-center items-center">
              <div
                key={"successful buy"}
                className="flex flex-col justify-center items-center"
              >
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="h-24 w-28"
                      src={
                        "https://tailwindui.com/img/ecommerce/icons/icon-warranty-light.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    Obrigado por mais uma compra com a gente!
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-[500px] md:text-center">
                    Acompanhe seu pedido pela plataforma, e-mail ou wtp.
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                  <Link
                    href={`/order/${orderUiud}`}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Ver pedido.
                  </Link>
                  <Link
                    href={"/"}
                    type="submit"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium  whitespace-nowrap text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Continue comprando.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
