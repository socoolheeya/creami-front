'use client'

import { Edit, Plus, Save, Tag, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, DatePicker, Input, Select, ViewToggle } from '@creami/ui'
import { createDiscount, fetchDiscounts, updateDiscount } from '@/lib/api/discount'
import { Discount, DiscountBusinessType, DiscountFormData, DiscountStatus, DiscountType } from '@/lib/types/discount'
import { DiscountCard } from './components/DiscountCard'
import { DiscountTable } from './components/DiscountTable'

type ViewMode = 'grid' | 'table'
type FormMode = 'create' | 'edit'

type DiscountFormState = {
  name: string
  discountType: DiscountBusinessType
  type: DiscountType
  value: string
  startDate: string
  endDate: string
  status: DiscountStatus
  audienceType: 'PUBLIC' | 'MOBILE_ONLY' | 'MEMBER_ONLY'
}

const defaultFormState: DiscountFormState = {
  name: '',
  discountType: 'BASIC',
  type: 'percentage',
  value: '10',
  startDate: '',
  endDate: '',
  status: 'scheduled',
  audienceType: 'PUBLIC',
}

function toDateInputValue(date: Date): string {
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 2000 || date.getFullYear() > 2100) {
    return ''
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toFormState(discount: Discount): DiscountFormState {
  return {
    name: discount.name,
    discountType: (discount.discountType as DiscountBusinessType | undefined) ?? 'BASIC',
    type: discount.type,
    value: String(discount.value),
    startDate: toDateInputValue(discount.startDate),
    endDate: toDateInputValue(discount.endDate),
    status: discount.status,
    audienceType: discount.isPublic ? 'PUBLIC' : 'MEMBER_ONLY',
  }
}

function toFormData(form: DiscountFormState): DiscountFormData {
  return {
    name: form.name.trim(),
    discountType: form.discountType,
    type: form.type,
    value: Number(form.value),
    startDate: form.startDate ? new Date(`${form.startDate}T00:00:00`) : undefined,
    endDate: form.endDate ? new Date(`${form.endDate}T00:00:00`) : undefined,
    status: form.status,
    audienceType: form.audienceType,
    isPublic: form.audienceType === 'PUBLIC',
    target: 'all',
  }
}

export default function DiscountsPage() {
  const t = useTranslations()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null)
  const [form, setForm] = useState<DiscountFormState>(defaultFormState)

  useEffect(() => {
    let ignore = false

    const loadDiscounts = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await fetchDiscounts({ search: searchQuery })
        if (!ignore) {
          setDiscounts(response)
        }
      } catch {
        if (!ignore) {
          setDiscounts([])
          setErrorMessage(t('discount.discounts.loadError'))
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadDiscounts()

    return () => {
      ignore = true
    }
  }, [searchQuery, t])

  const handleNew = () => {
    setFormMode('create')
    setEditingDiscount(null)
    setForm(defaultFormState)
    setSaveMessage('')
  }

  const handleEdit = (discount: Discount) => {
    setFormMode('edit')
    setEditingDiscount(discount)
    setForm(toFormState(discount))
    setSaveMessage('')
  }

  const handleCancel = () => {
    handleNew()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaveMessage('')

    if (!form.name.trim() || Number(form.value) <= 0) {
      setSaveMessage(t('discount.discounts.form.validationError'))
      return
    }

    setIsSaving(true)

    try {
      const payload = toFormData(form)
      const savedDiscount =
        formMode === 'edit' && editingDiscount
          ? await updateDiscount(editingDiscount.id, payload)
          : await createDiscount(payload)

      setDiscounts((current) => {
        if (formMode === 'edit') {
          return current.map((discount) => discount.id === savedDiscount.id ? savedDiscount : discount)
        }
        return [savedDiscount, ...current]
      })
      setFormMode('edit')
      setEditingDiscount(savedDiscount)
      setForm(toFormState(savedDiscount))
      setSaveMessage(t(formMode === 'edit' ? 'discount.discounts.form.updateSuccess' : 'discount.discounts.form.createSuccess'))
    } catch {
      setSaveMessage(t('discount.discounts.form.saveError'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Tag className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            {t('discount.discounts.title')}
          </h1>
        </div>

        <Button type="button" variant="primary" size="medium" onClick={handleNew}>
          <Plus className="h-icon-md w-icon-md" />
          {t('discount.common.new')}
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-lg rounded border border-border bg-bg-primary p-lg shadow-sm"
      >
        <div className="mb-md flex items-center justify-between gap-md">
          <div className="flex items-center gap-sm">
            {formMode === 'edit' ? (
              <Edit className="h-icon-md w-icon-md text-primary" />
            ) : (
              <Plus className="h-icon-md w-icon-md text-primary" />
            )}
            <h2 className="text-lg font-bold text-text-primary">
              {t(formMode === 'edit' ? 'discount.discounts.form.editTitle' : 'discount.discounts.form.createTitle')}
            </h2>
          </div>
          {formMode === 'edit' && (
            <Button type="button" variant="secondary" size="small" onClick={handleCancel}>
              <X className="h-icon-md w-icon-md" />
              {t('discount.discounts.form.cancelEdit')}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-xs text-base font-medium text-text-secondary">
            {t('discount.discounts.form.name')}
            <Input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder={t('discount.discounts.form.namePlaceholder')}
              required
            />
          </label>

          <label className="flex flex-col gap-xs text-base font-medium text-text-secondary">
            {t('discount.discounts.form.discountType')}
            <Select
              value={form.discountType}
              onChange={(event) => setForm((current) => ({ ...current, discountType: event.target.value as DiscountBusinessType }))}
            >
              <option value="BASIC">{t('discount.discounts.form.discountTypes.BASIC')}</option>
              <option value="EARLY_BIRD">{t('discount.discounts.form.discountTypes.EARLY_BIRD')}</option>
              <option value="LAST_MINUTE">{t('discount.discounts.form.discountTypes.LAST_MINUTE')}</option>
              <option value="LONG_STAY">{t('discount.discounts.form.discountTypes.LONG_STAY')}</option>
            </Select>
          </label>

          <label className="flex flex-col gap-xs text-base font-medium text-text-secondary">
            {t('discount.discounts.form.type')}
            <Select
              value={form.type}
              onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as DiscountType }))}
            >
              <option value="percentage">{t('discount.labels.types.percentage')}</option>
              <option value="fixed">{t('discount.labels.types.fixed')}</option>
            </Select>
          </label>

          <label className="flex flex-col gap-xs text-base font-medium text-text-secondary">
            {t('discount.discounts.form.value')}
            <Input
              type="number"
              min="1"
              step={form.type === 'percentage' ? '1' : '100'}
              value={form.value}
              onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
              required
            />
          </label>

          <DatePicker
            label={t('discount.discounts.form.startDate')}
            value={form.startDate}
            onChange={(date) => setForm((current) => ({ ...current, startDate: date }))}
            size="medium"
            clearable
          />

          <DatePicker
            label={t('discount.discounts.form.endDate')}
            value={form.endDate}
            onChange={(date) => setForm((current) => ({ ...current, endDate: date }))}
            align="right"
            size="medium"
            clearable
          />

          <label className="flex flex-col gap-xs text-base font-medium text-text-secondary">
            {t('discount.discounts.form.status')}
            <Select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as DiscountStatus }))}
            >
              <option value="scheduled">{t('discount.labels.status.scheduled')}</option>
              <option value="active">{t('discount.labels.status.active')}</option>
              <option value="disabled">{t('discount.labels.status.disabled')}</option>
              <option value="expired">{t('discount.labels.status.expired')}</option>
            </Select>
          </label>

          <label className="flex flex-col gap-xs text-base font-medium text-text-secondary">
            {t('discount.discounts.form.audienceType')}
            <Select
              value={form.audienceType}
              onChange={(event) => setForm((current) => ({ ...current, audienceType: event.target.value as DiscountFormState['audienceType'] }))}
            >
              <option value="PUBLIC">{t('discount.discounts.form.audienceTypes.PUBLIC')}</option>
              <option value="MEMBER_ONLY">{t('discount.discounts.form.audienceTypes.MEMBER_ONLY')}</option>
              <option value="MOBILE_ONLY">{t('discount.discounts.form.audienceTypes.MOBILE_ONLY')}</option>
            </Select>
          </label>
        </div>

        <div className="mt-md flex flex-wrap items-center justify-between gap-md">
          <p className="min-h-md text-base font-medium text-text-secondary">
            {saveMessage}
          </p>
          <Button type="submit" variant="primary" size="medium" disabled={isSaving}>
            <Save className="h-icon-md w-icon-md" />
            {isSaving ? t('discount.discounts.form.saving') : t(formMode === 'edit' ? 'discount.discounts.form.update' : 'discount.discounts.form.create')}
          </Button>
        </div>
      </form>

      {/* Search and View Toggle */}
      <div className="mb-lg flex gap-md">
        <Input
          type="text"
          placeholder={t('discount.discounts.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />

        {/* View Toggle */}
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {isLoading ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border-dashed-strong)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {t('discount.discounts.loading')}
          </h3>
        </div>
      ) : errorMessage ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border-dashed-strong)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {errorMessage}
          </h3>
        </div>
      ) : discounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border-dashed-strong)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {searchQuery ? t('discount.discounts.emptySearch') : t('discount.discounts.empty')}
          </h3>
          {!searchQuery && (
            <>
              <p className="mb-lg font-light text-text-secondary">
                {t('discount.discounts.emptyHelp')}
              </p>
              <Button type="button" variant="primary" size="medium" onClick={handleNew}>
                <Plus className="h-icon-md w-icon-md" />
                {t('discount.discounts.create')}
              </Button>
            </>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
          {discounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <DiscountTable discounts={discounts} onEdit={handleEdit} />
      )}
    </div>
  )
}
