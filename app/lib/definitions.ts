export type Service = {
  uuid: string
  name: string
  price: number
  description: string
  created_at: string
  imageSrc: string
  imageAlt: string
  stripe_product_id?: string
  stripe_price_id?: string
}


export type Order = {
  uuid: string
  service_uuid: string
  schedule_uuid: string
  status: 'pending' | 'complete'
  stripe_session_id: string
  user_uuid?: string
}

export type User = {
  uuid: string
  email: string
  role: string
  created_at: Date
  name?: string
  password?: string
  avatar?: string
  orders_uuid?: string[]
}

export type Schedule = {
  uuid: string
  from: Date
  to: Date
  created_at: string
  order_uuid?: string
}

