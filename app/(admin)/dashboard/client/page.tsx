import { Suspense } from "react";
import { OrderListSkeleton } from "@/app/ui/skeletons";
import SearchBar from "@/app/(admin)/ui/search-bar";
import ClientList from "../../ui/client-list";

export default function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="xl:pl-72 bg-gray-900">
      <SearchBar placeholder="Busque pelos clientes" />

      <Suspense key={query + currentPage} fallback={<OrderListSkeleton />}>
        <ClientList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
