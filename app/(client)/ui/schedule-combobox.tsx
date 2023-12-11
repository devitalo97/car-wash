"use client";
import { Schedule } from "@/app/lib/definitions";
import Combobox from "@/app/ui/combobox";

export function ScheduleCombobox({ data }: { data: Schedule[] }) {
  return (
    <Combobox
      inputClassname="px-8 py-3"
      placeholder="Escolha o seu horário"
      label="Horário"
      name="schedule_uuid"
      data={data}
      extractCompareForFilterValue={(data) => data.from.toISOString()}
      extractDisplayValue={(data) => data?.from.toISOString()}
      extractKeyValue={(data) => data.uuid}
      extractAvailableValue={(data) => "order_uuid" in data}
      extractHiddenInputValue={(data) => data?.uuid}
    />
  );
}
