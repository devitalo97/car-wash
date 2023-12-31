import { statusMapped } from "@/app/(admin)/ui/order-list-item";
import { Order } from "@/app/lib/definitions";
import { formatPriceFromCents, formatShortDate } from "@/app/utils/formatters";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OrderSummary({
  value,
  status,
  date,
  user,
  pay_with,
  dark = false,
}: {
  value: number;
  status: Order["status"];
  date: Date;
  user: string;
  pay_with: Order["pay_with"];
  dark?: boolean;
}) {
  const bgDark = "bg-gray-900 bg-black/10 ring-1 ring-white/5";
  const textDark = "text-white";
  return (
    <div>
      <h2 className="sr-only">Resumo</h2>
      <div
        className={clsx(
          "rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5",
          dark && bgDark
        )}
      >
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt
              className={clsx(
                "text-sm font-semibold leading-6 text-gray-900",
                dark && textDark
              )}
            >
              Valor
            </dt>
            <dd
              className={clsx(
                "mt-1 text-base font-semibold leading-6 text-gray-900",
                dark && textDark
              )}
            >
              {formatPriceFromCents(value)}
            </dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Status</dt>
            <dd className={statuses[status]}>{statusMapped[status]}</dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Client</span>
              <UserCircleIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd
              className={clsx(
                "text-sm font-medium leading-6 text-gray-900",
                dark && textDark
              )}
            >
              {user}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Due date</span>
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              <time dateTime="2023-01-31">{formatShortDate(date)}</time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <CreditCardIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {payWithMapped[pay_with]}
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-gray-900/5 px-6 py-6 flex justify-between">
          <a
            href="#"
            className={clsx(
              "text-sm font-semibold leading-6 text-gray-900",
              textDark
            )}
          >
            Manipular
          </a>
          <a
            href="#"
            className={clsx(
              "text-sm font-semibold leading-6 text-gray-900",
              textDark
            )}
          >
            Baixar recibo <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const statuses = {
  pending:
    "rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-600/20",
  complete:
    "rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20",
};

const payWithMapped = {
  card: "Pago com cartão",
  pix: "Pago com pix",
};
