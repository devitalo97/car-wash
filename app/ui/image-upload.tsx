"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface ImageUploadProps extends React.HTMLAttributes<HTMLTableRowElement> {
  name: string;
  size: number;
  getUrl: string;
  error?: boolean | undefined;
}

const ImageUpload = forwardRef<HTMLTableRowElement, ImageUploadProps>(
  ({ getUrl, error, name, size, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={clsx("flex justify-start gap-4", className)}
      >
        <div className="relative flex">
          {error ? (
            <div className="flex w-full justify-center items-center">
              <XCircleIcon className="h-6 w-6" />
            </div>
          ) : (
            <img
              src={getUrl}
              alt={name}
              className="h-12 w-12 rounded-md object-cover object-center sm:h-24 sm:w-24"
            />
          )}
        </div>
        <dl className="flex flex-col">
          <dt
            className={clsx("dark:text-slate-300 whitespace-nowrap", {
              "dark:text-red-500": error,
            })}
          >
            {name}
          </dt>
          <dd
            className={clsx("whitespace-nowrap text-sm dark:text-slate-400", {
              "dark:text-red-500": error,
            })}
          >
            {(size / 1000).toFixed(0)} KB
          </dd>
        </dl>
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
