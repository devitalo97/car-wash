import { fetchSchedules } from "@/app/lib/data";
import Combobox from "./combobox";

export default async function ScheduleInput() {
  const schedules = await fetchSchedules();
  return (
    <Combobox
      inputClassname="px-8 py-3"
      placeholder="Escolha o seu horário"
      label="Horário"
    />
  );
}
