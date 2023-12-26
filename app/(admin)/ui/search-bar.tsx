"use client";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({
  placeholder,
  conatinerClassname,
  redirectButtonUrl,
}: {
  placeholder: string;
  redirectButtonUrl?: string;
  conatinerClassname?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      <header className="w-full">
        <div
          className={clsx(
            "relative z-10 flex h-16 flex-shrink-0 border-b border-white/5 bg-gray-900 shadow-sm",
            conatinerClassname
          )}
        >
          <button
            type="button"
            className="border-r border-white/5 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            // onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6">
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="desktop-search-field" className="sr-only">
                  Search all files
                </label>
                <label htmlFor="mobile-search-field" className="sr-only">
                  Search all files
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    name="mobile-search-field"
                    id="mobile-search-field"
                    className="h-full bg-transparent w-full border-0 py-2 pl-8 pr-3 text-base text-white focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:hidden"
                    placeholder={placeholder}
                    type="search"
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                  />
                  <input
                    name="desktop-search-field"
                    id="desktop-search-field"
                    className="hidden bg-transparent h-full w-full border-0 py-2 pl-8 pr-3 text-sm text-white focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:block"
                    placeholder="Search all files"
                    type="search"
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                  />
                </div>
              </form>
            </div>
            {redirectButtonUrl && (
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                <Link
                  href={redirectButtonUrl}
                  className="relative rounded-full bg-indigo-600 p-1.5 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute -inset-1.5" />
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Add file</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
