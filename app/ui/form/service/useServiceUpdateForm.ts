import { Service } from '@/app/lib/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(5, 'Please enter a description with at least 5 caracthers.'),
  price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than R$0.' }),
  description: z.string().min(16, 'Please enter a description with at least 16 caracthers.'),
});

export type UpdateServiceFormSchemaType = z.infer<typeof schema>

export function useServiceUpdateForm({
  updateService,
  service
}: {
  updateService: (formData: FormData) => Promise<void>
  service: Service
}) {
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateServiceFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: service.name,
      description: service.description,
      price: service.price / 100,
    }
  });

  const handleSubmit = submit(async (data, e) => {
    await updateService(new FormData(e?.target))
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors
  };
}
