'use client'

import { User } from 'lucide-react'
import { AppSwitcher } from './AppSwitcher'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
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
