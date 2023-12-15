import { Order, Service } from "@/app/lib/definitions";
import { formatPriceFromCents, formatShortDate } from "@/app/utils/formatters";
import clsx from "clsx";

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
};
export default function OrderInvoice({
  order,
  dark = false,
}: {
  order: Order & { services: Service[] };
  dark?: boolean;
}) {
  const artfacts = order.artfacts.map((art) => ({
    ...art,
    service: order.services.find(
      (service) => service.uuid === art.service_uuid
    ),
  }));

  const lineBottomDark = "border-white/5";
  const textDark = "text-white";
  const ringDark = "ring-1 ring-white/5 bg-gray-900 bg-black/10";
  return (
    <div
      className={clsx(
        "-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14  xl:px-16 xl:pb-20 xl:pt-16",
        dark && ringDark
      )}
    >
      <h2
        className={clsx(
          "text-base font-semibold leading-6 text-gray-900",
          dark && textDark
        )}
      >
        Fatura
      </h2>
      <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
        <div className="sm:pr-4">
          <dt className={clsx("inline text-gray-500", dark && "text-gray-400")}>
            Emitida em
          </dt>{" "}
          <dd className={clsx("inline text-gray-700", dark && "text-gray-500")}>
            <time dateTime={order.created_at.toString()}>
              {formatShortDate(order.created_at)}
            </time>
          </dd>
        </div>
        <div className="mt-2 sm:mt-0 sm:pl-4">
          <dt className={clsx("inline text-gray-500", dark && "text-gray-400")}>
            Vencimento em
          </dt>{" "}
          <dd className={clsx("inline text-gray-700", dark && "text-gray-500")}>
            <time dateTime={order.created_at.toString()}>
              {formatShortDate(order.created_at)}
            </time>
          </dd>
        </div>
        {/* <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
          <dt className="font-semibold text-gray-900">From</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-gray-900">Acme, Inc.</span>
            <br />
            7363 Cynthia Pass
            <br />
            Toronto, ON N3Y 4H8
          </dd>
        </div>
        <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
          <dt className="font-semibold text-gray-900">To</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-gray-900">Tuple, Inc</span>
            <br />
            886 Walter Street
            <br />
            New York, NY 12345
          </dd>
        </div> */}
      </dl>
      <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
        <colgroup>
          <col className="w-full" />
          <col />
          <col />
          <col />
        </colgroup>
        <thead
          className={clsx(
            "border-b border-gray-200 text-gray-900",
            dark && lineBottomDark,
            dark && textDark
          )}
        >
          <tr>
            <th scope="col" className="px-0 py-3 font-semibold">
              Produtos
            </th>
            <th
              scope="col"
              className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
            >
              Quant.
            </th>
            <th
              scope="col"
              className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
            >
              Valor Unitário
            </th>
            <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
              Total do item
            </th>
          </tr>
        </thead>
        <tbody>
          {artfacts.map((art, index) => (
            <tr
              key={art.service_uuid + index}
              className={clsx(
                "border-b border-gray-100",
                dark && lineBottomDark,
                dark && textDark
              )}
            >
              <td className="max-w-0 px-0 py-5 align-top">
                <div
                  className={clsx(
                    "truncate font-medium text-gray-900",
                    textDark
                  )}
                >
                  {art.service?.name}
                </div>
                <div
                  className={clsx(
                    "truncate text-gray-500",
                    dark && "text-gray-400"
                  )}
                >
                  {art.service?.description}
                </div>
              </td>
              <td
                className={clsx(
                  "hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell",
                  dark && "!text-gray-400"
                )}
              >
                {art.service_quant}
              </td>
              <td
                className={clsx(
                  "hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell",
                  dark && "!text-gray-400"
                )}
              >
                {formatPriceFromCents(art.service_price)}
              </td>
              <td
                className={clsx(
                  "py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700",
                  dark && "!text-gray-400"
                )}
              >
                {formatPriceFromCents(art.service_quant * art.service_price)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {order.subtotal && (
            <tr>
              <th
                scope="row"
                className={clsx(
                  "px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden",
                  dark && "text-gray-500"
                )}
              >
                Subtotal
              </th>
              <th
                scope="row"
                colSpan={3}
                className={clsx(
                  "hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell",
                  dark && "text-gray-500"
                )}
              >
                Subtotal
              </th>
              <td
                className={clsx(
                  "pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900",
                  dark && "text-white"
                )}
              >
                {order.subtotal}
              </td>
            </tr>
          )}
          {order.tax && (
            <tr>
              <th
                scope="row"
                className={clsx(
                  "pt-4 font-normal text-gray-700 sm:hidden",
                  dark && "text-gray-500"
                )}
              >
                Tax
              </th>
              <th
                scope="row"
                colSpan={3}
                className={clsx(
                  "hidden pt-4 text-right font-normal text-gray-700 sm:table-cell",
                  dark && "text-gray-500"
                )}
              >
                Tax
              </th>
              <td
                className={clsx(
                  "pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900",
                  dark && "text-white"
                )}
              >
                {order.tax}
              </td>
            </tr>
          )}
          <tr>
            <th
              scope="row"
              className={clsx(
                "pt-4 font-semibold text-gray-900 sm:hidden",
                dark && "text-white"
              )}
            >
              Total
            </th>
            <th
              scope="row"
              colSpan={3}
              className={clsx(
                "hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell",
                dark && "text-white"
              )}
            >
              Total
            </th>
            <td
              className={clsx(
                "pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900",
                dark && "text-white"
              )}
            >
              {formatPriceFromCents(order.total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
