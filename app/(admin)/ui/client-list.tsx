import { fetchFilteredClients } from "@/app/lib/data";
import { ClientListItem } from "./client-list-item";

export default async function ClientList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clients = await fetchFilteredClients(query, currentPage);
  return (
    <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
      <div className="relative">
        <ul role="list" className="relative z-0 divide-y divide-white/5">
          {clients.map((client) => (
            <ClientListItem client={client} key={client.uuid} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
