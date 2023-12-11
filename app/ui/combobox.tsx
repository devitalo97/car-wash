"use client";
import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox as HCombobox } from "@headlessui/react";
import clsx from "clsx";

interface Props<T> {
  label?: string;
  placeholder?: string;
  inputClassname?: string;
  name?: string;
  data: T[];
  extractCompareForFilterValue: (data: T) => string;
  extractDisplayValue: (data: T) => string;
  extractKeyValue: (data: T) => string;
  extractAvailableValue?: (data: T) => boolean;
  extractHiddenInputValue?: (data: T | null) => any;
}

export default function Combobox<T>({
  label,
  placeholder,
  inputClassname,
  name,
  data,
  extractCompareForFilterValue,
  extractDisplayValue,
  extractAvailableValue,
  extractKeyValue,
  extractHiddenInputValue,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<T | null>(null);

  const filtered =
    query === ""
      ? data
      : data.filter((d) => {
          return extractCompareForFilterValue(d)
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <HCombobox
      as="div"
      value={selected}
      onChange={setSelected}
      className={"bg-white"}
    >
      {label && (
        <HCombobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </HCombobox.Label>
      )}
      <div className="relative mt-2">
        <HCombobox.Input
          className={clsx(
            "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            inputClassname
          )}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          displayValue={(d: T) => extractDisplayValue(d)}
        />
        <HCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </HCombobox.Button>

        {filtered.length > 0 && (
          <HCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((d) => (
              <HCombobox.Option
                key={extractKeyValue(d)}
                value={d}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      {extractAvailableValue && (
                        <span
                          className={clsx(
                            "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                            extractAvailableValue(d)
                              ? "bg-green-400"
                              : "bg-gray-200"
                          )}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={clsx(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {extractDisplayValue(d)}
                        {extractAvailableValue && (
                          <span className="sr-only">
                            {" "}
                            is {extractAvailableValue(d) ? "online" : "offline"}
                          </span>
                        )}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </HCombobox.Option>
            ))}
          </HCombobox.Options>
        )}
      </div>
      <HCombobox
        as="div"
        value={extractHiddenInputValue?.(selected) ?? selected}
        onChange={setSelected}
        className={"bg-white"}
        name={name}
        hidden
      />
    </HCombobox>
  );
}
