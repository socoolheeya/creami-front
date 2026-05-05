'use client'

import { User, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { AppSwitcher } from './AppSwitcher'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useSidebar } from './SidebarContext'

export function Header() {
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      <div className="flex items-center gap-4">
        <AppSwitcher />
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
          aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
          title={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
          aria-label="User menu"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
