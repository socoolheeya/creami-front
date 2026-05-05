'use client'

import { Accommodation } from '@/lib/types/accommodation'
import { Building2, Search } from 'lucide-react'
import { useState } from 'react'

interface AccommodationSelectorProps {
  accommodations: Accommodation[]
  selectedId: string | null
  onSelect: (accommodationId: string | null) => void
}

export function AccommodationSelector({ accommodations, selectedId, onSelect }: AccommodationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAccommodations = accommodations.filter(acc =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.address?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedAccommodation = accommodations.find(acc => acc.id === selectedId)

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl flex items-center gap-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          <Building2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          숙소 선택
        </h2>
        {selectedId && (
          <button
            onClick={() => onSelect(null)}
            className="text-sm px-3 py-1 rounded transition-colors"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            선택 해제
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="숙소명 또는 주소로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* Selected Accommodation Display */}
      {selectedAccommodation && (
        <div
          className="mb-4 p-4 rounded-lg"
          style={{
            backgroundColor: 'var(--primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base mb-1" style={{ fontWeight: 'var(--font-bold)', color: '#ffffff' }}>
                선택된 숙소: {selectedAccommodation.name}
              </h3>
              {selectedAccommodation.address && (
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 'var(--font-light)' }}>
                  {selectedAccommodation.address}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accommodation List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
        {filteredAccommodations.map((accommodation) => {
          const isSelected = selectedId === accommodation.id

          return (
            <button
              key={accommodation.id}
              onClick={() => onSelect(accommodation.id)}
              disabled={isSelected}
              className="p-4 rounded-lg text-left transition-all"
              style={{
                backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-sm)',
                cursor: isSelected ? 'default' : 'pointer',
                opacity: isSelected ? 0.6 : 1
              }}
            >
              <h3
                className="text-sm mb-1"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)'
                }}
              >
                {accommodation.name}
              </h3>
              {accommodation.address && (
                <p
                  className="text-xs"
                  style={{
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-light)'
                  }}
                >
                  {accommodation.address}
                </p>
              )}
              <div className="mt-2">
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {accommodation.type}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {filteredAccommodations.length === 0 && (
        <div className="text-center py-8">
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            검색 결과가 없습니다
          </p>
        </div>
      )}
    </div>
  )
}
