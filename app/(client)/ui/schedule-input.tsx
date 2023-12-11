import { fetchSchedules } from "@/app/lib/data";
import { ScheduleCombobox } from "./schedule-combobox";

export default async function ScheduleInput() {
  const schedules = await fetchSchedules();
  return <ScheduleCombobox data={schedules} />;
}
