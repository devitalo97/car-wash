import { fetchSchedules } from "@/app/lib/data";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default async function ScheduleList() {
  const schedules = await fetchSchedules();
  if (!schedules || schedules.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <ol className="lg:absolute lg:inset-0 lg:overflow-y-auto lg:grid-cols-1">
      {schedules.map((meeting) => (
        <li
          key={meeting.uuid}
          className="relative flex space-x-6 py-6 xl:static border-b-[1px] border-gray-600 last:border-none lg:mr-4 hover:bg-white/20 hover:cursor-pointer px-4"
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
    </ol>
  );
}
