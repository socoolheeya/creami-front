'use client'

import { Button } from '@creami/ui'
import { Mail, Plus, UserCheck, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  getMemberRoleSummary,
  getMembers,
  toMemberUiStatus,
  type Member
} from '@/lib/api/members'

export default function UsersPage() {
  const t = useTranslations()
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    getMembers()
      .then((response) => {
        if (!isMounted) return
        setMembers(response.content)
        setErrorMessage(null)
      })
      .catch((error: unknown) => {
        if (!isMounted) return
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load members.')
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

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
        {isLoading && (
          <div className="px-lg py-md text-base font-light text-text-secondary">
            Loading members...
          </div>
        )}
        {!isLoading && errorMessage && (
          <div className="px-lg py-md text-base font-light text-error">
            {errorMessage}
          </div>
        )}
        {!isLoading && !errorMessage && members.length === 0 && (
          <div className="px-lg py-md text-base font-light text-text-secondary">
            No members found.
          </div>
        )}
        {!isLoading && !errorMessage && members.map((member) => (
          <Link
            key={member.id}
            href={`/users/${member.id}`}
            className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-md border-b border-border px-lg py-md no-underline transition-colors last:border-b-0 hover:bg-bg-secondary"
          >
            <span className="whitespace-nowrap text-base font-light text-text-tertiary">
              {member.id}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-text-primary">
                {member.name}
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-sm text-base font-light text-text-secondary">
              <Mail className="h-icon-md w-icon-md shrink-0 text-text-tertiary" />
              <span className="truncate">{member.email}</span>
            </div>
            <span className="text-base font-medium text-text-primary">
              {getMemberRoleSummary(member)}
            </span>
            <span className="text-base font-light text-text-secondary">
              -
            </span>
            <span className="inline-flex h-control-sm w-fit items-center gap-xs rounded bg-primary-bg px-control-px-sm py-none text-base font-bold text-primary">
              <UserCheck className="h-md w-md" />
              {t(`setting.status.${toMemberUiStatus(member.status)}`)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
