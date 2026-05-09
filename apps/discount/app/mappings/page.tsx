'use client'

import { Link2, Save, ChevronRight, ChevronLeft, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Button, Card } from '@creami/ui'
import { mockRatePlans, mockDiscountRatePlanMappings } from '@/lib/data/mock-rateplans'
import { mockDiscounts } from '@/lib/data/mock-discounts'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { DiscountRatePlanMapping } from '@/lib/types/rateplan'
import { AccommodationSelector } from './components/AccommodationSelector'
import { RatePlanSelector } from './components/RatePlanSelector'
import { DiscountList } from './components/DiscountList'

const AVAILABLE_DISCOUNT_PAGE_SIZE = 50

const normalizeDiscountSearchTerm = (value: string) => value.trim().toLowerCase()

export default function MappingsPage() {
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null)
  const [selectedRatePlanIds, setSelectedRatePlanIds] = useState<string[]>([])
  const [mappings, setMappings] = useState<DiscountRatePlanMapping[]>(mockDiscountRatePlanMappings)
  const [availableDiscountQuery, setAvailableDiscountQuery] = useState('')
  const [availableDiscountLimit, setAvailableDiscountLimit] = useState(AVAILABLE_DISCOUNT_PAGE_SIZE)
  const [selectorOpen, setSelectorOpen] = useState(true)

  // 선택된 숙소의 요금제만 필터링
  const filteredRatePlans = useMemo(() => {
    if (!selectedAccommodationId) return []
    return mockRatePlans.filter(rp => rp.accommodationId === selectedAccommodationId)
  }, [selectedAccommodationId])

  const selectedAccommodation = useMemo(() => {
    if (!selectedAccommodationId) return null
    return mockAccommodations.find(accommodation => accommodation.id === selectedAccommodationId) ?? null
  }, [selectedAccommodationId])

  const selectedRatePlans = useMemo(() => {
    return filteredRatePlans.filter(ratePlan => selectedRatePlanIds.includes(ratePlan.id))
  }, [filteredRatePlans, selectedRatePlanIds])

  const isMappingReady = selectedAccommodationId !== null && selectedRatePlanIds.length > 0

  // 숙소 변경 시 요금제 선택 초기화
  const handleAccommodationChange = (accommodationId: string | null) => {
    setSelectedAccommodationId(accommodationId)
    setSelectedRatePlanIds([])
    setAvailableDiscountQuery('')
    setAvailableDiscountLimit(AVAILABLE_DISCOUNT_PAGE_SIZE)
    setSelectorOpen(true)
  }

  const handleRatePlanSelectionChange = (ratePlanIds: string[]) => {
    setSelectedRatePlanIds(ratePlanIds)
  }

  const handleApplySelection = () => {
    if (selectedAccommodationId && selectedRatePlanIds.length > 0) {
      setSelectorOpen(false)
    }
  }

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

  const eligibleDiscounts = useMemo(() => {
    const now = new Date()
    return mockDiscounts.filter(discount =>
      discount.status === 'active' &&
      discount.startDate <= now &&
      discount.endDate >= now
    )
  }, [])

  const normalizedAvailableDiscountQuery = normalizeDiscountSearchTerm(availableDiscountQuery)

  // 매핑 전 할인 목록 (매핑되지 않은 활성/유효 할인)
  const unmappedDiscounts = useMemo(() => eligibleDiscounts.filter(discount => {
    const matchesMapping = !mappedDiscountIds.has(discount.id)
    if (!normalizedAvailableDiscountQuery) return matchesMapping

    const discountType = discount.discountType ?? ''

    return matchesMapping && (
      normalizeDiscountSearchTerm(discount.id).includes(normalizedAvailableDiscountQuery) ||
      normalizeDiscountSearchTerm(discount.code).includes(normalizedAvailableDiscountQuery) ||
      normalizeDiscountSearchTerm(discountType).includes(normalizedAvailableDiscountQuery)
    )
  }), [eligibleDiscounts, mappedDiscountIds, normalizedAvailableDiscountQuery])

  const visibleUnmappedDiscounts = useMemo(() => {
    return unmappedDiscounts.slice(0, availableDiscountLimit)
  }, [unmappedDiscounts, availableDiscountLimit])

  // 매핑 후 할인 목록 (매핑된 활성/유효 할인)
  const mappedDiscounts = useMemo(() => {
    return eligibleDiscounts.filter(d => mappedDiscountIds.has(d.id))
  }, [eligibleDiscounts, mappedDiscountIds])

  const handleAvailableDiscountQueryChange = (value: string) => {
    setAvailableDiscountQuery(value)
    setAvailableDiscountLimit(AVAILABLE_DISCOUNT_PAGE_SIZE)
  }

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
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Link2 className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            할인-요금제 매핑
          </h1>
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={!selectedAccommodationId || selectedRatePlanIds.length === 0}
          variant="primary"
          size="medium"
        >
          <Save className="h-icon-md w-icon-md" />
          저장
        </Button>
      </div>

      {/* Accommodation and Rate Plan Selectors */}
      {isMappingReady && !selectorOpen ? (
        <Card className="mb-md p-md" hover={false}>
          <div className="flex flex-wrap items-center justify-between gap-md">
            <div className="min-w-0 flex-1">
              <p className="text-base font-light text-text-secondary">
                선택된 숙소와 요금제
              </p>
              <div className="mt-xs flex flex-wrap items-center gap-sm">
                {selectedAccommodation && (
                  <span className="rounded bg-bg-tertiary px-sm py-xs text-base font-bold text-text-primary">
                    {selectedAccommodation.id} · {selectedAccommodation.name}
                  </span>
                )}
                {selectedRatePlans.map(ratePlan => (
                  <span
                    key={ratePlan.id}
                    className="rounded bg-primary px-sm py-xs text-base font-bold text-text-on-primary"
                  >
                    {ratePlan.id} · {ratePlan.name}
                  </span>
                ))}
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => setSelectorOpen(true)}
            >
              수정
            </Button>
          </div>
        </Card>
      ) : (
        <div className={`grid grid-cols-1 gap-lg lg:grid-cols-2 ${isMappingReady ? 'mb-md' : 'mb-lg'}`}>
          <div>
            <AccommodationSelector
              accommodations={mockAccommodations}
              selectedId={selectedAccommodationId}
              onSelect={handleAccommodationChange}
              compact={selectedAccommodationId !== null}
            />
          </div>
          <div>
            <RatePlanSelector
              key={selectedAccommodationId ?? 'no-accommodation'}
              ratePlans={filteredRatePlans}
              selectedIds={selectedRatePlanIds}
              onSelectionChange={handleRatePlanSelectionChange}
              compact={isMappingReady}
              disabled={!selectedAccommodationId}
              onApply={handleApplySelection}
            />
          </div>
        </div>
      )}

      {/* Mapping Area */}
      {!selectedAccommodationId ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Link2 className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            숙소를 먼저 선택해주세요
          </h3>
          <p className="font-light text-text-secondary">
            위에서 숙소를 선택하면 해당 숙소의 요금제를 볼 수 있습니다
          </p>
        </div>
      ) : selectedRatePlanIds.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Link2 className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            요금제를 선택해주세요
          </h3>
          <p className="font-light text-text-secondary">
            위에서 매핑할 요금제를 선택하면 할인을 매핑할 수 있습니다
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
          {/* Left Panel - Unmapped Discounts */}
          <div>
            <div className="mb-md flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  매핑 전 할인
                </h2>
                <p className="text-base font-light text-text-secondary">
                  활성 상태이고 현재 기간에 사용 가능한 할인만 표시됩니다
                </p>
              </div>
              <span className="text-base px-sm py-xs rounded bg-bg-tertiary text-text-secondary">
                {unmappedDiscounts.length}개
              </span>
            </div>
            <div className="relative mb-md">
              <Search className="absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={availableDiscountQuery}
                onChange={(event) => handleAvailableDiscountQueryChange(event.target.value)}
                placeholder="할인 ID, 할인코드, 할인타입으로 검색..."
                className="h-control-md w-full rounded pr-control-px-md text-base"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  paddingLeft: 'var(--control-search-padding)'
                }}
              />
            </div>
            <DiscountList
              discounts={visibleUnmappedDiscounts}
              onDiscountClick={handleMapDiscount}
              emptyMessage={availableDiscountQuery ? '검색된 할인이 없습니다' : '모든 할인이 매핑되었습니다'}
              actionIcon={<ChevronRight className="h-md w-md" />}
              layout="catalog"
              totalCount={unmappedDiscounts.length}
              onShowMore={() => setAvailableDiscountLimit(current => current + AVAILABLE_DISCOUNT_PAGE_SIZE)}
              showMoreLabel={`${AVAILABLE_DISCOUNT_PAGE_SIZE}개 더 보기`}
            />
          </div>

          {/* Right Panel - Mapped Discounts */}
          <div>
            <div className="mb-md flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  매핑 후
                </h2>
                <p className="text-base font-light text-text-secondary">
                  {selectedAccommodation?.name}
                </p>
              </div>
              <span className="text-base px-sm py-xs rounded bg-primary text-text-on-primary">
                {mappedDiscounts.length}개
              </span>
            </div>
            <DiscountList
              discounts={mappedDiscounts}
              onDiscountClick={handleUnmapDiscount}
              emptyMessage="매핑된 할인이 없습니다"
              actionIcon={<ChevronLeft className="h-md w-md" />}
              layout="compact"
            />
          </div>
        </div>
      )}
    </div>
  )
}
