'use client';

import { signIn, useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import useRewardStore from '@/app/stores/useRewardStore';
import Navbar from '@/components/navbar-landing';
import Footer from '@/components/footer';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUserId } = useRewardStore();
  const { data: session, status } = useSession();
  

  // Este useEffect se ejecuta cada vez que la sesión cambia
  useEffect(() => {
    if (status === 'authenticated') {
      const userRole = session?.user.role || 'user';
      const userId = getCookie('userId');
      setUserId(userId);

      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [session, status, router, setUserId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 bg-[--background-color]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-[--color-secundary] rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-semibold text-center text-white">
            Iniciar sesión
          </h2>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block mb-2 text-white">Correo electrónico</label>
            <input
              id="email"
              key={"email"}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-white">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            id="submit-button"
            type="submit"
            className="w-full bg-[--color-primary] py-3 font-bold text-black transition duration-200 rounded-full hover:bg-[--color-hover]"
          >
            Iniciar sesión
          </button>
          <div className="mt-6 text-center">
            <p className="text-white">¿No tienes cuenta?</p>
            <Link
              href="register"
              className="text-[--color-primary] font-bold hover:underline"
            >
              Registrarse
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default function Login() {
  return (
    <SessionProvider>
      <LoginPage />
    </SessionProvider>
  );
}
