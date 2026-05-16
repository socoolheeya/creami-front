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
      <label className="block mb-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
        인원 설정
      </label>

      <div className="space-y-md">
        {occupancies.map((room, roomIndex) => (
          <div
            key={roomIndex}
            className="p-md rounded"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: 'var(--border)'
            }}
          >
            <div className="flex items-center justify-between mb-md">
              <span className="text-base" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                방 {room.roomNumber}
              </span>
              {occupancies.length > 1 && (
                <button
                  onClick={() => removeRoom(roomIndex)}
                  className="p-xs rounded"
                  style={{ color: 'var(--text-tertiary)' }}
                  title="방 제거"
                >
                  <X className="w-md h-md" />
                </button>
              )}
            </div>

            {/* Adults */}
            <div className="flex items-center justify-between mb-md">
              <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>성인</span>
              <div className="flex items-center gap-sm">
                <button
                  onClick={() => updateAdults(roomIndex, -1)}
                  disabled={room.adults <= 1}
                  className="h-control-md w-control-md rounded"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: 'var(--border)',
                    color: room.adults <= 1 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    cursor: room.adults <= 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Minus className="w-md h-md" />
                </button>
                <span className="text-base" style={{ width: 'var(--control-height-md)', textAlign: 'center', fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                  {room.adults}
                </span>
                <button
                  onClick={() => updateAdults(roomIndex, 1)}
                  className="h-control-md w-control-md rounded"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Plus className="w-md h-md" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="mb-sm">
              <div className="flex items-center justify-between mb-sm">
                <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>어린이</span>
                <button
                  onClick={() => addChild(roomIndex)}
                  className="h-control-sm px-control-px-sm py-none text-base rounded leading-none"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-on-primary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  + 추가
                </button>
              </div>

              {room.children.map((child, childIndex) => (
                <div key={childIndex} className="flex items-center gap-sm mb-sm">
                  <select
                    value={child.age || 5}
                    onChange={(e) => updateChildAge(roomIndex, childIndex, Number(e.target.value))}
                    className="flex-1 h-control-md px-control-px-md py-none rounded text-base leading-none"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: 'var(--border)',
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
                    className="p-xs rounded"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <X className="w-md h-md" />
                  </button>
                </div>
              ))}

              {room.children.length === 0 && (
                <p className="text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                  어린이 없음
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addRoom}
        className="w-full mt-md h-control-md py-none rounded text-base leading-none"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: 'var(--border-dashed)',
          color: 'var(--text-secondary)',
          fontWeight: 'var(--font-medium)'
        }}
      >
        + 방 추가
      </button>
    </div>
  )
}
