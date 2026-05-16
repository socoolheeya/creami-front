'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { LogOut, PanelLeftClose, PanelLeftOpen, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '../Button'
import { AppSwitcher } from './AppSwitcher'
import type { AppSwitcherApp } from './AppSwitcher'
import { useSidebar } from './SidebarContext'
import { LanguageSelector } from '../LanguageSelector'
import { NotificationButton } from '../NotificationButton'
import type { Locale } from '@creami/i18n'

export interface HeaderProps {
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

export function Header({
  apps,
  currentAppId,
  currentLocale,
  rightSlot,
  profileHref,
  profileUser,
  onLocaleChange
}: HeaderProps) {
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()
  const settingApp = apps.find((app) => app.id === 'setting')
  const resolvedProfileHref = profileHref ?? (settingApp ? `${settingApp.url}/profile` : '/profile')
  const resolvedLogoutHref = settingApp ? `${settingApp.url}/logout` : '/logout'
  const profileInitial = profileUser
    ? (profileUser.name.trim() || profileUser.email.trim()).slice(0, 1).toUpperCase()
    : ''

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileMenuOpen])

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-header items-center justify-between border-b border-border bg-bg-primary">
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
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          title={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-lg w-lg" />
          ) : (
            <PanelLeftClose className="h-lg w-lg" />
          )}
        </Button>
      </div>

      <div className="flex h-full flex-1 items-center justify-end gap-sm px-md">
        <LanguageSelector currentLocale={currentLocale} onLocaleChange={onLocaleChange} />
        <NotificationButton />
        {rightSlot ?? (
          <div ref={profileMenuRef} className="relative">
            <Button
              type="button"
              variant="tertiary"
              size="normal"
              iconOnly
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              aria-label={t('common.profile')}
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
              title={t('common.profile')}
            >
              <User className="h-lg w-lg" />
            </Button>

            {isProfileMenuOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-sm w-dropdown-md overflow-hidden rounded border border-border bg-bg-primary p-sm shadow-md"
                role="menu"
              >
                {profileUser && (
                  <div className="mb-sm border-b border-border px-control-px-md pb-sm">
                    <div className="flex items-start gap-sm">
                      <span className="flex h-control-md w-control-md shrink-0 items-center justify-center rounded bg-primary text-base font-bold text-white">
                        {profileInitial}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-bold text-text-primary" title={profileUser.name}>
                          {profileUser.name}
                        </p>
                        <p className="truncate text-base font-light text-text-tertiary" title={profileUser.email}>
                          {profileUser.email}
                        </p>
                        {profileUser.status && (
                          <span className="mt-xs inline-flex h-control-sm items-center rounded bg-primary-bg px-sm text-xs font-medium text-primary">
                            {profileUser.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <a
                  href={resolvedProfileHref}
                  className="flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary"
                  role="menuitem"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <User className="h-icon-md w-icon-md text-text-tertiary" />
                  {t('common.profile')}
                </a>
                <a
                  href={resolvedLogoutHref}
                  className="flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary"
                  role="menuitem"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <LogOut className="h-icon-md w-icon-md text-text-tertiary" />
                  {t('common.logout')}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
