'use client'

import { ReactNode } from 'react'
import { MainLayout as UiMainLayout, ThemeToggle } from '@creami/ui'
import { APPS, CURRENT_APP_ID } from '@/lib/constants'
import { Sidebar } from './Sidebar'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <UiMainLayout
      apps={APPS}
      currentAppId={CURRENT_APP_ID}
      sidebar={<Sidebar />}
      themeToggle={<ThemeToggle />}
    >
      {children}
    </UiMainLayout>
  )
}
