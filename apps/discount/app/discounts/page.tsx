'use client'

import { Tag, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Input } from '@creami/ui'
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
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Tag className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            할인 관리
          </h1>
        </div>

        <Link href="/discounts/new">
          <Button type="button" variant="primary" size="medium">
            <Plus className="h-icon-md w-icon-md" />
            신규 등록
          </Button>
        </Link>
      </div>

      {/* Search and View Toggle */}
      <div className="mb-lg flex gap-md">
        <Input
          type="text"
          placeholder="할인명 또는 코드로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />

        {/* View Toggle */}
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Discount List */}
      {filteredDiscounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {searchQuery ? '검색 결과가 없습니다' : '등록된 할인이 없습니다'}
          </h3>
          {!searchQuery && (
            <>
              <p className="mb-lg font-light text-text-secondary">
                첫 번째 할인을 등록해보세요
              </p>
              <Link href="/discounts/new">
                <Button type="button" variant="primary" size="medium">
                  <Plus className="h-icon-md w-icon-md" />
                  할인 등록하기
                </Button>
              </Link>
            </>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
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
