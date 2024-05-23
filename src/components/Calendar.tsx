'use client'
import { useQuery } from '@tanstack/react-query'
import '../lib/dayjs'
import { getWeekDays } from '@/utils/get-week-days'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'

interface CalendarWeekType {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeksType = CalendarWeekType[]

interface CalendarProps {
  onDateSelected: (date: Date) => void
}

interface BlockedDatesType {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export default function Calendar({ onDateSelected }: CalendarProps) {
  const [currentDate, setCurranteDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const username = useParams().username

  function handlePreviousMonth() {
    const previousMonthData = currentDate.subtract(1, 'month')
    setCurranteDate(previousMonthData)
  }

  function handleNextMonth() {
    const previousMonthData = currentDate.add(1, 'month')
    setCurranteDate(previousMonthData)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDatesType>({
    queryKey: [
      'blocked-dates',
      currentDate.get('month'),
      currentDate.get('year'),
    ],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: String(currentDate.get('month') + 1).padStart(2, '0'),
        },
      })

      return response.data
    },
  })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })
    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')) ||
            blockedDates.blockedDates.includes(date.get('date')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeksType>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0
        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  // console.log(calendarWeeks)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg capitalize">
          {currentMonth} <span className="text-zinc-400">{currentYear}</span>
        </h2>
        <div className="flex gap-2 text-zinc-400">
          <button
            title="Previous month"
            onClick={handlePreviousMonth}
            className="cursor-pointer rounded leading-none transition-colors hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <ChevronLeft />
          </button>
          <button
            title="Next month"
            onClick={handleNextMonth}
            className="cursor-pointer rounded leading-none transition-colors hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <table className="w-full table-fixed border-spacing-1">
        <thead className="text-sm leading-3 text-zinc-300">
          <tr>
            {shortWeekDays.map((day, i) => (
              <th key={`${day}-${i}`}>{day}.</th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:text-zinc-900 before:content-['.']">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map((day) => {
                  return (
                    <td key={day.date.toString()}>
                      <button
                        onClick={() => onDateSelected(day.date.toDate())}
                        disabled={day.disabled}
                        className="aspect-square w-full cursor-pointer rounded-md bg-zinc-600 hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40"
                      >
                        {day.date.get('date')}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
