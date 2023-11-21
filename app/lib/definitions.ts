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
  client_uuid: string
  status: 'pending' | 'paid'
  delivery: {
    with: boolean
    location?: string
  }
}

export type Client = {
  uuid: string
  name: string
  email: string
  avatar: string
  created_at: string
  orders_uuid?: string[]
}

export type User = {
  uuid: string
  name: string
  password: string
  email: string
  avatar: string
}
