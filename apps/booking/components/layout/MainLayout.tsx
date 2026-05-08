'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SidebarProvider, useSidebar } from './SidebarContext'

function MainLayoutContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Header />
      <Sidebar />
      <main
        style={{
          marginLeft: isCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
          marginTop: 'var(--header-height)',
          padding: 'var(--spacing-xl)',
          transition: 'margin-left 300ms ease-in-out',
          minHeight: 'calc(100vh - var(--header-height))'
        }}
      >
        {children}
      </main>
    </div>
  )
}

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  )
}
