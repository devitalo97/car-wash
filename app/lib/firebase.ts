import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getStorage, getDownloadURL } from 'firebase-admin/storage'
import { Readable } from 'stream';

const firebaseAdminConfig = {
  credential: cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  storageBucket: 'car-wash-acdb0.appspot.com'
};

const app = getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];


const storage = getStorage(app)

export async function uploadFile(input: { buffer: Buffer, name: string }): Promise<string> {
  const { buffer, name } = input
  const stream = Readable.from(buffer);
  const destination = storage.bucket().file(`services/${name}`);
  await new Promise<void>(function (resolve, reject) {
    stream
      .pipe(destination.createWriteStream())
      .on("error", function (err) {
        reject(err);
      })
      .on("finish", function () {
        resolve();
      });
  });

  // this is the url you can use to display the image in a website and so forth
  const url = await getDownloadURL(destination);
  return url
};

export const firebase = {
  uploadFile
} 
