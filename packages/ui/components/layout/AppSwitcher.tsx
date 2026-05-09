'use client'

import { useEffect, useRef, useState } from 'react'
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Home,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Tag
} from 'lucide-react'
import { Button } from '../Button'

const iconMap = {
  Home,
  LayoutDashboard,
  BarChart3,
  Tag,
  Calendar,
  ReceiptText,
  Settings
}

export type AppSwitcherIcon = keyof typeof iconMap

export interface AppSwitcherApp {
  id: string
  name: string
  url: string
  icon: AppSwitcherIcon | string
}

export interface AppSwitcherProps {
  apps: readonly AppSwitcherApp[]
  currentAppId: string
}

export function AppSwitcher({ apps, currentAppId }: AppSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentApp = apps.find((app) => app.id === currentAppId) ?? apps[0]
  const CurrentIcon = iconMap[currentApp?.icon as AppSwitcherIcon] ?? LayoutDashboard

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleAppClick = (url: string) => {
    window.location.href = url
  }

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <Button
        type="button"
        variant={isOpen ? 'tertiary' : 'ghost'}
        size="normal"
        onClick={() => setIsOpen((prev) => !prev)}
        className="justify-start !text-base font-medium"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <CurrentIcon className="h-lg w-lg text-primary" />
        <span className="whitespace-nowrap !text-base font-medium">{currentApp?.name}</span>
        <ChevronDown
          className={`h-md w-md shrink-0 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </Button>

      <div
        className={`absolute left-0 top-full z-50 mt-sm w-app-switcher rounded border border-border bg-bg-primary shadow-md transition-[max-height,opacity,transform] duration-300 ease-out ${
          isOpen
            ? 'max-h-[var(--app-switcher-dropdown-height)] translate-y-none opacity-100'
            : 'pointer-events-none max-h-none -translate-y-sm opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="max-h-[var(--app-switcher-dropdown-height)] overflow-y-auto p-md">
          <div className="px-md py-sm text-base font-bold uppercase text-text-tertiary">
            앱 전환
          </div>

          <div className="flex flex-col gap-sm">
            {apps.map((app) => {
              const Icon = iconMap[app.icon as AppSwitcherIcon] ?? LayoutDashboard
              const isCurrent = app.id === currentApp?.id

              return (
                <Button
                  key={app.id}
                  type="button"
                  variant={isCurrent ? 'primary' : 'ghost'}
                  size="large"
                  fullWidth
                  onClick={() => handleAppClick(app.url)}
                  className="h-auto justify-start gap-lg text-left !text-base font-medium leading-normal"
                  style={{
                    height: 'auto',
                    minHeight: 'calc(var(--control-height-lg) + var(--spacing-sm))',
                    padding: 'var(--spacing-sm) var(--spacing-md)'
                  }}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span className="flex h-lg w-lg shrink-0 items-center justify-center">
                    <Icon className="h-lg w-lg" />
                  </span>
                  <span className="min-w-0 flex-1 leading-normal">
                    <span className="block truncate !text-base font-medium">{app.name}</span>
                    <span
                      className="block truncate !text-xs font-light text-text-tertiary"
                    >
                      {app.url.replace('http://', '')}
                    </span>
                  </span>
                  {isCurrent && (
                    <span className="shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium">
                      현재
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
