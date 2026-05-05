'use client'

import { Tag, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { mockDiscounts } from '@/lib/data/mock-discounts'
import { DiscountCard } from './components/DiscountCard'
import { DiscountTable } from './components/DiscountTable'
import { ViewToggle } from './components/ViewToggle'

type ViewMode = 'grid' | 'table'

export default function DiscountsPage() {
  const discounts = mockDiscounts
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  // 검색 필터링
  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = searchQuery === '' ||
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Tag className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            할인 관리
          </h1>
        </div>

        <Link href="/discounts/new">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Plus className="w-5 h-5" />
            신규 등록
          </button>
        </Link>
      </div>

      {/* Search and View Toggle */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="할인명 또는 코드로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg"
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

      {/* Discount List */}
      {filteredDiscounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Tag className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {searchQuery ? '검색 결과가 없습니다' : '등록된 할인이 없습니다'}
          </h3>
          {!searchQuery && (
            <>
              <p className="mb-6" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                첫 번째 할인을 등록해보세요
              </p>
              <Link href="/discounts/new">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  <Plus className="w-5 h-5" />
                  할인 등록하기
                </button>
              </Link>
            </>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiscounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))}
        </div>
      ) : (
        <DiscountTable discounts={filteredDiscounts} />
      )}
    </div>
  )
}
