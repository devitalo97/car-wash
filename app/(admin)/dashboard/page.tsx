"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { home } from "@/public/home";
import Link from "next/link";

const statuses: { [x: string]: string } = {
  pending: "text-gray-500 bg-gray-100/10",
  paid: "text-green-400 bg-green-400/10",
};

const statusMapped: { [x: string]: string } = {
  pending: "Pendente",
  paid: "Pago",
};

const devileryMapped: { [x: string]: string } = {
  true: "M&M Delivery",
  false: "",
};

const environments: { [x: string]: string } = {
  pending: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  paid: "text-green-400 bg-green-400/10 ring-green-400/30",
};

const deployments = [
  {
    uuid: "1",
    service_uuid: {
      uuid: "1",
      name: "Lavagem e Higienização Completa",
      price: "$220",
      description:
        "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
      imageSrc: home[0],
      imageAlt:
        "Model wearing light green backpack with black canvas straps and front zipper pouch.",
    },
    schedule_uuid: {
      uuid: "1",
      from: new Date(),
      to: new Date(),
      order_uuid: "1",
    },
    client_uuid: {
      uuid: "1",
      name: "Client#00",
      email: "client@mail.com",
      avatar: "string",
      orders_uuid: ["1"],
    },
    status: "paid",
    delivery: {
      with: true,
      location: "Rua 14, numero 768",
    },
  },
  {
    uuid: "2",
    service_uuid: {
      uuid: "2",
      name: "Pintura automotiva",
      price: "$220",
      description:
        "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
      imageSrc: home[1],
      imageAlt:
        "Model wearing light green backpack with black canvas straps and front zipper pouch.",
    },
    schedule_uuid: {
      uuid: "2",
      from: new Date(),
      to: new Date(),
      order_uuid: "2",
    },
    client_uuid: {
      uuid: "2",
      name: "Client#01",
      email: "client@mail.com",
      avatar: "string",
      orders_uuid: ["1"],
    },
    status: "pending",
    delivery: {
      with: false,
    },
  },
];
const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  // More items...
];

export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="h-full">
        <div className="h-full xl:pl-72 bg-gray-900">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white xl:hidden"
              onClick={() => {}}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main className="lg:pr-96">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-white">
                Ordens de serviço
              </h1>

              {/* Sort dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                  Sort by
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Name
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Date updated
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Environment
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </header>

            {/* Deployment list */}
            <ul role="list" className="divide-y divide-white/5">
              {deployments.map((deployment) => (
                <li
                  key={deployment.uuid}
                  className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
                >
                  <div className="min-w-0 flex-auto">
                    <div className="flex items-center gap-x-3">
                      <div
                        className={clsx(
                          statuses[deployment.status],
                          "flex-none rounded-full p-1"
                        )}
                      >
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                        <Link
                          href={`/order/${deployment.uuid}`}
                          className="flex gap-x-2"
                        >
                          <span className="truncate">
                            {deployment.service_uuid.name}
                          </span>
                          <span className="text-gray-400">/</span>
                          <span className="whitespace-nowrap">
                            {deployment.client_uuid.name}
                          </span>
                          <span className="absolute inset-0" />
                        </Link>
                      </h2>
                    </div>
                    {deployment.delivery.with ? (
                      <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                        <p className="truncate">
                          {deployment.delivery.location}
                        </p>
                        <svg
                          viewBox="0 0 2 2"
                          className="h-0.5 w-0.5 flex-none fill-gray-300"
                        >
                          <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p className="whitespace-nowrap">
                          {devileryMapped[String(deployment.delivery.with)]}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={clsx(
                      environments[deployment.status],
                      "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {statusMapped[deployment.status]}
                  </div>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </main>

          {/* Activity feed */}
          <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-white">
                Clientes
              </h2>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-indigo-400"
              >
                View all
              </a>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {activityItems.map((item) => (
                <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item.user.imageUrl}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-gray-800"
                    />
                    <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                      {item.user.name}
                    </h3>
                    <time
                      dateTime={item.dateTime}
                      className="flex-none text-xs text-gray-600"
                    >
                      {item.date}
                    </time>
                  </div>
                  <p className="mt-3 truncate text-sm text-gray-500">
                    Pushed to{" "}
                    <span className="text-gray-400">{item.projectName}</span> (
                    <span className="font-mono text-gray-400">
                      {item.commit}
                    </span>{" "}
                    on <span className="text-gray-400">{item.branch}</span>)
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
