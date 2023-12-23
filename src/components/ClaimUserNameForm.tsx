'use client'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z.string(),
})

type claimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<claimUsernameFormData>()

  async function handleClaimUsername(data: claimUsernameFormData) {
    console.log(data)
  }

  // const prefix = 'calsync.com/'
  // const [username, setUsername] = useState(prefix)
  // const [typed, setTyped] = useState('')

  // function handleUsername(e: ChangeEvent<HTMLInputElement>) {
  //   if (e.target.value.length < 12) {
  //     setUsername(`${prefix}${e.target.value}`)
  //     setTyped(e.target.value)
  //   } else {
  //     const typedText = e.target.value.substring(12)
  //     setUsername(`${prefix}${typedText}`)
  //     setTyped(typedText)
  //   }
  // }

  return (
    <form
      onSubmit={handleSubmit(handleClaimUsername)}
      className="mt-4 flex h-auto flex-col gap-2 rounded-md border border-zinc-700 bg-zinc-800 p-4 sm:flex-row"
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
        className="flex h-10 min-w-40 items-center justify-center rounded-md bg-emerald-700 font-bold"
      >
        Reservar usuário
        <ArrowRight />
      </button>
    </form>
  )
}
