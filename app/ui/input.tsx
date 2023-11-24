import React, { forwardRef, InputHTMLAttributes } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  dark?: boolean;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, dark = true, ...rest }, ref) => {
    const id = rest?.id ?? uuidv4();

    const labelColor = dark ? "text-white" : "text-gray-900";
    return (
      <div>
        {label ? (
          <label
            htmlFor={id}
            className={clsx("block text-sm font-medium leading-6", labelColor)}
          >
            {label}
          </label>
        ) : null}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            ref={ref}
            id={id}
            aria-describedby={`error-${id}`}
            className={clsx(
              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
              error &&
                "pr-10 text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300"
            )}
            {...rest}
          />
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
      </div>
    );
  }
);

export default Input;
