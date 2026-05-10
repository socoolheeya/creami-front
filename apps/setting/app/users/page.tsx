'use client'

import { Button } from '@creami/ui'
import { Mail, Plus, UserCheck, Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { initialUsers } from '@/lib/data/users'

export default function UsersPage() {
  const t = useTranslations()

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <Users className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.users.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.users.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button
          type="button"
        >
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.users.invite')}
        </Button>
      </div>

      <div className="rounded border border-border bg-bg-primary shadow">
        <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-md border-b border-border px-lg py-sm text-base font-bold text-text-tertiary">
          <span>{t('setting.users.columns.userId')}</span>
          <span>{t('setting.users.columns.user')}</span>
          <span>{t('setting.users.columns.email')}</span>
          <span>{t('setting.users.columns.role')}</span>
          <span>{t('setting.users.columns.team')}</span>
          <span>{t('setting.users.columns.status')}</span>
        </div>
        {initialUsers.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-md border-b border-border px-lg py-md no-underline transition-colors last:border-b-0 hover:bg-bg-secondary"
          >
            <span className="whitespace-nowrap text-base font-light text-text-tertiary">
              {user.id}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-text-primary">
                {user.name}
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-sm text-base font-light text-text-secondary">
              <Mail className="h-icon-md w-icon-md shrink-0 text-text-tertiary" />
              <span className="truncate">{user.email}</span>
            </div>
            <span className="text-base font-medium text-text-primary">
              {user.role}
            </span>
            <span className="text-base font-light text-text-secondary">
              {user.team}
            </span>
            <span className="inline-flex h-control-sm w-fit items-center gap-xs rounded bg-primary-bg px-control-px-sm py-none text-base font-bold text-primary">
              <UserCheck className="h-md w-md" />
              {t(`setting.status.${user.status}`)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
