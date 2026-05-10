'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  setIsCollapsed: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const STORAGE_KEY = 'CREAMI_SIDEBAR_COLLAPSED'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function readCollapsedCookie() {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${STORAGE_KEY}=`))
    ?.split('=')[1] ?? null
}

function writeCollapsedCookie(value: boolean) {
  document.cookie = `${STORAGE_KEY}=${String(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = readCollapsedCookie()
    if (stored !== null) {
      setIsCollapsed(stored === 'true')
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      writeCollapsedCookie(isCollapsed)
    }
  }, [isCollapsed, isHydrated])

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
