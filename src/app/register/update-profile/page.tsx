'use client'
import MultiStep from '@/components/MultiStep'
import { Check, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { api } from '@/lib/axios'

const UpdateProfileFormSchema = z.object({
  bio: z.string(),
  // image: z.string(),
})

type UpdateProfileFormData = z.infer<typeof UpdateProfileFormSchema>

export default function UpdateProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })
  const router = useRouter()
  const session = useSession()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    console.log('data')
    await api.put('/users/update-profile', data)

    await router.push(`/schedule/${session.data?.user.username}`)
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
        <MultiStep steps={4} currentStep={4} />
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="mb-1 mt-4 flex h-auto flex-col gap-4 rounded-md border border-zinc-700 bg-zinc-800 p-4"
      >
        <div className="flex flex-col gap-2">
          <span className="text-gray-100">Foto de perfil.</span>
          <div className="flex items-center gap-5">
            {!session.data ? (
              <User
                width={100}
                height={100}
                className="rounded-full bg-zinc-500 p-2"
              />
            ) : (
              <Image
                width={100}
                height={100}
                quality={100}
                src={session.data.user.avatar_url}
                alt={session.data.user.name}
                referrerPolicy="no-referrer"
                className="rounded-full"
              />
            )}
            <span className="rounded-lg border-2 border-emerald-600 p-2 text-emerald-500">
              Selecionar foto
            </span>
          </div>
        </div>

        <label htmlFor="bio" className="flex flex-col gap-2">
          <span className="text-gray-100">Sobre você</span>
          <textarea
            id="bio"
            placeholder="Sobre vc"
            {...register('bio')}
            className="h-20 rounded-md bg-zinc-900 pl-2 pt-2 focus:outline focus:ring-4 focus:ring-emerald-700"
          />
        </label>
        <p>Fale um pouco sobre você. Isto será exibido em sua página pessoal</p>
        <button
          type="submit"
          className="flex h-10 min-w-40 items-center justify-center gap-1 rounded-md bg-emerald-700 font-bold"
          disabled={isSubmitting}
        >
          Finalizar <Check />
        </button>
      </form>
      {errors.bio && (
        <p className="mt-2 text-red-400">{errors.bio.root?.message}</p>
      )}
    </div>
  )
}
