"use client";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import br from "@/public/br.svg";
import Image from "next/image";
import Link from "next/link";
const navigation = {
  categories: [
    {
      id: "limpeza",
      name: "Limpeza",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "interna",
          name: "Serviços Internos",
          items: [
            { name: "Lavagem Completa", href: "#" },
            { name: "Higienização Interna", href: "#" },
            { name: "Limpeza de Estofados", href: "#" },
            { name: "Limpeza de Teto", href: "#" },
            { name: "Limpeza de Console Central", href: "#" },
            { name: "Limpeza de Painéis", href: "#" },
            { name: "Aspiração de Bancos", href: "#" },
            { name: "Aspiração de Tapetes", href: "#" },
            { name: "Limpeza interna completa", href: "#" },
          ],
        },
        {
          id: "externa",
          name: "Serviços Externos",
          items: [
            { name: "Lavagem Simples", href: "#" },
            { name: "Lavagem Completa", href: "#" },
            { name: "Enceramento", href: "#" },
            { name: "Polimento", href: "#" },
            { name: "Limpeza de Rodas e Pneus", href: "#" },
            { name: "Impermeabilização de Estofados", href: "#" },
            { name: "Polimento de Faróis", href: "#" },
            { name: "Limpeza de Tapetes e Carpetes", href: "#" },
            { name: "Limpeza de Câmbio e Painel", href: "#" },
            { name: "Limpeza externa completa", href: "#" },
          ],
        },
      ],
    },
    {
      id: "especializados",
      name: "Serviços Especializados",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "detalhamento",
          name: "Detalhamento",
          items: [
            { name: "Detalhamento Premium", href: "#" },
            { name: "Polimento de Alta Performance", href: "#" },
            { name: "Cristalização de Pintura", href: "#" },
            { name: "Tratamento de Vidros", href: "#" },
            { name: "Revitalização de Interiores", href: "#" },
          ],
        },
        {
          id: "protecao",
          name: "Proteção e Revestimentos",
          items: [
            { name: "Proteção de Pintura", href: "#" },
            { name: "Revestimento Cerâmico", href: "#" },
            { name: "Proteção de Estofados", href: "#" },
            { name: "Revestimento Anti-Riscos", href: "#" },
          ],
        },
        {
          id: "restauracao",
          name: "Restauração",
          items: [
            { name: "Restauração de Faróis", href: "#" },
            { name: "Restauração de Plásticos", href: "#" },
            { name: "Restauração de Rodas", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      <nav
        aria-label="Top"
        className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Logo */}
            <div className="flex lg:ml-0">
              <Link href="/">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Log-in
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Criar conta
                </a>
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    src="https://flagcdn.com/h20/br.png"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">BRL</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <a href="#" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    0
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
