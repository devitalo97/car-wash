import { fetchFilteredGallery, fetchFilteredServices } from "@/app/lib/data";
import { formatBytes } from "@/app/utils/formatters";
import {
  Bars4Icon,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";

export default async function GalleryList({ query }: { query: string }) {
  const gallery = await fetchFilteredGallery(query);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex">
          <h1 className="flex-1 text-2xl font-bold text-white">Galeria</h1>
          <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
            <button
              type="button"
              className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Bars4Icon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Use list view</span>
            </button>
            <button
              type="button"
              className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Squares2X2IconMini className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Use grid view</span>
            </button>
          </div>
        </div>

        {/* Gallery */}
        <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="sr-only">
            Recently viewed
          </h2>
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          >
            {gallery.map((gal) => (
              <li key={gal.name} className="relative">
                <Link href={`gallery/${gal.uuid}`}>
                  <div
                    className={clsx(
                      false
                        ? "ring-2 ring-indigo-500 ring-offset-2"
                        : "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
                      "aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100"
                    )}
                  >
                    <img
                      src={gal.media[0].source}
                      alt=""
                      className={clsx(
                        false ? "" : "group-hover:opacity-75",
                        "pointer-events-none object-cover"
                      )}
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for {gal.name}
                      </span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-white">
                    {gal.name}
                  </p>
                  <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {formatBytes(gal.media[0].size)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
