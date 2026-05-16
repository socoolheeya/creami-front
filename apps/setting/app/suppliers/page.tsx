'use client'

import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  DatePicker,
  Input,
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
  TimePicker,
  notifySaveError,
  notifySaveSuccess
} from '@creami/ui'
import { Handshake, Plus, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  createSupplier,
  createSupplierRequest,
  formatBlockDateTimeRange,
  initialSupplierForm,
  getSuppliers,
  type Supplier,
  type SupplierForm,
  type SupplierStatus
} from '@/lib/api/suppliers'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'

export default function SuppliersPage() {
  const t = useTranslations()
  const router = useRouter()
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [form, setForm] = useState<SupplierForm>(initialSupplierForm)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const canSave =
    form.code.trim().length > 0 &&
    form.name.trim().length > 0 &&
    Number(form.tpsLimit) > 0
  const getSupplierStatusLabel = (status: SupplierStatus) =>
    status === 'active'
      ? t('setting.status.active')
      : t('setting.status.inactive')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadSuppliers() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const nextSuppliers = await getSuppliers({ signal: abortController.signal })
        setSuppliers(nextSuppliers)
      } catch {
        if (abortController.signal.aborted) return
        setErrorMessage(t('setting.suppliers.loadFailed'))
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadSuppliers()

    return () => abortController.abort()
  }, [t])

  const resetForm = () => {
    setForm(initialSupplierForm)
    setIsModalOpen(false)
  }

  const handleOpenCreateModal = () => {
    setForm(initialSupplierForm)
    setIsModalOpen(true)
  }

  const handleSaveSupplier = async () => {
    setIsSaving(true)
    setErrorMessage(null)

    try {
      const createdSupplier = await createSupplier(createSupplierRequest(form))
      setSuppliers((currentSuppliers) => [createdSupplier, ...currentSuppliers])
      notifySaveSuccess(t('setting.suppliers.saved'))
      resetForm()
    } catch (error) {
      setErrorMessage(getDisplayApiErrorMessage(error, t('setting.suppliers.saveFailed')))
      notifySaveError(t('setting.suppliers.saveFailed'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <Handshake className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.suppliers.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.suppliers.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end gap-sm">
        <Button type="button" onClick={handleOpenCreateModal}>
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.suppliers.addSupplier')}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="error" className="mb-md">
          {errorMessage}
        </Alert>
      )}

      <div className="rounded border border-border bg-bg-primary shadow">
        <Table className="table-fixed min-w-supplier-table">
          <colgroup>
            <col className="w-supplier-col-id" />
            <col className="w-supplier-col-code" />
            <col className="w-supplier-col-name" />
            <col className="w-supplier-col-status" />
            <col className="w-supplier-col-block-time" />
            <col className="w-supplier-col-tps" />
            <col className="w-supplier-col-user" />
            <col className="w-supplier-col-date" />
            <col className="w-supplier-col-user" />
            <col className="w-supplier-col-date" />
          </colgroup>
          <TableHeader
            filtersEnabled={false}
            filterRow={
              <TableFilterRow>
                <TableFilterCell className="w-supplier-col-id">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-code">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-name">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-status">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-block-time">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-tps">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-user">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-date">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-user">{null}</TableFilterCell>
                <TableFilterCell className="w-supplier-col-date">{null}</TableFilterCell>
              </TableFilterRow>
            }
          >
            <TableRow>
              <TableHead className="w-supplier-col-id" truncate>{t('setting.suppliers.columns.id')}</TableHead>
              <TableHead className="w-supplier-col-code" truncate>{t('setting.suppliers.columns.supplierCode')}</TableHead>
              <TableHead className="w-supplier-col-name" truncate>{t('setting.suppliers.columns.supplierName')}</TableHead>
              <TableHead className="w-supplier-col-status" truncate>{t('setting.suppliers.columns.status')}</TableHead>
              <TableHead className="w-supplier-col-block-time" truncate>{t('setting.suppliers.columns.blockTime')}</TableHead>
              <TableHead className="w-supplier-col-tps" truncate>{t('setting.suppliers.columns.tpsLimit')}</TableHead>
              <TableHead className="w-supplier-col-user" truncate>{t('setting.suppliers.columns.createdById')}</TableHead>
              <TableHead className="w-supplier-col-date" truncate>{t('setting.suppliers.columns.createdAt')}</TableHead>
              <TableHead className="w-supplier-col-user" truncate>{t('setting.suppliers.columns.updatedById')}</TableHead>
              <TableHead className="w-supplier-col-date" truncate>{t('setting.suppliers.columns.updatedAt')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableStateRow colSpan={10} variant="loading">
                {t('setting.suppliers.loading')}
              </TableStateRow>
            )}
            {!isLoading && suppliers.length === 0 && (
              <TableStateRow colSpan={10} variant="empty">
                {t('setting.suppliers.empty')}
              </TableStateRow>
            )}
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                onClick={() => router.push(`/suppliers/${supplier.id}`)}
              >
                <TableCell className="w-supplier-col-id text-text-tertiary" truncate titleText={supplier.id}>
                  {supplier.id}
                </TableCell>
                <TableCell className="w-supplier-col-code text-text-secondary" truncate titleText={supplier.code}>
                  {supplier.code}
                </TableCell>
                <TableCell className="w-supplier-col-name font-bold" truncate titleText={supplier.name}>
                  {supplier.name}
                </TableCell>
                <TableCell className="w-supplier-col-status">
                <span
                  className={`inline-flex h-control-sm w-fit items-center rounded px-control-px-sm py-none text-base font-bold ${
                    supplier.status === 'active'
                      ? 'bg-primary-bg text-primary'
                      : 'bg-bg-tertiary text-text-tertiary'
                  }`}
                >
                  {getSupplierStatusLabel(supplier.status)}
                </span>
                </TableCell>
                <TableCell className="w-supplier-col-block-time text-text-secondary" truncate titleText={formatBlockDateTimeRange(supplier)}>
                  {formatBlockDateTimeRange(supplier)}
                </TableCell>
                <TableCell className="w-supplier-col-tps" truncate titleText={t('setting.suppliers.tpsValue', { count: supplier.tpsLimit })}>
                  {t('setting.suppliers.tpsValue', { count: supplier.tpsLimit })}
                </TableCell>
                <TableCell className="w-supplier-col-user text-text-secondary" truncate titleText={supplier.createdById}>
                  {supplier.createdById}
                </TableCell>
                <TableCell className="w-supplier-col-date text-text-secondary" truncate titleText={supplier.createdAt}>
                  {supplier.createdAt}
                </TableCell>
                <TableCell className="w-supplier-col-user text-text-secondary" truncate titleText={supplier.updatedById}>
                  {supplier.updatedById}
                </TableCell>
                <TableCell className="w-supplier-col-date text-text-secondary" truncate titleText={supplier.updatedAt}>
                  {supplier.updatedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-lg"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={resetForm}
        >
          <div
            className="flex max-h-modal-max w-full flex-col overflow-hidden rounded border border-border bg-bg-primary shadow-md"
            style={{ maxWidth: 'var(--modal-width-lg)' }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-md border-b border-border p-lg">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {t('setting.suppliers.createTitle')}
                </h2>
                <p className="mt-xs text-base font-light text-text-tertiary">
                  {t('setting.suppliers.createDescription')}
                </p>
              </div>
              <Button
                type="button"
                variant="tertiary"
                iconOnly
                onClick={resetForm}
                aria-label={t('common.close')}
              >
                <X className="h-icon-md w-icon-md" />
              </Button>
            </div>

            <div className="grid gap-md overflow-y-auto p-lg md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.suppliers.supplierCode')}
                <Input
                  value={form.code}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, code: event.target.value }))
                  }
                  placeholder={t('setting.suppliers.supplierCodePlaceholder')}
                />
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.suppliers.supplierName')}
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder={t('setting.suppliers.supplierNamePlaceholder')}
                />
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.suppliers.status')}
                <Select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as SupplierStatus
                    }))
                  }
                >
                  <option value="active">{getSupplierStatusLabel('active')}</option>
                  <option value="inactive">{getSupplierStatusLabel('inactive')}</option>
                </Select>
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.suppliers.tpsLimit')}
                <Input
                  type="number"
                  min={1}
                  value={form.tpsLimit}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, tpsLimit: event.target.value }))
                  }
                />
              </label>

              <DatePicker
                label={t('setting.suppliers.blockStartDate')}
                value={form.blockStartDate}
                clearable
                onChange={(date) =>
                  setForm((current) => ({ ...current, blockStartDate: date }))
                }
              />

              <TimePicker
                label={t('setting.suppliers.blockStartTime')}
                value={form.blockStartTime}
                onChange={(time) =>
                  setForm((current) => ({ ...current, blockStartTime: time }))
                }
                includeSeconds={false}
                minuteStep={5}
                clearable
              />

              <DatePicker
                label={t('setting.suppliers.blockEndDate')}
                value={form.blockEndDate}
                onChange={(date) =>
                  setForm((current) => ({ ...current, blockEndDate: date }))
                }
                align="right"
                clearable
              />

              <TimePicker
                label={t('setting.suppliers.blockEndTime')}
                value={form.blockEndTime}
                onChange={(time) =>
                  setForm((current) => ({ ...current, blockEndTime: time }))
                }
                align="right"
                includeSeconds={false}
                minuteStep={5}
                clearable
              />
            </div>

            <div className="flex justify-end gap-sm border-t border-border p-lg">
              <Button type="button" variant="tertiary" onClick={resetForm}>
                {t('common.cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={!canSave || isSaving}
                onClick={handleSaveSupplier}
              >
                <Save className="h-icon-md w-icon-md" />
                {isSaving ? t('setting.suppliers.saving') : t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
