import { Service } from '@/app/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(5, 'Please enter a description with at least 5 caracthers.'),
  price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than R$0.' }),
  description: z.string().min(16, 'Please enter a description with at least 16 caracthers.'),
  file_upload: z.any(),
  old_upload: z.array(z.any())
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
    control
  } = useForm<UpdateServiceFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: service.name,
      description: service.description,
      price: service.price / 100,
      old_upload: service.images
    }
  });

  const handleSubmit = submit(async ({ file_upload, old_upload }, e) => {
    const formData = new FormData(e?.target)
    file_upload.forEach((file: File, index: number) => {
      formData.set(`file_upload[${index}]`, file)
    })
    old_upload.forEach((file: File, index: number) => {
      formData.set(`old_upload[${index}]`, file)
    })
    await updateService(formData)
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors,
    control
  };
}
