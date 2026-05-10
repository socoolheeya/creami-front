'use client'

import { ReactNode } from 'react'
import { CreamiThemeProvider, NotificationProvider } from '@creami/ui'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <CreamiThemeProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </CreamiThemeProvider>
  )
}
