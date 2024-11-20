'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from "@/components/navbar-landing";
import Footer from '@/components/footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Datos enviados:', formData);

    if (formData.password !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Respuesta del servidor:', data); // Verifica la respuesta

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar el usuario');
      }

      setMessage('Registro exitoso. Redirigiendo a la página de inicio de sesión...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
        console.error('Error en el registro:', error);
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage('Ocurrió un error inesperado');
        }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen px-4 bg-[--background-color]">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-[--color-secundary] rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white">Registrarse</h2>
        {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-white">Nombre completo</label>
          <input 
            type="text" 
            name="name" 
            onChange={handleChange} 
            value={formData.name} 
            required
            className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Nombre de usuario</label>
          <input 
            type="text" 
            name="username" 
            onChange={handleChange} 
            value={formData.username} 
            required
            className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Correo electrónico</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            value={formData.email} 
            required
            className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Contraseña</label>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            value={formData.password} 
            required
            className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Confirmar contraseña</label>
          <input 
            type="password" 
            name="confirmPassword" 
            onChange={handleChange} 
            value={formData.confirmPassword} 
            required
            className="w-full p-2 text-black bg-[--color-white] rounded focus:outline-none focus:ring focus:ring-blue-500"/>
        </div>
        <button type="submit" className="w-full bg-[--color-primary] py-3 font-bold text-black transition duration-200 rounded-full hover:bg-[--color-hover]">Registrarse</button>
        {/* Enlace a la página de login */}
        <div className="mt-6 text-center">
          <p className="text-white">¿Ya tiene un cuenta?</p>
          <Link href="login" className="text-[--color-primary] font-bold hover:underline">Iniciar sesión</Link>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}
