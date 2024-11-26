import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.pathname.split('/').pop();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: 'Falta el token',
        data: null,
      },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/users/${userId}/points`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error al obtener los puntos', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener los puntos',
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const userId = req.nextUrl.pathname.split('/').pop();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: 'Falta el token',
        data: null,
      },
      { status: 401 }
    );
  }

  try {
    const points = await req.json();
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/users/${userId}/points`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(points),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error al actualizar los puntos', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al actualizar los puntos',
        data: null,
      },
      { status: 500 }
    );
  }
}
