import { fetchSchedules } from "@/app/lib/data";
import { CalendarIcon } from "@heroicons/react/24/outline";

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
        {schedules.map((meeting) => (
          <li
            key={meeting.uuid}
            className="flex space-x-6 py-6 xl:static hover:bg-white/20 hover:cursor-pointer px-4"
          >
            <div className="flex-auto">
              <h3 className="pr-10 font-semibold text-white xl:pr-0">
                {meeting.order_uuid ?? "Horário Livre"}
              </h3>
              <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row xl:gap-2">
                <div className="flex items-start space-x-3">
                  <dt className="mt-0.5">
                    <span className="sr-only">Date</span>
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <time dateTime={meeting.from}>
                      {meeting.from.toString().split("GMT")[0]}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
