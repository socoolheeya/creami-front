'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import { Receipt, Plus, LayoutGrid, List } from 'lucide-react'
import { RatePlanTableView } from './components/RatePlanTableView'
import { RatePlanCardView } from './components/RatePlanCardView'

type ViewMode = 'grid' | 'table'

export default function RatePlansPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  // Apply search filter
  const filteredRatePlans = useMemo(() => {
    if (!searchQuery.trim()) return mockRatePlans

    const query = searchQuery.toLowerCase()
    return mockRatePlans.filter(rp =>
      rp.name.toLowerCase().includes(query) ||
      rp.enName?.toLowerCase().includes(query) ||
      rp.benefitName.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Receipt className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            요금제 관리
          </h1>
        </div>

        <Link href="/rateplans/new">
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
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="요금제명 또는 혜택명으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />

        {/* View Toggle Switch */}
        <div
          className="relative flex items-center p-1"
          style={{
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            width: '80px',
            height: '40px'
          }}
        >
          {/* Sliding Background */}
          <div
            className="absolute top-1 transition-all duration-200"
            style={{
              left: viewMode === 'grid' ? '4px' : 'calc(50% - 4px)',
              width: 'calc(50% - 4px)',
              height: 'calc(100% - 8px)',
              backgroundColor: 'var(--primary)',
              borderRadius: 'var(--radius-sm)',
              zIndex: 0
            }}
          />

          {/* Grid Button */}
          <button
            onClick={() => setViewMode('grid')}
            className="relative flex-1 flex items-center justify-center transition-colors"
            style={{
              color: viewMode === 'grid' ? '#ffffff' : 'var(--text-secondary)',
              zIndex: 1
            }}
            title="카드 뷰"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Table Button */}
          <button
            onClick={() => setViewMode('table')}
            className="relative flex-1 flex items-center justify-center transition-colors"
            style={{
              color: viewMode === 'table' ? '#ffffff' : 'var(--text-secondary)',
              zIndex: 1
            }}
            title="테이블 뷰"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rate Plans List */}
      {filteredRatePlans.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Receipt className="w-12 h-12 mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-lg mb-1.5 text-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {searchQuery ? '검색 결과가 없습니다' : '등록된 요금제가 없습니다'}
          </h3>
          {!searchQuery && (
            <>
              <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                첫 번째 요금제를 등록해보세요
              </p>
              <Link href="/rateplans/new">
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
                  요금제 등록하기
                </button>
              </Link>
            </>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredRatePlans.map((ratePlan) => (
            <RatePlanCardView key={ratePlan.id} ratePlan={ratePlan} />
          ))}
        </div>
      ) : (
        <RatePlanTableView ratePlans={filteredRatePlans} />
      )}
    </div>
  )
}