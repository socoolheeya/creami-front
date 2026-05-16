'use client'

import { Accommodation } from '@/lib/types/accommodation'
import { Building2, Search } from 'lucide-react'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { Button } from '@creami/ui'
import { useTranslations } from 'next-intl'

interface AccommodationSelectorProps {
  accommodations: Accommodation[]
  selectedId: string | null
  onSelect: (accommodationId: string | null) => void
  onSearch: (query: string) => void
  compact?: boolean
  loading?: boolean
}

export function AccommodationSelector({
  accommodations,
  selectedId,
  onSelect,
  onSearch,
  compact = false,
  loading = false,
}: AccommodationSelectorProps) {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeResultIndex, setActiveResultIndex] = useState(0)

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const showSearchResults = normalizedSearchQuery.length > 0 && !selectedId

  const filteredAccommodations = accommodations.filter(acc => {
    const label = `${acc.id} ${acc.name}`.toLowerCase()

    return (
      acc.id.toLowerCase().includes(normalizedSearchQuery) ||
      acc.name.toLowerCase().includes(normalizedSearchQuery) ||
      label.includes(normalizedSearchQuery)
    )
  })

  const selectedAccommodation = accommodations.find(acc => acc.id === selectedId)
  const activeResultId = showSearchResults && filteredAccommodations[activeResultIndex]
    ? `accommodation-option-${filteredAccommodations[activeResultIndex].id}`
    : undefined

  useEffect(() => {
    if (!activeResultId) return

    document.getElementById(activeResultId)?.scrollIntoView({ block: 'nearest' })
  }, [activeResultId])

  const selectAccommodation = (accommodation: Accommodation) => {
    setSearchQuery(`${accommodation.id} ${accommodation.name}`)
    setActiveResultIndex(0)
    onSelect(accommodation.id)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchQuery(value)
    setActiveResultIndex(0)
    onSearch(value)

    if (selectedId) {
      onSelect(null)
    }
  }

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchResults) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveResultIndex((currentIndex) => {
        if (filteredAccommodations.length === 0) return 0

        return (currentIndex + 1) % filteredAccommodations.length
      })
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveResultIndex((currentIndex) => {
        if (filteredAccommodations.length === 0) return 0

        return (currentIndex - 1 + filteredAccommodations.length) % filteredAccommodations.length
      })
      return
    }

    if (event.key !== 'Enter') return

    event.preventDefault()
    selectActiveAccommodation()
  }

  const selectActiveAccommodation = () => {
    const activeAccommodation = filteredAccommodations[activeResultIndex] ?? filteredAccommodations[0]
    if (activeAccommodation) {
      selectAccommodation(activeAccommodation)
    }
  }

  const handleClearSelection = () => {
    setSearchQuery('')
    onSelect(null)
  }

  return (
    <div className={`relative overflow-visible rounded border border-border bg-bg-primary shadow ${compact ? 'p-md' : 'p-lg'}`}>
      <div className={`flex items-center justify-between ${compact ? 'mb-sm' : 'mb-md'}`}>
        <h2 className="text-xl flex items-center gap-sm font-bold text-text-primary">
          <Building2 className="h-icon-md w-icon-md text-primary" />
          {t('discount.mappings.accommodation.title')}
        </h2>
        {selectedId && (
          <Button
            type="button"
            onClick={handleClearSelection}
            variant="secondary"
            size="small"
          >
            {t('discount.mappings.accommodation.clear')}
          </Button>
        )}
      </div>

      {/* Search */}
      <div className={`${compact ? 'mb-sm max-w-modal-md' : 'mb-md'} flex gap-sm`}>
        <div className="relative flex-1">
          <Search className="absolute left-md top-1/2 -translate-y-1/2 h-md w-md" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder={t('discount.mappings.accommodation.placeholder')}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            aria-busy={loading}
            aria-activedescendant={activeResultId}
            aria-autocomplete="list"
            aria-controls="accommodation-search-results"
            aria-expanded={showSearchResults}
            role="combobox"
            className="h-control-md w-full rounded pr-control-px-md text-base"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              paddingLeft: 'var(--control-search-padding)'
            }}
          />

          {showSearchResults && (
            <div
              className="absolute left-0 right-0 z-40 mt-xs overflow-hidden rounded border border-border bg-bg-primary shadow-lg"
              style={{ maxHeight: 'var(--results-list-height)' }}
            >
              {loading ? (
                <div className="px-md py-sm text-center text-base font-light text-text-secondary">
                  {t('discount.mappings.searching')}
                </div>
              ) : filteredAccommodations.length > 0 ? (
                <div
                  id="accommodation-search-results"
                  role="listbox"
                  className="overflow-y-auto"
                  style={{ maxHeight: 'var(--results-list-height)' }}
                >
                  {filteredAccommodations.map((accommodation, index) => {
                    const isActive = index === activeResultIndex

                    return (
                      <button
                        id={`accommodation-option-${accommodation.id}`}
                        key={accommodation.id}
                        type="button"
                        onClick={() => {
                          selectAccommodation(accommodation)
                        }}
                        onMouseEnter={() => setActiveResultIndex(index)}
                        className={`flex w-full flex-col gap-xs border-b border-border px-md py-sm text-left transition-colors last:border-b-0 hover:bg-bg-secondary ${isActive ? 'bg-bg-secondary' : ''}`}
                        role="option"
                        aria-selected={isActive}
                      >
                        <span className="truncate text-base font-bold text-text-primary">
                          {accommodation.id} · {accommodation.name}
                        </span>
                        <span className="truncate text-base font-light text-text-tertiary">
                          {accommodation.type}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="px-md py-sm text-center text-base font-light text-text-secondary">
                  {t('discount.common.noSearchResults')}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Accommodation Display */}
      {selectedAccommodation && (
        <div
          className={`${compact ? 'mb-none' : 'mb-md'} inline-flex max-w-full flex-wrap items-center gap-md rounded px-md py-sm`}
          style={{
            backgroundColor: 'var(--primary)'
          }}
        >
          <span className="text-base font-light text-text-on-primary-muted">
            {selectedAccommodation.id}
          </span>
          <span className="text-base font-bold text-text-on-primary">
            {selectedAccommodation.name}
          </span>
          <span
            className="rounded px-sm py-xs text-xs font-medium"
            style={{
              backgroundColor: 'var(--primary-bg)',
              color: 'var(--text-on-primary)'
            }}
          >
            {selectedAccommodation.type}
          </span>
        </div>
      )}

      {loading && (
        <div className="text-center py-xl">
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            {t('discount.mappings.searching')}
          </p>
        </div>
      )}

      {!loading && searchQuery && !selectedAccommodation && filteredAccommodations.length === 0 && !showSearchResults && (
        <div className="text-center py-xl">
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            {t('discount.common.noSearchResults')}
          </p>
        </div>
      )}
    </div>
  )
}
