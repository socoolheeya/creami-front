'use client'

import { ReactNode } from 'react'
import { MainLayout as UiMainLayout } from '@creami/ui'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { APPS, CURRENT_APP_ID } from '@/lib/constants'
import { Sidebar } from './Sidebar'
import type { Locale } from '@creami/i18n'

export function MainLayout({ children }: { children: ReactNode }) {
  const locale = useLocale() as Locale
  const router = useRouter()

  return (
    <UiMainLayout
      apps={APPS}
      currentAppId={CURRENT_APP_ID}
      currentLocale={locale}
      onLocaleChange={() => router.refresh()}
      sidebar={<Sidebar />}
    >
      {children}
    </UiMainLayout>
  )
}
