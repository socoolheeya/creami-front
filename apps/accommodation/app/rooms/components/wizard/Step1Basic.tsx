'use client'

import { RoomFormData, ROOM_TYPE_LABELS, RoomType, VIEW_TYPE_LABELS, ViewType } from '@/lib/types/room'
import { mockAccommodations } from '@/lib/data/mock-accommodations'

interface Step1BasicProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
  preselectedAccommodationId?: string
  isEditMode?: boolean
}

export function Step1Basic({ formData, onChange, preselectedAccommodationId, isEditMode = false }: Step1BasicProps) {
  const isAccommodationLocked = !!preselectedAccommodationId

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
          기본 정보
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          객실의 기본 정보를 입력해주세요
        </p>
      </div>

      {/* 객실명 (한글) */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실명 (한글) <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="예: 101호, 디럭스 오션뷰"
          className="w-full max-w-md px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 객실명 (영문) */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실명 (영문)
        </label>
        <input
          type="text"
          value={formData.enName || ''}
          onChange={(e) => onChange({ enName: e.target.value })}
          placeholder="예: Room 101, Deluxe Ocean View"
          className="w-full max-w-md px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 객실 타입 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실 타입 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <select
          value={formData.type || ''}
          onChange={(e) => onChange({ type: e.target.value as RoomType })}
          className="w-full max-w-xs px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <option value="">선택하세요</option>
          {Object.entries(ROOM_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* 뷰 타입 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
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
          className="w-full max-w-xs px-3 py-2 text-sm rounded-lg"
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
          className="block mb-1.5 text-sm"
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
              className="w-4 h-4"
              style={{ accentColor: 'var(--primary)' }}
            />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>금연</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="smoking"
              checked={formData.smokingAllowed === true}
              onChange={() => onChange({ smokingAllowed: true })}
              className="w-4 h-4"
              style={{ accentColor: 'var(--primary)' }}
            />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>흡연 가능</span>
          </label>
        </div>
      </div>

      {/* 소속 숙소 - 수정 모드에서는 숨김 */}
      {!isEditMode && (
        <div>
          <label
            className="block mb-1.5 text-sm"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            소속 숙소 <span style={{ color: 'var(--error)' }}>*</span>
          </label>
          <select
            value={formData.accommodationId || preselectedAccommodationId || ''}
            onChange={(e) => {
              const selectedId = e.target.value
              const selectedAccommodation = mockAccommodations.find(acc => acc.id === selectedId)
              onChange({
                accommodationId: selectedId,
                accommodationName: selectedAccommodation?.name
              })
            }}
            disabled={isAccommodationLocked}
            className="w-full max-w-md px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: isAccommodationLocked ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              cursor: isAccommodationLocked ? 'not-allowed' : 'pointer'
            }}
          >
            <option value="">선택하세요</option>
            {mockAccommodations.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
          {isAccommodationLocked && (
            <p
              className="text-xs mt-1"
              style={{ color: 'var(--text-tertiary)' }}
            >
              숙소가 미리 선택되었습니다
            </p>
          )}
        </div>
      )}
    </div>
  )
}