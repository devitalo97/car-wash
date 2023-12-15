import OrderHeader from "../../../ui/order-header";
import OrderSummary from "../../../ui/order-summary";
import OrderActivity from "../../../ui/order-activity";
import OrderInvoice from "../../../ui/order-invoice";
import { fetchOrderByUUID } from "@/app/lib/data";

export default async function Example({
  params,
}: {
  params: { uuid: string };
}) {
  const uuid = params.uuid;
  const order = await fetchOrderByUUID(uuid);
  if (!order) {
    throw new Error("not found");
  }
  const breadcrumbs = [
    { id: 1, name: "Pedidos", href: "/order" },
    {
      id: 2,
      name: "Visualizar pedido",
      href: `/order/${uuid}`,
    },
  ];
  return (
    <>
      <div className="bg-white">
        <main className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <OrderHeader protocol={order.protocol} />
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-2">
                {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center text-sm">
                      <a
                        href={breadcrumb.href}
                        className="font-medium text-gray-500 hover:text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Invoice summary */}
              <div className="lg:col-start-3 lg:row-end-1">
                <OrderSummary
                  date={order.created_at}
                  status={order.status}
                  value={order.total}
                  user={order.user.email}
                  pay_with={order.pay_with}
                />
              </div>

              {/* Invoice */}
              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <OrderInvoice order={order} />
              </div>

              <div className="lg:col-start-3">
                <OrderActivity order={order} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
