'use client'

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import { signOut } from 'next-auth/react';

const Profile: FC = (): JSX.Element => {
  const handleLogout = async () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <div className="container mx-auto max-w-[600px] px-4 my-8 text-white grid gap-5">
        <h1 className="mb-4 text-3xl font-bold text-center">
          Perfil del Usuario
        </h1>

        {/* Mis Datos */}
        <Link
          href="/profile/my-data"
          className="block bg-[--color-secundary] p-4 rounded-lg mb-4 transition-all hover:bg-gray-700"
        >
          <h2 className="text-xl font-semibold">Mis Datos</h2>
          <p className="mt-2">Ver tu información personal.</p>
        </Link>

        {/* Guía de cómo reciclar */}
        <Link
          href="/profile/recycling-guide"
          className="block bg-[--color-secundary] p-4 rounded-lg mb-4 transition-all hover:bg-gray-700"
        >
          <h2 className="text-xl font-semibold">Guía de cómo reciclar</h2>
          <p className="mt-2">Aprende cómo reciclar correctamente.</p>
        </Link>

        {/* Historial de actividades */}
        <Link
          href="/profile/activity-history"
          className="block bg-[--color-secundary] p-4 rounded-lg mb-4 transition-all hover:bg-gray-700"
        >
          <h2 className="text-xl font-semibold">Historial de actividades</h2>
          <p className="mt-2">Revisa tu historial de reciclaje.</p>
        </Link>

        {/* Ayuda */}
        <Link
          href="/profile/help"
          className="block bg-[--color-secundary] p-4 rounded-lg mb-4 transition-all hover:bg-gray-700"
        >
          <h2 className="text-xl font-semibold">Ayuda</h2>
          <p className="mt-2">¿Tienes alguna duda? Contáctanos.</p>
        </Link>

        {/* Configuración */}
        <Link
          href="/profile/settings"
          className="block bg-[--color-secundary] p-4 rounded-lg mb-4 transition-all hover:bg-gray-700"
        >
          <h2 className="text-xl font-semibold">Configuración</h2>
          <p className="mt-2">Ajusta tus preferencias de usuario.</p>
        </Link>

        {/* Acerca de */}
        <Link
          href="/profile/about"
          className="block bg-[--color-secundary] p-4 rounded-lg mb-4 transition-all hover:bg-gray-700"
        >
          <h2 className="text-xl font-semibold">Acerca de</h2>
          <p className="mt-2">Conoce más sobre la aplicación y el equipo.</p>
        </Link>
        {/* Botón para cerrar sesión */}
        <Button
          className="w-full bg-red-600 hover:bg-[--color-secundary] rounded-lg"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
        <Navbar />
      </div>
    </>
  );
};

export default Profile;
