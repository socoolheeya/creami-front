'use client'

import { RoomFormData, BedConfig, BED_TYPE_LABELS, BedType } from '@/lib/types/room'
import { Plus, Trash2 } from 'lucide-react'

interface Step2DetailsProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step2Details({ formData, onChange }: Step2DetailsProps) {
  const bedConfiguration = formData.bedConfiguration || []

  const addBed = () => {
    onChange({
      bedConfiguration: [...bedConfiguration, { type: 'single', count: 1 }]
    })
  }

  const removeBed = (index: number) => {
    onChange({
      bedConfiguration: bedConfiguration.filter((_, i) => i !== index)
    })
  }

  const updateBed = (index: number, field: keyof BedConfig, value: BedType | number) => {
    const updated = [...bedConfiguration]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ bedConfiguration: updated })
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
          객실 정보
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          객실의 상세 정보를 입력해주세요
        </p>
      </div>

      {/* 객실 크기 */}
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <div>
          <label
            className="block mb-1.5 text-sm"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            객실 크기 <span style={{ color: 'var(--error)' }}>*</span>
          </label>
          <input
            type="number"
            value={formData.size || ''}
            onChange={(e) => onChange({ size: Number(e.target.value) })}
            placeholder="30"
            min="0"
            step="0.1"
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label
            className="block mb-1.5 text-sm"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            단위 <span style={{ color: 'var(--error)' }}>*</span>
          </label>
          <select
            value={formData.sizeUnit || 'sqm'}
            onChange={(e) => onChange({ sizeUnit: e.target.value as 'sqm' | 'pyeong' })}
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <option value="sqm">㎡</option>
            <option value="pyeong">평</option>
          </select>
        </div>
      </div>

      {/* 층수 */}
      <div className="max-w-xs">
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          층수 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <input
          type="number"
          value={formData.floor || ''}
          onChange={(e) => onChange({ floor: Number(e.target.value) })}
          placeholder="1"
          min="0"
          className="w-full px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 침대 구성 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          침대 구성 <span style={{ color: 'var(--error)' }}>*</span>
        </label>

        <div className="space-y-2">
          {bedConfiguration.map((bed, index) => (
            <div key={index} className="flex gap-2 max-w-lg">
              <select
                value={bed.type}
                onChange={(e) => updateBed(index, 'type', e.target.value as BedType)}
                className="flex-1 px-3 py-2 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {Object.entries(BED_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={bed.count}
                onChange={(e) => updateBed(index, 'count', Number(e.target.value))}
                min="1"
                className="w-20 px-3 py-2 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <button
                onClick={() => removeBed(index)}
                className="px-2 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--error)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addBed}
          className="flex items-center gap-2 px-3 py-1.5 mt-2 text-sm rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          <Plus className="w-4 h-4" />
          침대 추가
        </button>
      </div>

      {/* 엑스트라 베드 */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.extraBedAvailable || false}
            onChange={(e) => onChange({
              extraBedAvailable: e.target.checked,
              extraBedCount: e.target.checked ? formData.extraBedCount : undefined
            })}
            className="w-4 h-4 rounded"
            style={{ accentColor: 'var(--primary)' }}
          />
          <span
            className="text-sm"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            엑스트라 베드 가능
          </span>
        </label>

        {formData.extraBedAvailable && (
          <div className="mt-2 max-w-xs">
            <label
              className="block mb-1.5 text-sm"
              style={{
                color: 'var(--text-primary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              엑스트라 베드 개수
            </label>
            <input
              type="number"
              value={formData.extraBedCount || ''}
              onChange={(e) => onChange({ extraBedCount: Number(e.target.value) })}
              placeholder="2"
              min="1"
              className="w-full px-3 py-2 text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}