'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { writeThemeCookie, type CreamiTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
        setTheme(nextTheme)
      }}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Sun className="h-lg w-lg" /> : <Moon className="h-lg w-lg" />}
    </Button>
  )
}
