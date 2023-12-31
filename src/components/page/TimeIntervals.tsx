'use client'
import MultiStep from '@/components/MultiStep'
import { api } from '@/lib/axios'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({ control, name: 'intervals' })

  const weekDay = getWeekDays()

  const intervals = watch('intervals')
  const router = useRouter()

  // eslint-disable-next-line
  async function handleSetTimeIntervals(data: any) {
    const formData = data as TimeIntervalsFormOutput

    await api.post('users/time-intervals', formData)

    await router.push('/register/update-profile')
  }

  return (
    <div className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <div className="px-6">
        <h2 className="text-4xl font-bold leading-none">Quase lá</h2>
        <p className="mb-6 mt-2 text-zinc-300">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
        <MultiStep steps={4} currentStep={3} />
      </div>

      <form onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <div className="rounded-md border border-zinc-700 bg-zinc-800 p-6">
          {fields.map((field, i) => {
            return (
              <div
                key={field.id}
                className="flex items-center justify-between rounded-md border border-zinc-700 px-4 py-3"
              >
                <div className="flex gap-3 text-gray-100">
                  <input
                    type="checkbox"
                    id=""
                    {...register(`intervals.${i}.enabled`)}
                  />
                  <Check className="rounded bg-green-500" />
                  <span>{weekDay[field.weekDay]}</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <input
                    type="time"
                    id=""
                    step={60}
                    disabled={intervals[i].enabled === false}
                    {...register(`intervals.${i}.startTime`)}
                    className="rounded-md bg-zinc-900 p-1"
                  />
                  <input
                    type="time"
                    id=""
                    step={60}
                    disabled={intervals[i].enabled === false}
                    {...register(`intervals.${i}.endTime`)}
                    className="rounded-md bg-zinc-900 p-1"
                  />
                </div>
              </div>
            )
          })}

          {errors.intervals && (
            <p className="mt-2 text-red-400">
              {errors.intervals.root?.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex h-10 w-full min-w-40 items-center justify-center gap-1 rounded-md bg-emerald-700 font-bold transition-colors hover:bg-emerald-600 disabled:border-zinc-500 disabled:bg-zinc-500 disabled:text-zinc-200"
          >
            Próximo passo <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  )
}
