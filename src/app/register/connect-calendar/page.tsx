'use client'
import MultiStep from '@/components/MultiStep'
import { ArrowRight, Check } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ConnectCalendar() {
  const session = useSession()
  const params = useSearchParams()
  const hasAuthError = !!params.get('error')
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google', { callbackUrl: '/register/connect-calendar' })
  }

  return (
    <div className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <div className="px-6">
        <h2 className="text-4xl font-bold leading-none">Conecte sua agenda!</h2>
        <p className="mb-6 mt-2 text-zinc-300">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
        <MultiStep steps={4} currentStep={2} />
      </div>

      <div className="mb-1 mt-4 flex h-auto flex-col gap-4 rounded-md border border-zinc-700 bg-zinc-800 p-6">
        <div className="flex items-center justify-between rounded-md border border-zinc-700 px-6 py-4">
          <p className="text-zinc-200">Google Calendar</p>
          {isSignedIn ? (
            <button
              disabled
              className="flex h-10 min-w-40 items-center justify-center gap-1 rounded-md border-2 border-emerald-700 bg-zinc-800 font-bold text-emerald-700 transition-colors hover:bg-emerald-700 hover:text-zinc-200 disabled:border-zinc-500 disabled:bg-zinc-500 disabled:text-zinc-200"
            >
              Conectado
              <Check />
            </button>
          ) : (
            <button
              onClick={handleConnectCalendar}
              className="flex h-10 min-w-40 items-center justify-center gap-1 rounded-md border-2 border-emerald-700 bg-zinc-800 font-bold text-emerald-700 transition-colors hover:bg-emerald-700 hover:text-zinc-200"
            >
              Conectar
              <ArrowRight />
            </button>
          )}
        </div>

        {hasAuthError && (
          <p className="text-sm text-red-400">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </p>
        )}

        <button
          type="submit"
          disabled={!isSignedIn}
          className="flex h-10 min-w-40 items-center justify-center gap-1 rounded-md bg-emerald-700 font-bold transition-colors hover:bg-emerald-600 disabled:border-zinc-500 disabled:bg-zinc-500 disabled:text-zinc-200"
        >
          Próximo passo <ArrowRight />
        </button>
      </div>
    </div>
  )
}
