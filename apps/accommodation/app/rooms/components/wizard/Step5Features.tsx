'use client'

import { useTranslations } from 'next-intl'
import {
  ACCESSIBILITY_OPTIONS,
  ROOM_AMENITY_OPTIONS,
  type RoomFormData
} from '@/lib/types/room'

interface Step5FeaturesProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

function ToggleOption({
  label,
  checked,
  onChange
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  const stateClass = checked
    ? 'border-primary bg-primary text-white'
    : 'border-border bg-bg-secondary text-text-primary'

  return (
    <label className={`flex cursor-pointer items-center gap-sm rounded border p-sm ${stateClass}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-icon-md w-icon-md rounded accent-primary"
      />
      <span className="text-base font-medium">
        {label}
      </span>
    </label>
  )
}

export function Step5Features({ formData, onChange }: Step5FeaturesProps) {
  const t = useTranslations('accommodation.rooms')
  const amenities = formData.amenities || []
  const accessibilityFeatures = formData.accessibilityFeatures || []

  const toggleAmenity = (amenity: string) => {
    onChange({
      amenities: amenities.includes(amenity)
        ? amenities.filter((item) => item !== amenity)
        : [...amenities, amenity]
    })
  }

  const toggleAccessibility = (feature: string) => {
    onChange({
      accessibilityFeatures: accessibilityFeatures.includes(feature)
        ? accessibilityFeatures.filter((item) => item !== feature)
        : [...accessibilityFeatures, feature]
    })
  }

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="mb-xs text-xl font-bold text-text-primary">
          {t('sections.features')}
        </h2>
        <p className="text-base font-light text-text-secondary">
          {t('descriptions.features')}
        </p>
      </div>

      <div>
        <p className="mb-sm text-base font-medium text-text-primary">
          {t('sections.roomAmenities')}
        </p>
        <div className="grid grid-cols-1 gap-sm md:grid-cols-2 lg:grid-cols-3">
          {ROOM_AMENITY_OPTIONS.map((amenity) => (
            <ToggleOption
              key={amenity}
              label={amenity}
              checked={amenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-sm text-base font-medium text-text-primary">
          {t('sections.accessibility')}
        </p>
        <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
          {ACCESSIBILITY_OPTIONS.map((feature) => (
            <ToggleOption
              key={feature}
              label={feature}
              checked={accessibilityFeatures.includes(feature)}
              onChange={() => toggleAccessibility(feature)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
