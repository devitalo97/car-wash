import { Suspense } from "react";
import { OrderListSkeleton } from "@/app/ui/skeletons";
import SearchBar from "@/app/(admin)/ui/search-bar";
import ServiceList from "@/app/(admin)/ui/service-list";

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
    <div className="xl:pl-72 bg-gray-900 h-full">
      <SearchBar
        placeholder="Busque pelos serviços"
        redirectButtonUrl="service/create"
      />

      <Suspense key={query + currentPage} fallback={<OrderListSkeleton />}>
        <ServiceList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
