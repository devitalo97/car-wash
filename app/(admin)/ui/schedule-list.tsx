import { fetchSchedules } from "@/app/lib/data";
import { Badge } from "@/app/ui/badge";
import { formatDate, formatTime } from "@/app/utils/formatters";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function ScheduleList() {
  const schedules = await fetchSchedules();
  if (!schedules || schedules.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <main className="lg:pr-96">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-white">
          Horários
        </h1>

        {/* Sort dropdown */}
        {/* <ListMenu /> */}
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {schedules.map((schedule) => (
          <Link
            href={`/dashboard/schedule/${schedule.uuid}`}
            key={`/dashboard/schedule/${schedule.uuid}`}
            className="w-full"
          >
            <li
              key={schedule.uuid}
              className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8
              hover:bg-white/20 hover:cursor-pointer"
            >
              <dl className="min-w-0 flex-auto text-gray-500 xl:flex-row xl:gap-2">
                <div className="flex items-start space-x-3">
                  <dt className="mt-0.5">
                    <span className="sr-only">Date</span>
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <div className="flex flex-start gap-4">
                    <dd>
                      <time dateTime={schedule.from.toISOString()}>
                        {formatTime(schedule.from)}
                      </time>
                      -
                      <time dateTime={schedule.to.toISOString()}>
                        {formatTime(schedule.to)}
                      </time>
                    </dd>
                    <dd>
                      <time dateTime={schedule.from.toISOString()}>
                        {formatDate(schedule.from)}
                      </time>
                    </dd>
                  </div>
                </div>
              </dl>
              <Badge
                status={!("order_uuid" in schedule)}
                title={schedule.order_uuid ? "Agendado" : "Livre"}
              />
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
