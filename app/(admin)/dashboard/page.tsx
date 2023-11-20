import { Suspense } from "react";
import OrderList from "../ui/order-list";
import ClientList from "../ui/client-list";
import { ClientListSkeleton, OrderListSkeleton } from "@/app/ui/skeletons";
import SearchBar from "../ui/search-bar";

export default function Example() {
  return (
    <div className="xl:pl-72 bg-gray-900">
      <SearchBar />

      <Suspense fallback={<OrderListSkeleton />}>
        <OrderList />
      </Suspense>
      <Suspense fallback={<ClientListSkeleton />}>
        <ClientList />
      </Suspense>
    </div>
  );
}
