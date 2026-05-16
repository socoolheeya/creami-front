import { PropertyFormData, AMENITY_OPTIONS } from '../../../../lib/types/property'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

const predefinedAmenities: readonly string[] = AMENITY_OPTIONS

interface Step2DescriptionProps {
  data: PropertyFormData
  onChange: (data: Partial<PropertyFormData>) => void
}

export function Step2Description({ data, onChange }: Step2DescriptionProps) {
  const [customAmenity, setCustomAmenity] = useState('')

  const toggleAmenity = (amenity: string) => {
    const current = data.amenities || []
    if (current.includes(amenity)) {
      onChange({ amenities: current.filter(a => a !== amenity) })
    } else {
      onChange({ amenities: [...current, amenity] })
    }
  }

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !(data.amenities || []).includes(customAmenity.trim())) {
      onChange({ amenities: [...(data.amenities || []), customAmenity.trim()] })
      setCustomAmenity('')
    }
  }

  const removeAmenity = (amenity: string) => {
    onChange({ amenities: (data.amenities || []).filter(a => a !== amenity) })
  }

  return (
    <div className="space-y-lg">
      <h2 className="text-xl mb-xs" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        숙소에 대한 설명을 작성해주세요
      </h2>

      {/* 한글 숙소 설명 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          숙소 설명 (한글) <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="숙소의 특징, 위치, 주변 환경 등을 자유롭게 작성해주세요..."
          rows={6}
          maxLength={2000}
          className="w-full px-md py-sm text-base rounded resize-none"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
        <div className="text-right text-xs mt-xs" style={{ color: 'var(--text-tertiary)' }}>
          {(data.description || '').length} / 2000
        </div>
      </div>

      {/* 영문 숙소 설명 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          숙소 설명 (영문) <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <textarea
          value={data.enDescription || ''}
          onChange={(e) => onChange({ enDescription: e.target.value })}
          placeholder="Please describe your property in English..."
          rows={6}
          maxLength={2000}
          className="w-full px-md py-sm text-base rounded resize-none"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
        <div className="text-right text-xs mt-xs" style={{ color: 'var(--text-tertiary)' }}>
          {(data.enDescription || '').length} / 2000
        </div>
      </div>

      {/* 편의시설 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          편의시설
        </label>

        {/* 기본 옵션 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md mb-md">
          {AMENITY_OPTIONS.map(amenity => {
            const isSelected = (data.amenities || []).includes(amenity)
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className="px-md py-sm text-base rounded text-left transition-all"
                style={{
                  backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-tertiary)',
                  color: isSelected ? 'var(--text-on-primary)' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? 'var(--border-primary-strong)' : 'var(--border-transparent-strong)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {amenity}
              </button>
            )
          })}
        </div>

        {/* 커스텀 편의시설 추가 */}
        <div className="flex gap-md">
          <input
            type="text"
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()}
            placeholder="직접 추가하기..."
            className="flex-1 px-md py-sm text-base rounded max-w-modal-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            className="px-md py-sm text-base rounded transition-colors"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <Plus className="w-md h-md" />
          </button>
        </div>

        {/* 선택된 편의시설 (커스텀만 삭제 가능) */}
        {data.amenities && data.amenities.length > 0 && (
          <div className="mt-md">
            <p className="text-xs mb-xs" style={{ color: 'var(--text-secondary)' }}>
              선택된 편의시설 ({data.amenities.length}개)
            </p>
            <div className="flex flex-wrap gap-md">
              {data.amenities.filter(a => !predefinedAmenities.includes(a)).map(amenity => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-sm px-md py-xs rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    className="hover:opacity-70"
                  >
                    <X className="w-md h-md" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
