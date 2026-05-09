'use client'

import type { ReactNode } from 'react'
import { PanelLeftClose, PanelLeftOpen, User } from 'lucide-react'
import { Button } from '../Button'
import { AppSwitcher } from './AppSwitcher'
import type { AppSwitcherApp } from './AppSwitcher'
import { useSidebar } from './SidebarContext'

export interface HeaderProps {
  apps: readonly AppSwitcherApp[]
  currentAppId: string
  themeToggle?: ReactNode
  rightSlot?: ReactNode
}

export function Header({ apps, currentAppId, themeToggle, rightSlot }: HeaderProps) {
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary">
      <div
        className="flex h-full shrink-0 items-center gap-sm px-md"
        style={{ minWidth: 'var(--sidebar-width)' }}
      >
        <AppSwitcher apps={apps} currentAppId={currentAppId} />
        <Button
          type="button"
          variant="tertiary"
          size="normal"
          iconOnly
          onClick={toggleSidebar}
          aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
          title={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-lg w-lg" />
          ) : (
            <PanelLeftClose className="h-lg w-lg" />
          )}
        </Button>
      </div>

      <div className="flex h-full flex-1 items-center justify-end gap-sm px-md">
        {themeToggle}
        {rightSlot ?? (
          <Button
            type="button"
            variant="tertiary"
            size="normal"
            iconOnly
            aria-label="User menu"
          >
            <User className="h-lg w-lg" />
          </Button>
        )}
      </div>
    </header>
  )
}
