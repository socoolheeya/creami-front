'use client'

import { RoomFormData } from '@/lib/types/room'

interface Step3OccupancyProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step3Occupancy({ formData, onChange }: Step3OccupancyProps) {
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
          인원 정보
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          객실의 인원 정보를 입력해주세요
        </p>
      </div>

      {/* 기준 인원 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          기준 인원 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <div>
            <input
              type="number"
              value={formData.standardOccupancyAdult ?? ''}
              onChange={(e) => onChange({ standardOccupancyAdult: Number(e.target.value) })}
              placeholder="성인"
              min="0"
              className="w-full px-3 py-2 text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>성인</p>
          </div>
          <div>
            <input
              type="number"
              value={formData.standardOccupancyChild ?? ''}
              onChange={(e) => onChange({ standardOccupancyChild: Number(e.target.value) })}
              placeholder="어린이"
              min="0"
              className="w-full px-3 py-2 text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>어린이</p>
          </div>
        </div>
      </div>

      {/* 최소 인원 (선택적) */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer mb-2">
          <input
            type="checkbox"
            checked={formData.useMinOccupancy || false}
            onChange={(e) => onChange({
              useMinOccupancy: e.target.checked,
              minOccupancyAdult: e.target.checked ? formData.minOccupancyAdult : undefined,
              minOccupancyChild: e.target.checked ? formData.minOccupancyChild : undefined
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
            최소 인원 설정
          </span>
        </label>

        {formData.useMinOccupancy && (
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <div>
              <input
                type="number"
                value={formData.minOccupancyAdult ?? ''}
                onChange={(e) => onChange({ minOccupancyAdult: Number(e.target.value) })}
                placeholder="성인"
                min="0"
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최소 성인</p>
            </div>
            <div>
              <input
                type="number"
                value={formData.minOccupancyChild ?? ''}
                onChange={(e) => onChange({ minOccupancyChild: Number(e.target.value) })}
                placeholder="어린이"
                min="0"
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최소 어린이</p>
            </div>
          </div>
        )}
      </div>

      {/* 최대인원 방식 선택 */}
      <div>
        <label
          className="block mb-2 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          최대 인원 설정 방식 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={formData.useMaxOccupancy === true}
              onChange={() => onChange({ useMaxOccupancy: true, totalOccupancy: undefined })}
              style={{ accentColor: 'var(--primary)' }}
            />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>성인/어린이 구분</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={formData.useMaxOccupancy === false}
              onChange={() => onChange({ useMaxOccupancy: false, maxOccupancyAdult: undefined, maxOccupancyChild: undefined })}
              style={{ accentColor: 'var(--primary)' }}
            />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>전체 인원</span>
          </label>
        </div>

        {formData.useMaxOccupancy === true ? (
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <div>
              <input
                type="number"
                value={formData.maxOccupancyAdult ?? ''}
                onChange={(e) => onChange({ maxOccupancyAdult: Number(e.target.value) })}
                placeholder="최대 성인"
                min="0"
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최대 성인</p>
            </div>
            <div>
              <input
                type="number"
                value={formData.maxOccupancyChild ?? ''}
                onChange={(e) => onChange({ maxOccupancyChild: Number(e.target.value) })}
                placeholder="최대 어린이"
                min="0"
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최대 어린이</p>
            </div>
          </div>
        ) : formData.useMaxOccupancy === false ? (
          <div className="max-w-xs">
            <input
              type="number"
              value={formData.totalOccupancy ?? ''}
              onChange={(e) => onChange({ totalOccupancy: Number(e.target.value) })}
              placeholder="최대 전체 인원"
              min="0"
              className="w-full px-3 py-2 text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최대 전체 인원 (성인+어린이)</p>
          </div>
        ) : null}
      </div>

      {/* 투숙가능 어린이 나이 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          투숙가능 어린이 나이 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <div>
            <input
              type="number"
              value={formData.minChildAge ?? ''}
              onChange={(e) => onChange({ minChildAge: Number(e.target.value) })}
              placeholder="최소 나이"
              min="0"
              max="17"
              className="w-full px-3 py-2 text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최소 나이</p>
          </div>
          <div>
            <input
              type="number"
              value={formData.maxChildAge ?? ''}
              onChange={(e) => onChange({ maxChildAge: Number(e.target.value) })}
              placeholder="최대 나이"
              min={formData.minChildAge || 0}
              max="17"
              className="w-full px-3 py-2 text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>최대 나이</p>
          </div>
        </div>
      </div>
    </div>
  )
}