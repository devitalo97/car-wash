import { createOrderInteraction } from "@/app/lib/actions";
import { Order, OrderInteraction, User } from "@/app/lib/definitions";
import { formatShortDate } from "@/app/utils/formatters";
import { auth } from "@/auth";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default async function OrderActivity({ order }: { order: Order }) {
  const session = await auth();
  const createOrderInteractionBinded = createOrderInteraction.bind(null, {
    order_uuid: order.uuid,
    user_uuid: session?.user.uuid!,
  });

  const activity = order.interactions as (OrderInteraction & { user: User })[];

  return (
    <div>
      {/* Activity feed */}
      <h2 className="text-sm font-semibold leading-6 text-gray-900">
        Activity
      </h2>
      <ul role="list" className="mt-6 space-y-6">
        {activity.map((activityItem, activityItemIdx) => {
          return (
            <li key={activityItem.uuid} className="relative flex gap-x-4">
              <div
                className={clsx(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.type === "commented" && activityItem?.user ? (
                <>
                  {
                    <img
                      src={activityItem?.user?.avatar}
                      alt=""
                      className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                  }
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {activityItem.user.name}
                        </span>{" "}
                        commented
                      </div>
                      <time
                        dateTime={activityItem.created_at.toString()}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {formatShortDate(activityItem.created_at)}
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {activityItem.comment}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    {activityItem.type === "paid" ? (
                      <CheckCircleIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                    )}
                  </div>
                  <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {activityItem.user?.name}
                    </span>{" "}
                    {activityItem.type} the invoice.
                  </p>
                  <time
                    dateTime={activityItem.created_at.toString()}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {formatShortDate(activityItem.created_at)}
                  </time>
                </>
              )}
            </li>
          );
        })}
      </ul>

      {/* New comment form */}
      <div className="mt-6 flex gap-x-3">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="h-6 w-6 flex-none rounded-full bg-gray-50"
        />
        <form
          action={createOrderInteractionBinded}
          className="relative flex-auto"
        >
          <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={""}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
            <button
              type="submit"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
