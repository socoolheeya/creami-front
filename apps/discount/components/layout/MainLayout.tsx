'use client'

import { ReactNode, useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Header />
      <Sidebar />
      <main
        className="pt-16 transition-all duration-300"
        style={{
          marginLeft: isSidebarCollapsed ? '64px' : '240px'
        }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
