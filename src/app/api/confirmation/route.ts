import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const headersList = await headers();
    const authorization = headersList.get('Authorization');

    console.log('authorization:', authorization);

    const fetchHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (authorization) {
      fetchHeaders['Authorization'] = authorization;
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/confirmation`,
      {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(body),
      }
    );

    console.log('response:', response);

    if (response.ok) {
      return new Response(JSON.stringify(await response.json()), {
        status: 200,
      });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el servidor.');
    }
  } catch (error: unknown) {
    // Verifica si el error es una instancia de Error
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    } else {
      console.error('Error desconocido:', error);
      return new Response(
        JSON.stringify({
          message: 'Error desconocido al procesar la solicitud.',
        }),
        { status: 500 }
      );
    }
  }
}
