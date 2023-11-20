import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...rest }: Props) {
  return (
    <div>
      {label ? (
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-white"
        >
          {label}
        </label>
      ) : null}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...rest}
          className={clsx(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            error &&
              "pr-10 text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300"
          )}
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
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
