declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    FIREBASE_PROJECT_ID: string
    FIREBASE_PRIVATE_KEY: string
    FIREBASE_CLIENT_EMAIL: string
    FIREBASE_STORAGE_BUCKET: string
    AUTH_SECRET: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_CLIENT_ID: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string
    STRIPE_SECRET_KEY: string
    URL: string
  }
}
