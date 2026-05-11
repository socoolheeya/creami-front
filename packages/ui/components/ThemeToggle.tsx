'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { writeThemeCookie, type CreamiTheme } from './ThemeProvider'

function readDocumentTheme(): CreamiTheme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<CreamiTheme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(readDocumentTheme())
    setMounted(true)

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<CreamiTheme>).detail

      setTheme(nextTheme === 'light' ? 'light' : 'dark')
    }

    window.addEventListener('creami-theme-change', handleThemeChange)

    return () => {
      window.removeEventListener('creami-theme-change', handleThemeChange)
    }
  }, [])

  if (!mounted) {
    return <div className="h-control-md w-control-md" />
  }

  const isDark = theme === 'dark'
  const nextTheme: CreamiTheme = isDark ? 'light' : 'dark'

  return (
    <Button
      type="button"
      variant="tertiary"
      size="normal"
      iconOnly
      onClick={() => {
        writeThemeCookie(nextTheme)
      }}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Sun className="h-lg w-lg" /> : <Moon className="h-lg w-lg" />}
    </Button>
  )
}
