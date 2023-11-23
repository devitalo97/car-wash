import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = isLoggedIn && auth.user.role === "admin";
      const isLoginPage = nextUrl.pathname.startsWith("/login")
      const isAuthRoutes =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/cart") ||
        nextUrl.pathname.startsWith("/profile")

      if (!isAuthRoutes && !isLoggedIn) return true

      if (isAuthRoutes && !isLoggedIn && !isLoginPage) return Response.redirect(new URL("/login", nextUrl))

      if (isLoggedIn && isLoginPage && isAdmin) return Response.redirect(new URL("/dashboard", nextUrl))

      if (isLoggedIn && isLoginPage && !isAdmin) return Response.redirect(new URL("/profile", nextUrl))

      return true
    },
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.role = token.role
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;


//
