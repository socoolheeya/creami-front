'use client'

import { startTransition, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Alert, Input } from '@creami/ui'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'
import { getRole, type Role } from '@/lib/api/iam'

function formatDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

export default function PermissionRoleDetailPage() {
  const params = useParams<{ id: string }>()
  const t = useTranslations()
  const [role, setRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    startTransition(() => {
      setIsLoading(true)
      setErrorMessage(null)
    })

    getRole(params.id, { signal: abortController.signal })
      .then((response) => {
        setRole(response)
      })
      .catch((error: unknown) => {
        if (abortController.signal.aborted) return
        setRole(null)
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.permissions.detail.loadFailed')))
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => abortController.abort()
  }, [params.id, t])

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <Link
            href="/permissions"
            className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
          >
            <ArrowLeft className="h-icon-md w-icon-md" />
            {t('setting.permissions.backToList')}
          </Link>
          <div className="mb-sm flex items-center gap-md">
            <ShieldCheck className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.permissions.detail.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.permissions.detail.description')}
          </p>
        </div>
      </div>

      {errorMessage && (
        <Alert className="mb-md" variant="error">
          {errorMessage}
        </Alert>
      )}

      <section className="rounded border border-border bg-bg-primary p-lg shadow">
        <div className="mb-lg">
          <h2 className="text-xl font-bold text-text-primary">
            {isLoading ? t('setting.permissions.loading') : role?.name ?? '-'}
          </h2>
          <p className="mt-xs text-base font-light text-text-tertiary">
            {role?.description || t('setting.permissions.detail.noDescription')}
          </p>
        </div>

        <div className="grid gap-md md:grid-cols-2">
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.permissions.columns.roleId')}
            <Input value={role?.roleId ?? params.id} disabled />
          </label>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.permissions.columns.name')}
            <Input value={role?.name ?? ''} disabled />
          </label>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.permissions.columns.description')}
            <Input value={role?.description ?? ''} disabled />
          </label>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.permissions.columns.memberCount')}
            <Input value={role ? t('setting.permissions.userCount', { count: role.memberCount }) : ''} disabled />
          </label>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.permissions.columns.created')}
            <Input value={formatDate(role?.createdAt)} disabled />
          </label>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.permissions.columns.updated')}
            <Input value={formatDate(role?.updatedAt)} disabled />
          </label>
        </div>

        <div className="mt-lg flex justify-end">
          <Link
            href="/permissions"
            className="inline-flex h-control-md items-center justify-center rounded bg-bg-tertiary px-control-px-md text-base font-medium text-text-primary no-underline hover:bg-bg-secondary"
          >
            {t('setting.permissions.backToList')}
          </Link>
        </div>
      </section>
    </div>
  )
}
