'use client'

import { useTranslations } from 'next-intl'
import { type RoomFormData } from '@/lib/types/room'

interface Step4DescriptionProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

function DescriptionField({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label className="block">
      <span className="mb-xs block text-base font-medium text-text-primary">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded border border-border bg-bg-primary px-control-px-md py-sm text-base font-medium text-text-primary"
      />
    </label>
  )
}

export function Step4Description({ formData, onChange }: Step4DescriptionProps) {
  const t = useTranslations('accommodation.rooms')

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="mb-xs text-xl font-bold text-text-primary">
          {t('sections.description')}
        </h2>
        <p className="text-base font-light text-text-secondary">
          {t('descriptions.description')}
        </p>
      </div>

      <DescriptionField
        label={t('fields.descriptionKo')}
        value={formData.description || ''}
        onChange={(value) => onChange({ description: value })}
        placeholder={t('placeholders.descriptionKo')}
      />

      <DescriptionField
        label={t('fields.descriptionEn')}
        value={formData.enDescription || ''}
        onChange={(value) => onChange({ enDescription: value })}
        placeholder="Describe the room's features, atmosphere, and services in detail"
      />
    </div>
  )
}
