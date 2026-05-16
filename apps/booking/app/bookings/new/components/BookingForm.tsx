'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@creami/ui'

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
      className="p-lg rounded"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: 'var(--border)'
      }}
    >
      <h3 className="text-lg mb-md" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        예약자 정보
      </h3>

      <form onSubmit={handleSubmit} className="space-y-md">
        {/* 이름 */}
        <div>
          <label className="block mb-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            이름 *
          </label>
          <input
            type="text"
            value={formData.guestName}
            onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
            placeholder="홍길동"
            required
            className="w-full h-control-md rounded px-control-px-md py-none text-base leading-none"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="block mb-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            이메일 *
          </label>
          <input
            type="email"
            value={formData.guestEmail}
            onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
            placeholder="hong@example.com"
            required
            className="w-full h-control-md rounded px-control-px-md py-none text-base leading-none"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 핸드폰 */}
        <div>
          <label className="block mb-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            핸드폰 *
          </label>
          <input
            type="tel"
            value={formData.guestPhone}
            onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
            placeholder="010-1234-5678"
            required
            className="w-full h-control-md rounded px-control-px-md py-none text-base leading-none"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 특별 요청사항 */}
        <div>
          <label className="block mb-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
            특별 요청사항 (선택)
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="금연 객실 요청 등"
            rows={3}
            className="w-full rounded px-control-px-md py-sm text-base leading-normal"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* 예약하기 버튼 */}
        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          size="large"
        >
          <Check className="w-icon-md h-icon-md" />
          {isLoading ? '예약 중...' : '예약하기'}
        </Button>
      </form>
    </div>
  )
}
