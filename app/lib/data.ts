import { home } from "@/public/home";
import { unstable_noStore as noStore } from 'next/cache';
import clientPromise from "./mongodb";
import { Order, Schedule, Service, User } from "./definitions";

//SERVICE ================================================================================
//
export async function fetchServices(): Promise<Service[]> {
  return await (await clientPromise).db("car-wash").collection("service").aggregate([
    {
      $match: {}
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
  const service = await (await clientPromise).db("car-wash").collection("service").findOne({ uuid })
  return service as unknown as Service
}


const servicesObject: { [x: string]: Service } = {
  "1": {
    uuid: "1",
    name: "Lavagem e Higienização Completa",
    created_at: new Date().toISOString(),
    price: 220,
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[0] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "2": {
    uuid: "2",
    name: "Pintura automotiva",
    price: 220,
    created_at: new Date().toISOString(),
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[1] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "3": {
    uuid: "3",
    name: "Limpeza de tapetes",
    price: 70,
    created_at: new Date().toISOString(),
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[2] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "4": {
    uuid: "4",
    name: "Limpeza de estofados",
    price: 70,
    created_at: new Date().toISOString(),
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[3] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "5": {
    uuid: "5",
    name: "Limpeza de Rodas e Pneus",
    price: 70,
    created_at: new Date().toISOString(),
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[4] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "6": {
    uuid: "6",
    name: "Limpeza interna",
    created_at: new Date().toISOString(),
    price: 70,
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[5] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "7": {
    uuid: "7",
    name: "Limpeza Externa",
    created_at: new Date().toISOString(),
    price: 70,
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[6] as unknown as string,
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  }
}



//ORDER ==================================================================================
//
export async function fetchOrders(query: string, currentPage: number): Promise<OrderQueryResult[]> {
  noStore()
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  return [...Object.values(ordersObject), ...Object.values(ordersObject)].map(order => ({
    ...order,
    service_uuid: servicesObject["1"],
    user_uuid: usersObject["1"],
    schedule_uuid: {} as Schedule
  })).filter(el => el.user_uuid.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
}
export async function fetchOrderByUUID(uuid: string): Promise<Order> {
  noStore()
  return ordersObject[uuid]
}

const ordersObject: { [x: string]: Order } = {
  "1": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
    user_uuid: "1",
    status: "pending",
    delivery: {
      with: true,
      location: "Rua 14, numero 768"
    }
  },
  "2": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
    status: "paid",
    user_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 14, numero 768"
    }
  },
  "3": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
    status: "paid",
    user_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 17, numero 55"
    }
  },
  "4": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
    status: "pending",
    user_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 35, numero 99"
    }
  },
}

//SCHEDULE ===============================================================================
//

export async function fetchSchedules(): Promise<Schedule[]> {
  return await (await clientPromise).db("car-wash").collection("schedule").aggregate([
    {
      $match: {}
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
    const user = await (await clientPromise).db("car-wash").collection("user").findOne({ email })
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
    }]).toArray()) as User[]
}


const usersObject: { [x: string]: User } = {
  "1": {
    uuid: "1",
    name: "Client#00",
    password: "Client#00",
    role: "client",
    email: 'client00@mail.com',
    created_at: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    orders_uuid: ["1"],
  },
  "2": {
    uuid: "2",
    name: "Client#01",
    password: "Client#01",
    role: "client",
    email: 'client01@mail.com',
    created_at: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  "3": {
    uuid: "3",
    name: "Client#02",
    password: "Client#02",
    role: "client",
    email: 'client02@mail.com',
    created_at: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
}


export type OrderQueryResult = {
  uuid: string
  service_uuid: Service
  schedule_uuid: Schedule
  user_uuid: User
  status: 'pending' | 'paid'
  delivery: {
    with: boolean
    location?: string
  }
}


