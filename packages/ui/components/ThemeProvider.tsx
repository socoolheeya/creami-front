'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

export type CreamiTheme = 'dark' | 'light'

const THEME_COOKIE_NAME = 'CREAMI_THEME'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function isCreamiTheme(value: string | null | undefined): value is CreamiTheme {
  return value === 'dark' || value === 'light'
}

function readThemeCookie() {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${THEME_COOKIE_NAME}=`))
    ?.split('=')[1] ?? null
}

export function writeThemeCookie(theme: CreamiTheme) {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function ThemeCookieSync() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const cookieTheme = readThemeCookie()
    if (isCreamiTheme(cookieTheme)) {
      setTheme(cookieTheme)
      return
    }

    writeThemeCookie('dark')
  }, [setTheme])

  useEffect(() => {
    if (isCreamiTheme(theme)) {
      writeThemeCookie(theme)
    }
  }, [theme])

  return null
}

export function CreamiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      storageKey={THEME_COOKIE_NAME}
    >
      <ThemeCookieSync />
      {children}
    </NextThemesProvider>
  )
}
