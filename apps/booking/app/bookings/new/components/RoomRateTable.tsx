import { AvailableRoomRate } from '@/lib/types/search'
import { Check, X, Users } from 'lucide-react'

interface RoomRateTableProps {
  roomRates: AvailableRoomRate[]
  selectedRoomRate: AvailableRoomRate | null
  onSelect: (roomRate: AvailableRoomRate) => void
}

export function RoomRateTable({ roomRates, selectedRoomRate, onSelect }: RoomRateTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderBottom: 'var(--border)'
            }}
          >
            <th
              className="text-left py-sm px-md text-base"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              객실명 / ID
            </th>
            <th
              className="text-left py-sm px-md text-base"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              요금제 / ID
            </th>
            <th
              className="text-center py-sm px-md text-base"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              식사
            </th>
            <th
              className="text-center py-sm px-md text-base"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              최대인원
            </th>
            <th
              className="text-center py-sm px-md text-base"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              무료취소
            </th>
            <th
              className="text-right py-sm px-md text-base"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              총 금액
            </th>
          </tr>
        </thead>
        <tbody>
          {roomRates.map((roomRate, index) => {
            const isSelected =
              selectedRoomRate?.roomId === roomRate.roomId &&
              selectedRoomRate?.ratePlanId === roomRate.ratePlanId

            return (
              <tr
                key={`${roomRate.roomId}-${roomRate.ratePlanId}`}
                style={{
                  backgroundColor: isSelected ? 'var(--primary-bg)' : 'var(--bg-primary)',
                  borderBottom: index === roomRates.length - 1 ? 'none' : 'var(--border)',
                  borderLeft: isSelected ? 'var(--border-primary)' : 'var(--border-transparent)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => onSelect(roomRate)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
                  }
                }}
              >
                <td className="py-md px-md">
                  <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                    {roomRate.roomName}
                  </div>
                  <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                    ID: {roomRate.roomId} · {roomRate.roomType}
                  </div>
                </td>
                <td className="py-md px-md">
                  <div className="text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {roomRate.ratePlanName}
                  </div>
                  <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                    ID: {roomRate.ratePlanId}
                  </div>
                </td>
                <td className="py-md px-md text-center">
                  <div className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                    {roomRate.mealPlan}
                  </div>
                </td>
                <td className="py-md px-md text-center">
                  <div className="inline-flex items-center gap-xs text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                    <Users className="w-md h-md" />
                    <span>{roomRate.maxOccupancy}명</span>
                  </div>
                </td>
                <td className="py-md px-md text-center">
                  {roomRate.freeCancellation ? (
                    <div className="inline-flex flex-col items-center gap-xs">
                      <div className="inline-flex items-center gap-xs text-base" style={{ color: 'var(--success)', fontWeight: 'var(--font-medium)' }}>
                        <Check className="w-icon-md h-icon-md" />
                        <span>가능</span>
                      </div>
                      {roomRate.cancellationDeadline && (
                        <div className="text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                          ~{roomRate.cancellationDeadline}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-xs text-base" style={{ color: 'var(--error)', fontWeight: 'var(--font-medium)' }}>
                      <X className="w-icon-md h-icon-md" />
                      <span>불가</span>
                    </div>
                  )}
                </td>
                <td className="py-md px-md text-right">
                  <div className="text-base" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                    ₩{formatPrice(roomRate.totalPrice)}
                  </div>
                  <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                    (1박 ₩{formatPrice(roomRate.basePrice)})
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
