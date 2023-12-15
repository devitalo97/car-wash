/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
"use client";
import { Fragment, ReactNode, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

const navigation: {
  name: string;
  href: string;
  current: boolean;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "All Files", href: "#", icon: Squares2X2IconOutline, current: false },
  { name: "Photos", href: "#", icon: PhotoIcon, current: true },
  { name: "Shared", href: "#", icon: UserGroupIcon, current: false },
  { name: "Albums", href: "#", icon: RectangleStackIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];
const userNavigation: {
  name: string;
  href: string;
}[] = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
const tabs: {
  name: string;
  href: string;
  current: boolean;
}[] = [
  { name: "Recently Viewed", href: "#", current: true },
  { name: "Recently Added", href: "#", current: false },
  { name: "Favorited", href: "#", current: false },
];
const files: {
  name: string;
  size: string;
  source: string;
  current: boolean;
}[] = [
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
];
const currentFile: {
  name: string;
  size: string;
  source: string;
  information: {
    "Uploaded by": string;
    "Last modified": string;
    Created: string;
    Dimensions: string;
    Resolution: string;
  };
  sharedWith: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
} = {
  name: "IMG_4985.HEIC",
  size: "3.9 MB",
  source:
    "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  information: {
    "Uploaded by": "Marie Culver",
    Created: "June 8, 2020",
    "Last modified": "June 8, 2020",
    Dimensions: "4032 x 3024",
    Resolution: "72 x 72",
  },
  sharedWith: [
    {
      id: 1,
      name: "Aimee Douglas",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
    },
    {
      id: 2,
      name: "Andrea McMillan",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="flex h-full xl:pl-72 bg-gray-900">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-white/5 bg-gray-900 shadow-sm">
              <button
                type="button"
                className="border-r border-white/5 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between px-4 sm:px-6">
                <div className="flex flex-1">
                  <form className="flex w-full md:ml-0" action="#" method="GET">
                    <label htmlFor="desktop-search-field" className="sr-only">
                      Search all files
                    </label>
                    <label htmlFor="mobile-search-field" className="sr-only">
                      Search all files
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        name="mobile-search-field"
                        id="mobile-search-field"
                        className="h-full bg-transparent w-full border-0 py-2 pl-8 pr-3 text-base text-white focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:hidden"
                        placeholder="Search"
                        type="search"
                      />
                      <input
                        name="desktop-search-field"
                        id="desktop-search-field"
                        className="hidden bg-transparent h-full w-full border-0 py-2 pl-8 pr-3 text-sm text-white focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:block"
                        placeholder="Search all files"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-indigo-600 p-1.5 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <span className="absolute -inset-1.5" />
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Add file</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-white">
                    Galeria
                  </h1>
                  <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Use list view</span>
                    </button>
                    <button
                      type="button"
                      className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <Squares2X2IconMini
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Use grid view</span>
                    </button>
                  </div>
                </div>

                {/* Gallery */}
                <section
                  className="mt-8 pb-16"
                  aria-labelledby="gallery-heading"
                >
                  <h2 id="gallery-heading" className="sr-only">
                    Recently viewed
                  </h2>
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {files.map((file) => (
                      <li key={file.name} className="relative">
                        <div
                          className={clsx(
                            file.current
                              ? "ring-2 ring-indigo-500 ring-offset-2"
                              : "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
                            "aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100"
                          )}
                        >
                          <img
                            src={file.source}
                            alt=""
                            className={clsx(
                              file.current ? "" : "group-hover:opacity-75",
                              "pointer-events-none object-cover"
                            )}
                          />
                          <button
                            type="button"
                            className="absolute inset-0 focus:outline-none"
                          >
                            <span className="sr-only">
                              View details for {file.name}
                            </span>
                          </button>
                        </div>
                        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-white">
                          {file.name}
                        </p>
                        <p className="pointer-events-none block text-sm font-medium text-gray-500">
                          {file.size}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-96 overflow-y-auto border-l border-white/5 bg-gray-900 p-8 lg:block">
              <div className="space-y-6 pb-16">
                <div>
                  <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                    <img
                      src={currentFile.source}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-white">
                        <span className="sr-only">Details for </span>
                        {currentFile.name}
                      </h2>
                      <p className="text-sm font-medium text-gray-500">
                        {currentFile.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="absolute -inset-1.5" />
                      <HeartIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">Favorite</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white">Information</h3>
                  <dl className="mt-2 divide-y divide-white/5 border-b border-t border-white/5">
                    {Object.keys(currentFile.information).map((key) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 text-sm font-medium"
                      >
                        <dt className="text-gray-500">{key}</dt>
                        <dd className="whitespace-nowrap text-white">
                          {
                            currentFile.information[
                              key as keyof typeof currentFile.information
                            ]
                          }
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 className="font-medium text-white">Description</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm italic text-gray-500">
                      Add a description to this image.
                    </p>
                    <button
                      type="button"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="absolute -inset-1.5" />
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Add description</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-x-3">
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
