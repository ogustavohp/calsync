import UpdateProfile from '@/components/page/UpdateProfile'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atualize seu perfil | CalSync',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function UpdateProfilePage() {
  return <UpdateProfile />
}
