import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, ...rest }: Props) {
  const id = rest?.id ?? uuidv4();
  return (
    <div>
      {label ? (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-white"
        >
          {label}
        </label>
      ) : (
        label
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <textarea
          {...rest}
          rows={4}
          id={id}
          className={clsx(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            error &&
              "pr-10 text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300"
          )}
        />
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
