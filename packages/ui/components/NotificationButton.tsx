'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from './Button'

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread] = useState(true) // TODO: Implement actual notification state
  const t = useTranslations()

  return (
    <div className="relative">
      <Button
        type="button"
        variant="tertiary"
        size="normal"
        iconOnly
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('common.notification')}
        title={t('common.notification')}
        className="relative"
      >
        <Bell className="h-lg w-lg" />
        {hasUnread && (
          <span className="absolute right-notification-indicator-offset top-notification-indicator-offset h-notification-indicator w-notification-indicator rounded bg-primary" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full z-50 mt-xs w-notification-menu rounded bg-bg-secondary border border-border shadow-lg">
            <div className="px-md py-sm border-b border-border">
              <h3 className="font-bold text-text-primary">{t('notification.title')}</h3>
            </div>
            <div className="max-h-notification-menu-max overflow-y-auto">
              <div className="px-md py-md text-center text-text-secondary">
                {t('notification.empty')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
