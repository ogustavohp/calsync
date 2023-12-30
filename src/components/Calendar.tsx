import { getWeekDays } from '@/utils/get-week-days'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

// const weekDays = ['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SÁB.']

export default function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg">
          Dezembro <span className="text-zinc-400">2023</span>
        </h2>
        <div className="flex gap-2 text-zinc-400">
          <button className="cursor-pointer rounded leading-none transition-colors hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <ChevronLeft />
          </button>
          <button className="cursor-pointer rounded leading-none transition-colors hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
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
          <tr>
            <td className="box-border"></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="aspect-square w-full cursor-pointer rounded-md bg-zinc-600 hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
                1
              </button>
            </td>
            <td>
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-md bg-zinc-600 hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40"
              >
                2
              </button>
            </td>
            <td>
              <button className="aspect-square w-full cursor-pointer rounded-md bg-zinc-600 hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40">
                3
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
