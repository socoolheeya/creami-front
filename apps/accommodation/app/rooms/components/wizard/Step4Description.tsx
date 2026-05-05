'use client'

import { RoomFormData } from '@/lib/types/room'

interface Step4DescriptionProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step4Description({ formData, onChange }: Step4DescriptionProps) {
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
          객실 설명
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          객실에 대한 상세 설명을 입력해주세요
        </p>
      </div>

      {/* 객실 설명 (한글) */}
      <div className="max-w-2xl">
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실 설명 (한글)
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="객실의 특징, 분위기, 제공되는 서비스 등을 자세히 설명해주세요"
          rows={5}
          className="w-full px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)',
            resize: 'vertical'
          }}
        />
      </div>

      {/* 객실 설명 (영문) */}
      <div className="max-w-2xl">
        <label
          className="block mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          객실 설명 (영문)
        </label>
        <textarea
          value={formData.enDescription || ''}
          onChange={(e) => onChange({ enDescription: e.target.value })}
          placeholder="Describe the room's features, atmosphere, and services in detail"
          rows={5}
          className="w-full px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)',
            resize: 'vertical'
          }}
        />
      </div>
    </div>
  )
}