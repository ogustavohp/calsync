'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisar ter três ou mais letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type claimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<claimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: claimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className="mb-1 mt-4 flex h-auto flex-col gap-2 rounded-md border border-zinc-700 bg-zinc-800 p-4 sm:flex-row"
      >
        <input
          type="text"
          id=""
          placeholder="calsync.com/seu-usuário"
          {...register('username')}
          className="h-10 rounded-md bg-zinc-900 pl-2 focus:outline focus:ring-4 focus:ring-emerald-700 sm:flex-1"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-10 min-w-40 items-center justify-center rounded-md bg-emerald-700 font-bold"
        >
          Reservar usuário
          <ArrowRight />
        </button>
      </form>
      <span
        className={`pl-4 text-sm ${
          errors.username?.message ? 'text-red-400' : 'text-zinc-400'
        }`}
      >
        {errors.username?.message || 'Digite o nome do usuário.'}
      </span>
    </>
  )
}
