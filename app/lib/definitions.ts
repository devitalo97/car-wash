export type Service = {
  uuid: string
  name: string
  price: number
  description: string
  created_at: string
  images: Image[]
  stripe_product_id?: string
  stripe_price_id?: string
  metadata: Metadata
}

export type Image = {
  source: string;
  name: string;
  size: number;
  type: string;
  height?: number;
  width?: number;
}

type Metadata = {
  downloadable?: boolean
  downloadable_resource?: Record<string, string>

  accessible?: boolean
  accessible_resource?: Record<string, string>

  presentable?: boolean
  presentable_resource?: Record<string, string>

  scheduladable?: boolean

  shippable?: boolean
}




// ======================================================================


export type Order = {
  uuid: string
  status: 'pending' | 'complete'
  stripe_session_id: string
  total: number
  user_uuid?: string
  artfacts: OrderArtfact[]
  created_at: Date
  protocol: string
  pay_with: "card" | "pix"
  subtotal?: number
  tax?: number
  interactions: OrderInteraction[]
}

export type OrderInteraction = {
  uuid: string
  created_at: Date
  type: "commented" | "sent" | "created" | "edited" | "viewed" | "paid" | "pending"
  user_uuid?: string
  comment?: string
}

type OrderArtfact = {
  service_uuid: string
  service_price: number
  service_quant: number
  scheduladable_metadata?: Record<string, string>
  shippable_metadata?: Record<string, string>
}




// ======================================================================

export type User = {
  uuid: string
  email: string
  role: "client" | "guest" | "admin"
  created_at: Date
  name?: string
  password?: string
  avatar?: string
  orders_uuid?: string[]
}




// ======================================================================





export type Schedule = {
  uuid: string
  from: Date
  to: Date
  created_at: string
  order_uuid?: string
}



// ======================================================================



export type Gallery = {
  uuid: string
  name: string
  media: Image[]
  description?: string
  location?: string
}


