"use client";
import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox as HCombobox } from "@headlessui/react";
import clsx from "clsx";

const people = [{ id: 1, name: "Leslie Alexander", online: true }];

type Props = {
  label?: string;
  placeholder?: string;
  inputClassname?: string;
};

export default function Example({ label, placeholder, inputClassname }: Props) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <HCombobox
      as="div"
      value={selectedPerson}
      onChange={setSelectedPerson}
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
          displayValue={(person: any) => person?.name}
        />
        <HCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </HCombobox.Button>

        {filteredPeople.length > 0 && (
          <HCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <HCombobox.Option
                key={person.id}
                value={person}
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
                      <span
                        className={clsx(
                          "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                          person.online ? "bg-green-400" : "bg-gray-200"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={clsx(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {person.name}
                        <span className="sr-only">
                          {" "}
                          is {person.online ? "online" : "offline"}
                        </span>
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
    </HCombobox>
  );
}
