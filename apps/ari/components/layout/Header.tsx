'use client'

import { User } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

interface HeaderProps {
  isCollapsed: boolean
}

export function Header({ isCollapsed }: HeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 h-16 z-40 flex items-center justify-between px-6 transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        left: isCollapsed ? '56px' : '240px'
      }}
    >
      <div className="flex-1"></div>

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
