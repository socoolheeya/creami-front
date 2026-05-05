import { AccommodationFormData, AMENITY_OPTIONS } from '@/lib/types/accommodation'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

interface Step2DescriptionProps {
  data: AccommodationFormData
  onChange: (data: Partial<AccommodationFormData>) => void
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
    <div className="space-y-4">
      <h2 className="text-xl mb-1" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        숙소에 대한 설명을 작성해주세요
      </h2>

      {/* 숙소 설명 */}
      <div>
        <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          숙소 설명
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="숙소의 특징, 위치, 주변 환경 등을 자유롭게 작성해주세요..."
          rows={6}
          maxLength={2000}
          className="w-full px-3 py-2 text-sm rounded-lg resize-none max-w-2xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
        <div className="text-right text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          {(data.description || '').length} / 2000
        </div>
      </div>

      {/* 편의시설 */}
      <div>
        <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          편의시설
        </label>

        {/* 기본 옵션 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
          {AMENITY_OPTIONS.map(amenity => {
            const isSelected = (data.amenities || []).includes(amenity)
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className="px-3 py-2 text-sm rounded-lg text-left transition-all"
                style={{
                  backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-tertiary)',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '2px solid var(--primary)' : '2px solid transparent',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {amenity}
              </button>
            )
          })}
        </div>

        {/* 커스텀 편의시설 추가 */}
        <div className="flex gap-3">
          <input
            type="text"
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()}
            placeholder="직접 추가하기..."
            className="flex-1 px-3 py-2 text-sm rounded-lg max-w-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            className="px-3 py-2 text-sm rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* 선택된 편의시설 (커스텀만 삭제 가능) */}
        {data.amenities && data.amenities.length > 0 && (
          <div className="mt-3">
            <p className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              선택된 편의시설 ({data.amenities.length}개)
            </p>
            <div className="flex flex-wrap gap-3">
              {data.amenities.filter(a => !AMENITY_OPTIONS.includes(a as any)).map(amenity => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg"
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
                    <X className="w-4 h-4" />
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
