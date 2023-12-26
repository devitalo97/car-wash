import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Readable } from "stream";
import sharp from "sharp"

export const s3 = new S3Client({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION
});


export type UploadFileInS3Output = {
  source: string
  name: string
  size: number
  type: string
}
export async function uploadFileInS3(files: File[]): Promise<UploadFileInS3Output[]> {
  const _files = []
  for (let f = 0; f < files.length; f++) {
    const bytes = await files[f].arrayBuffer()
    const buffer = Buffer.from(bytes);
    const metadata = await sharp(buffer).metadata()
    _files.push({
      name: files[f].name,
      type: files[f].type,
      size: files[f].size,
      body: buffer,
      width: metadata.width,
      height: metadata.height
    })
  }
  return await s3Upload(_files)
}


type S3UploadInput = {
  name: string
  type: string
  size: number
  height?: number
  width?: number
  body: string | Uint8Array | Buffer | Readable | Uint8Array | ReadableStream | Blob;
}
type S3UploadOutput = {
  source: string
  name: string
  size: number
  type: string
  height?: number
  width?: number
}
//=====================================================
export async function s3Upload(files: S3UploadInput[]): Promise<S3UploadOutput[]> {
  const result = await Promise.all(files.map((async file => {
    const _type = file.type.replace("image/", "")
    const result = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${process.env.S3_PUBLIC_BUCKET_DIRECTORY}${file.name}.${_type}`,
        Body: file.body,
      })
    );
    if (result.$metadata.httpStatusCode !== 200) {
      return undefined
    }
    return {
      source: `${process.env.S3_BASE_PUBLIC_BUCKET_URL}${file.name}.${_type}`,
      name: file.name,
      size: file.size,
      type: file.type,
      width: file.width,
      height: file.height
    }
  })))
  return result.filter(el => el !== undefined) as S3UploadOutput[]
}

//=====================================================
export async function s3Delete(files: S3UploadOutput[]): Promise<S3UploadOutput[]> {
  const result = await Promise.all(files.map((async file => {
    const _type = file.type.replace("image/", "")
    const result = await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${process.env.S3_PUBLIC_BUCKET_DIRECTORY}${file.name}.${_type}`,
      })
    );
    if (result.$metadata.httpStatusCode !== 200) {
      return undefined
    }
    return {
      source: `${process.env.S3_BASE_PUBLIC_BUCKET_URL}${file.name}.${_type}`,
      name: file.name,
      size: file.size,
      type: file.type,
      width: file.width,
      height: file.height
    }
  })))
  return result.filter(el => el !== undefined) as S3UploadOutput[]
}




