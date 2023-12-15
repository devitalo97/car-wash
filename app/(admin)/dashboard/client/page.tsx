import {
  ChevronLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import ClientList from "../../ui/client-list";
import SearchBar from "../../ui/search-bar";
import { ClientDetail } from "../../ui/client-detail";

export default function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    user_uuid?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const user_uuid = searchParams?.user_uuid || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <div className="flex h-full xl:pl-72 bg-gray-900">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <nav
                className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                aria-label="Breadcrumb"
              >
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 text-sm font-medium text-white"
                >
                  <ChevronLeftIcon
                    className="-ml-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Directory</span>
                </a>
              </nav>

              <ClientDetail user_uuid={user_uuid} currentPage={currentPage} />
            </main>
            <aside className="hidden w-96 flex-shrink-0 border-r border-white/5 xl:order-first xl:flex xl:flex-col">
              <div className="px-6 pb-4 pt-6">
                <h2 className="text-lg font-medium text-white">Clientes</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Encontre um dos seus clientes
                </p>
              </div>
              <SearchBar
                placeholder="Pesquise"
                conatinerClassname="!px-4 !lg:px-4"
              />
              {/* Directory list */}
              <ClientList query={query} currentPage={currentPage} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
