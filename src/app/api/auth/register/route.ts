import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, email, name } = body

    if (!id || !email) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User sudah ada' }, { status: 200 })
    }

    // Simpan ke database Prisma
    const newUser = await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
        role: 'USER', // Default role
      },
    })

    return NextResponse.json(
      { message: 'User berhasil disimpan', user: newUser },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error register:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 },
    )
  }
}
