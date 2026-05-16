'use client'

import {
  Alert,
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
  TableStateRow,
  notifySaveError,
  notifySaveSuccess
} from '@creami/ui'
import { FileSliders, Plus, Save, Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { KeyboardEvent, startTransition, useEffect, useMemo, useRef, useState } from 'react'
import {
  createPolicy,
  deactivatePolicy,
  getPolicies,
  type Policy,
  type PolicyCreateRequest,
  type PolicyStatus
} from '../../../lib/api/iam'
import { getDisplayApiErrorMessage } from '../../../lib/api/errors'

const PAGE_SIZE = 20
type PolicyMenuKey = 'users' | 'permissions' | 'policies' | 'subscriptions'
type PolicyPermissionPreset = 'read' | 'write' | 'all'
type PolicyCreateStatus = 'ACTIVE' | 'INACTIVE'

const STATUS_OPTIONS: Array<{ labelKey: string; value: PolicyStatus | '' }> = [
  { labelKey: 'setting.policies.statuses.all', value: '' },
  { labelKey: 'setting.status.active', value: 'ACTIVE' },
  { labelKey: 'setting.status.inactive', value: 'INACTIVE' },
  { labelKey: 'setting.policies.statuses.deleted', value: 'DELETED' }
]
const MENU_OPTIONS: PolicyMenuKey[] = ['users', 'permissions', 'policies', 'subscriptions']
const PERMISSION_OPTIONS: PolicyPermissionPreset[] = ['read', 'write', 'all']
const defaultCreateForm = {
  name: '',
  description: '',
  menu: 'users' as PolicyMenuKey,
  permission: 'read' as PolicyPermissionPreset,
  status: 'ACTIVE' as PolicyCreateStatus
}

function formatDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

function getStatusLabelKey(status: PolicyStatus) {
  if (status === 'ACTIVE') return 'setting.status.active'
  if (status === 'INACTIVE') return 'setting.status.inactive'
  return 'setting.policies.statuses.deleted'
}

function getPolicyActionPrefix(menu: PolicyMenuKey) {
  if (menu === 'users') return 'member'
  if (menu === 'permissions') return 'role'
  if (menu === 'policies') return 'policy'
  return 'subscription'
}

function toStatementLabel(value: string) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((segment) => `${segment.slice(0, 1).toUpperCase()}${segment.slice(1)}`)
    .join('')
}

function buildPolicyDocument(menu: PolicyMenuKey, permission: PolicyPermissionPreset) {
  const actionPrefix = getPolicyActionPrefix(menu)
  const statementId = `${toStatementLabel(menu)}${toStatementLabel(permission)}`
  const actions =
    permission === 'all'
      ? [`${actionPrefix}:*`]
      : permission === 'write'
        ? [`${actionPrefix}:create`, `${actionPrefix}:update`, `${actionPrefix}:delete`]
        : [`${actionPrefix}:read`]

  return JSON.stringify(
    {
      statements: [
        {
          sid: statementId,
          effect: 'ALLOW',
          actions,
          resources: [`${actionPrefix}:*`]
        }
      ]
    },
    null,
    2
  )
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
  const [refreshKey, setRefreshKey] = useState(0)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null)
  const [createForm, setCreateForm] = useState(defaultCreateForm)

  const queryKey = useMemo(() => ({ page, name, status }), [page, name, status])
  const documentPreview = useMemo(
    () => buildPolicyDocument(createForm.menu, createForm.permission),
    [createForm.menu, createForm.permission]
  )

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
  }, [queryKey, refreshKey, t])

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

  const closeCreateModal = () => {
    setCreateForm(defaultCreateForm)
    setSaveErrorMessage(null)
    setIsCreateModalOpen(false)
  }

  const handleSavePolicy = async () => {
    const trimmedName = createForm.name.trim()

    if (!trimmedName) {
      setSaveErrorMessage(t('setting.policies.nameRequired'))
      notifySaveError(t('setting.policies.nameRequired'))
      return
    }

    const requestBody: PolicyCreateRequest = {
      name: trimmedName,
      description: createForm.description.trim() || null,
      documentJson: documentPreview
    }

    setIsSaving(true)
    setSaveErrorMessage(null)

    try {
      const createdPolicy = await createPolicy(requestBody)

      if (createForm.status === 'INACTIVE' && createdPolicy.policyId) {
        await deactivatePolicy(createdPolicy.policyId)
      }

      notifySaveSuccess(t('setting.policies.created'))
      closeCreateModal()
      startTransition(() => {
        setIsLoading(true)
        setErrorMessage(null)
      })
      setRefreshKey((currentValue) => currentValue + 1)
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(error, t('setting.policies.createFailed'))
      setSaveErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSaving(false)
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

      <div className="mb-sm flex justify-end gap-sm">
        <Button type="button" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.policies.addPolicy')}
        </Button>
        <Button type="button" size="small" onClick={() => updateQuery(1)}>
          <Search className="h-icon-md w-icon-md" />
          {t('setting.policies.actions.search')}
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

      {isCreateModalOpen && (
        <div
          className="setting-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-lg"
          onClick={closeCreateModal}
        >
          <div
            className="setting-modal-dialog flex max-h-modal-max w-full flex-col overflow-hidden rounded border border-border bg-bg-primary shadow-md"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-create-title"
          >
            <div className="flex items-start justify-between gap-md border-b border-border p-lg">
              <div>
                <h2 id="policy-create-title" className="text-xl font-bold text-text-primary">
                  {t('setting.policies.createTitle')}
                </h2>
                <p className="mt-xs text-base font-light text-text-tertiary">
                  {t('setting.policies.createDescription')}
                </p>
              </div>
              <Button
                type="button"
                variant="tertiary"
                iconOnly
                onClick={closeCreateModal}
                aria-label={t('common.close')}
              >
                <X className="h-icon-md w-icon-md" />
              </Button>
            </div>

            <div className="overflow-y-auto p-lg">
              {saveErrorMessage && (
                <Alert className="mb-md" variant="error">
                  {saveErrorMessage}
                </Alert>
              )}

              <div className="policy-create-form-grid">
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.policies.columns.name')}
                  <Input
                    value={createForm.name}
                    onChange={(event) =>
                      setCreateForm((currentValue) => ({
                        ...currentValue,
                        name: event.target.value
                      }))
                    }
                    placeholder={t('setting.policies.namePlaceholder')}
                  />
                </label>

                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.permissions.columns.description')}
                  <Input
                    value={createForm.description}
                    onChange={(event) =>
                      setCreateForm((currentValue) => ({
                        ...currentValue,
                        description: event.target.value
                      }))
                    }
                    placeholder={t('setting.policies.descriptionPlaceholder')}
                  />
                </label>

                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.policies.menuType')}
                  <Select
                    value={createForm.menu}
                    onChange={(event) =>
                      setCreateForm((currentValue) => ({
                        ...currentValue,
                        menu: event.target.value as PolicyMenuKey
                      }))
                    }
                  >
                    {MENU_OPTIONS.map((menu) => (
                      <option key={menu} value={menu}>
                        {t(`setting.policies.menus.${menu}`)}
                      </option>
                    ))}
                  </Select>
                </label>

                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.policies.permissionPreset')}
                  <Select
                    value={createForm.permission}
                    onChange={(event) =>
                      setCreateForm((currentValue) => ({
                        ...currentValue,
                        permission: event.target.value as PolicyPermissionPreset
                      }))
                    }
                  >
                    {PERMISSION_OPTIONS.map((permission) => (
                      <option key={permission} value={permission}>
                        {t(`setting.policies.permissions.${permission}`)}
                      </option>
                    ))}
                  </Select>
                </label>

                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.policies.columns.status')}
                  <Select
                    value={createForm.status}
                    onChange={(event) =>
                      setCreateForm((currentValue) => ({
                        ...currentValue,
                        status: event.target.value as PolicyCreateStatus
                      }))
                    }
                  >
                    <option value="ACTIVE">{t('setting.status.active')}</option>
                    <option value="INACTIVE">{t('setting.status.inactive')}</option>
                  </Select>
                </label>
              </div>

              <div className="mt-lg rounded border border-border bg-bg-secondary p-md">
                <h3 className="text-lg font-bold text-text-primary">
                  {t('setting.policies.documentPreview')}
                </h3>
                <p className="mt-xs text-base font-light text-text-secondary">
                  {t('setting.policies.documentDescription')}
                </p>
                <pre className="policy-document-preview mt-md rounded border border-border bg-bg-primary p-md text-base font-light text-text-secondary">
                  {documentPreview}
                </pre>
              </div>
            </div>

            <div className="flex justify-end gap-sm border-t border-border p-lg">
              <Button type="button" variant="tertiary" onClick={closeCreateModal}>
                {t('common.cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleSavePolicy}
                disabled={isSaving}
              >
                <Save className="h-icon-md w-icon-md" />
                {isSaving ? t('setting.policies.creating') : t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
