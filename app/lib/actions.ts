'use server';

import { z } from 'zod';
import { createOneSchedule, createOneService, createStripePrice, createStripeProductAndPrice, deactivateStripePrice, deactivateStripeProduct, deleteOneSchedule, deleteOneService, fetchServiceById, fetchServices, updateOneSchedule, updateOneService, updateStripeProduct } from './data';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { uploadFile } from './firebase';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import Stripe from 'stripe'
import { Service } from './definitions';

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
  const service = {
    name,
    price: priceInCents,
    description,
    uuid,
    created_at,
    imageSrc,
    imageAlt: file.name
  }
  let stripe_product, stripe_price
  try {
    ({ product: stripe_product, price: stripe_price } = await createStripeProductAndPrice(service))
  } catch (error) {
    throw error
  }
  try {
    await createOneService({
      ...service,
      stripe_price_id: stripe_price.id,
      stripe_product_id: stripe_product.id,
    })
  } catch (error) {
    throw error
  }
  revalidatePath('/dashboard/services')
}

export async function updateService(id: string, formData: FormData) {
  const oldSerivce = await fetchServiceById(id)
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
  const service = {
    name,
    price: priceInCents,
    description,
    imageSrc,
    imageAlt: file.name
  }
  let stripe_price
  try {
    [stripe_price] = await Promise.all([
      createStripePrice(oldSerivce.stripe_product_id!, priceInCents),
      deactivateStripePrice(oldSerivce.stripe_price_id!)
    ])
  } catch (e) {
    throw new Error((e as Error).message);
  }
  try {
    await updateStripeProduct(oldSerivce.stripe_product_id!, service as Service)
  } catch (e) {
    throw new Error((e as Error).message);
  }
  try {
    await updateOneService(id, {
      ...service,
      stripe_price_id: stripe_price.id
    })
  } catch (error) {
    throw error
  }
  revalidatePath(`/dashboard/service/${id}/edit`)
  redirect(`/dashboard/service/${id}`)
}

export async function deleteService(service: Service) {
  try {
    await deleteOneService(service.uuid)
    await Promise.all([
      deactivateStripePrice(service.stripe_price_id!),
      deactivateStripeProduct(service.stripe_product_id!)
    ])
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


//STRIPE PAYMENT ==========================================================================
export async function createCheckoutSession() {
  let session: Stripe.Checkout.Session
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: 'price_1OLyuhD14M5JnKfeLS9WhlCM',
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${process.env.URL}/stripe/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  } catch (error) {
    console.error(error)
    throw error
  }
  redirect(`/stripe/checkout?secret=${session.client_secret}`)
}

export async function retriveCheckoutSession(formData: FormData) {
  const session_id = formData.get("session_id") as string
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const session = await stripe.checkout.sessions.retrieve(session_id);
  return {
    status: session.status,
    customer_details: session?.customer_details
  }
}





