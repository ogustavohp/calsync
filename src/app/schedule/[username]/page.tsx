import { ScheduleForm } from '@/components/schedule/ScheduleForm'
import { prisma } from '@/lib/prisma'
import { User } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username

  return {
    title: `Agendar com ${username} | CalSync`,
  }
}

interface ScheduleProps {
  username: string
}

export default async function Schedule({ params }: { params: ScheduleProps }) {
  const username = params.username

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return redirect('/404')
  }

  return (
    <div className="mx-auto mb-4 mt-20 max-w-[852px] px-4">
      {/* User */}
      <div className="flex flex-col items-center">
        {!user.avatar_url ? (
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
            src={user.avatar_url}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="rounded-full"
          />
        )}
        <h2 className="leading">{user.name}</h2>
        <p className="">{user.bio}</p>
      </div>
      {/* Calendar */}
      <ScheduleForm />
    </div>
  )
}
