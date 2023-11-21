'use server';

import { z } from 'zod';
import { createOneService, deleteOneService, updateOneService } from './data';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { uploadFile } from './firebase';
import { redirect } from 'next/navigation';

const CreateServiceFormSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  created_at: z.string(),
});

const CreateService = CreateServiceFormSchema.omit({ uuid: true, created_at: true });

export async function createService(formData: FormData) {
  const { file_upload, ...rest } = Object.fromEntries(formData.entries())
  const file = file_upload as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes);
  const imageSrc: any = await uploadFile({ buffer, name: file.name })
  const { name, price, description } = CreateService.parse(rest);
  const priceInCents = price * 100;
  const created_at = new Date().toISOString()
  const uuid = uuidv4()
  try {
    await createOneService({
      name,
      price: priceInCents,
      description,
      uuid,
      created_at,
      imageSrc,
      imageAlt: file.name
    })
  } catch (e) {
    throw new Error((e as Error).message);
  }
  revalidatePath('/dashboard/services')
}

export async function updateService(id: string, formData: FormData) {
  const { file_upload, ...rest } = Object.fromEntries(formData.entries())
  const file = file_upload as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes);
  let imageSrc
  try {
    imageSrc = await uploadFile({ buffer, name: file.name })
  } catch (e) {
    throw new Error((e as Error).message);
  }
  const { name, price, description } = CreateService.parse(rest);
  const priceInCents = price * 100;
  try {
    await updateOneService(id, {
      name,
      price: priceInCents,
      description,
      imageSrc,
      imageAlt: file.name
    })
  } catch (e) {
    throw new Error((e as Error).message);
  }
  revalidatePath(`/dashboard/service/${id}/edit`)
  redirect(`/dashboard/service/${id}`)
}

export async function deleteService(id: string) {
  try {
    await deleteOneService(id)
  } catch (e) {
    throw new Error((e as Error).message);
  }
  revalidatePath(`/dashboard/service`)
  redirect(`/dashboard/service`)
}