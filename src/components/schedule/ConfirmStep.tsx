'use client'
import { Calendar, Clock } from 'lucide-react'
import React from 'react'

export function ConfirmStep() {
  function handleConfirmScheduling() {}
  return (
    <form
      onSubmit={handleConfirmScheduling}
      className="mx-auto mb-0 mt-6 flex max-w-[540px] flex-col gap-6 rounded-md border border-zinc-700 bg-zinc-800 p-6"
    >
      {/* formHeader */}
      <div className="flex gap-4">
        <p className="flex items-center gap-2">
          <Calendar />
          26 de Setembro de 2022
        </p>
        <p className="flex items-center gap-2">
          <Clock />
          18:00h
        </p>
      </div>

      <span className="rounded border border-zinc-700" />

      <label>
        <p className="mb-2 text-base text-zinc-200">Nome completo</p>
        <input
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 pl-2 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
          type="text"
          placeholder="Seu nome"
        />
        {/* h-10 rounded-md bg-zinc-900 pl-2 focus:outline focus:ring-4 focus:ring-emerald-700 */}
      </label>
      <label>
        <p className="mb-2 text-base text-zinc-200">Endereço de e-mail</p>
        <input
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 pl-2 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
          type="email"
          placeholder="johndoe@exemple.com"
        />
      </label>
      <label>
        <p className="mb-2 text-base text-zinc-200">Observações</p>
        <textarea className="h-20 w-full rounded-md border border-zinc-700 bg-zinc-900 pl-2 pt-2 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700" />
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="rounded-md px-6 py-3 text-base outline-none transition-colors hover:text-zinc-300 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-6 py-3 text-base outline-none transition-colors hover:bg-emerald-600 focus:border-none focus:outline focus:ring-4 focus:ring-emerald-700"
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}
