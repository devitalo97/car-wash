import OrderHeader from "./order-header";
import OrderSummary from "./order-summary";
import OrderActivity from "./order-activity";
import OrderInvoice from "./order-invoice";
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
  return (
    <>
      <div className="bg-white">
        <main className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <OrderHeader protocol={order.protocol} />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
