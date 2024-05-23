'use client'
import '@/lib/dayjs'
import React, { useState } from 'react'
import Calendar from '@/components/Calendar'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

interface AvailabilityType {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // const [availability, setAvailability] = useState<AvailabilityType | null>(
  //   null,
  // )

  const params = useParams()
  const username = params.username

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<AvailabilityType>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }
  return (
    <div
      className={`relative mx-auto mb-0 mt-6 grid max-w-full rounded-md border border-zinc-700 bg-zinc-800 ${
        isDateSelected
          ? 'col-span-1 lg:grid-cols-[1fr_280px]'
          : 'col-span-1 w-[540px]'
      }`}
    >
      <Calendar onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-zinc-700 px-6 pt-6">
          <h2 className="text-base text-zinc-100">
            {weekDay} <span className="text-zinc-300">{describedDate}</span>
          </h2>

          <div className="col-span-1 mt-3 grid gap-2">
            {availability?.possibleTimes.map((hour) => {
              return (
                <button
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                  className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40"
                >
                  {String(hour).padStart(2, '00')}:00h
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
