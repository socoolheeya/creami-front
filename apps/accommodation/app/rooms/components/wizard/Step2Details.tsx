'use client'

import { type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import {
  type BedConfig,
  type BedType,
  type RoomFormData
} from '@/lib/types/room'
import { Plus, Trash2 } from 'lucide-react'
import { Button, Input, Select } from '@creami/ui'

interface Step2DetailsProps {
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

export function Step2Details({ formData, onChange }: Step2DetailsProps) {
  const t = useTranslations('accommodation.rooms')
  const bedConfiguration = formData.bedConfiguration || []

  const addBed = () => {
    onChange({
      bedConfiguration: [...bedConfiguration, { type: 'single', count: 1 }]
    })
  }

  const removeBed = (index: number) => {
    onChange({
      bedConfiguration: bedConfiguration.filter((_, itemIndex) => itemIndex !== index)
    })
  }

  const updateBed = (index: number, field: keyof BedConfig, value: BedType | number) => {
    const updated = [...bedConfiguration]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ bedConfiguration: updated })
  }

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="mb-xs text-xl font-bold text-text-primary">
          {t('sections.details')}
        </h2>
        <p className="text-base font-light text-text-secondary">
          {t('descriptions.details')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        <Field label={t('fields.roomSize')} required>
          <Input
            type="number"
            value={formData.size || ''}
            onChange={(event) => onChange({ size: Number(event.target.value) })}
            placeholder="30"
            min="0"
            step="0.1"
          />
        </Field>

        <Field label={t('fields.unit')} required>
          <Select
            value={formData.sizeUnit || 'sqm'}
            onChange={(event) => onChange({ sizeUnit: event.target.value as 'sqm' | 'pyeong' })}
          >
            <option value="sqm">{t('units.sqm')}</option>
            <option value="pyeong">{t('units.pyeong')}</option>
          </Select>
        </Field>

        <Field label={t('fields.floor')} required>
          <Input
            type="number"
            value={formData.floor || ''}
            onChange={(event) => onChange({ floor: Number(event.target.value) })}
            placeholder="1"
            min="0"
          />
        </Field>
      </div>

      <div>
        <div className="mb-sm flex items-center justify-between">
          <span className="text-base font-medium text-text-primary">
            {t('sections.beds')} <span className="text-error">*</span>
          </span>
          <Button type="button" variant="secondary" size="small" onClick={addBed}>
            <Plus className="h-icon-md w-icon-md" />
            {t('actions.addBed')}
          </Button>
        </div>

        <div className="space-y-sm">
          {bedConfiguration.map((bed, index) => (
            <div key={`${bed.type}-${index}`} className="grid grid-cols-[1fr_auto_auto] gap-sm">
              <Select
                value={bed.type}
                onChange={(event) => updateBed(index, 'type', event.target.value as BedType)}
              >
                {(['single', 'double', 'queen', 'king', 'sofa'] as BedType[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`beds.${value}`)}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                value={bed.count}
                onChange={(event) => updateBed(index, 'count', Number(event.target.value))}
                min="1"
                className="w-control-lg"
              />
              <Button
                type="button"
                variant="secondary"
                iconOnly
                onClick={() => removeBed(index)}
                aria-label={t('actions.deleteBed')}
              >
                <Trash2 className="h-icon-md w-icon-md" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-sm">
        <label className="flex cursor-pointer items-center gap-sm text-base font-medium text-text-primary">
          <input
            type="checkbox"
            checked={formData.extraBedAvailable || false}
            onChange={(event) =>
              onChange({
                extraBedAvailable: event.target.checked,
                extraBedCount: event.target.checked ? formData.extraBedCount : undefined
              })
            }
            className="h-icon-md w-icon-md rounded accent-primary"
          />
          {t('fields.extraBedAvailable')}
        </label>

        {formData.extraBedAvailable && (
          <Field label={t('fields.extraBedCount')}>
            <Input
              type="number"
              value={formData.extraBedCount || ''}
              onChange={(event) => onChange({ extraBedCount: Number(event.target.value) })}
              placeholder="2"
              min="1"
            />
          </Field>
        )}
      </div>
    </div>
  )
}
