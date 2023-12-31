'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { queryClient } from './react-query'

interface ReactQueryProviderProps {
  children: ReactNode
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
