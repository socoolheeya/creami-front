'use client'

import { Minus, Plus, X } from 'lucide-react'
import { RoomOccupancy, OccupancyGuest } from '@/lib/types/search'

interface OccupancyInputProps {
  occupancies: RoomOccupancy[]
  onChange: (occupancies: RoomOccupancy[]) => void
}

export function OccupancyInput({ occupancies, onChange }: OccupancyInputProps) {
  const addRoom = () => {
    const newRoom: RoomOccupancy = {
      roomNumber: occupancies.length + 1,
      adults: 2,
      children: []
    }
    onChange([...occupancies, newRoom])
  }

  const removeRoom = (index: number) => {
    const updated = occupancies.filter((_, i) => i !== index)
    // 방 번호 재정렬
    const reordered = updated.map((room, i) => ({ ...room, roomNumber: i + 1 }))
    onChange(reordered)
  }

  const updateAdults = (index: number, delta: number) => {
    const updated = [...occupancies]
    const newCount = Math.max(1, updated[index].adults + delta)
    updated[index] = { ...updated[index], adults: newCount }
    onChange(updated)
  }

  const addChild = (index: number) => {
    const updated = [...occupancies]
    const newChild: OccupancyGuest = { type: 'child', age: 5 }
    updated[index] = {
      ...updated[index],
      children: [...updated[index].children, newChild]
    }
    onChange(updated)
  }

  const removeChild = (roomIndex: number, childIndex: number) => {
    const updated = [...occupancies]
    updated[roomIndex] = {
      ...updated[roomIndex],
      children: updated[roomIndex].children.filter((_, i) => i !== childIndex)
    }
    onChange(updated)
  }

  const updateChildAge = (roomIndex: number, childIndex: number, age: number) => {
    const updated = [...occupancies]
    const children = [...updated[roomIndex].children]
    children[childIndex] = { ...children[childIndex], age }
    updated[roomIndex] = { ...updated[roomIndex], children }
    onChange(updated)
  }

  return (
    <div>
      <label className="block mb-2" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
        인원 설정
      </label>

      <div className="space-y-3">
        {occupancies.map((room, roomIndex) => (
          <div
            key={roomIndex}
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                방 {room.roomNumber}
              </span>
              {occupancies.length > 1 && (
                <button
                  onClick={() => removeRoom(roomIndex)}
                  className="p-1"
                  style={{ color: 'var(--text-tertiary)' }}
                  title="방 제거"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Adults */}
            <div className="flex items-center justify-between mb-3">
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>성인</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateAdults(roomIndex, -1)}
                  disabled={room.adults <= 1}
                  className="p-1 rounded"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: room.adults <= 1 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    cursor: room.adults <= 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span style={{ width: '30px', textAlign: 'center', fontWeight: 'var(--font-medium)' }}>
                  {room.adults}
                </span>
                <button
                  onClick={() => updateAdults(roomIndex, 1)}
                  className="p-1 rounded"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>어린이</span>
                <button
                  onClick={() => addChild(roomIndex)}
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    fontSize: '12px'
                  }}
                >
                  + 추가
                </button>
              </div>

              {room.children.map((child, childIndex) => (
                <div key={childIndex} className="flex items-center gap-2 mb-2">
                  <select
                    value={child.age || 5}
                    onChange={(e) => updateChildAge(roomIndex, childIndex, Number(e.target.value))}
                    className="flex-1 px-2 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {Array.from({ length: 14 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}세
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeChild(roomIndex, childIndex)}
                    className="p-1"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {room.children.length === 0 && (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>
                  어린이 없음
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addRoom}
        className="w-full mt-3 py-2 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px dashed var(--border-color)',
          color: 'var(--text-secondary)',
          fontSize: '14px'
        }}
      >
        + 방 추가
      </button>
    </div>
  )
}