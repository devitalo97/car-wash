'use server';

import { z } from 'zod';
import { createOneOrder, createOneSchedule, createOneService, createOneUser, createOneUserByEmail, createStripePrice, createStripeProductAndPrice, deactivateStripePrice, deactivateStripeProduct, deleteOneSchedule, deleteOneService, fetchServiceById, fetchUserByEmail, pushOrderOnUserByUUID, s3Upload, updateOneOrderStatusByStripeSessionId, updateOneSchedule, updateOneService, updateStripeProduct } from './data';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from '@/auth';
import Stripe from 'stripe'
import { Order, Service } from './definitions';
import bcrypt from 'bcrypt'
import { createProtocol } from '../utils/createProtocol';

const CreateServiceFormSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  created_at: z.string(),
  file_upload: z.any()
});
const CreateService = CreateServiceFormSchema.omit({ uuid: true, created_at: true });

export async function createService(formData: FormData) {
  const formDataValue = Object.fromEntries(formData.entries())
  const files = Object.entries(formDataValue).filter(([key]) => key.includes("file_upload")).map(([, value]) => value)
  const filesUploaded = await uploadFileInS3(files as File[])
  const { name, price, description } = CreateService.parse(formDataValue);
  const priceInCents = price * 100;
  const created_at = new Date().toISOString()
  const uuid = uuidv4()
  const service = {
    name,
    price: priceInCents,
    description,
    uuid,
    created_at,
    images: filesUploaded,
    metadata: {
      scheduladable: true
    },
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
      stripe_product_id: stripe_product.id
    })
  } catch (error) {
    throw error
  }
  revalidatePath('/dashboard/services')
}


const UpdateServiceFormSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  file_upload: z.any(),
  old_upload: z.any()
});
export async function updateService(id: string, formData: FormData) {
  console.log(formData)
  const oldSerivce = await fetchServiceById(id)
  const formDataValue = Object.fromEntries(formData.entries())
  //upload de novas imanges

  const files = Object.entries(formDataValue).filter(([key]) => key.includes("file_upload")).map(([, value]) => value)
  const filesUploaded = await uploadFileInS3(files as File[])

  const oldUpload = Object.entries(formDataValue).filter(([key]) => key.includes("old_upload")).map(([, value]) => value) as unknown as UploadFileInS3Output[]

  console.log('filesUploaded', filesUploaded)
  console.log('oldUpload', oldUpload)


  //validando e montando o objeto do service
  const { name, price, description } = UpdateServiceFormSchema.parse(formDataValue);
  const priceInCents = price * 100;
  const service = {
    name,
    price: priceInCents,
    description,
    images: [...filesUploaded, ...oldUpload],
  }

  //atualizar preço no stripe se o preço mudou
  let stripe_price
  if (priceInCents !== oldSerivce.price) {
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
  }
  try {
    await updateOneService(id, {
      ...service,
      stripe_price_id: stripe_price?.id ?? oldSerivce.stripe_price_id
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




export async function credentialAuthentication(formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    throw error;
  }
}

export async function googleAuthentication() {
  try {
    await signIn('google', {});
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

const CreateCheckoutSessionFormSchema = z.object({
  schedule_uuid: z.string(),
});

type createCheckoutSessionParameters = {
  stripe_price_id: string
  service_uuid: string
  service_price: number
}

//STRIPE PAYMENT ==========================================================================
export async function createCheckoutSessionFromProductPage(parameters: createCheckoutSessionParameters, formData: FormData) {
  const auth_session = await auth()
  const data: Partial<{ stripe_price_id: string } & Order> = Object.fromEntries(formData.entries())
  const { schedule_uuid } = CreateCheckoutSessionFormSchema.parse(data);
  let chechout_session: Stripe.Checkout.Session
  const uuid = uuidv4()
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    chechout_session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: parameters.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${process.env.URL}/stripe/return?session_id={CHECKOUT_SESSION_ID}${!auth_session ? "&guest=0" : "&guest=1"}&order_uuid=${uuid}`,
      customer_email: auth_session?.user.email ?? undefined,
      metadata: {
        guest: Number(Boolean(!!auth_session))
      }
    });
    const created_at = new Date()
    const protocol = createProtocol(created_at)
    await createOneOrder({
      uuid,
      status: "pending",
      stripe_session_id: chechout_session.id,
      total: parameters.service_price,
      created_at,
      protocol,
      artfacts: [{
        service_uuid: parameters.service_uuid,
        service_price: parameters.service_price,
        scheduladable_metadata: { schedule_uuid }
      }],
    })
  } catch (error) {
    console.error(error)
    throw error
  }
  redirect(`/stripe/checkout?secret=${chechout_session.client_secret}`)
}

export async function retriveCheckoutSession(formData: FormData) {
  const session_id = formData.get("session_id") as string
  const order_uuid = formData.get("order_uuid") as string
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const session = await stripe.checkout.sessions.retrieve(session_id);
  await updateOneOrderStatusByStripeSessionId(session_id, session.status)
  if (Number(Boolean(session.metadata!.guest))) {
    //previnir criação de multiplos user no refresh da pagina de return do pagamento
    const userExists = await fetchUserByEmail(session?.customer_details?.email!)
    if (userExists) {
      await pushOrderOnUserByUUID(userExists.uuid, [order_uuid])
      return {
        status: session.status,
        customer_details: session?.customer_details,
        user: userExists
      }
    }
    const user = {
      email: session.customer_details?.email!,
      uuid: uuidv4(),
      created_at: new Date(),
      role: "guest",
      orders_uuid: [order_uuid]
    }
    await createOneUser(user)
    return {
      status: session.status,
      customer_details: session?.customer_details,
      user
    }
  }
  return {
    status: session.status,
    customer_details: session?.customer_details,
  }
}

const CreateUserFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type RegisterOptions = {
  guest: boolean
}
//USER
export async function registerUser(options: RegisterOptions, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const { email, password } = CreateUserFormSchema.parse(data);
  const user = {
    uuid: uuidv4(),
    email: email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    role: "client",
    created_at: new Date(),
  }
  if (options.guest) {
    await createOneUserByEmail(user.email, { role: "client", password: user.password })
    redirect("/login")
  }
  await createOneUser(user)
  redirect("/login")
}



type UploadFileInS3Output = {
  source: string
  name: string
  size: number
  type: string
}
export async function uploadFileInS3(files: File[]): Promise<UploadFileInS3Output[]> {
  const _files = []
  for (let f = 0; f < files.length; f++) {
    const bytes = await files[f].arrayBuffer()
    const buffer = Buffer.from(bytes);
    _files.push({
      name: files[f].name,
      type: files[f].type,
      size: files[f].size,
      body: buffer
    })
  }
  return await s3Upload(_files)
}



