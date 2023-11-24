import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { fetchFilteredClients } from "@/app/lib/data";

export default async function ClientList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clients = await fetchFilteredClients(query, currentPage);
  if (!clients || clients.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <main className="lg:pr-96">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-white">
          Clientes
        </h1>

        {/* Sort dropdown */}
        {/* <ListMenu /> */}
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {clients.map((client) => (
          <li
            key={client.uuid}
            className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 hover:bg-white/20"
          >
            <div className="min-w-0 flex-auto flex items-center gap-x-3">
              <img
                src={client.avatar}
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-800"
              />
              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                {client.name}
              </h3>
              <time
                dateTime={client.created_at.toISOString()}
                className="flex-none text-xs text-gray-600"
              >
                {client.created_at.toISOString()}
              </time>
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
