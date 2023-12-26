import ListMenu from "@/app/ui/list-menu";
import { fetchOrders } from "@/app/lib/data";
import OrderListItem from "./order-list-item";

export default async function OrderList() {
  const orders = await fetchOrders();
  if (!orders || orders.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <main>
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-white">
          Ordens de serviço
        </h1>
        <ListMenu />
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {orders.map((order) => (
          <OrderListItem order={order} key={order.uuid} />
        ))}
      </ul>
    </main>
  );
}
