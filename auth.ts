import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google, { GoogleProfile } from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { authConfig } from './auth.config';
import { z } from 'zod';
import { fetchUserByEmail } from './app/lib/data';
import bcrypt from 'bcrypt'
import clientPromise from './app/lib/mongodb';
import { v4 as uuidv4 } from "uuid"

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await fetchUserByEmail(email);
          if (!user || !user?.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user?.password);
          if (passwordsMatch) return user as unknown as User;
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile: GoogleProfile) {
        return {
          name: profile.name,
          uuid: uuidv4(),
          email: profile.email,
          role: "client",
          id: profile.sub,
          avatar: profile.picture,
          created_at: new Date(),
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
});

