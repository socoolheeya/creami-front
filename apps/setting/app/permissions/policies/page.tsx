'use client'

import {
  Button,
  Input,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFilterCell,
  TableFilterRow,
  TableHead,
  TableHeader,
  TableRow,
  TableStateRow
} from '@creami/ui'
import { FileSliders, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { KeyboardEvent, startTransition, useEffect, useMemo, useRef, useState } from 'react'
import {
  getPolicies,
  type Policy,
  type PolicyStatus
} from '../../../lib/api/iam'
import { getDisplayApiErrorMessage } from '../../../lib/api/errors'

const PAGE_SIZE = 20

const STATUS_OPTIONS: Array<{ labelKey: string; value: PolicyStatus | '' }> = [
  { labelKey: 'setting.policies.statuses.all', value: '' },
  { labelKey: 'setting.status.active', value: 'ACTIVE' },
  { labelKey: 'setting.status.inactive', value: 'INACTIVE' },
  { labelKey: 'setting.policies.statuses.deleted', value: 'DELETED' }
]
function formatDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

function getStatusLabelKey(status: PolicyStatus) {
  if (status === 'ACTIVE') return 'setting.status.active'
  if (status === 'INACTIVE') return 'setting.status.inactive'
  return 'setting.policies.statuses.deleted'
}

export default function PolicyManagementPage() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const abortControllerRef = useRef<AbortController | null>(null)
  const nameFilterRef = useRef<HTMLInputElement | null>(null)
  const statusFilterRef = useRef<HTMLSelectElement | null>(null)

  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const name = searchParams.get('name') ?? ''
  const status = (searchParams.get('status') ?? '') as PolicyStatus | ''

  const [policies, setPolicies] = useState<Policy[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const queryKey = useMemo(() => ({ page, name, status }), [page, name, status])

  useEffect(() => {
    abortControllerRef.current?.abort()
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    startTransition(() => {
      setIsLoading(true)
      setErrorMessage(null)
    })

    getPolicies(
      {
        name: queryKey.name,
        status: queryKey.status || undefined,
        page: Math.max(queryKey.page - 1, 0),
        size: PAGE_SIZE,
        sort: 'createdAt,desc'
      },
      { signal: abortController.signal }
    )
      .then((response) => {
        setPolicies(response.content)
        setTotalElements(response.totalElements)
        setTotalPages(Math.max(response.totalPages, 1))
      })
      .catch((error: unknown) => {
        if (abortController.signal.aborted) return
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.policies.error')))
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => abortController.abort()
  }, [queryKey, t])

  const updateQuery = (
    nextPage: number,
    nextName = nameFilterRef.current?.value ?? name,
    nextStatus = (statusFilterRef.current?.value ?? status) as PolicyStatus | ''
  ) => {
    const nextSearchParams = new URLSearchParams()
    nextSearchParams.set('page', String(nextPage))
    if (nextName.trim()) nextSearchParams.set('name', nextName.trim())
    if (nextStatus) nextSearchParams.set('status', nextStatus)
    startTransition(() => {
      setIsLoading(true)
      setErrorMessage(null)
    })
    router.replace(`/permissions/policies?${nextSearchParams.toString()}`, { scroll: false })
  }

  const handleFilterKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.key === 'Enter') {
      updateQuery(1)
    }
  }

  const openPolicyDetail = (policyId: string) => {
    router.push(`/permissions/policies/${policyId}`)
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <FileSliders className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.policies.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.policies.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button type="button" onClick={() => router.push('/permissions/policies/new')}>
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.policies.addPolicy')}
        </Button>
      </div>

      <div className="rounded border border-border bg-bg-primary shadow">
        <Table className="table-fixed min-w-policy-table">
          <colgroup>
            <col className="w-policy-col-id" />
            <col className="w-policy-col-name" />
            <col className="w-policy-col-status" />
            <col className="w-policy-col-count" />
            <col className="w-policy-col-count" />
            <col className="w-policy-col-count" />
            <col className="w-policy-col-date" />
          </colgroup>
          <TableHeader
            filterRow={
              <TableFilterRow>
                <TableFilterCell className="w-policy-col-id">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.policies.columns.policyId')}
                    aria-label={t('setting.policies.columns.policyId')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-policy-col-name">
                  <Input
                    key={name}
                    ref={nameFilterRef}
                    size="small"
                    onKeyDown={handleFilterKeyDown}
                    defaultValue={name}
                    placeholder={t('setting.policies.filters.name')}
                    showSearchIcon
                  />
                </TableFilterCell>
                <TableFilterCell className="w-policy-col-status">
                  <Select
                    key={status}
                    ref={statusFilterRef}
                    size="small"
                    onKeyDown={handleFilterKeyDown}
                    defaultValue={status}
                    aria-label={t('setting.policies.filters.status')}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value || 'all'} value={option.value}>
                        {t(option.labelKey)}
                      </option>
                    ))}
                  </Select>
                </TableFilterCell>
                <TableFilterCell className="w-policy-col-count">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.policies.columns.defaultVersion')}
                    aria-label={t('setting.policies.columns.defaultVersion')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-policy-col-count">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.policies.columns.versionCount')}
                    aria-label={t('setting.policies.columns.versionCount')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-policy-col-count">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.policies.columns.attachmentCount')}
                    aria-label={t('setting.policies.columns.attachmentCount')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-policy-col-date">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.policies.columns.updated')}
                    aria-label={t('setting.policies.columns.updated')}
                  />
                </TableFilterCell>
              </TableFilterRow>
            }
          >
            <TableRow className="bg-bg-tertiary">
              <TableHead className="w-policy-col-id" truncate>{t('setting.policies.columns.policyId')}</TableHead>
              <TableHead className="w-policy-col-name" truncate>{t('setting.policies.columns.name')}</TableHead>
              <TableHead className="w-policy-col-status" truncate>{t('setting.policies.columns.status')}</TableHead>
              <TableHead className="w-policy-col-count" align="right" truncate>{t('setting.policies.columns.defaultVersion')}</TableHead>
              <TableHead className="w-policy-col-count" align="right" truncate>{t('setting.policies.columns.versionCount')}</TableHead>
              <TableHead className="w-policy-col-count" align="right" truncate>{t('setting.policies.columns.attachmentCount')}</TableHead>
              <TableHead className="w-policy-col-date" truncate>{t('setting.policies.columns.updated')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errorMessage && (
              <TableStateRow colSpan={7} variant="error">
                {t('setting.policies.error')}
              </TableStateRow>
            )}
            {!errorMessage && isLoading && policies.length === 0 && (
              <TableStateRow colSpan={7} variant="loading">
                {t('setting.policies.loading')}
              </TableStateRow>
            )}
            {!errorMessage && !isLoading && policies.length === 0 && (
              <TableStateRow colSpan={7} variant="empty">
                {t('setting.policies.empty')}
              </TableStateRow>
            )}
            {!errorMessage && policies.map((policy) => (
              <TableRow
                key={policy.policyId || policy.name}
                onClick={() => policy.policyId && openPolicyDetail(policy.policyId)}
                onKeyDown={(event) => {
                  if (policy.policyId && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault()
                    openPolicyDetail(policy.policyId)
                  }
                }}
                role={policy.policyId ? 'button' : undefined}
                tabIndex={policy.policyId ? 0 : undefined}
              >
                <TableCell className="w-policy-col-id" truncate titleText={policy.policyId || '-'}>
                  {policy.policyId || '-'}
                </TableCell>
                <TableCell className="w-policy-col-name" truncate titleText={policy.name}>
                  {policy.name}
                </TableCell>
                <TableCell className="w-policy-col-status" truncate titleText={t(getStatusLabelKey(policy.status))}>
                  {t(getStatusLabelKey(policy.status))}
                </TableCell>
                <TableCell className="w-policy-col-count" align="right">
                  {policy.defaultVersionNumber ?? '-'}
                </TableCell>
                <TableCell className="w-policy-col-count" align="right">
                  {policy.versionCount}
                </TableCell>
                <TableCell className="w-policy-col-count" align="right">
                  {policy.attachmentCount}
                </TableCell>
                <TableCell className="w-policy-col-date" truncate titleText={formatDate(policy.updatedAt)}>
                  {formatDate(policy.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        className="mt-md"
        variant="simple"
        currentPage={page}
        totalPages={totalPages}
        totalElements={totalElements}
        pageSize={PAGE_SIZE}
        onPageChange={(nextPage) => updateQuery(nextPage)}
        onPageSizeChange={() => undefined}
      />
    </div>
  )
}
