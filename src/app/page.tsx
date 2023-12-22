import Image from 'next/image'
import banner from '../assets/banner.png'

export default function Home() {
  return (
    <div className="ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20 overflow-hidden">
      <div className="max-w-lg px-10">
        <h1 className="text-4xl">Agendamento descomplicado</h1>
        <p className="mt-2 text-xl text-gray-200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
      </div>
      <div className="hidden min-w-[600px] overflow-hidden pr-8 sm:block">
        <Image
          src={banner}
          alt="Calendário"
          quality={100}
          priority
          height={400}
        />
      </div>
    </div>
  )
}
