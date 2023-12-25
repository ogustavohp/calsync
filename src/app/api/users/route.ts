import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const { name, username } = await request.json()
  const cookieStore = cookies()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return NextResponse.json(
      { error: 'Username already taken.' },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  cookieStore.set({
    name: '@calsync/userId',
    value: user.id,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7days
  })

  // request.cookies.set({ name: '@calsync/userId', value: 'aaaa' })

  return NextResponse.json(user, { status: 201 })
}
