import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Si no hay token, redirigir al login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  const role = token?.role;

  // Guardar el rol en una cookie
  const response = NextResponse.next();

  if (role) {
    response.cookies.set('role', role);
  }

  // Redirigir según el rol
  if (role === 'admin' && req.nextUrl.pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  
  if (role === 'user' && req.nextUrl.pathname !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard', '/admin'],
};
