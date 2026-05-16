'use client'

import { Button, Switch } from '@creami/ui'
import { BellRing, Send, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

const notificationSubscriptions = [
  {
    id: 'reservation-request',
    nameKey: 'setting.subscriptions.items.reservationRequest.name',
    descriptionKey: 'setting.subscriptions.items.reservationRequest.description',
    categoryKey: 'setting.subscriptions.categories.booking',
    enabled: true,
    lastModifiedAt: '2026-05-01'
  },
  {
    id: 'reservation-cancel',
    nameKey: 'setting.subscriptions.items.reservationCancel.name',
    descriptionKey: 'setting.subscriptions.items.reservationCancel.description',
    categoryKey: 'setting.subscriptions.categories.booking',
    enabled: true,
    lastModifiedAt: '2026-05-02'
  },
  {
    id: 'rate-plan-create',
    nameKey: 'setting.subscriptions.items.ratePlanCreate.name',
    descriptionKey: 'setting.subscriptions.items.ratePlanCreate.description',
    categoryKey: 'setting.subscriptions.categories.ratePlan',
    enabled: false,
    lastModifiedAt: '2026-04-28'
  },
  {
    id: 'rate-plan-update',
    nameKey: 'setting.subscriptions.items.ratePlanUpdate.name',
    descriptionKey: 'setting.subscriptions.items.ratePlanUpdate.description',
    categoryKey: 'setting.subscriptions.categories.ratePlan',
    enabled: true,
    lastModifiedAt: '2026-05-03'
  },
  {
    id: 'accommodation-create',
    nameKey: 'setting.subscriptions.items.accommodationCreate.name',
    descriptionKey: 'setting.subscriptions.items.accommodationCreate.description',
    categoryKey: 'setting.subscriptions.categories.accommodation',
    enabled: true,
    lastModifiedAt: '2026-05-04'
  },
  {
    id: 'room-create',
    nameKey: 'setting.subscriptions.items.roomCreate.name',
    descriptionKey: 'setting.subscriptions.items.roomCreate.description',
    categoryKey: 'setting.subscriptions.categories.accommodation',
    enabled: false,
    lastModifiedAt: '2026-04-30'
  }
]

type SubscriptionState = Record<string, {
  enabled: boolean
  lastModifiedAt: string
}>

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function SubscriptionsPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [requestMemo, setRequestMemo] = useState('')
  const [subscriptions, setSubscriptions] = useState<SubscriptionState>(() =>
    notificationSubscriptions.reduce<SubscriptionState>((acc, subscription) => {
      acc[subscription.id] = {
        enabled: subscription.enabled,
        lastModifiedAt: subscription.lastModifiedAt
      }
      return acc
    }, {})
  )

  const toggleSubscription = (id: string, checked: boolean) => {
    setSubscriptions((prev) => ({
      ...prev,
      [id]: {
        enabled: checked,
        lastModifiedAt: formatDate(new Date())
      }
    }))
  }

  const handleSendRequest = () => {
    const subject = encodeURIComponent(t('setting.subscriptions.requestMailSubject'))
    const body = encodeURIComponent(requestMemo)

    window.location.href = `mailto:dev@creami.com?subject=${subject}&body=${body}`
    setIsRequestOpen(false)
    setRequestMemo('')
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <BellRing className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.subscriptions.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.subscriptions.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button
          type="button"
          onClick={() => setIsRequestOpen(true)}
        >
          <Send className="h-icon-md w-icon-md" />
          {t('setting.subscriptions.requestButton')}
        </Button>
      </div>

      <div className="rounded border border-border bg-bg-primary shadow">
        <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,0.6fr)] gap-md border-b border-border px-lg py-sm text-base font-bold text-text-tertiary">
          <span>{t('setting.subscriptions.columns.id')}</span>
          <span>{t('setting.subscriptions.columns.name')}</span>
          <span>{t('setting.subscriptions.columns.description')}</span>
          <span>{t('setting.subscriptions.columns.category')}</span>
          <span>{t('setting.subscriptions.columns.lastModifiedAt')}</span>
          <span>{t('setting.subscriptions.columns.subscribe')}</span>
        </div>

        {notificationSubscriptions.map((subscription) => {
          const subscriptionState = subscriptions[subscription.id]
          const checked = subscriptionState?.enabled ?? false

          return (
            <div
              key={subscription.id}
              className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,0.6fr)] items-center gap-md border-b border-border px-lg py-md last:border-b-0"
            >
              <span className="truncate text-base font-light text-text-tertiary">
                {subscription.id}
              </span>
              <span className="truncate text-base font-bold text-text-primary">
                {t(subscription.nameKey)}
              </span>
              <p className="text-base font-light text-text-secondary">
                {t(subscription.descriptionKey)}
              </p>
              <span className="inline-flex h-control-sm w-fit items-center rounded bg-bg-tertiary px-control-px-sm py-none text-base font-bold text-text-secondary">
                {t(subscription.categoryKey)}
              </span>
              <span className="text-base font-light text-text-secondary">
                {new Date(subscriptionState?.lastModifiedAt ?? subscription.lastModifiedAt).toLocaleDateString(locale)}
              </span>
              <Switch
                checked={checked}
                onCheckedChange={(nextChecked) => toggleSubscription(subscription.id, nextChecked)}
                variant={checked ? 'success' : 'primary'}
                size="small"
                ariaLabel={t('setting.subscriptions.switchLabel', {
                  name: t(subscription.nameKey)
                })}
              />
            </div>
          )
        })}
      </div>

      {isRequestOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-lg"
          style={{ backgroundColor: 'var(--overlay-bg)' }}
          onClick={() => setIsRequestOpen(false)}
        >
          <div
            className="w-full rounded border border-border bg-bg-primary p-lg shadow-md"
            style={{ maxWidth: 'var(--modal-width-md)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-lg flex items-start justify-between gap-md">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {t('setting.subscriptions.requestTitle')}
                </h2>
                <p className="mt-xs text-base font-light text-text-secondary">
                  {t('setting.subscriptions.requestDescription')}
                </p>
              </div>
              <Button
                type="button"
                onClick={() => setIsRequestOpen(false)}
                variant="tertiary"
                iconOnly
                aria-label={t('common.close')}
              >
                <X className="h-icon-md w-icon-md" />
              </Button>
            </div>

            <div className="mb-md">
              <label className="mb-xs block text-base font-light text-text-tertiary">
                {t('setting.subscriptions.recipient')}
              </label>
              <div className="rounded border border-border bg-bg-secondary px-control-px-md py-sm text-base font-medium text-text-primary">
                dev@creami.com
              </div>
            </div>

            <div className="mb-lg">
              <label className="mb-xs block text-base font-light text-text-tertiary">
                {t('setting.subscriptions.requestMemo')}
              </label>
              <textarea
                value={requestMemo}
                onChange={(event) => setRequestMemo(event.target.value)}
                placeholder={t('setting.subscriptions.requestPlaceholder')}
                className="min-h-2xl w-full resize-y rounded border border-border bg-bg-secondary px-control-px-md py-sm text-base font-medium text-text-primary"
              />
            </div>

            <div className="flex justify-end gap-sm">
              <Button
                type="button"
                onClick={() => setIsRequestOpen(false)}
                variant="tertiary"
              >
                {t('common.close')}
              </Button>
              <Button
                type="button"
                onClick={handleSendRequest}
                disabled={requestMemo.trim().length === 0}
              >
                <Send className="h-icon-md w-icon-md" />
                {t('setting.subscriptions.send')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
