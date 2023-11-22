import { Schedule } from '@/app/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

export type UpdateScheduleFormSchemaType = z.infer<typeof schema>

export function useScheduleUpdateForm({
  updateSchedule,
  schedule
}: {
  updateSchedule: (formData: FormData) => Promise<void>
  schedule: Schedule
}) {
  console.log('schedule', schedule)
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateScheduleFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      // @ts-ignore
      from: dateInputFormat(schedule.from),
      // @ts-ignore
      to: dateInputFormat(schedule.to),
    }
  });

  const handleSubmit = submit(async (_, e) => {
    await updateSchedule(new FormData(e?.target))
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors
  };
}

const dateInputFormat = (data: Date) => {
  return data.getFullYear() + '-' +
    (data.getMonth() + 1).toString().padStart(2, '0') + '-' +
    data.getDate().toString().padStart(2, '0') + 'T' +
    data.getHours().toString().padStart(2, '0') + ':' +
    data.getMinutes().toString().padStart(2, '0');
};

