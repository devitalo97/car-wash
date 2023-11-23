'use server';

import { z } from 'zod';
import { createOneSchedule, createOneService, deleteOneSchedule, deleteOneService, updateOneSchedule, updateOneService } from './data';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { uploadFile } from './firebase';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';

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
  } catch (error) {
    throw error
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
  } catch (error) {
    throw error
  }
  revalidatePath(`/dashboard/service/${id}/edit`)
  redirect(`/dashboard/service/${id}`)
}

export async function deleteService(id: string) {
  try {
    await deleteOneService(id)
  } catch (error) {
    throw error;
  }
  revalidatePath(`/dashboard/service`)
  redirect(`/dashboard/service`)
}


const CreateScheduleFormSchema = z.object({
  uuid: z.string(),
  from: z.string(),
  to: z.string(),
  created_at: z.string(),
});
const CreateSchedule = CreateScheduleFormSchema.omit({ uuid: true, created_at: true });

export async function createSchedule(formData: FormData) {
  const { from, to } = CreateSchedule.parse(Object.fromEntries(formData.entries()));
  const created_at = new Date().toISOString()
  const uuid = uuidv4()
  try {
    await createOneSchedule({
      uuid,
      from: new Date(from),
      to: new Date(to),
      created_at
    })
  } catch (error) {
    throw error
  }
  revalidatePath('/dashboard/schedule')
  redirect('/dashboard/schedule')
}

export async function deleteSchedule(id: string) {
  try {
    await deleteOneSchedule(id)
  } catch (error) {
    throw error;
  }
  revalidatePath(`/dashboard/schedule`)
  redirect(`/dashboard/schedule`)
}

export async function updateSchedule(id: string, formData: FormData) {
  const { from, to } = CreateSchedule.parse(Object.fromEntries(formData.entries()));
  try {
    await updateOneSchedule(id, {
      from: new Date(from),
      to: new Date(to)
    })
  } catch (error) {
    throw error
  }
  revalidatePath(`/dashboard/schedule/${id}/edit`)
  redirect(`/dashboard/schedule/${id}`)
}

export async function adminAuthenticate(formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    throw error;
  }
}

export async function clientAuthenticate() {
  try {
    await signIn('google');
  } catch (error) {
    throw error;
  }
}


export async function logout() {
  try {
    await signOut({ redirectTo: "/login" });
  } catch (error) {
    throw error;
  }
}