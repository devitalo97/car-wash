import React, { forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  dark?: boolean;
  containerClassname?: string;
  hint?: string;
}

// eslint-disable-next-line react/display-name
const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, dark = true, containerClassname, hint, ...rest }, ref) => {
    const id = rest?.id ?? uuidv4();
    const labelColor = dark ? "text-white" : "text-gray-900";
    const textColor = dark ? "text-white" : "text-gray-900";
    const ring = dark ? "ring-gray-500" : "ring-gray-300";
    return (
      <div className={clsx(containerClassname)}>
        {label ? (
          <label
            htmlFor={id}
            className={clsx("block text-sm font-medium leading-6", labelColor)}
          >
            {label}
          </label>
        ) : (
          label
        )}
        <div className="relative mt-2 rounded-md shadow-sm">
          <textarea
            ref={ref}
            rows={4}
            id={id}
            className={clsx(
              "block w-full rounded-md bg-transparent border-0 py-1.5",
              textColor,
              "shadow-sm ring-1 ring-inset placeholder:text-gray-400",
              "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
              error &&
                "pr-10 text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300",
              dark && ring
            )}
            {...rest}
          />
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

export default Textarea;
