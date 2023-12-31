'use client'
import React, { useState } from 'react'
import Calendar from '@/components/Calendar'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  return (
    <div
      className={`relative mx-auto mb-0 mt-6 grid max-w-full rounded-md border border-zinc-700 bg-zinc-800 ${
        isDateSelected
          ? 'col-span-1 lg:grid-cols-[1fr_280px]'
          : 'col-span-1 w-[540px]'
      }`}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-zinc-700 px-6 pt-6">
          <h2 className="text-base text-zinc-100">
            Terça-feira <span className="text-zinc-300">26 de setembro</span>
          </h2>

          <div className="col-span-1 mt-3 grid gap-2">
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              08:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              09:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              10:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              11:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              12:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              13:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              14:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              15:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              16:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              17:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              18:00h
            </button>
            <button
              disabled
              className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40"
            >
              19:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              20:00h
            </button>
            <button className="cursor-pointer rounded-lg border-0 bg-zinc-700 py-2 text-base text-gray-200 last:mb-6 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
              21:00h
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
