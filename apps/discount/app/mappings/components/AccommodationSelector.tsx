'use client'

import { Accommodation } from '@/lib/types/accommodation'
import { Building2, Search } from 'lucide-react'
import { ChangeEvent, KeyboardEvent, useId, useState } from 'react'
import { Button, Card } from '@creami/ui'

interface AccommodationSelectorProps {
  accommodations: Accommodation[]
  selectedId: string | null
  onSelect: (accommodationId: string | null) => void
  compact?: boolean
}

export function AccommodationSelector({ accommodations, selectedId, onSelect, compact = false }: AccommodationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const accommodationListId = useId()

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const filteredAccommodations = accommodations.filter(acc => {
    const label = `${acc.id} ${acc.name}`.toLowerCase()

    return (
      acc.id.toLowerCase().includes(normalizedSearchQuery) ||
      acc.name.toLowerCase().includes(normalizedSearchQuery) ||
      label.includes(normalizedSearchQuery)
    )
  })

  const selectedAccommodation = accommodations.find(acc => acc.id === selectedId)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const normalizedValue = value.trim().toLowerCase()
    setSearchQuery(value)

    const matchedAccommodation = accommodations.find(acc =>
      acc.id.toLowerCase() === normalizedValue ||
      acc.name.toLowerCase() === normalizedValue ||
      `${acc.id} ${acc.name}`.toLowerCase() === normalizedValue
    )

    if (matchedAccommodation) {
      setSearchQuery(`${matchedAccommodation.id} ${matchedAccommodation.name}`)
      onSelect(matchedAccommodation.id)
    }
  }

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return

    selectFirstAccommodation()
  }

  const selectFirstAccommodation = () => {
    const firstAccommodation = filteredAccommodations[0]
    if (firstAccommodation) {
      setSearchQuery(`${firstAccommodation.id} ${firstAccommodation.name}`)
      onSelect(firstAccommodation.id)
    }
  }

  const handleClearSelection = () => {
    setSearchQuery('')
    onSelect(null)
  }

  return (
    <Card className={compact ? 'p-md' : 'p-lg'} hover={false}>
      <div className={`flex items-center justify-between ${compact ? 'mb-sm' : 'mb-md'}`}>
        <h2 className="text-xl flex items-center gap-sm font-bold text-text-primary">
          <Building2 className="h-icon-md w-icon-md text-primary" />
          숙소 선택
        </h2>
        {selectedId && (
          <Button
            type="button"
            onClick={handleClearSelection}
            variant="secondary"
            size="small"
          >
            선택 해제
          </Button>
        )}
      </div>

      {/* Search */}
      <div className={`${compact ? 'mb-sm max-w-[var(--modal-md)]' : 'mb-md'} flex gap-sm`}>
        <div className="relative flex-1">
          <Search className="absolute left-md top-1/2 -translate-y-1/2 h-md w-md" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="ID 또는 숙소명으로 검색..."
            list={accommodationListId}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="h-control-md w-full rounded pr-control-px-md text-base"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              paddingLeft: 'var(--control-search-padding)'
            }}
          />
          <datalist id={accommodationListId}>
            {filteredAccommodations.map(accommodation => (
              <option
                key={accommodation.id}
                value={`${accommodation.id} ${accommodation.name}`}
              />
            ))}
          </datalist>
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

      {searchQuery && !selectedAccommodation && filteredAccommodations.length === 0 && (
        <div className="text-center py-xl">
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            검색 결과가 없습니다
          </p>
        </div>
      )}
    </Card>
  )
}
