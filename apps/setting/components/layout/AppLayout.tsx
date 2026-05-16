'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MainLayout } from './MainLayout'
import { readAuthToken } from '../../lib/api/authToken'

const publicPaths = ['/login', '/logout']

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  useEffect(() => {
    const hasAuthToken = Boolean(readAuthToken())

    if (!isPublicPath && !hasAuthToken) {
      window.location.replace('/login')
    }
  }, [isPublicPath])

  if (isPublicPath) {
    return <>{children}</>
  }

  return <MainLayout>{children}</MainLayout>
}
