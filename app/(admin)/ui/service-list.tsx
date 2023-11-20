import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ListMenu from "../../ui/list-menu";
import { fetchFilteredServices } from "@/app/lib/data";

export default async function ServiceList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const services = await fetchFilteredServices(query, currentPage);
  if (!services || services.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <main className="lg:pr-96">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-white">
          Serviços
        </h1>

        {/* Sort dropdown */}
        {/* <ListMenu /> */}
      </header>
      {/* Deployment list */}
      <ul role="list" className="divide-y divide-white/5">
        {services.map((service) => (
          <li
            key={service.uuid}
            className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <Link
                    href={`/dashboard/service/${service.uuid}`}
                    className="flex gap-x-2"
                  >
                    <span className="truncate">{service.name}</span>
                    <span className="text-gray-400">/</span>
                    <span className="whitespace-nowrap">
                      R${service.price / 100}
                    </span>
                    <span className="absolute inset-0" />
                  </Link>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                <p className="truncate">{service.description}</p>
                {/* <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5 flex-none fill-gray-300"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg> */}
              </div>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </main>
  );
}