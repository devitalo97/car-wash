export type Service = {
  uuid: string
  name: string
  price: number
  description: string
  created_at: string
  imageSrc: string
  imageAlt: string
}


export type Order = {
  uuid: string
  service_uuid: string
  schedule_uuid: string
  user_uuid: string
  status: 'pending' | 'paid'
  delivery: {
    with: boolean
    location?: string
  }
}

export type User = {
  uuid: string
  name: string
  password: string
  email: string
  avatar: string
  role: string
  created_at: Date
  orders_uuid?: string[]
}

export type Schedule = {
  uuid: string
  from: Date
  to: Date
  created_at: string
  order_uuid?: string
}

