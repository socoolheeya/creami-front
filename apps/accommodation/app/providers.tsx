'use client'

import { ReactNode } from 'react'
import { CreamiThemeProvider, NotificationProvider } from '@creami/ui'
import { QueryProvider } from '@/providers/QueryProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <CreamiThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </CreamiThemeProvider>
    </QueryProvider>
  )
}
