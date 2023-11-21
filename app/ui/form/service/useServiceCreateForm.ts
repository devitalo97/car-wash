import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(5, 'Please enter a description with at least 5 caracthers.'),
  price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than R$0.' }),
  description: z.string().min(16, 'Please enter a description with at least 16 caracthers.'),
});

export type CreateServiceFormSchemaType = z.infer<typeof schema>

export function useServiceCreateForm({
  createService
}: {
  createService: (formData: FormData) => Promise<void>
}) {
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    formState: { errors },
  } = useForm<CreateServiceFormSchemaType>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = submit(async (data, e) => {
    await createService(new FormData(e?.target))
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors
  };
}
