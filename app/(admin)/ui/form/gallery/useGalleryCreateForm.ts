import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5, 'Please enter a description with at least 5 caracthers.'),
  description: z.string().min(16, 'Please enter a description with at least 16 caracthers.'),
  file_upload: z.any()
})

export type CreateGalleryFormSchemaType = z.infer<typeof schema>

export function useGalleryCreateForm({
  createGallery
}: {
  createGallery: (formData: FormData) => Promise<void>
}) {
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<CreateGalleryFormSchemaType>({
    resolver: zodResolver(schema)
  })

  const handleSubmit = submit(async ({ file_upload }, e) => {
    const formData = new FormData(e?.target)
    file_upload.forEach((file: File, index: number) => {
      formData.set(`file_upload[${index}]`, file)
    })
    await createGallery(formData)
  })
  return {
    errors,
    handleSubmit,
    register,
    clearErrors,
    control
  }
}
