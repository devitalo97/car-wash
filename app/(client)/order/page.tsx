import { OrderCard } from "../ui/order-card";
import { fetchOrdersWithServices } from "@/app/lib/data";

export default async function Example() {
  const orders = await fetchOrdersWithServices();
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Histórico de pedidos
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Verifique o status de pedidos recentes, gerencie devoluções e
              descubra Produtos Similares.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Pedidos recentes</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.map((order) => (
                <OrderCard order={order} key={order.uuid} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
