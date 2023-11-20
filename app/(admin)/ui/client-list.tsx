import { fetchClients } from "@/app/lib/data";

export default async function ClientList() {
  const clients = await fetchClients();
  if (!clients || clients.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Activity feed
        </h2>
        <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
          View all
        </a>
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {clients.map((client) => (
          <li key={client.uuid} className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-3">
              <img
                src={client.avatar}
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-800"
              />
              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                {client.name}
              </h3>
              <time
                dateTime={client.created_at}
                className="flex-none text-xs text-gray-600"
              >
                {client.created_at}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
