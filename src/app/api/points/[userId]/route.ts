import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { userId } = params;
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const response = await fetch(`${process.env.BACKEND_API_URL}/users/${userId}/points`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}

//export async function PUT(req, {params}) {
//  const { userId } = params;
//  const cookieStore = cookies();
//  const token = cookieStore.get('token')?.value;
//  const tokenJson = JSON.parse(token);
//  const response = await fetch(`${process.env.BACKEND_API_URL}/users/${userId}/points`, {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json',
//      Authorization: `Bearer ${tokenJson}`,
//    },
//    body: JSON.stringify(req.body),
//  });
//  const data = await response.json();
//  return NextResponse.json(data);
//}

export async function PUT(req: NextRequest, { params }: Params) {
  const { userId } = params;
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;
  const points = await req.json()
  // guard clausee 
  if (!token) {
    return NextResponse.json({ success: false, error: 'Falta el token', data: null });
  }
  
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/users/${userId}/points`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(points),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error al actualizar los puntos", error);
    return null
  }
}