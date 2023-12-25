import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import ProviderSession from '@/lib/ProviderSession'

const roboto = Roboto({ weight: ['400', '700', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <ProviderSession>
        <body className={`${roboto.className} bg-zinc-900 text-zinc-100`}>
          <main className="">{children}</main>
        </body>
      </ProviderSession>
    </html>
  )
}
