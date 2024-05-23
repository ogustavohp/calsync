import Image from 'next/image'
import ClaimUsernameForm from '@/components/ClaimUserNameForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Descomplique sua agenda | CalSync',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

export default function Home() {
  return (
    <div className="mx-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20 overflow-hidden">
      <div className="max-w-lg px-10">
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
          Agendamento descomplicado
        </h1>
        <p className="mt-2 text-lg leading-tight text-zinc-400 sm:text-xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUsernameForm />
      </div>

      <Image
        src={'/banner.png'}
        alt="Calendário"
        quality={100}
        priority
        height={400}
        width={750}
        className="hidden w-full pr-8 sm:block"
      />
    </div>
  )
}
