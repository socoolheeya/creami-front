'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

interface BookingFormData {
  guestName: string
  guestEmail: string
  guestPhone: string
  specialRequests?: string
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void
  isLoading: boolean
}

export function BookingForm({ onSubmit, isLoading }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.guestName || !formData.guestEmail || !formData.guestPhone) {
      alert('모든 필수 항목을 입력해주세요')
      return
    }

    onSubmit(formData)
  }

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)'
      }}
    >
      <h3 className="text-lg mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        예약자 정보
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이름 */}
        <div>
          <label className="block mb-2" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            이름 *
          </label>
          <input
            type="text"
            value={formData.guestName}
            onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
            placeholder="홍길동"
            required
            className="w-full px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="block mb-2" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            이메일 *
          </label>
          <input
            type="email"
            value={formData.guestEmail}
            onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
            placeholder="hong@example.com"
            required
            className="w-full px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 핸드폰 */}
        <div>
          <label className="block mb-2" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            핸드폰 *
          </label>
          <input
            type="tel"
            value={formData.guestPhone}
            onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
            placeholder="010-1234-5678"
            required
            className="w-full px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 특별 요청사항 */}
        <div>
          <label className="block mb-2" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            특별 요청사항 (선택)
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="금연 객실 요청 등"
            rows={3}
            className="w-full px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* 예약하기 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors"
          style={{
            backgroundColor: isLoading ? 'var(--text-tertiary)' : 'var(--primary)',
            color: '#ffffff',
            fontWeight: 'var(--font-bold)',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          <Check className="w-5 h-5" />
          {isLoading ? '예약 중...' : '예약하기'}
        </button>
      </form>
    </div>
  )
}