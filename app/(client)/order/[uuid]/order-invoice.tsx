import { Order, Service } from "@/app/lib/definitions";
import { formatPriceFromCents, formatShortDate } from "@/app/utils/formatters";

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
}: {
  order: Order & { services: Service[] };
}) {
  const artfacts = order.artfacts.map((art) => ({
    ...art,
    service: order.services.find(
      (service) => service.uuid === art.service_uuid
    ),
  }));
  return (
    <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14  xl:px-16 xl:pb-20 xl:pt-16">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Fatura
      </h2>
      <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
        <div className="sm:pr-4">
          <dt className="inline text-gray-500">Emitida em</dt>{" "}
          <dd className="inline text-gray-700">
            <time dateTime={order.created_at.toString()}>
              {formatShortDate(order.created_at)}
            </time>
          </dd>
        </div>
        <div className="mt-2 sm:mt-0 sm:pl-4">
          <dt className="inline text-gray-500">Vencimento em</dt>{" "}
          <dd className="inline text-gray-700">
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
        <thead className="border-b border-gray-200 text-gray-900">
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
              className="border-b border-gray-100"
            >
              <td className="max-w-0 px-0 py-5 align-top">
                <div className="truncate font-medium text-gray-900">
                  {art.service?.name}
                </div>
                <div className="truncate text-gray-500">
                  {art.service?.description}
                </div>
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                {art.service_quant}
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                {formatPriceFromCents(art.service_price)}
              </td>
              <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
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
                className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
              >
                Subtotal
              </th>
              <th
                scope="row"
                colSpan={3}
                className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
              >
                Subtotal
              </th>
              <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
                {order.subtotal}
              </td>
            </tr>
          )}
          {order.tax && (
            <tr>
              <th
                scope="row"
                className="pt-4 font-normal text-gray-700 sm:hidden"
              >
                Tax
              </th>
              <th
                scope="row"
                colSpan={3}
                className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
              >
                Tax
              </th>
              <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
                {order.tax}
              </td>
            </tr>
          )}
          <tr>
            <th
              scope="row"
              className="pt-4 font-semibold text-gray-900 sm:hidden"
            >
              Total
            </th>
            <th
              scope="row"
              colSpan={3}
              className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
            >
              Total
            </th>
            <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
              {formatPriceFromCents(order.total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
