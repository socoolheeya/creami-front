'use client'

import { ReactNode, useEffect, useState } from 'react'
import { MainLayout as UiMainLayout } from '@creami/ui'
import { useLocale } from 'next-intl'
import { APPS, CURRENT_APP_ID } from '@/lib/constants'
import { getCurrentAuthMember, type AuthMember } from '@/lib/api/iam'
import { Sidebar } from './Sidebar'
import type { Locale } from '@creami/i18n'

function readStoredAuthMember(): AuthMember | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedMember = window.localStorage.getItem('CREAMI_AUTH_MEMBER')
  if (!storedMember) {
    return null
  }

  try {
    return JSON.parse(storedMember) as AuthMember
  } catch {
    window.localStorage.removeItem('CREAMI_AUTH_MEMBER')
    return null
  }
}

export function MainLayout({ children }: { children: ReactNode }) {
  const locale = useLocale() as Locale
  const [authMember, setAuthMember] = useState<AuthMember | null>(null)

  useEffect(() => {
    setAuthMember(readStoredAuthMember())

    getCurrentAuthMember()
      .then((member) => {
        window.localStorage.setItem('CREAMI_AUTH_MEMBER', JSON.stringify(member))
        setAuthMember(member)
      })
      .catch(() => {
        setAuthMember(readStoredAuthMember())
      })
  }, [])

  return (
    <UiMainLayout
      apps={APPS}
      currentAppId={CURRENT_APP_ID}
      currentLocale={locale}
      onLocaleChange={() => window.location.reload()}
      sidebar={<Sidebar />}
      profileUser={authMember}
    >
      {children}
    </UiMainLayout>
  )
}
