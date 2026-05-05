'use client'

import { RoomFormData, ROOM_TYPE_LABELS, RoomType } from '@/lib/types/room'
import { mockAccommodations } from '@/lib/data/mock-accommodations'

interface Step1BasicProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
  preselectedAccommodationId?: string
}

export function Step1Basic({ formData, onChange, preselectedAccommodationId }: Step1BasicProps) {
  const isAccommodationLocked = !!preselectedAccommodationId

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
          기본 정보
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          객실의 기본 정보를 입력해주세요
        </p>
      </div>

      {/* 객실명 */}
      <div>
        <label
          className="block mb-2"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실명 <span style={{ color: 'var(--error)' }}>*</span>
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="예: 101호, 디럭스 오션뷰"
          className="w-full px-4 py-3 rounded-lg"
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
          className="block mb-2"
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
          className="w-full px-4 py-3 rounded-lg"
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

      {/* 소속 숙소 */}
      <div>
        <label
          className="block mb-2"
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
          className="w-full px-4 py-3 rounded-lg"
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
            className="text-sm mt-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            숙소가 미리 선택되었습니다
          </p>
        )}
      </div>
    </div>
  )
}