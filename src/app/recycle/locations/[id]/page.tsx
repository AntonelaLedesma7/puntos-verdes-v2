'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/recycle-page.module.css';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import useRecycleStore from "@/app/stores/useRecycleStore";
import { useState } from "react";

type Material = {
  name: string;
  icon: React.ReactNode;
};

type Location = {
  name: string;
  address: string;
  hours: string;
};

interface SessionUser {
  id?: string;
  role?: string;
  token?: string;
  userId?: string; // Add the userId property
}

interface Session {
  user?: SessionUser;
}

function ConfirmationPageContent() {
  const { data: session } = useSession<Session>();
  const router = useRouter();
  const { selectedMaterials, selectedLocation } = useRecycleStore();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleConfirm = async () => {
    // Type guard to ensure session and user exist
    if (!session?.user) {
      setMessageType('error');
      setMessage('No se encontró la sesión del usuario');
      return;
    }

    console.log('Materiales seleccionados:', selectedMaterials);
    console.log('Ubicación seleccionada:', selectedLocation);
    console.log('ID de usuario:', session.user.userId);

    if (selectedMaterials.length > 0 && selectedLocation) {
      const data = {
        materials: selectedMaterials,
        location: selectedLocation,
        userID: session.user.userId, // Now TypeScript knows this might be undefined
      };

      try {
        const response = await fetch("/api/confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setMessageType('success');
          setMessage('Reciclaje confirmado con éxito. Redirigiendo...');
          router.push("/reciclaje-exitoso");
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData.message);
          setMessageType('error');
          setMessage("Error al enviar los datos. Inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessageType('error');
        setMessage("Hubo un problema al enviar los datos. Inténtalo de nuevo.");
      }
    } else {
      setMessageType('error');
      setMessage("Por favor, selecciona materiales y una ubicación antes de confirmar.");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="mb-8 text-3xl text-center">
        <h1 className="font-bold">Confirmar Reciclaje</h1>
      </div>
      {message && (
        <p
          className={`text-center p-4 mb-4 rounded ${
            messageType === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {message}
        </p>
      )}
      <div className={styles.materialsSection}>
        <h2 className='text-xl'>Materiales seleccionados:</h2>
        {selectedMaterials.length === 0 ? (
          <p>No has seleccionado ningún material.</p>
        ) : (
          <div className={styles.materialsList}>
            {selectedMaterials.map((material, index) => (
              <div
                key={index}
                className={"bg-[--color-secundary] text-white rounded-lg p-4 flex flex-col items-center justify-center"}
              >
                <div className={styles.materialIcon}>{material.icon}</div>
                <p className={styles.materialName}>{material.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.locationSection}>
        <h2 className='mb-3 text-xl'>Ubicación seleccionada:</h2>
        {selectedLocation ? (
          <div className="mb-5 p-4 bg-[--color-secundary] border-l-8 border-[--color-primary] rounded-lg drop-shadow-[0_35px_35px_rgba(0,0,0,100)]">
            <p className='mb-2 text-lg font-semibold'>Nombre del lugar: {selectedLocation.name}</p>
            <div className="flex items-center mb-3">
              <MapPinIcon className="w-6 h-6 mr-2" />
              <p>{selectedLocation.address}</p>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 mr-2" />
              <p>{selectedLocation.hours}</p>
            </div>
          </div>
        ) : (
          <p>No se seleccionó ninguna ubicación.</p>
        )}
      </div>

      <div className='flex justify-center gap-4'>
        <Link href="./" className={buttonVariants({ variant: "secondary", size: "lg", className: "font-bold" })}>
          Volver
        </Link>
        <Link href="/dashboard" onClick={handleConfirm} className={buttonVariants({ variant: "default", size: "lg", className: "font-bold" })}>
          Confirmar
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <SessionProvider>
      <ConfirmationPageContent />
    </SessionProvider>
  );
}