'use client'

import { Calendar, User, Building2, Clock } from 'lucide-react'
import Link from 'next/link'
import { mockBookings } from '@/lib/data/mock-bookings'

export default function BookingsPage() {
  const bookings = mockBookings

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
                숙소 / 객실 / 요금제
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
                  className="transition-colors"
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="flex items-center gap-2 transition-colors"
                      style={{ color: 'var(--primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none'
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span style={{ fontWeight: 'var(--font-medium)' }}>
                        {booking.bookingNumber}
                      </span>
                    </Link>
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
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 mt-0.5" style={{ color: 'var(--text-tertiary)' }} />
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                          {booking.accommodation}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                          {booking.roomType} • {booking.ratePlan}
                        </div>
                      </div>
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
                      ₩{booking.pricing.totalAmount.toLocaleString()}
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
