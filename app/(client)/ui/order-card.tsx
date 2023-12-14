"use client";
import { Order, Service } from "@/app/lib/definitions";
import { formatPriceFromCents, formatShortDate } from "@/app/utils/formatters";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";

export function OrderCard({
  order,
}: {
  order: Order & { services: Service[] };
}) {
  return (
    <div
      key={order.protocol}
      className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
    >
      <h3 className="sr-only">
        Order placed on{" "}
        <time dateTime={order.created_at.toString()}>
          {formatShortDate(order.created_at)}
        </time>
      </h3>

      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium text-gray-900">N. do pedido</dt>
            <dd className="mt-1 text-gray-500">{order.protocol}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="font-medium text-gray-900">Data</dt>
            <dd className="mt-1 text-gray-500">
              <time dateTime={order.created_at.toString()}>
                {formatShortDate(order.created_at)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Valor Total</dt>
            <dd className="mt-1 font-medium text-gray-900">
              {formatPriceFromCents(order.total)}
            </dd>
          </div>
        </dl>

        <Menu as="div" className="relative flex justify-end lg:hidden">
          <div className="flex items-center">
            <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">
                Options for order {order.protocol}
              </span>
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={`order/${order.uuid}`}
                      className={clsx(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Ver Pedido
                    </a>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }) => (
                    <a
                      href={"#"}
                      className={clsx(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Invoice
                    </a>
                  )}
                </Menu.Item> */}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          <a
            href={`order/${order.uuid}`}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>Ver Pedido</span>
            <span className="sr-only">{order.protocol}</span>
          </a>
          {/* <a
            href={"#"}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>Nota Fiscal</span>
            <span className="sr-only">for order {order.protocol}</span>
          </a> */}
        </div>
      </div>

      {/* Products */}
      <h4 className="sr-only">Itens</h4>
      <ul role="list" className="divide-y divide-gray-200">
        {order.services.map((product) => (
          <li key={product.uuid} className="p-4 sm:p-6">
            <div className="flex items-center sm:items-start">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                <img
                  src={product.images[0].source}
                  alt={`Image alt for ${product.images[0].name}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-6 flex-1 text-sm">
                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                  <h5>{product.name}</h5>
                  <p className="mt-2 sm:mt-0">
                    {formatPriceFromCents(product.price)}
                  </p>
                </div>
                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="mt-6 sm:flex sm:justify-between">
              <div className="flex items-center">
                {iconByStatus[order.status]}
                <p className="ml-2 text-sm font-medium text-gray-500">
                  Status {infoByStatus[order.status]}
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                <div className="flex flex-1 justify-center">
                  <Link
                    href={`product/${product.uuid}`}
                    className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                  >
                    Ver produto
                  </Link>
                </div>
                <div className="flex flex-1 justify-center pl-4">
                  <Link
                    href="#"
                    className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                  >
                    Comprar de novo
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const infoByStatus = {
  pending: "Pendente",
  complete: "Confirmada",
};

const iconByStatus = {
  pending: (
    <ExclamationCircleIcon
      className="h-5 w-5 text-red-500"
      aria-hidden="true"
    />
  ),
  complete: (
    <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
  ),
};
