'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CreditCard, ShieldCheck, Users } from 'lucide-react'

const stats = [
  {
    icon: Users,
    labelKey: 'setting.dashboard.cards.users.title',
    descriptionKey: 'setting.dashboard.cards.users.description',
    href: '/users'
  },
  {
    icon: ShieldCheck,
    labelKey: 'setting.dashboard.cards.permissions.title',
    descriptionKey: 'setting.dashboard.cards.permissions.description',
    href: '/permissions'
  },
  {
    icon: CreditCard,
    labelKey: 'setting.dashboard.cards.subscriptions.title',
    descriptionKey: 'setting.dashboard.cards.subscriptions.description',
    href: '/subscriptions'
  }
]

export default function DashboardPage() {
  const t = useTranslations()

  return (
    <div>
      <div className="mb-lg">
        <h1 className="mb-sm text-2xl font-bold text-text-primary">
          {t('setting.dashboard.title')}
        </h1>
        <p className="text-base font-light text-text-secondary">
          {t('setting.dashboard.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Link
              key={stat.href}
              href={stat.href}
              className="rounded border border-border bg-bg-primary p-lg shadow"
            >
              <div className="mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-primary text-white">
                <Icon className="h-icon-lg w-icon-lg" />
              </div>
              <p className="mb-xs text-base font-light text-text-secondary">
                {t(stat.labelKey)}
              </p>
              <p className="text-base font-medium text-text-primary">
                {t(stat.descriptionKey)}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
