import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Tipado del middleware
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Obtener el token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Verificar si la URL solicitada es para el área de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Si no hay token o el token no tiene el rol adecuado, redirigir
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Continuar con la solicitud si no se encuentra una condición de redirección
  return NextResponse.next();
}

// Configuración del middleware para que se ejecute en las rutas de /admin
export const config = {
  matcher: ['/admin/:path*'],
};
