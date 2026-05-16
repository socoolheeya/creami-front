'use client'

import type { ReactNode } from 'react'
import { Header } from './Header'
import type { AppSwitcherApp } from './AppSwitcher'
import { SidebarProvider, useSidebar } from './SidebarContext'
import type { Locale } from '@creami/i18n'

export interface MainLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  apps: readonly AppSwitcherApp[]
  currentAppId: string
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
  rightSlot?: ReactNode
  profileHref?: string
  profileUser?: {
    name: string
    email: string
    status?: string
  } | null
}

function MainLayoutContent({
  children,
  sidebar,
  apps,
  currentAppId,
  currentLocale,
  rightSlot,
  profileHref,
  profileUser,
  onLocaleChange
}: MainLayoutProps) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header
        apps={apps}
        currentAppId={currentAppId}
        currentLocale={currentLocale}
        rightSlot={rightSlot}
        profileHref={profileHref}
        profileUser={profileUser}
        onLocaleChange={onLocaleChange}
      />
      {sidebar}
      <main
        className="mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] transition-[margin-left] duration-300 ease-in-out"
        style={{
          marginLeft: isCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
          padding: 'var(--content-padding)'
        }}
      >
        {children}
      </main>
    </div>
  )
}

export function MainLayout(props: MainLayoutProps) {
  return (
    <SidebarProvider>
      <MainLayoutContent {...props} />
    </SidebarProvider>
  )
}
