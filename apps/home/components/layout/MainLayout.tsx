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
          marginLeft: isCollapsed ? '80px' : '288px',
          paddingTop: 'var(--main-padding-top)',
          paddingLeft: 'var(--main-padding-x)',
          paddingRight: 'var(--main-padding-x)',
          paddingBottom: 'var(--main-padding-x)',
          transition: 'all 300ms'
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
