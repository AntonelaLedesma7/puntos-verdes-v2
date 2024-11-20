<<<<<<< HEAD
export const ChatbotRoute = async (req: Request) => {
  try {
    const session = await getServerSession(req, { ...authOptions });
=======
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, { ...authOptions });

>>>>>>> develop

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

<<<<<<< HEAD
    const { question } = await req.json();

    const response = await fetch('http://localhost:3002/api/chatbot/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
=======

    const { question } = req.body;


    const response = await fetch("http://localhost:3002/api/chatbot/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
>>>>>>> develop
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
<<<<<<< HEAD
      return NextResponse.json(
        { message: errorData.message || 'Error en la respuesta del servidor.' },
        { status: response.status }
      );
    }

    const data = await response.json();

=======
      return NextResponse.json({ message: errorData.message || 'Error en la respuesta del servidor.' }, { status: response.status });
    }

    const data = await response.json();
>>>>>>> develop
    return NextResponse.json({ answer: data.answer }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
<<<<<<< HEAD
      { message: 'Hubo un error al procesar la solicitud' },
      { status: 500 }
    );
  }
};
=======
      { message: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
>>>>>>> develop
