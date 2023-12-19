"use client";
import { Service } from "../lib/definitions";
import { formatPriceFromCents } from "../utils/formatters";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function StackedList({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<Service>();
  const searchParams = useSearchParams();

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
      {services.map((service, serviceId) => (
        <RadioGroup.Option
          key={service.name}
          value={service}
          className={({ checked }) =>
            clsx(
              serviceId === 0 ? "rounded-tl-md rounded-tr-md" : "",
              serviceId === services.length - 1
                ? "rounded-bl-md rounded-br-md"
                : "",
              checked
                ? "z-10 border-indigo-300 bg-indigo-100"
                : "border-gray-200",
              "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6"
            )
          }
        >
          {({ active, checked }) => (
            <>
              <div className="flex min-w-0 gap-x-4">
                {service.images?.[0]?.source && (
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={service.images?.[0].source}
                    alt=""
                  />
                )}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {service.name}
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a
                      href={`mailto:${service.name}`}
                      className="relative truncate hover:underline"
                    >
                      {service.name}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-1 justify-end items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {formatPriceFromCents(service.price)}
                  </p>
                </div>
              </div>
            </>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
