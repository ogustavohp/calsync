'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ProviderSessionProps {
  children: ReactNode
}

export default function ProviderSession({ children }: ProviderSessionProps) {
  return <SessionProvider>{children}</SessionProvider>
}
