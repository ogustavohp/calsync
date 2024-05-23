import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextRequest, NextResponse } from 'next/server'

dayjs.extend(utc)

export async function GET(request: NextRequest) {
  // console.log(request.nextUrl)
  const fullPathname = request.nextUrl.pathname.toLowerCase()
  const fullPatchNameParts = fullPathname.split('/')

  const usersIndex = fullPatchNameParts.indexOf('users')
  const availabilityIndex = fullPatchNameParts.indexOf('availability')

  const username = fullPatchNameParts
    .slice(usersIndex + 1, availabilityIndex)
    .toString()

  const date = request.nextUrl.searchParams.get('date')
  const timezoneOffSet = request.nextUrl.searchParams.get('timezoneOffSet')

  if (!date || !timezoneOffSet) {
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

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  const timezoneOffSetInHours =
    typeof timezoneOffSet === 'string'
      ? Number(timezoneOffSet) / 60
      : Number(timezoneOffSet[0]) / 60

  const referenceDateTimeZoneOffSetInHours =
    referenceDate.toDate().getTimezoneOffset() / 60

  if (isPastDate) {
    return NextResponse.json({ possibleTimes: [], availableTimes: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return NextResponse.json({ possibleTimes: [], availableTimes: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability
  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate
          .set('hour', startHour)
          .add(timezoneOffSetInHours, 'hours')
          .toDate(),
        lte: referenceDate
          .set('hour', endHour)
          .add(timezoneOffSetInHours, 'hours')
          .toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) =>
        blockedTime.date.getUTCHours() - timezoneOffSetInHours === time,
    )

    const isTimeInPast = referenceDate
      .set('hour', time)
      .subtract(referenceDateTimeZoneOffSetInHours, 'hours')
      .isBefore(dayjs().utc().subtract(timezoneOffSetInHours, 'hours'))

    return !isTimeBlocked && !isTimeInPast
  })

  return NextResponse.json({ possibleTimes, availableTimes })
}
