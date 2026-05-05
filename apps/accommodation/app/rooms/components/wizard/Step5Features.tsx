'use client'

import { RoomFormData, ROOM_AMENITY_OPTIONS, ACCESSIBILITY_OPTIONS } from '@/lib/types/room'

interface Step5FeaturesProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step5Features({ formData, onChange }: Step5FeaturesProps) {
  const amenities = formData.amenities || []
  const accessibilityFeatures = formData.accessibilityFeatures || []

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      onChange({ amenities: amenities.filter(a => a !== amenity) })
    } else {
      onChange({ amenities: [...amenities, amenity] })
    }
  }

  const toggleAccessibility = (feature: string) => {
    if (accessibilityFeatures.includes(feature)) {
      onChange({ accessibilityFeatures: accessibilityFeatures.filter(f => f !== feature) })
    } else {
      onChange({ accessibilityFeatures: [...accessibilityFeatures, feature] })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2
          className="text-xl mb-1"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          편의시설
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          객실에 제공되는 편의시설을 선택해주세요
        </p>
      </div>

      {/* 객실 편의시설 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실 편의시설
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {ROOM_AMENITY_OPTIONS.map(amenity => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: amenities.includes(amenity) ? 'var(--primary)' : 'var(--bg-secondary)',
                color: amenities.includes(amenity) ? '#ffffff' : 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span className="text-sm" style={{ fontWeight: 'var(--font-medium)' }}>
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 장애인 편의시설 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          장애인 편의시설
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {ACCESSIBILITY_OPTIONS.map(feature => (
            <label
              key={feature}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: accessibilityFeatures.includes(feature) ? 'var(--primary)' : 'var(--bg-secondary)',
                color: accessibilityFeatures.includes(feature) ? '#ffffff' : 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <input
                type="checkbox"
                checked={accessibilityFeatures.includes(feature)}
                onChange={() => toggleAccessibility(feature)}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span className="text-sm" style={{ fontWeight: 'var(--font-medium)' }}>
                {feature}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}