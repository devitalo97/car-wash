import { Gallery, Image } from '@/app/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(5, 'Please enter a description with at least 5 caracthers.'),
  description: z.string().min(16, 'Please enter a description with at least 16 caracthers.'),
  file_upload: z.any(),
  old_upload: z.array(z.any())
});

export type UpdateGalleryFormSchemaType = z.infer<typeof schema>

export function useGalleryUpdateForm({
  updateGallery,
  gallery
}: {
  updateGallery: (formData: FormData) => Promise<void>
  gallery: Gallery
}) {
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    formState: { errors },
    control
  } = useForm<UpdateGalleryFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: gallery.name,
      description: gallery.description,
      old_upload: gallery.media
    }
  });

  const handleSubmit = submit(async ({ file_upload, old_upload }, e) => {
    const formData = new FormData(e?.target)
    file_upload?.forEach((file: File, index: number) => {
      formData.set(`file_upload[${index}]`, file)
    })
    old_upload?.forEach((file: Image, index: number) => {
      formData.set(`old_upload[${index}]`, JSON.stringify(file))
    })
    await updateGallery(formData)
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors,
    control
  };
}
