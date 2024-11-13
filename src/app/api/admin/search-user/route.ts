import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/options'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const { email } = await req.json()

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/admin/search-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.token}`
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ message: data.message || 'Error al buscar usuario' }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error de conexión', error: error}, { status: 500 })
  }
}