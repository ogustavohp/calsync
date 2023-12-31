import React from 'react'
import TimeIntervals from '@/components/page/TimeIntervals'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade | CalSync',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function TimeIntervalsPage() {
  return <TimeIntervals />
}
