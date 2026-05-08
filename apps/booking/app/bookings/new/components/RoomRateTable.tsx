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
              borderBottom: '2px solid var(--border-color)'
            }}
          >
            <th
              className="text-left py-3 px-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            >
              객실명 / ID
            </th>
            <th
              className="text-left py-3 px-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            >
              요금제 / ID
            </th>
            <th
              className="text-center py-3 px-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            >
              식사
            </th>
            <th
              className="text-center py-3 px-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            >
              최대인원
            </th>
            <th
              className="text-center py-3 px-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            >
              무료취소
            </th>
            <th
              className="text-right py-3 px-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
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
                  borderBottom: index === roomRates.length - 1 ? 'none' : '1px solid var(--border-color)',
                  borderLeft: isSelected ? '3px solid var(--primary)' : '3px solid transparent',
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
                <td className="py-4 px-4">
                  <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {roomRate.roomName}
                  </div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: '4px' }}>
                    ID: {roomRate.roomId} · {roomRate.roomType}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {roomRate.ratePlanName}
                  </div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: '4px' }}>
                    ID: {roomRate.ratePlanId}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {roomRate.mealPlan}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <Users className="w-4 h-4" />
                    <span>{roomRate.maxOccupancy}명</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  {roomRate.freeCancellation ? (
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="inline-flex items-center gap-1" style={{ color: 'var(--success)' }}>
                        <Check className="w-5 h-5" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 'var(--font-medium)' }}>가능</span>
                      </div>
                      {roomRate.cancellationDeadline && (
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                          ~{roomRate.cancellationDeadline}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1" style={{ color: 'var(--error)' }}>
                      <X className="w-5 h-5" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 'var(--font-medium)' }}>불가</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <div style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', fontSize: '1rem' }}>
                    ₩{formatPrice(roomRate.totalPrice)}
                  </div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: '4px' }}>
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