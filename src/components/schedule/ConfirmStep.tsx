'use client'
import { api } from '@/lib/axios'
import '@/lib/dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  returnToCalendar: () => void
}

export function ConfirmStep({
  schedulingDate,
  returnToCalendar,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const username = useParams().username

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    returnToCalendar()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <form
      onSubmit={handleSubmit(handleConfirmScheduling)}
      className="mx-auto mb-0 mt-6 flex max-w-[540px] flex-col gap-6 rounded-md border border-zinc-700 bg-zinc-800 p-6"
    >
      {/* formHeader */}
      <div className="flex gap-4">
        <p className="flex items-center gap-2">
          <Calendar />
          {describedDate}
        </p>
        <p className="flex items-center gap-2">
          <Clock />
          {describedTime}
        </p>
      </div>

      <span className="rounded border border-zinc-700" />

      <label>
        <p className="mb-2 text-base text-zinc-200">Nome completo</p>
        <input
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 pl-2 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
          type="text"
          {...register('name')}
          placeholder="Seu nome"
        />
        {errors.name && (
          <span className="text-sm text-red-400">{errors.name.message}</span>
        )}
        {/* h-10 rounded-md bg-zinc-900 pl-2 focus:outline focus:ring-4 focus:ring-emerald-700 */}
      </label>
      <label>
        <p className="mb-2 text-base text-zinc-200">Endereço de e-mail</p>
        <input
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 pl-2 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
          type="email"
          {...register('email')}
          placeholder="johndoe@exemple.com"
        />
        {errors.email && (
          <span className="text-sm text-red-400">{errors.email.message}</span>
        )}
      </label>
      <label>
        <p className="mb-2 text-base text-zinc-200">Observações</p>
        <textarea
          {...register('observations')}
          className="h-20 w-full rounded-md border border-zinc-700 bg-zinc-900 pl-2 pt-2 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
        />
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={returnToCalendar}
          className="rounded-md px-6 py-3 text-base outline-none transition-colors hover:text-zinc-300 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-6 py-3 text-base outline-none transition-colors hover:bg-emerald-600 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
          disabled={isSubmitting}
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}
