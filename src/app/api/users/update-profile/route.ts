import { authOptions } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateProfileSchema = z.object({
  bio: z.string(),
})

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json('Não autorizado', { status: 401 })
  }

  const { bio } = updateProfileSchema.parse(body)

  console.log(session)
  console.log(bio)
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({ a: 'a' })
}
