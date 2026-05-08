'use client'

import { Building2, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useProperties } from '@/hooks/useProperties'
import { AccommodationCard } from './components/AccommodationCard'
import { AccommodationTable } from './components/AccommodationTable'
import { Input, ViewToggle } from '@creami/ui'

type ViewMode = 'grid' | 'table'

export default function AccommodationsPage() {
  const { data, isLoading, error } = useProperties()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // API 응답이 배열이 아닐 경우 대비 (예: { data: [...] } 형태)
  const accommodations = Array.isArray(data) ? data : (data?.data || [])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            숙소 관리
          </h1>
        </div>

        <Link href="/properties/new">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm"
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
        <Input
          type="text"
          placeholder="숙소명 또는 주소로 검색..."
          showSearchIcon
        />
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div style={{ color: 'var(--text-secondary)' }}>로딩 중...</div>
        </div>
      ) : error ? (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--error)'
          }}
        >
          <p style={{ color: 'var(--error)' }}>데이터를 불러오는데 실패했습니다.</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{error.message}</p>
        </div>
      ) : accommodations.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Building2 className="w-12 h-12 mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-lg mb-1.5 text-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            등록된 숙소가 없습니다
          </h3>
          <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            첫 번째 숙소를 등록해보세요
          </p>
          <Link href="/properties/new">
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <Plus className="w-4 h-4" />
              숙소 등록하기
            </button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {accommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      ) : (
        <AccommodationTable accommodations={accommodations} />
      )}
    </div>
  )
}
