'use client'

import { Link2, Save, ChevronRight, ChevronLeft, Search } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Button, Card, notification } from '@creami/ui'
import {
  fetchAccommodations,
  fetchDiscountRatePlanMappings,
  fetchDiscounts,
  fetchRatePlans,
  saveDiscountRatePlanMappings,
} from '@/lib/api/discount'
import { Accommodation } from '@/lib/types/accommodation'
import { Discount } from '@/lib/types/discount'
import { DiscountRatePlanMapping } from '@/lib/types/rateplan'
import { RatePlan } from '@/lib/types/rateplan'
import { AccommodationSelector } from './components/AccommodationSelector'
import { RatePlanSelector } from './components/RatePlanSelector'
import { DiscountList } from './components/DiscountList'

const AVAILABLE_DISCOUNT_PAGE_SIZE = 50

const normalizeDiscountSearchTerm = (value: string) => value.trim().toLowerCase()

export default function MappingsPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null)
  const [selectedRatePlanIds, setSelectedRatePlanIds] = useState<string[]>([])
  const [mappings, setMappings] = useState<DiscountRatePlanMapping[]>([])
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [ratePlans, setRatePlans] = useState<RatePlan[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRatePlanLoading, setIsRatePlanLoading] = useState(false)
  const [isMappingLoading, setIsMappingLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accommodationQuery, setAccommodationQuery] = useState('')
  const [ratePlanQuery, setRatePlanQuery] = useState('')
  const [availableDiscountQuery, setAvailableDiscountQuery] = useState('')
  const [availableDiscountLimit, setAvailableDiscountLimit] = useState(AVAILABLE_DISCOUNT_PAGE_SIZE)
  const [selectorOpen, setSelectorOpen] = useState(true)

  const selectedAccommodation = useMemo(() => {
    if (!selectedAccommodationId) return null
    return accommodations.find(accommodation => accommodation.id === selectedAccommodationId) ?? null
  }, [accommodations, selectedAccommodationId])

  const selectedRatePlans = useMemo(() => {
    return ratePlans.filter(ratePlan => selectedRatePlanIds.includes(ratePlan.id))
  }, [ratePlans, selectedRatePlanIds])

  const isMappingReady = selectedAccommodationId !== null && selectedRatePlanIds.length > 0

  useEffect(() => {
    let ignore = false

    const loadInitialData = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [accommodationResponse, discountResponse] = await Promise.all([
          fetchAccommodations({ search: accommodationQuery }),
          fetchDiscounts({ activeOnly: true }),
        ])

        if (!ignore) {
          setAccommodations(accommodationResponse)
          setDiscounts(discountResponse)
        }
      } catch {
        if (!ignore) {
          setErrorMessage(t('discount.mappings.loadError'))
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    const timeoutId = window.setTimeout(loadInitialData, 250)

    return () => {
      ignore = true
      window.clearTimeout(timeoutId)
    }
  }, [accommodationQuery, t])

  useEffect(() => {
    let ignore = false

    const loadRatePlans = async () => {
      if (!selectedAccommodationId) {
        setRatePlans([])
        return
      }

      setIsRatePlanLoading(true)
      setErrorMessage('')

      try {
        const response = await fetchRatePlans(selectedAccommodationId, selectedAccommodation, { search: ratePlanQuery })
        if (!ignore) {
          setRatePlans(response)
        }
      } catch {
        if (!ignore) {
          setRatePlans([])
          setErrorMessage(t('discount.mappings.ratePlanLoadError'))
        }
      } finally {
        if (!ignore) {
          setIsRatePlanLoading(false)
        }
      }
    }

    const timeoutId = window.setTimeout(loadRatePlans, 250)

    return () => {
      ignore = true
      window.clearTimeout(timeoutId)
    }
  }, [ratePlanQuery, selectedAccommodation, selectedAccommodationId, t])

  useEffect(() => {
    let ignore = false

    const searchDiscounts = async () => {
      if (selectedRatePlanIds.length === 0) {
        return
      }

      try {
        const response = await fetchDiscounts({
          activeOnly: true,
          search: availableDiscountQuery,
        })
        if (!ignore) {
          setDiscounts(response)
        }
      } catch {
        if (!ignore) {
          setErrorMessage(t('discount.mappings.discountLoadError'))
        }
      }
    }

    const timeoutId = window.setTimeout(searchDiscounts, 250)

    return () => {
      ignore = true
      window.clearTimeout(timeoutId)
    }
  }, [availableDiscountQuery, selectedRatePlanIds.length, t])

  useEffect(() => {
    let ignore = false

    const loadMappings = async () => {
      if (selectedRatePlanIds.length === 0) {
        return
      }

      setIsMappingLoading(true)
      setErrorMessage('')

      try {
        const response = await fetchDiscountRatePlanMappings(selectedRatePlanIds)
        if (!ignore) {
          setMappings(prev => {
            const selectedSet = new Set(selectedRatePlanIds)
            const retainedMappings = prev.filter(mapping => !selectedSet.has(mapping.ratePlanId))
            const responseRatePlanIds = new Set(response.map(mapping => mapping.ratePlanId))
            const emptyMappings = selectedRatePlanIds
              .filter(ratePlanId => !responseRatePlanIds.has(ratePlanId))
              .map(ratePlanId => ({ ratePlanId, discountIds: [] }))

            return [...retainedMappings, ...response, ...emptyMappings]
          })
        }
      } catch {
        if (!ignore) {
          setErrorMessage(t('discount.mappings.mappingLoadError'))
        }
      } finally {
        if (!ignore) {
          setIsMappingLoading(false)
        }
      }
    }

    loadMappings()

    return () => {
      ignore = true
    }
  }, [selectedRatePlanIds, t])

  const handleAccommodationChange = (accommodationId: string | null) => {
    setSelectedAccommodationId(accommodationId)
    setSelectedRatePlanIds([])
    setMappings([])
    setRatePlanQuery('')
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

  const eligibleDiscounts = discounts

  const normalizedAvailableDiscountQuery = normalizeDiscountSearchTerm(availableDiscountQuery)

  // 매핑 전 할인 목록 (매핑되지 않은 활성/유효 할인)
  const unmappedDiscounts = useMemo(() => eligibleDiscounts.filter(discount => {
    const matchesMapping = !mappedDiscountIds.has(discount.id)
    if (!normalizedAvailableDiscountQuery) return matchesMapping
    return matchesMapping
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
      alert(t('discount.mappings.selectRatePlanAlert'))
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
      alert(t('discount.mappings.selectRatePlanAlert'))
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

  const handleSave = async () => {
    if (selectedRatePlanIds.length === 0) return

    setIsSaving(true)

    try {
      const selectedSet = new Set(selectedRatePlanIds)
      const payload = mappings.filter(mapping => selectedSet.has(mapping.ratePlanId))
      const response = await saveDiscountRatePlanMappings(payload)

      setMappings(prev => {
        const retainedMappings = prev.filter(mapping => !selectedSet.has(mapping.ratePlanId))
        return [...retainedMappings, ...response]
      })

      notification.success({
        message: t('discount.mappings.saveSuccess'),
        placement: 'top-right',
        direction: 'right'
      })
    } catch {
      notification.error({
        message: t('discount.mappings.saveError'),
        placement: 'top-right',
        direction: 'right'
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Link2 className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            {t('discount.mappings.title')}
          </h1>
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={!selectedAccommodationId || selectedRatePlanIds.length === 0 || isSaving || isMappingLoading}
          variant="primary"
          size="medium"
        >
          <Save className="h-icon-md w-icon-md" />
          {t('discount.common.save')}
        </Button>
      </div>

      {/* Accommodation and Rate Plan Selectors */}
      {isMappingReady && !selectorOpen ? (
        <Card className="mb-md p-md" hover={false}>
          <div className="flex flex-wrap items-center justify-between gap-md">
            <div className="min-w-0 flex-1">
              <p className="text-base font-light text-text-secondary">
                {t('discount.mappings.selectedContext')}
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
              {t('discount.common.edit')}
            </Button>
          </div>
        </Card>
      ) : (
        <div className={`grid grid-cols-1 gap-lg lg:grid-cols-2 ${isMappingReady ? 'mb-md' : 'mb-lg'}`}>
          <div>
            <AccommodationSelector
              accommodations={accommodations}
              selectedId={selectedAccommodationId}
              onSelect={handleAccommodationChange}
              onSearch={setAccommodationQuery}
              compact={selectedAccommodationId !== null}
              loading={isLoading}
            />
          </div>
          <div>
            <RatePlanSelector
              key={selectedAccommodationId ?? 'no-accommodation'}
              ratePlans={ratePlans}
              selectedIds={selectedRatePlanIds}
              onSelectionChange={handleRatePlanSelectionChange}
              onSearch={setRatePlanQuery}
              compact={isMappingReady}
              disabled={!selectedAccommodationId || isRatePlanLoading}
              loading={isRatePlanLoading}
              onApply={handleApplySelection}
            />
          </div>
        </div>
      )}

      {(isLoading || errorMessage) && (
        <div
          className="mb-md rounded px-md py-sm text-base font-medium"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: errorMessage ? 'var(--danger)' : 'var(--text-secondary)',
          }}
        >
          {errorMessage || t('discount.mappings.loading')}
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
            {t('discount.mappings.selectAccommodationFirst')}
          </h3>
          <p className="font-light text-text-secondary">
            {t('discount.mappings.selectAccommodationHelp')}
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
            {t('discount.mappings.selectRatePlanFirst')}
          </h3>
          <p className="font-light text-text-secondary">
            {t('discount.mappings.selectRatePlanHelp')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
          {/* Left Panel - Unmapped Discounts */}
          <div>
            <div className="mb-md flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {t('discount.mappings.beforeTitle')}
                </h2>
                <p className="text-base font-light text-text-secondary">
                  {t('discount.mappings.beforeDescription')}
                </p>
              </div>
              <span className="text-base px-sm py-xs rounded bg-bg-tertiary text-text-secondary">
                {t('discount.common.count', { count: unmappedDiscounts.length })}
              </span>
            </div>
            <div className="relative mb-md">
              <Search className="absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={availableDiscountQuery}
                onChange={(event) => handleAvailableDiscountQueryChange(event.target.value)}
                placeholder={t('discount.mappings.availableSearchPlaceholder')}
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
              emptyMessage={availableDiscountQuery ? t('discount.mappings.emptyAvailableSearch') : t('discount.mappings.emptyAvailable')}
              actionIcon={<ChevronRight className="h-md w-md" />}
              layout="catalog"
              totalCount={unmappedDiscounts.length}
              onShowMore={() => setAvailableDiscountLimit(current => current + AVAILABLE_DISCOUNT_PAGE_SIZE)}
              showMoreLabel={t('discount.common.showMore', {
                count: AVAILABLE_DISCOUNT_PAGE_SIZE.toLocaleString(locale)
              })}
            />
          </div>

          {/* Right Panel - Mapped Discounts */}
          <div>
            <div className="mb-md flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {t('discount.mappings.afterTitle')}
                </h2>
                <p className="text-base font-light text-text-secondary">
                  {selectedAccommodation?.name}
                </p>
              </div>
              <span className="text-base px-sm py-xs rounded bg-primary text-text-on-primary">
                {t('discount.common.count', { count: mappedDiscounts.length })}
              </span>
            </div>
            <DiscountList
              discounts={mappedDiscounts}
              onDiscountClick={handleUnmapDiscount}
              emptyMessage={t('discount.mappings.emptyMapped')}
              actionIcon={<ChevronLeft className="h-md w-md" />}
              layout="compact"
            />
          </div>
        </div>
      )}
    </div>
  )
}
