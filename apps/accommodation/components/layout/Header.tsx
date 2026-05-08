'use client'

import { User, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { AppSwitcher } from './AppSwitcher'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useSidebar } from './SidebarContext'

export function Header() {
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between"
      style={{
        height: 'var(--header-height)',
        padding: '0 var(--spacing-lg)',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
        <AppSwitcher />
        <button
          onClick={toggleSidebar}
          className="rounded transition-colors"
          style={{
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
          aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
          title={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {isCollapsed ? (
            <PanelLeftOpen style={{ width: '1.25rem', height: '1.25rem' }} />
          ) : (
            <PanelLeftClose style={{ width: '1.25rem', height: '1.25rem' }} />
          )}
        </button>
      </div>

      <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
        <ThemeToggle />
        <button
          className="rounded transition-colors"
          style={{
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
          aria-label="User menu"
        >
          <User style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
      </div>
    </header>
  )
}
