import { authOptions } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(req: NextRequest) {
  const body = await req.json()

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Não autorizado.', { status: 401 })
  }

  const { intervals } = timeIntervalsBodySchema.parse(body)

  // async await in prisma? BUGFIX

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return NextResponse.json('criado com sucesso!', { status: 201 })
}
