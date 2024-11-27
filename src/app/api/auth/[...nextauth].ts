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

console.log("hola")

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
        console.log(user); // Loguear la respuesta para debug

        if (res.ok && user) {
          return user; // Si la respuesta es correcta, devolver el objeto usuario
        } else {
          throw new Error(user.error || 'Error al iniciar sesión');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Página de inicio de sesión
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Asegúrate de que los valores existen antes de asignarlos
        token.id = user.userId || token.id;
        token.role = user.role || token.role;
        token.token = user.token || token.token;
      }

      // Guardar el id y token en las cookies
      (await cookies()).set('userId', JSON.stringify(token.id), {
        path: '/',
        httpOnly: true, // Asegura que no pueda ser accedida por JavaScript
        secure: process.env.NODE_ENV === 'production', // Solo en producción
      });

      (await cookies()).set('token', JSON.stringify(token.token), {
        path: '/',
        httpOnly: true, // Asegura que no pueda ser accedida por JavaScript
        secure: process.env.NODE_ENV === 'production', // Solo en producción
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
