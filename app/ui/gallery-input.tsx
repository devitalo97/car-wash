import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

type Image = {
  title: string;
  size: string;
  source: string;
};

interface Props {
  label?: string;
  dark?: boolean;
  id?: string;
  containerClassname?: string;
  images: Image[];
}

export default function GalleryInput({
  label,
  containerClassname,
  id,
  images,
  dark = true,
}: Props) {
  const _id = id ?? uuidv4();
  const labelColor = dark ? "text-white" : "text-gray-900";
  return (
    <div className={clsx(containerClassname)}>
      {label ? (
        <label
          className={clsx("block text-sm font-medium leading-6", labelColor)}
        >
          {label}
        </label>
      ) : null}
      <div className="relative mt-2 rounded-md shadow-sm">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {images.map((file) => (
            <li key={file.source} className="relative">
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  src={file.source}
                  alt=""
                  className="pointer-events-none object-cover group-hover:opacity-75"
                />
                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">View details for {file.title}</span>
                </button>
              </div>
              <p
                className={clsx(
                  "pointer-events-none mt-2 block truncate text-sm font-medium",
                  labelColor
                )}
              >
                {file.title}
              </p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500">
                {file.size}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
