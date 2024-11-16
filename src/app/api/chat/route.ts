import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, { ...authOptions });


    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }


    const { question } = req.body;


    const response = await fetch("http://localhost:3002/api/chatbot/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message || 'Error en la respuesta del servidor.' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ answer: data.answer }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { message: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
}