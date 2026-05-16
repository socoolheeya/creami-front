'use client'

import { useEffect, useState } from 'react'
import { Alert, Button, DatePicker, Input, Select, TimePicker, notifySaveError, notifySaveSuccess } from '@creami/ui'
import { ArrowLeft, Handshake, Save, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  createSupplierForm,
  createSupplierRequest,
  getSupplier,
  updateSupplier,
  type Supplier,
  type SupplierForm,
  type SupplierStatus
} from '@/lib/api/suppliers'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'

export default function SupplierDetailPage() {
  const params = useParams<{ id: string }>()
  const t = useTranslations()
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [form, setForm] = useState<SupplierForm>({
    code: '',
    name: '',
    status: 'active',
    blockStartDate: '',
    blockStartTime: '',
    blockEndDate: '',
    blockEndTime: '',
    tpsLimit: '10'
  })
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

    async function loadSupplier() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const nextSupplier = await getSupplier(params.id, { signal: abortController.signal })
        setSupplier(nextSupplier)
        setForm(createSupplierForm(nextSupplier))
      } catch {
        if (abortController.signal.aborted) return
        setSupplier(null)
        setErrorMessage(t('setting.suppliers.loadFailed'))
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadSupplier()

    return () => abortController.abort()
  }, [params.id, t])

  const handleSave = async () => {
    if (!supplier) return

    setIsSaving(true)
    setErrorMessage(null)

    try {
      const updatedSupplier = await updateSupplier(supplier.id, createSupplierRequest(form))
      setSupplier(updatedSupplier)
      setForm(createSupplierForm(updatedSupplier))
      notifySaveSuccess(t('setting.suppliers.detail.saved'))
    } catch (error) {
      setErrorMessage(getDisplayApiErrorMessage(error, t('setting.suppliers.saveFailed')))
      notifySaveError(t('setting.suppliers.saveFailed'))
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoading && !supplier) {
    return (
      <div>
        <Link
          href="/suppliers"
          className="mb-lg inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          {t('setting.suppliers.detail.backToList')}
        </Link>
        {errorMessage && (
          <Alert variant="error" className="mb-md">
            {errorMessage}
          </Alert>
        )}
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h1 className="text-xl font-bold text-text-primary">
            {t('setting.suppliers.detail.notFound')}
          </h1>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-lg">
        <div>
          <Link
            href="/suppliers"
            className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
          >
            <ArrowLeft className="h-icon-md w-icon-md" />
            {t('setting.suppliers.detail.backToList')}
          </Link>
          <div className="mb-sm flex items-center gap-md">
            <Handshake className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.suppliers.detail.title', { supplierName: form.name })}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.suppliers.detail.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button type="button" disabled={!canSave || isSaving || !supplier} onClick={handleSave}>
          <Save className="h-icon-md w-icon-md" />
          {isSaving ? t('setting.suppliers.saving') : t('common.save')}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="error" className="mb-md">
          {errorMessage}
        </Alert>
      )}

      <div className="grid gap-lg xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <Handshake className="h-icon-md w-icon-md text-primary" />
              {t('setting.suppliers.detail.basicInfo')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.suppliers.detail.basicDescription')}
            </p>
          </div>

          <form className="grid gap-md" onSubmit={(event) => event.preventDefault()}>
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

            <div className="grid gap-md md:grid-cols-2">
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
            </div>
          </form>

          <dl className="mt-lg grid gap-sm rounded border border-border bg-bg-secondary p-md text-base">
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.suppliers.columns.id')}
              </dt>
              <dd className="font-medium text-text-primary">{supplier?.id ?? '-'}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.suppliers.columns.createdById')}
              </dt>
              <dd className="font-medium text-text-primary">{supplier?.createdById ?? '-'}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.suppliers.columns.createdAt')}
              </dt>
              <dd className="font-medium text-text-primary">{supplier?.createdAt ?? '-'}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.suppliers.columns.updatedById')}
              </dt>
              <dd className="font-medium text-text-primary">{supplier?.updatedById ?? '-'}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.suppliers.columns.updatedAt')}
              </dt>
              <dd className="font-medium text-text-primary">{supplier?.updatedAt ?? '-'}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <SlidersHorizontal className="h-icon-md w-icon-md text-primary" />
              {t('setting.suppliers.detail.integrationSettings')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.suppliers.detail.integrationDescription')}
            </p>
          </div>

          <div className="grid gap-md md:grid-cols-2">
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
              clearable
            />

            <TimePicker
              label={t('setting.suppliers.blockEndTime')}
              value={form.blockEndTime}
              onChange={(time) =>
                setForm((current) => ({ ...current, blockEndTime: time }))
              }
              includeSeconds={false}
              minuteStep={5}
              clearable
            />
          </div>
        </section>
      </div>
    </div>
  )
}
