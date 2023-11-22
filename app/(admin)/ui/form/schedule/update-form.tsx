"use client";

import Input from "@/app/ui/input";
import Button from "@/app/ui/button";
import { Schedule } from "@/app/lib/definitions";
import { useScheduleUpdateForm } from "./useServiceUpdateForm";

interface Props {
  updateSchedule: (formData: FormData) => Promise<void>;
  schedule: Schedule;
}

export default function ScheduleUpdateForm({
  updateSchedule,
  schedule,
}: Props) {
  const { errors, register, handleSubmit } = useScheduleUpdateForm({
    updateSchedule,
    schedule,
  });
  return (
    <aside className="bg-gray-900 border-l border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Atualizar um horário
        </h2>
      </header>

      <form className="px-4 py-2 space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10">
            <div className="flex flex-col gap-4">
              <Input
                {...register("from")}
                placeholder="Horário de início"
                label="Início"
                type="datetime-local"
                error={errors.from?.message}
              />
              <Input
                {...register("to")}
                placeholder="Horário de término"
                label="Fim"
                type="datetime-local"
                error={errors.to?.message}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            label="Salvar"
          />
        </div>
      </form>
    </aside>
  );
}
