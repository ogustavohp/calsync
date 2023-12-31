import React from 'react'
import ConnectCalendar from '@/components/page/ConnectCalendar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google | CalSync',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function ConnectCalendarPage() {
  return <ConnectCalendar />
}
