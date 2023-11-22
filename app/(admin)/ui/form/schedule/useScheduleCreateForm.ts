import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

export type CreateScheduleFormSchemaType = z.infer<typeof schema>

export function useScheduleCreateForm({
  createSchedule
}: {
  createSchedule: (formData: FormData) => Promise<void>
}) {
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    formState: { errors },
  } = useForm<CreateScheduleFormSchemaType>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = submit(async (_, e) => {
    await createSchedule(new FormData(e?.target))
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors
  };
}
