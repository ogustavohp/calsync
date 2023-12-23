import Image from 'next/image'
import banner from '../assets/banner.png'
import ClaimUsernameForm from '@/components/ClaimUsernameForm'

export default function Home() {
  return (
    <div className="ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20 overflow-hidden">
      <div className="max-w-lg px-10">
        <h1 className="text-6xl font-bold leading-tight">
          Agendamento descomplicado
        </h1>
        <p className="mt-2 text-xl leading-tight text-zinc-400">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUsernameForm />
      </div>

      <Image
        src={banner}
        alt="Calendário"
        quality={100}
        priority
        height={400}
        className="hidden pr-8 sm:block"
      />
    </div>
  )
}
