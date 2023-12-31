import React from 'react'
import { Metadata } from 'next'
import Register from '@/components/page/Register'

export const metadata: Metadata = {
  title: 'Crie uma conta | CalSync',
}

export default function Page() {
  return <Register />
}
