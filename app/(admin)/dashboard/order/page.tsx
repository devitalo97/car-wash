import { Suspense } from "react";
import OrderList from "@/app/(admin)/ui/order-list";
import { OrderListSkeleton } from "@/app/ui/skeletons";
import SearchBar from "@/app/(admin)/ui/search-bar";

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
      <SearchBar placeholder="Busque pelas ordens" />

      <Suspense key={query + currentPage} fallback={<OrderListSkeleton />}>
        <OrderList />
      </Suspense>
    </div>
  );
}
