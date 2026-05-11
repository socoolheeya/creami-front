'use client'

import { useState, useTransition } from 'react'
import { Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from './Button'
import { locales, localeNames, type Locale } from '@creami/i18n'

const localeFlags: Record<Locale, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵'
}

export interface LanguageSelectorProps {
  currentLocale: Locale
  onLocaleChange?: (locale: Locale) => void
}

export function LanguageSelector({ currentLocale, onLocaleChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false)
    startTransition(() => {
      // Set cookie
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`

      onLocaleChange?.(locale)
    })
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="tertiary"
        size="normal"
        iconOnly
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.select')}
        title={t('language.select')}
        disabled={isPending}
      >
        <Languages className="h-lg w-lg" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full z-50 mt-xs min-w-[120px] rounded bg-bg-secondary border border-border shadow-lg">
            {locales.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => handleLanguageChange(locale)}
                disabled={isPending}
                className={`flex w-full items-center gap-sm px-md py-sm text-left text-base font-medium text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentLocale === locale ? 'bg-bg-tertiary' : ''
                }`}
              >
                <span className="text-lg leading-none" aria-hidden="true">
                  {localeFlags[locale]}
                </span>
                <span>{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
