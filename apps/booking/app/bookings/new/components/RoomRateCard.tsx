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
      className="p-md rounded transition-all cursor-pointer"
      style={{
        backgroundColor: isSelected ? 'var(--primary-bg)' : 'var(--bg-primary)',
        border: isSelected ? 'var(--border-primary)' : 'var(--border)',
        position: 'relative'
      }}
    >
      {isSelected && (
        <div
          className="absolute right-sm top-sm flex h-control-mini w-control-mini items-center justify-center rounded"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--text-on-primary)'
          }}
        >
          <Check className="w-icon-mini h-icon-mini" />
        </div>
      )}

      <div className="mb-sm">
        <h3 className="mb-xs text-base" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          {roomRate.roomName}
        </h3>
        <p className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
          {roomRate.roomType}
        </p>
      </div>

      <div
        className="mb-sm rounded p-sm"
        style={{
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <p className="text-base" style={{ color: 'var(--primary)', fontWeight: 'var(--font-medium)' }}>
          {roomRate.ratePlanName}
        </p>
        <p className="mt-xs text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
          {roomRate.mealPlan}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
          <Users className="w-md h-md" />
          <span>최대 {roomRate.maxOccupancy}명</span>
        </div>

        <div className="text-right">
          <p className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            {roomRate.nights}박
          </p>
          <p className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--primary)' }}>
            ₩{roomRate.totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
