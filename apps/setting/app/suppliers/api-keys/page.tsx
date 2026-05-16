'use client'

import { type FormEvent, useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableStateRow,
  notification
} from '@creami/ui'
import { Copy, KeyRound, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  createSupplierApiKey,
  deleteSupplierApiKey,
  getSupplierApiKeys,
  rotateSupplierApiKey,
  type SupplierApiKey
} from '../../../lib/api/supplierApiKeys'
import { getDisplayApiErrorMessage } from '../../../lib/api/errors'
import { getSuppliers, type Supplier } from '../../../lib/api/suppliers'

type PendingAction = {
  type: 'create' | 'rotate' | 'delete'
  id?: string
} | null

function formatDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 10)
}

export default function ApiKeysPage() {
  const t = useTranslations()
  const [apiKeys, setApiKeys] = useState<SupplierApiKey[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [selectedSupplierId, setSelectedSupplierId] = useState('')
  const [copiedApiKeyId, setCopiedApiKeyId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [revealedApiKeys, setRevealedApiKeys] = useState<Record<string, string>>({})

  const supplierById = new Map(suppliers.map((supplier) => [String(supplier.id), supplier]))
  const registeredSupplierIds = new Set(
    apiKeys
      .map((apiKey) => apiKey.supplierId)
      .filter((supplierId): supplierId is string => typeof supplierId === 'string' && supplierId.length > 0)
  )
  const availableSuppliers = suppliers.filter(
    (supplier) => !registeredSupplierIds.has(String(supplier.id))
  )
  const canAdd =
    Boolean(selectedSupplierId) &&
    !registeredSupplierIds.has(selectedSupplierId) &&
    !pendingAction
  const showInitialLoading = isLoading && apiKeys.length === 0 && !errorMessage
  const visibleError = errorMessage && apiKeys.length === 0
  const apiKeyCount = apiKeys.length

  const markApiKeyRevealed = (apiKeyId: string, plainTextKey: string | null | undefined) => {
    if (!plainTextKey) return

    setRevealedApiKeys((current) => ({
      ...current,
      [apiKeyId]: plainTextKey
    }))

    setTimeout(() => {
      setRevealedApiKeys((current) => {
        const next = { ...current }
        delete next[apiKeyId]
        return next
      })
    }, 5 * 60 * 1000)
  }

  const getDisplayApiKey = (supplierApiKey: SupplierApiKey) => {
    return (
      revealedApiKeys[supplierApiKey.id] ??
      supplierApiKey.apiKey ??
      supplierApiKey.maskedApiKey
    )
  }

  const refreshApiKeys = async () => {
    const nextApiKeys = await getSupplierApiKeys()
    setApiKeys(nextApiKeys)
  }

  useEffect(() => {
    const abortController = new AbortController()

    async function loadApiKeys() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const [nextApiKeys, nextSuppliers] = await Promise.all([
          getSupplierApiKeys({ signal: abortController.signal }),
          getSuppliers({ signal: abortController.signal })
        ])
        setApiKeys(nextApiKeys)
        setSuppliers(nextSuppliers)
      } catch {
        if (abortController.signal.aborted) return
        setErrorMessage(t('setting.apiKeys.loadFailed'))
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadApiKeys()

    return () => abortController.abort()
  }, [t])

  const handleAddApiKey = async () => {
    if (!selectedSupplierId) {
      return
    }
    const selectedSupplier = supplierById.get(selectedSupplierId)
    if (!selectedSupplier) {
      setErrorMessage(t('setting.apiKeys.createFailed'))
      return
    }

    setPendingAction({ type: 'create' })
    setErrorMessage(null)

    try {
      const createdApiKey = await createSupplierApiKey({ supplierId: selectedSupplier.id })
      await refreshApiKeys()
      markApiKeyRevealed(createdApiKey.id, createdApiKey.apiKey)
      setSelectedSupplierId('')
      notification.success({ message: t('setting.apiKeys.created') })
    } catch (error) {
      setErrorMessage(getDisplayApiErrorMessage(error, t('setting.apiKeys.createFailed')))
      notification.error({ message: t('setting.apiKeys.createFailed') })
    } finally {
      setPendingAction(null)
    }
  }

  const handleCreateFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canAdd) {
      return
    }

    void handleAddApiKey()
  }

  const handleRegenerateKey = async (apiKeyId: string) => {
    const confirmed = window.confirm(t('setting.apiKeys.regenerateConfirm'))

    if (!confirmed) {
      return
    }

    setPendingAction({ type: 'rotate', id: apiKeyId })
    setErrorMessage(null)

    try {
      const rotatedApiKey = await rotateSupplierApiKey(apiKeyId)
      await refreshApiKeys()
      markApiKeyRevealed(rotatedApiKey.id, rotatedApiKey.apiKey)
      setCopiedApiKeyId(null)
      notification.success({ message: t('setting.apiKeys.regenerated') })
    } catch (error) {
      setErrorMessage(getDisplayApiErrorMessage(error, t('setting.apiKeys.regenerateFailed')))
      notification.error({ message: t('setting.apiKeys.regenerateFailed') })
    } finally {
      setPendingAction(null)
    }
  }

  const handleDeleteApiKey = async (apiKeyId: string) => {
    setPendingAction({ type: 'delete', id: apiKeyId })
    setErrorMessage(null)

    try {
      await deleteSupplierApiKey(apiKeyId)
      await refreshApiKeys()
      setRevealedApiKeys((current) => {
        const next = { ...current }
        delete next[apiKeyId]
        return next
      })
      notification.success({ message: t('setting.apiKeys.deleted') })
    } catch (error) {
      setErrorMessage(getDisplayApiErrorMessage(error, t('setting.apiKeys.deleteFailed')))
      notification.error({ message: t('setting.apiKeys.deleteFailed') })
    } finally {
      setPendingAction(null)
    }
  }

  const handleCopyKey = async (supplierApiKey: SupplierApiKey) => {
    const visibleApiKey = getDisplayApiKey(supplierApiKey)

    if (!visibleApiKey) {
      notification.warning({ message: t('setting.apiKeys.copyUnavailable') })
      return
    }

    await navigator.clipboard.writeText(`Authorization: Bearer ${visibleApiKey}`)
    setCopiedApiKeyId(supplierApiKey.id)
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <KeyRound className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.apiKeys.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.apiKeys.description')}
          </p>
        </div>
      </div>

      <section className="mb-lg rounded border border-border bg-bg-primary p-lg shadow">
        <div className="mb-md">
          <h2 className="text-xl font-bold text-text-primary">
            {t('setting.apiKeys.createTitle')}
          </h2>
          <p className="mt-xs text-base font-light text-text-tertiary">
            {t('setting.apiKeys.createDescription')}
          </p>
        </div>

        <form
          className="flex flex-col gap-md xl:flex-row xl:items-end"
          onSubmit={handleCreateFormSubmit}
        >
          <label className="grid flex-1 gap-sm text-base font-medium text-text-primary">
            {t('setting.apiKeys.supplierName')}
            <Select
              value={selectedSupplierId}
              onChange={(event) => setSelectedSupplierId(event.target.value)}
              disabled={pendingAction?.type === 'create'}
            >
              <option value="">
                {t('setting.apiKeys.supplierNamePlaceholder')}
              </option>
              {availableSuppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} ({supplier.code})
                </option>
              ))}
            </Select>
          </label>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={!canAdd}
            >
              <Plus className="h-icon-md w-icon-md" />
              {pendingAction?.type === 'create'
                ? t('setting.apiKeys.creating')
                : t('setting.apiKeys.addApiKey')}
            </Button>
          </div>
        </form>
      </section>

      {errorMessage && (
        <Alert variant="error" className="mb-md">
          {errorMessage}
        </Alert>
      )}

      <div className="mb-sm text-base font-medium text-text-secondary">
        {t('setting.apiKeys.total', { count: apiKeyCount })}
      </div>

      <Table className="min-w-api-key-table table-fixed">
        <colgroup>
          <col className="w-api-key-col-id" />
          <col className="w-api-key-col-supplier" />
          <col className="w-api-key-col-key" />
          <col className="w-api-key-col-date" />
          <col className="w-api-key-col-date" />
          <col className="w-api-key-col-actions" />
        </colgroup>
        <TableHeader filtersEnabled={false}>
          <tr>
            <TableHead className="w-api-key-col-id" truncate>
              {t('setting.apiKeys.columns.supplierId')}
            </TableHead>
            <TableHead className="w-api-key-col-supplier" truncate>
              {t('setting.apiKeys.columns.supplierName')}
            </TableHead>
            <TableHead className="w-api-key-col-key" truncate>
              {t('setting.apiKeys.columns.apiKey')}
            </TableHead>
            <TableHead className="w-api-key-col-date" truncate>
              {t('setting.apiKeys.columns.createdAt')}
            </TableHead>
            <TableHead className="w-api-key-col-date" truncate>
              {t('setting.apiKeys.columns.lastUsedAt')}
            </TableHead>
            <TableHead className="w-api-key-col-actions">
              {t('setting.apiKeys.columns.actions')}
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {showInitialLoading && (
            <TableStateRow colSpan={6} variant="loading">
              {t('setting.apiKeys.loading')}
            </TableStateRow>
          )}
          {visibleError && (
            <TableStateRow colSpan={6} variant="error">
              {t('setting.apiKeys.loadFailed')}
            </TableStateRow>
          )}
          {!isLoading && !errorMessage && apiKeys.length === 0 && (
            <TableStateRow colSpan={6} variant="empty">
              {t('setting.apiKeys.empty')}
            </TableStateRow>
          )}
          {apiKeys.map((supplierApiKey) => {
            const isRotating =
              pendingAction?.type === 'rotate' && pendingAction.id === supplierApiKey.id
            const isDeleting =
              pendingAction?.type === 'delete' && pendingAction.id === supplierApiKey.id
            const displayKey = getDisplayApiKey(supplierApiKey)
            const displayAuthorizationKey = `Bearer ${displayKey}`
            const supplier = supplierApiKey.supplierId
              ? supplierById.get(String(supplierApiKey.supplierId))
              : suppliers.find((item) => item.name === supplierApiKey.supplierName)
            const supplierId = supplierApiKey.supplierId ?? supplier?.id ?? '-'

            return (
              <TableRow key={supplierApiKey.id}>
                <TableCell className="w-api-key-col-id" truncate titleText={supplierId}>
                  {supplierId}
                </TableCell>
                <TableCell
                  className="w-api-key-col-supplier"
                  truncate
                  titleText={supplierApiKey.supplierName}
                >
                  {supplierApiKey.supplierName}
                </TableCell>
                <TableCell
                  className="w-api-key-col-key"
                  truncate
                  titleText={displayAuthorizationKey}
                >
                  <code
                    className="block truncate rounded bg-bg-secondary px-control-px-sm py-xs text-base font-medium text-text-secondary"
                    title={displayAuthorizationKey}
                  >
                    {displayAuthorizationKey}
                  </code>
                </TableCell>
                <TableCell
                  className="w-api-key-col-date"
                  truncate
                  titleText={formatDate(supplierApiKey.createdAt)}
                >
                  {formatDate(supplierApiKey.createdAt)}
                </TableCell>
                <TableCell
                  className="w-api-key-col-date"
                  truncate
                  titleText={formatDate(supplierApiKey.lastUsedAt)}
                >
                  {formatDate(supplierApiKey.lastUsedAt)}
                </TableCell>
                <TableCell className="w-api-key-col-actions">
                  <div className="flex flex-wrap gap-sm">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={Boolean(pendingAction)}
                      onClick={() => handleCopyKey(supplierApiKey)}
                    >
                      <Copy className="h-icon-md w-icon-md" />
                      {copiedApiKeyId === supplierApiKey.id
                        ? t('setting.apiKeys.copied')
                        : t('setting.apiKeys.copy')}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={Boolean(pendingAction)}
                      onClick={() => handleRegenerateKey(supplierApiKey.id)}
                    >
                      <RefreshCw className="h-icon-md w-icon-md" />
                      {isRotating
                        ? t('setting.apiKeys.regenerating')
                        : t('setting.apiKeys.regenerate')}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={Boolean(pendingAction)}
                      onClick={() => handleDeleteApiKey(supplierApiKey.id)}
                    >
                      <Trash2 className="h-icon-md w-icon-md" />
                      {isDeleting ? t('setting.apiKeys.deleting') : t('common.delete')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
