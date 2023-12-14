import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION
});
