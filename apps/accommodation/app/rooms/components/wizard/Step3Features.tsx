'use client'

import { RoomFormData, VIEW_TYPE_LABELS, ViewType, ROOM_AMENITY_OPTIONS, ACCESSIBILITY_OPTIONS } from '@/lib/types/room'

interface Step3FeaturesProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step3Features({ formData, onChange }: Step3FeaturesProps) {
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
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl mb-2"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          특징 및 편의시설
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          객실의 특징과 제공되는 편의시설을 선택해주세요
        </p>
      </div>

      {/* 뷰 타입 */}
      <div>
        <label
          className="block mb-2"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          뷰 타입 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <select
          value={formData.viewType || ''}
          onChange={(e) => onChange({ viewType: e.target.value as ViewType })}
          className="w-full px-4 py-3 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <option value="">선택하세요</option>
          {Object.entries(VIEW_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* 흡연 가능 */}
      <div>
        <label
          className="block mb-3"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          흡연 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="smoking"
              checked={formData.smokingAllowed === false}
              onChange={() => onChange({ smokingAllowed: false })}
              className="w-5 h-5"
              style={{ accentColor: 'var(--primary)' }}
            />
            <span style={{ color: 'var(--text-primary)' }}>금연</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="smoking"
              checked={formData.smokingAllowed === true}
              onChange={() => onChange({ smokingAllowed: true })}
              className="w-5 h-5"
              style={{ accentColor: 'var(--primary)' }}
            />
            <span style={{ color: 'var(--text-primary)' }}>흡연 가능</span>
          </label>
        </div>
      </div>

      {/* 객실 편의시설 */}
      <div>
        <label
          className="block mb-3"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실 편의시설
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ROOM_AMENITY_OPTIONS.map(amenity => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer p-3 rounded-lg transition-colors"
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
                className="w-5 h-5 rounded"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span style={{ fontWeight: 'var(--font-medium)' }}>
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 장애인 편의시설 */}
      <div>
        <label
          className="block mb-3"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          장애인 편의시설
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACCESSIBILITY_OPTIONS.map(feature => (
            <label
              key={feature}
              className="flex items-center gap-2 cursor-pointer p-3 rounded-lg transition-colors"
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
                className="w-5 h-5 rounded"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span style={{ fontWeight: 'var(--font-medium)' }}>
                {feature}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}