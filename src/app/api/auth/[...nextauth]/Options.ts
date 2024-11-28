import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import type { NextAuthOptions } from 'next-auth';

declare module 'next-auth/jwt' {
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          }
        );

        const user = await res.json();
        if (res.ok && user) {
          return { id: user.userId, role: user.role, token: user.token };
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.id;
        token.role = user.role || token.role;
        token.token = user.token || token.token;
      }
      (await cookies()).set('userId', JSON.stringify(token.id), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      (await cookies()).set('token', JSON.stringify(token.token), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
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
