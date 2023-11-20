import { home } from "@/public/home";
import { StaticImageData } from "next/image";
import { unstable_noStore as noStore } from 'next/cache';

//SERVICE ================================================================================
//
export async function fetchServices(): Promise<Service[]> {
  return Object.values(servicesObject)
}
export async function fetchServiceByUUID(uuid: string): Promise<Service> {
  return servicesObject[uuid]
}
type Service = {
  uuid: string
  name: string
  price: string
  description: string
  imageSrc: StaticImageData
  imageAlt: string
}
const servicesObject: { [x: string]: Service } = {
  "1": {
    uuid: "1",
    name: "Lavagem e Higienização Completa",
    price: "$220",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[0],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "2": {
    uuid: "2",
    name: "Pintura automotiva",
    price: "$220",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[1],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "3": {
    uuid: "3",
    name: "Limpeza de tapetes",
    price: "$70",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[2],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "4": {
    uuid: "4",
    name: "Limpeza de estofados",
    price: "$70",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[3],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "5": {
    uuid: "5",
    name: "Limpeza de Rodas e Pneus",
    price: "$70",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[4],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "6": {
    uuid: "6",
    name: "Limpeza interna",
    price: "$70",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[5],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  "7": {
    uuid: "7",
    name: "Limpeza Externa",
    price: "$70",
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc: home[6],
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  }
}


//ORDER ==================================================================================
//
export async function fetchOrders(): Promise<OrderQueryResult[]> {
  noStore()
  await new Promise<void>((resolve) => setTimeout(resolve, 700))
  return [...Object.values(ordersObject), ...Object.values(ordersObject)].map(order => ({
    ...order,
    service_uuid: servicesObject["1"],
    client_uuid: clientsObject["1"],
    schedule_uuid: {} as Schedule
  }))
}
export async function fetchOrderByUUID(uuid: string): Promise<Order> {
  noStore()
  return ordersObject[uuid]
}
type Order = {
  uuid: string
  service_uuid: string
  schedule_uuid: string
  client_uuid: string
  status: 'pending' | 'paid'
  delivery: {
    with: boolean
    location?: string
  }
}
const ordersObject: { [x: string]: Order } = {
  "1": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
    client_uuid: "1",
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
    client_uuid: "1",
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
    client_uuid: "1",
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
    client_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 35, numero 99"
    }
  },
}


//CLIENT =================================================================================
//
export async function fetchClients(): Promise<Client[]> {
  noStore()
  await new Promise<void>((resolve) => setTimeout(resolve, 500))
  return Object.values(clientsObject)
}
export async function fetchClientByUUID(uuid: string): Promise<Client> {
  noStore()
  return clientsObject[uuid]
}
export type Client = {
  uuid: string
  name: string
  email: string
  avatar: string
  created_at: string
  orders_uuid?: string[]
}
const clientsObject: { [x: string]: Client } = {
  "1": {
    uuid: "1",
    name: "Client#00",
    email: 'client00@mail.com',
    created_at: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    orders_uuid: ["1"],
  },
  "2": {
    uuid: "2",
    name: "Client#01",
    email: 'client01@mail.com',
    created_at: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  "3": {
    uuid: "3",
    name: "Client#02",
    email: 'client02@mail.com',
    created_at: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
}


//SCHEDULE ===============================================================================
//
type Schedule = {
  uuid: string
  from: Date
  to: Date
  order_uuid?: string
}


//USER ===================================================================================
//
type User = {
  uuid: string
  name: string
  email: string
  avatar: string
}





export type OrderQueryResult = {
  uuid: string
  service_uuid: Service
  schedule_uuid: Schedule
  client_uuid: Client
  status: 'pending' | 'paid'
  delivery: {
    with: boolean
    location?: string
  }
}


