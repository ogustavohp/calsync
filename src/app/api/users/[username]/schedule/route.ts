import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createSchedulingBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

export async function POST(request: NextRequest) {
  // console.log(request.nextUrl)
  const fullPathname = request.nextUrl.pathname.toLowerCase()
  const fullPatchNameParts = fullPathname.split('/')

  const usersIndex = fullPatchNameParts.indexOf('users')
  const availabilityIndex = fullPatchNameParts.indexOf('schedule')

  const username = fullPatchNameParts
    .slice(usersIndex + 1, availabilityIndex)
    .toString()

  const body = await request.json()

  const { name, email, observations, date } =
    createSchedulingBodySchema.parse(body)

  if (!date) {
    return NextResponse.json({ error: 'Date not provided.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'Users does not exists.' },
      { status: 400 },
    )
  }

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return NextResponse.json({ error: 'Date is in the past.' }, { status: 400 })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return NextResponse.json(
      { error: 'There is another scheduling at thee same time.' },
      { status: 400 },
    )
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return NextResponse.json({ status: 201 })
}
