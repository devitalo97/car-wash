import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google, { GoogleProfile } from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { authConfig } from './auth.config';
import { z } from 'zod';
import { fetchUserByEmail } from './app/lib/data';
import bcrypt from 'bcrypt'
import clientPromise from './app/lib/mongodb';

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
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
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
          email: profile.email,
          image: profile.picture,
          role: "client",
          id: profile.sub,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
});

