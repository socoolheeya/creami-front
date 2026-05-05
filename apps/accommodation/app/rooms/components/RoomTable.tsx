'use client'

import { ArrowUpDown, Bed } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Room, ROOM_TYPE_LABELS, ROOM_STATUS_LABELS, RoomType, RoomStatus } from '@/lib/types/room'

interface RoomTableProps {
  rooms: Room[]
}

type SortField = 'name' | 'type' | 'size' | 'status' | null
type SortOrder = 'asc' | 'desc'

export function RoomTable({ rooms }: RoomTableProps) {
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [typeFilter, setTypeFilter] = useState<RoomType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'all'>('all')
  const [idSearch, setIdSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [accommodationSearch, setAccommodationSearch] = useState('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...rooms]

    // 검색 필터 적용
    if (idSearch) {
      result = result.filter(room =>
        room.id.toLowerCase().includes(idSearch.toLowerCase())
      )
    }
    if (nameSearch) {
      result = result.filter(room =>
        room.name.toLowerCase().includes(nameSearch.toLowerCase())
      )
    }
    if (accommodationSearch) {
      result = result.filter(room =>
        room.accommodationName?.toLowerCase().includes(accommodationSearch.toLowerCase())
      )
    }

    // 드롭다운 필터 적용
    if (typeFilter !== 'all') {
      result = result.filter(room => room.type === typeFilter)
    }
    if (statusFilter !== 'all') {
      result = result.filter(room => room.status === statusFilter)
    }

    // 정렬 적용
    if (sortField) {
      result.sort((a, b) => {
        let compareValue = 0
        if (sortField === 'name') {
          compareValue = a.name.localeCompare(b.name)
        } else if (sortField === 'type') {
          compareValue = a.type.localeCompare(b.type)
        } else if (sortField === 'size') {
          compareValue = a.size - b.size
        } else if (sortField === 'status') {
          compareValue = a.status.localeCompare(b.status)
        }
        return sortOrder === 'asc' ? compareValue : -compareValue
      })
    }

    return result
  }, [rooms, sortField, sortOrder, typeFilter, statusFilter, idSearch, nameSearch, accommodationSearch])

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="px-3 py-2 text-left">
      <button
        onClick={() => handleSort(field)}
        className="flex items-center gap-2 text-sm transition-colors"
        style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}
      >
        {children}
        <ArrowUpDown
          className="w-4 h-4"
          style={{
            opacity: sortField === field ? 1 : 0.3,
            color: sortField === field ? 'var(--primary)' : 'currentColor'
          }}
        />
      </button>
    </th>
  )

  return (
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
            <th className="px-2 py-2 text-left text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', width: '80px' }}>
              ID
            </th>
            <SortableHeader field="name">객실명</SortableHeader>
            <th className="px-3 py-2 text-left text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              숙소명
            </th>
            <SortableHeader field="type">타입</SortableHeader>
            <SortableHeader field="size">크기</SortableHeader>
            <th className="px-3 py-2 text-left text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              수용인원
            </th>
            <th className="px-3 py-2 text-left text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              침대
            </th>
            <SortableHeader field="status">상태</SortableHeader>
          </tr>
          {/* Filter Row */}
          <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
            {/* ID 검색 */}
            <th className="px-2 py-2">
              <input
                type="text"
                placeholder="ID"
                value={idSearch}
                onChange={(e) => setIdSearch(e.target.value)}
                className="w-full px-2 py-1 text-xs"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  width: '70px'
                }}
              />
            </th>
            {/* 객실명 검색 */}
            <th className="px-3 py-2">
              <input
                type="text"
                placeholder="검색..."
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="w-full px-2 py-1 text-xs"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 숙소명 검색 */}
            <th className="px-3 py-2">
              <input
                type="text"
                placeholder="검색..."
                value={accommodationSearch}
                onChange={(e) => setAccommodationSearch(e.target.value)}
                className="w-full px-2 py-1 text-xs"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 타입 필터 */}
            <th className="px-3 py-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as RoomType | 'all')}
                className="w-full px-2 py-1 text-xs"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">전체</option>
                {Object.entries(ROOM_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </th>
            {/* 크기 - 필터 없음 */}
            <th className="px-3 py-2"></th>
            {/* 수용인원 - 필터 없음 */}
            <th className="px-3 py-2"></th>
            {/* 침대 - 필터 없음 */}
            <th className="px-3 py-2"></th>
            {/* 상태 필터 */}
            <th className="px-3 py-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RoomStatus | 'all')}
                className="w-full px-2 py-1 text-xs"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">전체</option>
                {Object.entries(ROOM_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((room) => (
            <tr
              key={room.id}
              className="transition-colors cursor-pointer"
              style={{ borderBottom: '1px solid var(--border-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {/* ID */}
              <td className="px-2 py-2">
                <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                  {room.id}
                </span>
              </td>

              {/* 객실명 */}
              <td className="px-3 py-2">
                <Link href={`/rooms/${room.id}`}>
                  <div className="flex flex-col cursor-pointer">
                    <span
                      className="text-sm hover:underline"
                      style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                    >
                      {room.name}
                    </span>
                    <span className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {room.images.length}장 사진 • {room.amenities.length}개 편의시설
                    </span>
                  </div>
                </Link>
              </td>

              {/* 숙소명 */}
              <td className="px-3 py-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {room.accommodationName}
                </span>
              </td>

              {/* 타입 */}
              <td className="px-3 py-2">
                <span
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {ROOM_TYPE_LABELS[room.type]}
                </span>
              </td>

              {/* 크기 */}
              <td className="px-3 py-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {room.size}{room.sizeUnit === 'sqm' ? '㎡' : '평'}
                </span>
              </td>

              {/* 수용인원 */}
              <td className="px-3 py-2">
                <div className="flex flex-col text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span>기준: {room.standardOccupancy}명</span>
                  <span>최대: {room.maxOccupancy}명</span>
                </div>
              </td>

              {/* 침대 */}
              <td className="px-3 py-2">
                <div className="flex flex-col gap-1">
                  {room.bedConfiguration.map((bed, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <Bed className="w-3 h-3" />
                      <span>{bed.count}개</span>
                    </div>
                  ))}
                </div>
              </td>

              {/* 상태 */}
              <td className="px-3 py-2">
                <span
                  className="px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: room.status === 'available' ? '#d1fae5' : room.status === 'maintenance' ? '#fef3c7' : '#fee2e2',
                    color: room.status === 'available' ? '#065f46' : room.status === 'maintenance' ? '#92400e' : '#991b1b',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {ROOM_STATUS_LABELS[room.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
