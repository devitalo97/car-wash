import React, { forwardRef, InputHTMLAttributes } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  dark?: boolean;
  containerClassname?: string;
  hint?: string;
  addOn?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, error, dark = true, containerClassname, hint, addOn, ...rest },
    ref
  ) => {
    const id = rest?.id ?? uuidv4();
    const labelColor = dark ? "text-white" : "text-gray-900";
    const inputColor = dark ? "text-white" : "text-gray-900";
    return (
      <div className={clsx(containerClassname)}>
        {label ? (
          <label
            htmlFor={id}
            className={clsx("block text-sm font-medium leading-6", labelColor)}
          >
            {label}
          </label>
        ) : null}
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            {addOn && addOn}
            <input
              ref={ref}
              id={id}
              aria-describedby={`error-${id}`}
              className={clsx(
                "block w-full flex-1 border-0 bg-transparent py-1.5 pl-2",
                inputColor,
                "placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
                error &&
                  "pr-10 text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300"
              )}
              {...rest}
            />
          </div>
          {error ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>

        {error ? (
          <div id={`error-${id}`} aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-600" key={error}>
              {error}
            </p>
          </div>
        ) : null}
        {hint && !error && (
          <p className="mt-3 text-sm leading-6 text-gray-600">{hint}</p>
        )}
      </div>
    );
  }
);

export default Input;
