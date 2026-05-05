'use client'

import { Calendar, User, Building2, Clock } from 'lucide-react'

export default function BookingsPage() {
  const bookings = [
    {
      id: 'BK001',
      guestName: '김철수',
      accommodation: 'Grand Hotel Seoul',
      checkIn: '2026-05-10',
      checkOut: '2026-05-12',
      status: 'confirmed' as const,
      totalAmount: '₩240,000'
    },
    {
      id: 'BK002',
      guestName: '이영희',
      accommodation: 'Sunset Resort Busan',
      checkIn: '2026-05-15',
      checkOut: '2026-05-17',
      status: 'pending' as const,
      totalAmount: '₩320,000'
    },
    {
      id: 'BK003',
      guestName: 'John Smith',
      accommodation: 'Jeju Paradise Hotel',
      checkIn: '2026-05-20',
      checkOut: '2026-05-25',
      status: 'confirmed' as const,
      totalAmount: '₩850,000'
    }
  ]

  const statusConfig = {
    confirmed: { label: '확정', color: '#10b981', bgColor: '#d1fae5' },
    pending: { label: '대기', color: '#f59e0b', bgColor: '#fef3c7' },
    cancelled: { label: '취소', color: '#ef4444', bgColor: '#fee2e2' }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            예약 목록
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            전체 예약 내역을 확인하고 관리하세요
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'var(--font-medium)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)'
          }}
        >
          새 예약 추가
        </button>
      </div>

      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow)'
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
              <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
                예약 번호
              </th>
              <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
                고객명
              </th>
              <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
                숙소
              </th>
              <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
                체크인/아웃
              </th>
              <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
                상태
              </th>
              <th className="px-6 py-4 text-right" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
                금액
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const status = statusConfig[booking.status]
              return (
                <tr
                  key={booking.id}
                  className="transition-colors cursor-pointer"
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {booking.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>
                        {booking.guestName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>
                        {booking.accommodation}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {booking.checkIn} ~ {booking.checkOut}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: status.bgColor,
                        color: status.color,
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                      {booking.totalAmount}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
