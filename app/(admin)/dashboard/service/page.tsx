import { Suspense } from "react";
import { OrderListSkeleton } from "@/app/ui/skeletons";
import SearchBar from "../../ui/search-bar";
import ServiceList from "../../ui/service-list";
import ServiceCreateForm from "@/app/ui/service-create-form";
import { createService } from "@/app/lib/actions";

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
      <SearchBar placeholder="Busque pelos serviços" />

      <Suspense key={query + currentPage} fallback={<OrderListSkeleton />}>
        <ServiceList query={query} currentPage={currentPage} />
      </Suspense>
      <Suspense fallback={<div>loading</div>}>
        <ServiceCreateForm createService={createService} />
      </Suspense>
    </div>
  );
}
