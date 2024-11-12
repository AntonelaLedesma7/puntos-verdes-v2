import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/options'

export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const { userId, points, weights } = await req.json()

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/admin/add-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.token}`
      },
      body: JSON.stringify({ userId, points, weights })
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ message: data.message || 'Error al agregar puntos' }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error de conexión' }, { status: 500 })
  }
}