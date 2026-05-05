'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { QueryProvider } from '@/providers/QueryProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
