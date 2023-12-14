import clientPromise from "./mongodb";
import { Order, Schedule, Service, User } from "./definitions";
import Stripe from 'stripe'
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3";
import { Readable } from "stream";

//SERVICE ================================================================================
//
export async function fetchServices(): Promise<Service[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  return await (await clientPromise).db("car-wash").collection("service").aggregate([
    {
      $match: {}
    }, {
      $project: {
        _id: 0
      }
    }]).toArray() as Service[]
}
export async function fetchFilteredServices(query: string, currentPage: number): Promise<Service[]> {
  return (await (await clientPromise).db("car-wash").collection("service").aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }
    }, {
      $project: {
        _id: 0
      }
    }]).toArray()) as Service[]
}
export async function createOneService(service: Service): Promise<Service> {
  await (await clientPromise).db("car-wash").collection("service").insertOne(service)
  return service
}
export async function updateOneService(id: string, service: Partial<Service>): Promise<Partial<Service>> {
  await (await clientPromise).db("car-wash").collection("service").updateOne({ uuid: id }, { $set: service })
  return service
}
export async function deleteOneService(id: string): Promise<Partial<void>> {
  await (await clientPromise).db("car-wash").collection("service").deleteOne({ uuid: id })
}
export async function fetchServiceById(uuid: string): Promise<Service> {
  const service = await (await clientPromise).db("car-wash").collection("service").findOne({ uuid }, { projection: { _id: 0 } })
  return service as unknown as Service
}


//ORDER ==================================================================================
export async function createOneOrder(order: Order): Promise<Order> {
  await (await clientPromise).db("car-wash").collection("order").insertOne(order)
  return order
}
export async function fetchOrders(): Promise<Order[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  return await (await clientPromise).db("car-wash").collection("order").aggregate([
    {
      $match: {}
    }, {
      $project: {
        _id: 0
      }
    }]).toArray() as Order[]
}
export async function fetchOrderById(uuid: string): Promise<Order> {
  const order = await (await clientPromise).db("car-wash").collection("order").findOne({ uuid })
  return order as unknown as Order
}

export async function updateOneOrderStatusByStripeSessionId(stripe_session_id: string, status: string | null) {
  await (await clientPromise).db("car-wash").collection("order").updateOne({ stripe_session_id: stripe_session_id }, { $set: { status: status } })
}

//SCHEDULE ===============================================================================
//

export async function fetchSchedules(): Promise<Schedule[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  return await (await clientPromise).db("car-wash").collection("schedule").aggregate([
    {
      $match: {}
    }, {
      $project: {
        _id: 0
      }
    }]).toArray() as Schedule[]
}
export async function createOneSchedule(schedule: Schedule): Promise<Schedule> {
  await (await clientPromise).db("car-wash").collection("schedule").insertOne(schedule)
  return schedule
}
export async function deleteOneSchedule(id: string): Promise<Partial<void>> {
  await (await clientPromise).db("car-wash").collection("schedule").deleteOne({ uuid: id })
}
export async function fetchScheduleById(uuid: string): Promise<Schedule> {
  const schedule = await (await clientPromise).db("car-wash").collection("schedule").findOne({ uuid })
  return schedule as unknown as Schedule
}
export async function updateOneSchedule(id: string, schedule: Partial<Schedule>): Promise<Partial<Schedule>> {
  await (await clientPromise).db("car-wash").collection("schedule").updateOne({ uuid: id }, { $set: schedule })
  return schedule
}


//USER ===================================================================================
//
export async function fetchUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await (await clientPromise).db("car-wash").collection("users").findOne({ email })
    return user as unknown as User;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}
export async function fetchFilteredClients(query: string, currentPage: number): Promise<User[]> {
  return (await (await clientPromise).db("car-wash").collection("users").aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ],
        role: "client"
      }
    }, {
      $project: {
        _id: 0
      }
    }]).toArray()) as User[]
}
export async function createOneUser(user: User): Promise<User> {
  await (await clientPromise).db("car-wash").collection("users").insertOne(user)
  return user
}

export async function createOneUserByEmail(email: string, user: Partial<User>): Promise<void> {
  await (await clientPromise).db("car-wash").collection("users").updateOne({ email }, { $set: user })
}

export async function pushOrderOnUserByUUID(uuid: string, orders_uuid: string[]): Promise<void> {
  await (await clientPromise).db("car-wash").collection("users").updateOne({ uuid }, { $addToSet: { orders_uuid: { $each: orders_uuid } } })
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//STRIPE ================================================================================
export async function createStripeProductAndPrice(service: Service) {
  const product = await stripe.products.create({
    name: service.name,
    images: [service.images[0].source],
    description: service.description,
  });

  const price = await stripe.prices.create({
    currency: 'brl',
    unit_amount: service.price,
    product: product.id
  });

  return {
    product, price
  }
}

export async function createStripePrice(stripe_product_id: string, unit_amount: number) {
  const price = await stripe.prices.create({
    currency: 'brl',
    unit_amount: unit_amount,
    product: stripe_product_id
  });

  return price
}

export async function deactivateStripePrice(stripe_price_id: string) {
  const price = await stripe.prices.update(stripe_price_id, {
    active: false
  });
  return price
}

export async function updateStripeProduct(stripe_product_id: string, service: Service) {
  const product = await stripe.products.update(stripe_product_id, {
    name: service.name,
    images: [service.images[0].source],
    description: service.description,
  });
  return product
}

export async function deactivateStripeProduct(stripe_product_id: string) {
  const price = await stripe.products.update(stripe_product_id, {
    active: false
  });
  return price
}


type S3UploadInput = {
  name: string
  type: string
  size: number
  body: string | Uint8Array | Buffer | Readable | Uint8Array | ReadableStream | Blob;
}
type S3UploadOutput = {
  source: string
  name: string
  size: number
  type: string
}
//=====================================================
export async function s3Upload(files: S3UploadInput[]): Promise<S3UploadOutput[]> {
  const result = await Promise.all(files.map((async file => {
    const _type = file.type.replace("image/", "")
    const result = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${process.env.S3_PUBLIC_BUCKET_DIRECTORY}${file.name}.${_type}`,
        Body: file.body,
      })
    );
    if (result.$metadata.httpStatusCode !== 200) {
      return undefined
    }
    return {
      source: `${process.env.S3_BASE_PUBLIC_BUCKET_URL}${file.name}.${_type}`,
      name: file.name,
      size: file.size,
      type: file.type
    }
  })))
  return result.filter(el => el !== undefined) as S3UploadOutput[]
}

