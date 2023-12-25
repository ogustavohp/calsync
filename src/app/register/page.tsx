'use client'
import MultiStep from '@/components/MultiStep'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisar ter 3 ou mais letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O usuário precisar ter 3 ou mais letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('username')) {
      setValue('username', String(searchParams.get('username')))
    }
  }, [searchParams, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.error) {
        alert(err.response.data.error)
        return
      }
      console.error(err)
    }
  }

  return (
    <div className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <div className="px-6">
        <h2 className="text-4xl font-bold leading-none">
          Bem-vindo ao CalSync!
        </h2>
        <p className="mb-6 mt-2 text-zinc-300">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
        <MultiStep steps={4} currentStep={1} />
      </div>
      <form
        action=""
        onSubmit={handleSubmit(handleRegister)}
        className="mb-1 mt-4 flex h-auto flex-col gap-4 rounded-md border border-zinc-700 bg-zinc-800 p-4"
      >
        <label htmlFor="username" className="flex flex-col gap-2">
          <span className="text-gray-100">Nome de usuário</span>
          <input
            type="text"
            id="username"
            placeholder="calsync.com/seu-usuário"
            {...register('username')}
            className="h-10 rounded-md bg-zinc-900 pl-2 focus:outline focus:ring-4 focus:ring-emerald-700"
          />
          {errors.username && (
            <span className="text-sm text-red-400">
              {errors.username.message}
            </span>
          )}
        </label>
        <label htmlFor="name" className="flex flex-col gap-2">
          <span className="text-gray-100">Nome completo</span>
          <input
            type="text"
            id="name"
            placeholder="Nome completo"
            {...register('name')}
            className="h-10 rounded-md bg-zinc-900 pl-2 focus:outline focus:ring-4 focus:ring-emerald-700"
          />
          {errors.name && (
            <span className="text-sm text-red-400">{errors.name.message}</span>
          )}
        </label>

        <button
          type="submit"
          className="flex h-10 min-w-40 items-center justify-center gap-1 rounded-md bg-emerald-700 font-bold"
          disabled={isSubmitting}
        >
          Próximo passo <ArrowRight />
        </button>
      </form>
    </div>
  )
}
