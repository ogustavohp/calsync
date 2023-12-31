import { prisma } from '@/lib/prisma'
// import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // console.log(request.nextUrl)
  const fullPathname = request.nextUrl.pathname.toLowerCase()
  const fullPatchNameParts = fullPathname.split('/')

  const usersIndex = fullPatchNameParts.indexOf('users')
  const availabilityIndex = fullPatchNameParts.indexOf('blocked-dates')

  const username = fullPatchNameParts
    .slice(usersIndex + 1, availabilityIndex)
    .toString()

  const year = request.nextUrl.searchParams.get('year')
  const month = request.nextUrl.searchParams.get('month')

  if (!year || !month) {
    return NextResponse.json(
      { error: 'Year or month not specified.' },
      { status: 400 },
    )
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

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw = await prisma.$queryRaw`
    SELECT * 
    FROM schedulings S

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
  `

  return NextResponse.json({ blockedWeekDays, blockedDatesRaw })
}
