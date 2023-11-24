import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      avatar: string
      role: string
      created_at: Date
    }
  }

  interface User extends DefaultUser {
    avatar: string
    role: string
    created_at: Date
  }
}