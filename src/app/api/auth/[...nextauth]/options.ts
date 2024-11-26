import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import type { NextAuthOptions } from 'next-auth';

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    token?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          throw new Error(user.error || 'Error al iniciar sesión');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token , user }) {
      if (user) {
        token.id = user.userId;
        token.role = user.role;
        token.token = user.token;
      }
      
      (await cookies()).set('userId', JSON.stringify(token.id), {
        path: '/',
      });
      (await cookies()).set('token', JSON.stringify(token.token), {
        path: '/',
      });
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
};