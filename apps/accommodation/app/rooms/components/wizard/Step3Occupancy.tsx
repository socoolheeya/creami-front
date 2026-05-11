'use client'

import { type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { type RoomFormData } from '@/lib/types/room'
import { Input } from '@creami/ui'

interface Step3OccupancyProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
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

function NumberField({
  label,
  value,
  onChange,
  required = false,
  min = 0,
  max
}: {
  label: string
  value: number | undefined
  onChange: (value: number) => void
  required?: boolean
  min?: number
  max?: number
}) {
  return (
    <Field label={label} required={required}>
      <Input
        type="number"
        value={value ?? ''}
        onChange={(event) => onChange(Number(event.target.value))}
        min={min}
        max={max}
      />
    </Field>
  )
}

export function Step3Occupancy({ formData, onChange }: Step3OccupancyProps) {
  const t = useTranslations('accommodation.rooms')

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="mb-xs text-xl font-bold text-text-primary">
          {t('sections.occupancy')}
        </h2>
        <p className="text-base font-light text-text-secondary">
          {t('descriptions.occupancy')}
        </p>
      </div>

      <div>
        <p className="mb-sm text-base font-medium text-text-primary">
          {t('fields.standardOccupancy')} <span className="text-error">*</span>
        </p>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <NumberField
            label={t('fields.adult')}
            value={formData.standardOccupancyAdult}
            onChange={(value) => onChange({ standardOccupancyAdult: value })}
            required
          />
          <NumberField
            label={t('fields.child')}
            value={formData.standardOccupancyChild}
            onChange={(value) => onChange({ standardOccupancyChild: value })}
            required
          />
        </div>
      </div>

      <div className="space-y-sm">
        <label className="flex cursor-pointer items-center gap-sm text-base font-medium text-text-primary">
          <input
            type="checkbox"
            checked={formData.useMinOccupancy || false}
            onChange={(event) =>
              onChange({
                useMinOccupancy: event.target.checked,
                minOccupancyAdult: event.target.checked ? formData.minOccupancyAdult : undefined,
                minOccupancyChild: event.target.checked ? formData.minOccupancyChild : undefined
              })
            }
            className="h-icon-md w-icon-md rounded accent-primary"
          />
          {t('fields.useMinOccupancy')}
        </label>

        {formData.useMinOccupancy && (
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <NumberField
              label={t('fields.minAdult')}
              value={formData.minOccupancyAdult}
              onChange={(value) => onChange({ minOccupancyAdult: value })}
            />
            <NumberField
              label={t('fields.minChild')}
              value={formData.minOccupancyChild}
              onChange={(value) => onChange({ minOccupancyChild: value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-sm">
        <p className="text-base font-medium text-text-primary">
          {t('fields.maxOccupancyMode')} <span className="text-error">*</span>
        </p>
        <div className="flex flex-wrap gap-md">
          <label className="flex cursor-pointer items-center gap-sm text-base font-medium text-text-primary">
            <input
              type="radio"
              checked={formData.useMaxOccupancy === true}
              onChange={() => onChange({ useMaxOccupancy: true, totalOccupancy: undefined })}
              className="h-icon-md w-icon-md accent-primary"
            />
            {t('fields.maxAdultChild')}
          </label>
          <label className="flex cursor-pointer items-center gap-sm text-base font-medium text-text-primary">
            <input
              type="radio"
              checked={formData.useMaxOccupancy === false}
              onChange={() =>
                onChange({
                  useMaxOccupancy: false,
                  maxOccupancyAdult: undefined,
                  maxOccupancyChild: undefined
                })
              }
              className="h-icon-md w-icon-md accent-primary"
            />
            {t('fields.totalOccupancyMode')}
          </label>
        </div>

        {formData.useMaxOccupancy === true ? (
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <NumberField
              label={t('fields.maxAdult')}
              value={formData.maxOccupancyAdult}
              onChange={(value) => onChange({ maxOccupancyAdult: value })}
            />
            <NumberField
              label={t('fields.maxChild')}
              value={formData.maxOccupancyChild}
              onChange={(value) => onChange({ maxOccupancyChild: value })}
            />
          </div>
        ) : formData.useMaxOccupancy === false ? (
          <NumberField
            label={t('fields.maxTotalOccupancy')}
            value={formData.totalOccupancy}
            onChange={(value) => onChange({ totalOccupancy: value })}
          />
        ) : null}
      </div>

      <div>
        <p className="mb-sm text-base font-medium text-text-primary">
          {t('fields.childAge')} <span className="text-error">*</span>
        </p>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <NumberField
            label={t('fields.minAge')}
            value={formData.minChildAge}
            onChange={(value) => onChange({ minChildAge: value })}
            max={17}
          />
          <NumberField
            label={t('fields.maxAge')}
            value={formData.maxChildAge}
            onChange={(value) => onChange({ maxChildAge: value })}
            min={formData.minChildAge || 0}
            max={17}
          />
        </div>
      </div>
    </div>
  )
}
