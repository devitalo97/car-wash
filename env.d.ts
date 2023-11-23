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
  }
}
