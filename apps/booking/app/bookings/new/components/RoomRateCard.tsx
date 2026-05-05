'use client'

import { Check, Users } from 'lucide-react'
import { AvailableRoomRate } from '@/lib/types/search'

interface RoomRateCardProps {
  roomRate: AvailableRoomRate
  isSelected: boolean
  onSelect: () => void
}

export function RoomRateCard({ roomRate, isSelected, onSelect }: RoomRateCardProps) {
  return (
    <div
      onClick={onSelect}
      className="p-4 rounded-lg transition-all cursor-pointer"
      style={{
        backgroundColor: isSelected ? 'var(--primary-bg)' : 'var(--bg-primary)',
        border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
        position: 'relative'
      }}
    >
      {isSelected && (
        <div
          className="absolute top-3 right-3 p-1 rounded-full"
          style={{
            backgroundColor: 'var(--primary)',
            color: '#ffffff'
          }}
        >
          <Check className="w-4 h-4" />
        </div>
      )}

      <div className="mb-3">
        <h3 style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: '4px' }}>
          {roomRate.roomName}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {roomRate.roomType}
        </p>
      </div>

      <div
        className="mb-3 p-2 rounded"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          fontSize: '14px'
        }}
      >
        <p style={{ color: 'var(--primary)', fontWeight: 'var(--font-medium)' }}>
          {roomRate.ratePlanName}
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
          {roomRate.mealPlan}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1" style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>
          <Users className="w-4 h-4" />
          <span>최대 {roomRate.maxOccupancy}명</span>
        </div>

        <div className="text-right">
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {roomRate.nights}박
          </p>
          <p style={{ fontSize: '20px', fontWeight: 'var(--font-bold)', color: 'var(--primary)' }}>
            ₩{roomRate.totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
