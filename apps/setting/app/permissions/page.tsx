'use client'

import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableFilterCell,
  TableFilterRow,
  TableHead,
  TableHeader,
  TableRow,
  TableStateRow,
  notifySaveSuccess
} from '@creami/ui'
import { Plus, ShieldCheck } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { KeyboardEvent, startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { getRoles, type Role } from '../../lib/api/iam'
import { getDisplayApiErrorMessage } from '../../lib/api/errors'

const PAGE_SIZE = 20

function formatDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

export default function PermissionsPage() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const abortControllerRef = useRef<AbortController | null>(null)

  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const name = searchParams.get('name') ?? ''
  const description = searchParams.get('description') ?? ''
  const saved = searchParams.get('saved')

  const [nameFilter, setNameFilter] = useState(name)
  const [descriptionFilter, setDescriptionFilter] = useState(description)
  const [roles, setRoles] = useState<Role[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const queryKey = useMemo(() => ({ page, name, description }), [page, name, description])

  useEffect(() => {
    if (saved !== 'role') return

    notifySaveSuccess(t('setting.permissions.saved'))

    const nextSearchParams = new URLSearchParams(searchParams.toString())
    nextSearchParams.delete('saved')
    router.replace(`/permissions?${nextSearchParams.toString()}`, { scroll: false })
  }, [router, saved, searchParams, t])

  useEffect(() => {
    startTransition(() => {
      setNameFilter(name)
      setDescriptionFilter(description)
    })
  }, [name, description])

  useEffect(() => {
    abortControllerRef.current?.abort()
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    startTransition(() => {
      setIsLoading(true)
      setErrorMessage(null)
    })

    getRoles(
      {
        name: queryKey.name,
        description: queryKey.description,
        page: Math.max(queryKey.page - 1, 0),
        size: PAGE_SIZE,
        sort: 'createdAt,desc'
      },
      { signal: abortController.signal }
    )
      .then((response) => {
        setRoles(response.content)
        setTotalElements(response.totalElements)
        setTotalPages(Math.max(response.totalPages, 1))
      })
      .catch((error: unknown) => {
        if (abortController.signal.aborted) return
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.permissions.error')))
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
    nextName = nameFilter,
    nextDescription = descriptionFilter
  ) => {
    const nextSearchParams = new URLSearchParams()
    nextSearchParams.set('page', String(nextPage))
    if (nextName.trim()) nextSearchParams.set('name', nextName.trim())
    if (nextDescription.trim()) nextSearchParams.set('description', nextDescription.trim())
    router.replace(`/permissions?${nextSearchParams.toString()}`, { scroll: false })
  }

  const handleFilterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateQuery(1)
    }
  }

  const openRoleDetail = (roleId: string) => {
    router.push(`/permissions/${roleId}`)
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <ShieldCheck className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.permissions.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.permissions.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button type="button" onClick={() => router.push('/permissions/new')}>
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.permissions.addRole')}
        </Button>
      </div>

      <div className="rounded border border-border bg-bg-primary shadow">
        <Table className="table-fixed min-w-permission-table">
          <colgroup>
            <col className="w-permission-col-role-id" />
            <col className="w-permission-col-role-name" />
            <col className="w-permission-col-description" />
            <col className="w-permission-col-member-count" />
            <col className="w-permission-col-date" />
            <col className="w-permission-col-date" />
          </colgroup>
          <TableHeader
            filterRow={
              <TableFilterRow>
                <TableFilterCell className="w-permission-col-role-id">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.permissions.columns.roleId')}
                    aria-label={t('setting.permissions.columns.roleId')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-permission-col-role-name">
                  <Input
                    size="small"
                    value={nameFilter}
                    onChange={(event) => setNameFilter(event.target.value)}
                    onKeyDown={handleFilterKeyDown}
                    placeholder={t('setting.permissions.columns.name')}
                    showSearchIcon
                  />
                </TableFilterCell>
                <TableFilterCell className="w-permission-col-description">
                  <Input
                    size="small"
                    value={descriptionFilter}
                    onChange={(event) => setDescriptionFilter(event.target.value)}
                    onKeyDown={handleFilterKeyDown}
                    placeholder={t('setting.permissions.columns.description')}
                    showSearchIcon
                  />
                </TableFilterCell>
                <TableFilterCell className="w-permission-col-member-count">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.permissions.columns.memberCount')}
                    aria-label={t('setting.permissions.columns.memberCount')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-permission-col-date">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.permissions.columns.created')}
                    aria-label={t('setting.permissions.columns.created')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-permission-col-date">
                  <Input
                    size="small"
                    disabled
                    placeholder={t('setting.permissions.columns.updated')}
                    aria-label={t('setting.permissions.columns.updated')}
                  />
                </TableFilterCell>
              </TableFilterRow>
            }
          >
            <TableRow className="bg-bg-tertiary">
              <TableHead className="w-permission-col-role-id" truncate>{t('setting.permissions.columns.roleId')}</TableHead>
              <TableHead className="w-permission-col-role-name" truncate>{t('setting.permissions.columns.name')}</TableHead>
              <TableHead className="w-permission-col-description" truncate>{t('setting.permissions.columns.description')}</TableHead>
              <TableHead className="w-permission-col-member-count" align="right" truncate>{t('setting.permissions.columns.memberCount')}</TableHead>
              <TableHead className="w-permission-col-date" truncate>{t('setting.permissions.columns.created')}</TableHead>
              <TableHead className="w-permission-col-date" truncate>{t('setting.permissions.columns.updated')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errorMessage && (
              <TableStateRow colSpan={6} variant="error">
                {t('setting.permissions.error')}
              </TableStateRow>
            )}
            {!errorMessage && isLoading && roles.length === 0 && (
              <TableStateRow colSpan={6} variant="loading">
                {t('setting.permissions.loading')}
              </TableStateRow>
            )}
            {!errorMessage && !isLoading && roles.length === 0 && (
              <TableStateRow colSpan={6} variant="empty">
                {t('setting.permissions.empty')}
              </TableStateRow>
            )}
            {!errorMessage && roles.map((role) => (
              <TableRow
                key={role.roleId}
                onClick={() => openRoleDetail(role.roleId)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openRoleDetail(role.roleId)
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <TableCell className="w-permission-col-role-id" truncate titleText={role.roleId}>
                  {role.roleId}
                </TableCell>
                <TableCell className="w-permission-col-role-name" truncate titleText={role.name}>
                  {role.name}
                </TableCell>
                <TableCell className="w-permission-col-description" truncate titleText={role.description ?? '-'}>
                  {role.description ?? '-'}
                </TableCell>
                <TableCell className="w-permission-col-member-count" align="right">
                  {role.memberCount}
                </TableCell>
                <TableCell className="w-permission-col-date" truncate titleText={formatDate(role.createdAt)}>
                  {formatDate(role.createdAt)}
                </TableCell>
                <TableCell className="w-permission-col-date" truncate titleText={formatDate(role.updatedAt)}>
                  {formatDate(role.updatedAt)}
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
