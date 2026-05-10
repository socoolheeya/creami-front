'use client'

import { ReactNode } from 'react'
import { CreamiThemeProvider } from '@creami/ui'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <CreamiThemeProvider>
      {children}
    </CreamiThemeProvider>
  )
}
