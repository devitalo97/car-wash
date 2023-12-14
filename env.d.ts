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
    S3_ACCESS_KEY_ID: string
    S3_SECRET_ACCESS_KEY: string
    S3_REGION: string
    S3_BUCKET_NAME: string
    S3_PUBLIC_BUCKET_DIRECTORY: string
    S3_BASE_PUBLIC_BUCKET_URL: string
    MAX_FILE_SIZE: number
  }
}
