import { Order } from "@/app/lib/definitions";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export default function OrderListItem({ order }: { order: Order }) {
  return (
    <li className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-w-0 flex-auto">
        <div className="flex items-center gap-x-3">
          <div
            className={clsx(
              statuses[order.status],
              "flex-none rounded-full p-1"
            )}
          >
            <div className="h-2 w-2 rounded-full bg-current" />
          </div>
          <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
            <Link
              href={`/dashboard/order/${order.uuid}`}
              className="flex gap-x-2"
            >
              <span className="truncate">{order.protocol}</span>
              <span className="text-gray-400">/</span>
              <span className="whitespace-nowrap">{order.protocol}</span>
              <span className="absolute inset-0" />
            </Link>
          </h2>
        </div>
        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
          <p className="truncate">{order.protocol}</p>
          <svg
            viewBox="0 0 2 2"
            className="h-0.5 w-0.5 flex-none fill-gray-300"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p className="whitespace-nowrap">{statusMapped[order.status]}</p>
        </div>
      </div>
      <div
        className={clsx(
          environments[order.status],
          "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
        )}
      >
        {statusMapped[order.status]}
      </div>
      <ChevronRightIcon
        className="h-5 w-5 flex-none text-gray-400"
        aria-hidden="true"
      />
    </li>
  );
}

const statuses = {
  pending: "text-gray-500 bg-gray-100/10",
  complete: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};

const environments = {
  pending: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  complete: "text-green-400 bg-green-400/10 ring-green-400/30",
};

export const statusMapped = {
  pending: "Pendente",
  complete: "Paga",
};
