import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import ListMenu from "../../ui/list-menu";
import { fetchOrders } from "@/app/lib/data";

export default async function OrderList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await fetchOrders(query, currentPage);
  if (!orders || orders.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <main className="lg:pr-96">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-white">
          Ordens de serviço
        </h1>

        {/* Sort dropdown */}
        <ListMenu />
      </header>
      {/* Deployment list */}
      <ul role="list" className="divide-y divide-white/5">
        {orders.map((order) => (
          <li
            key={order.uuid}
            className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div
                  className={clsx(
                    statusInsightStyle[order.status],
                    "flex-none rounded-full p-1"
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <Link href={`/order/${order.uuid}`} className="flex gap-x-2">
                    <span className="truncate">{order.service_uuid.name}</span>
                    <span className="text-gray-400">/</span>
                    <span className="whitespace-nowrap">
                      {order.client_uuid.name}
                    </span>
                    <span className="absolute inset-0" />
                  </Link>
                </h2>
              </div>
              {order.delivery.with ? (
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                  <p className="truncate">{order.delivery.location}</p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-gray-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    {devileryMapped[String(order.delivery.with)]}
                  </p>
                </div>
              ) : null}
            </div>
            <div
              className={clsx(
                statusBadgeStyle[order.status],
                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {statusTitleMapped[order.status]}
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

const statusInsightStyle: { [x: string]: string } = {
  pending: "text-gray-500 bg-gray-100/10",
  paid: "text-green-400 bg-green-400/10",
};

const statusBadgeStyle: { [x: string]: string } = {
  pending: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  paid: "text-green-400 bg-green-400/10 ring-green-400/30",
};

const statusTitleMapped: { [x: string]: string } = {
  pending: "Pendente",
  paid: "Pago",
};

const devileryMapped: { [x: string]: string } = {
  true: "M&M Delivery",
  false: "",
};
