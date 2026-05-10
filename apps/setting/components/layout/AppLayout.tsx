'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MainLayout } from './MainLayout'

const publicPaths = ['/login', '/logout']

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  if (isPublicPath) {
    return <>{children}</>
  }

  return <MainLayout>{children}</MainLayout>
}
