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
export async function fetchOrders(): Promise<Order[]> {
  noStore()
  return Object.values(ordersObject)
}
export async function fetchOrderByUUID(uuid: string): Promise<Order> {
  noStore()
  return ordersObject[uuid]
}
type Order = {
  uuid: string
  service_uuid: string
  schedule_uuid: string
  user_uuid: string
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
    user_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 14, numero 768"
    }
  },
  "2": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
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
    user_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 14, numero 768"
    }
  },
  "4": {
    uuid: "1",
    service_uuid: "1",
    schedule_uuid: "1",
    user_uuid: "1",
    delivery: {
      with: true,
      location: "Rua 14, numero 768"
    }
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


//CLIENT =================================================================================
//
type Client = {
  uuid: string
  name: string
  email: string
  avatar: string
  orders_uuid: string[]
}


//USER ===================================================================================
//
type User = {
  uuid: string
  name: string
  email: string
  avatar: string
}



