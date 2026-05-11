'use client'

import { type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import {
  type RoomFormData,
  type RoomType,
  type ViewType
} from '@/lib/types/room'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { Input, Select } from '@creami/ui'

interface Step1BasicProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
  preselectedAccommodationId?: string
  isEditMode?: boolean
}

function SectionTitle() {
  const t = useTranslations('accommodation.rooms')

  return (
    <div>
      <h2 className="mb-xs text-xl font-bold text-text-primary">
        {t('sections.basic')}
      </h2>
      <p className="text-base font-light text-text-secondary">
        {t('descriptions.basic')}
      </p>
    </div>
  )
}

function Field({
  label,
  required = false,
  children
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-xs block text-base font-medium text-text-primary">
        {label}
        {required && <span className="text-error"> *</span>}
      </span>
      {children}
    </label>
  )
}

export function Step1Basic({
  formData,
  onChange,
  preselectedAccommodationId,
  isEditMode = false
}: Step1BasicProps) {
  const t = useTranslations('accommodation.rooms')
  const isAccommodationLocked = !!preselectedAccommodationId

  return (
    <div className="space-y-lg">
      <SectionTitle />

      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        <Field label={t('fields.roomNameKo')} required>
          <Input
            value={formData.name || ''}
            onChange={(event) => onChange({ name: event.target.value })}
            placeholder={t('placeholders.nameKo')}
          />
        </Field>

        <Field label={t('fields.roomNameEn')}>
          <Input
            value={formData.enName || ''}
            onChange={(event) => onChange({ enName: event.target.value })}
            placeholder={t('placeholders.nameEn')}
          />
        </Field>

        <Field label={t('fields.roomType')} required>
          <Select
            value={formData.type || ''}
            onChange={(event) => onChange({ type: event.target.value as RoomType })}
          >
            <option value="">{t('placeholders.select')}</option>
            {(['single', 'double', 'twin', 'suite', 'deluxe', 'family'] as RoomType[]).map((value) => (
              <option key={value} value={value}>
                {t(`types.${value}`)}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t('fields.viewType')} required>
          <Select
            value={formData.viewType || ''}
            onChange={(event) => onChange({ viewType: event.target.value as ViewType })}
          >
            <option value="">{t('placeholders.select')}</option>
            {(['ocean', 'city', 'garden', 'mountain', 'pool', 'none'] as ViewType[]).map((value) => (
              <option key={value} value={value}>
                {t(`views.${value}`)}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t('fields.smoking')} required>
          <div className="flex h-control-md items-center gap-md">
            <label className="flex cursor-pointer items-center gap-sm text-base font-medium text-text-primary">
              <input
                type="radio"
                name="smoking"
                checked={formData.smokingAllowed === false}
                onChange={() => onChange({ smokingAllowed: false })}
                className="h-icon-md w-icon-md accent-primary"
              />
              {t('fields.nonSmoking')}
            </label>
            <label className="flex cursor-pointer items-center gap-sm text-base font-medium text-text-primary">
              <input
                type="radio"
                name="smoking"
                checked={formData.smokingAllowed === true}
                onChange={() => onChange({ smokingAllowed: true })}
                className="h-icon-md w-icon-md accent-primary"
              />
              {t('fields.smokingAllowed')}
            </label>
          </div>
        </Field>

        {!isEditMode && (
          <Field label={t('fields.property')} required>
            <Select
              value={formData.accommodationId || preselectedAccommodationId || ''}
              onChange={(event) => {
                const selectedId = event.target.value
                const selectedAccommodation = mockAccommodations.find((item) => item.id === selectedId)

                onChange({
                  accommodationId: selectedId,
                  accommodationName: selectedAccommodation?.name
                })
              }}
              disabled={isAccommodationLocked}
            >
              <option value="">{t('placeholders.select')}</option>
              {mockAccommodations.map((accommodation) => (
                <option key={accommodation.id} value={accommodation.id}>
                  {accommodation.name}
                </option>
              ))}
            </Select>
            {isAccommodationLocked && (
              <p className="mt-xs text-base font-light text-text-tertiary">
                {t('messages.propertyPreselected')}
              </p>
            )}
          </Field>
        )}
      </div>
    </div>
  )
}
