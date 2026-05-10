'use client'

import { useState } from 'react'
import { Button, DatePicker, Input, Select, TimePicker, notification } from '@creami/ui'
import { Handshake, Plus, Save, X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  createSupplierId,
  currentUserId,
  formatAuditDate,
  formatBlockDateTimeRange,
  initialSupplierForm,
  initialSuppliers,
  normalizeOptionalValue,
  type Supplier,
  type SupplierForm,
  type SupplierStatus
} from '@/lib/data/suppliers'

export default function SuppliersPage() {
  const t = useTranslations()
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [form, setForm] = useState<SupplierForm>(initialSupplierForm)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const canSave =
    form.code.trim().length > 0 &&
    form.name.trim().length > 0 &&
    Number(form.tpsLimit) > 0
  const getSupplierStatusLabel = (status: SupplierStatus) =>
    status === 'active'
      ? t('setting.status.active')
      : t('setting.status.inactive')

  const resetForm = () => {
    setForm(initialSupplierForm)
    setIsModalOpen(false)
  }

  const handleOpenCreateModal = () => {
    setForm(initialSupplierForm)
    setIsModalOpen(true)
  }

  const handleSaveSupplier = () => {
    const nextSupplier = {
      code: form.code.trim(),
      name: form.name.trim(),
      status: form.status,
      blockStartDate: normalizeOptionalValue(form.blockStartDate),
      blockStartTime: normalizeOptionalValue(form.blockStartTime),
      blockEndDate: normalizeOptionalValue(form.blockEndDate),
      blockEndTime: normalizeOptionalValue(form.blockEndTime),
      tpsLimit: Number(form.tpsLimit),
      updatedById: currentUserId,
      updatedAt: formatAuditDate()
    }

    setSuppliers((currentSuppliers) => [
      {
        id: createSupplierId(currentSuppliers.length),
        ...nextSupplier,
        createdById: currentUserId,
        createdAt: formatAuditDate()
      },
      ...currentSuppliers
    ])
    notification.success({
      message: '저장이 완료되었습니다.',
      placement: 'top-right',
      direction: 'right'
    })
    resetForm()
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

      <div className="rounded border border-border bg-bg-primary shadow">
        <div className="overflow-x-auto">
          <div className="min-w-[1480px]">
            <div className="grid grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.55fr)_minmax(0,2.45fr)_minmax(0,0.55fr)_minmax(0,0.75fr)_minmax(0,1.1fr)_minmax(0,0.75fr)_minmax(0,1.1fr)] gap-sm border-b border-border px-lg py-sm text-base font-bold text-text-tertiary">
              <span>{t('setting.suppliers.columns.id')}</span>
              <span>{t('setting.suppliers.columns.supplierCode')}</span>
              <span>{t('setting.suppliers.columns.supplierName')}</span>
              <span>{t('setting.suppliers.columns.status')}</span>
              <span>{t('setting.suppliers.columns.blockTime')}</span>
              <span>{t('setting.suppliers.columns.tpsLimit')}</span>
              <span>{t('setting.suppliers.columns.createdById')}</span>
              <span>{t('setting.suppliers.columns.createdAt')}</span>
              <span>{t('setting.suppliers.columns.updatedById')}</span>
              <span>{t('setting.suppliers.columns.updatedAt')}</span>
            </div>

            {suppliers.map((supplier) => (
              <Link
                key={supplier.id}
                href={`/suppliers/${supplier.id}`}
                className="grid cursor-pointer grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.55fr)_minmax(0,2.45fr)_minmax(0,0.55fr)_minmax(0,0.75fr)_minmax(0,1.1fr)_minmax(0,0.75fr)_minmax(0,1.1fr)] gap-sm border-b border-border px-lg py-md no-underline transition-colors last:border-b-0 hover:bg-bg-secondary"
              >
                <span className="text-base font-light text-text-tertiary">
                  {supplier.id}
                </span>
                <span className="truncate text-base font-medium text-text-secondary">
                  {supplier.code}
                </span>
                <span className="truncate text-base font-bold text-text-primary">
                  {supplier.name}
                </span>
                <span
                  className={`inline-flex h-control-sm w-fit items-center rounded px-control-px-sm py-none text-base font-bold ${
                    supplier.status === 'active'
                      ? 'bg-primary-bg text-primary'
                      : 'bg-bg-tertiary text-text-tertiary'
                  }`}
                >
                  {getSupplierStatusLabel(supplier.status)}
                </span>
                <span className="block w-full truncate whitespace-nowrap text-base font-medium text-text-secondary">
                  {formatBlockDateTimeRange(supplier)}
                </span>
                <span className="text-base font-medium text-text-primary">
                  {t('setting.suppliers.tpsValue', { count: supplier.tpsLimit })}
                </span>
                <span className="text-base font-light text-text-secondary">
                  {supplier.createdById}
                </span>
                <span className="whitespace-nowrap text-base font-light text-text-secondary">
                  {supplier.createdAt}
                </span>
                <span className="text-base font-light text-text-secondary">
                  {supplier.updatedById}
                </span>
                <span className="whitespace-nowrap text-base font-light text-text-secondary">
                  {supplier.updatedAt}
                </span>
              </Link>
            ))}
          </div>
        </div>
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
                disabled={!canSave}
                onClick={handleSaveSupplier}
              >
                <Save className="h-icon-md w-icon-md" />
                {t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
