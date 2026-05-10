'use client'

import { ReactNode } from 'react'
import { CreamiThemeProvider, NotificationProvider } from '@creami/ui'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CreamiThemeProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </CreamiThemeProvider>
  )
}
