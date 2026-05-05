'use client'

import { DoorOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { mockRooms } from '@/lib/data/mock-rooms'
import { RoomCard } from './components/RoomCard'
import { RoomTable } from './components/RoomTable'
import { ViewToggle } from './components/ViewToggle'

type ViewMode = 'grid' | 'table'

export default function RoomsPage() {
  const rooms = mockRooms
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  // 검색 필터링
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchQuery === '' ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.accommodationName?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <DoorOpen className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            객실 관리
          </h1>
        </div>

        <Link href="/rooms/new">
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Plus className="w-4 h-4" />
            신규 등록
          </button>
        </Link>
      </div>

      {/* Search and View Toggle */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="객실명 또는 숙소명으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />

        {/* View Toggle */}
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Room List */}
      {filteredRooms.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <DoorOpen className="w-16 h-16 mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-lg mb-1.5" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {searchQuery ? '검색 결과가 없습니다' : '등록된 객실이 없습니다'}
          </h3>
          {!searchQuery && (
            <>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                첫 번째 객실을 등록해보세요
              </p>
              <Link href="/rooms/new">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  <Plus className="w-4 h-4" />
                  객실 등록하기
                </button>
              </Link>
            </>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <RoomTable rooms={filteredRooms} />
      )}
    </div>
  )
}
