'use client'

import { Link2, Save, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useMemo } from 'react'
import { mockRatePlans, mockDiscountRatePlanMappings } from '@/lib/data/mock-rateplans'
import { mockDiscounts } from '@/lib/data/mock-discounts'
import { DiscountRatePlanMapping } from '@/lib/types/rateplan'
import { RatePlanSelector } from './components/RatePlanSelector'
import { DiscountList } from './components/DiscountList'

export default function MappingsPage() {
  const [selectedRatePlanIds, setSelectedRatePlanIds] = useState<string[]>([])
  const [mappings, setMappings] = useState<DiscountRatePlanMapping[]>(mockDiscountRatePlanMappings)

  // 현재 선택된 요금제들의 매핑된 할인 ID 집합
  const mappedDiscountIds = useMemo(() => {
    if (selectedRatePlanIds.length === 0) return new Set<string>()

    // 선택된 모든 요금제의 매핑된 할인 ID들을 합침
    const allMappedIds = selectedRatePlanIds.flatMap(rpId => {
      const mapping = mappings.find(m => m.ratePlanId === rpId)
      return mapping?.discountIds || []
    })

    return new Set(allMappedIds)
  }, [selectedRatePlanIds, mappings])

  // 매핑 전 할인 목록 (매핑되지 않은 것들)
  const unmappedDiscounts = mockDiscounts.filter(d => !mappedDiscountIds.has(d.id))

  // 매핑 후 할인 목록 (매핑된 것들)
  const mappedDiscounts = mockDiscounts.filter(d => mappedDiscountIds.has(d.id))

  // 할인을 매핑 후로 이동
  const handleMapDiscount = (discountId: string) => {
    if (selectedRatePlanIds.length === 0) {
      alert('요금제를 먼저 선택해주세요')
      return
    }

    setMappings(prev => {
      return prev.map(mapping => {
        if (selectedRatePlanIds.includes(mapping.ratePlanId)) {
          // 이미 매핑되어 있지 않으면 추가
          if (!mapping.discountIds.includes(discountId)) {
            return {
              ...mapping,
              discountIds: [...mapping.discountIds, discountId]
            }
          }
        }
        return mapping
      })
    })
  }

  // 할인을 매핑 전으로 이동
  const handleUnmapDiscount = (discountId: string) => {
    if (selectedRatePlanIds.length === 0) {
      alert('요금제를 먼저 선택해주세요')
      return
    }

    setMappings(prev => {
      return prev.map(mapping => {
        if (selectedRatePlanIds.includes(mapping.ratePlanId)) {
          return {
            ...mapping,
            discountIds: mapping.discountIds.filter(id => id !== discountId)
          }
        }
        return mapping
      })
    })
  }

  const handleSave = () => {
    // TODO: API 호출하여 저장
    console.log('Saving mappings:', mappings)
    alert('매핑이 저장되었습니다!')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link2 className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            할인-요금제 매핑
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={selectedRatePlanIds.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: selectedRatePlanIds.length === 0 ? 'var(--bg-tertiary)' : 'var(--primary)',
            color: selectedRatePlanIds.length === 0 ? 'var(--text-tertiary)' : '#ffffff',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'var(--font-medium)',
            cursor: selectedRatePlanIds.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <Save className="w-5 h-5" />
          저장
        </button>
      </div>

      {/* Rate Plan Selector */}
      <div className="mb-6">
        <RatePlanSelector
          ratePlans={mockRatePlans}
          selectedIds={selectedRatePlanIds}
          onSelectionChange={setSelectedRatePlanIds}
        />
      </div>

      {/* Mapping Area */}
      {selectedRatePlanIds.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Link2 className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            요금제를 선택해주세요
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            위에서 매핑할 요금제를 선택하면 할인을 매핑할 수 있습니다
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Unmapped Discounts */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                매핑 전
              </h2>
              <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                {unmappedDiscounts.length}개
              </span>
            </div>
            <DiscountList
              discounts={unmappedDiscounts}
              onDiscountClick={handleMapDiscount}
              emptyMessage="모든 할인이 매핑되었습니다"
              actionIcon={<ChevronRight className="w-4 h-4" />}
            />
          </div>

          {/* Right Panel - Mapped Discounts */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                매핑 후
              </h2>
              <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}>
                {mappedDiscounts.length}개
              </span>
            </div>
            <DiscountList
              discounts={mappedDiscounts}
              onDiscountClick={handleUnmapDiscount}
              emptyMessage="매핑된 할인이 없습니다"
              actionIcon={<ChevronLeft className="w-4 h-4" />}
            />
          </div>
        </div>
      )}
    </div>
  )
}
