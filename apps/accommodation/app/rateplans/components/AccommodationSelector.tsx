'use client'

import { Accommodation, ACCOMMODATION_TYPE_LABELS } from '@/lib/types/accommodation'
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
    acc.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (acc.enName && acc.enName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const selectedAccommodation = accommodations.find(acc => acc.id === selectedId)

  return (
    <div className="selector-container">
      <div className="selector-header">
        <h2 className="selector-title">
          <Building2 className="title-icon" />
          숙소 선택
        </h2>
        {selectedId && (
          <button
            onClick={() => onSelect(null)}
            className="clear-btn"
          >
            선택 해제
          </button>
        )}
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="숙소명 또는 주소로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Selected Accommodation Display */}
      {selectedAccommodation && (
        <div className="selected-display">
          <div className="selected-content">
            <div>
              <h3 className="selected-title">
                선택된 숙소: {selectedAccommodation.name}
              </h3>
              {selectedAccommodation.address && (
                <p className="selected-subtitle">
                  {selectedAccommodation.address}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accommodation List */}
      <div className="accommodation-grid">
        {filteredAccommodations.map((accommodation) => {
          const isSelected = selectedId === accommodation.id

          return (
            <button
              key={accommodation.id}
              onClick={() => onSelect(accommodation.id)}
              disabled={isSelected}
              className={`accommodation-card ${isSelected ? 'selected' : ''}`}
            >
              <h3 className="accommodation-name">
                {accommodation.name}
              </h3>
              {accommodation.address && (
                <p className="accommodation-address">
                  {accommodation.address}
                </p>
              )}
              <div className="accommodation-footer">
                <span className="accommodation-type">
                  {ACCOMMODATION_TYPE_LABELS[accommodation.type]}
                </span>
                {accommodation.stars && (
                  <span className="accommodation-stars">
                    {'⭐'.repeat(accommodation.stars)}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {filteredAccommodations.length === 0 && (
        <div className="empty-state">
          <p className="empty-text">검색 결과가 없습니다</p>
        </div>
      )}

      <style jsx>{`
        .selector-container {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          border: 1px solid var(--border-color);
          margin-bottom: var(--spacing-lg);
        }

        .selector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
        }

        .selector-title {
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin: 0;
        }

        :global(.selector-title .title-icon) {
          width: 20px;
          height: 20px;
          color: var(--primary);
        }

        .clear-btn {
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: 500;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-btn:hover {
          background: var(--bg-tertiary);
        }

        .search-wrapper {
          margin-bottom: var(--spacing-lg);
          position: relative;
        }

        :global(.search-wrapper .search-icon) {
          position: absolute;
          left: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: var(--text-tertiary);
        }

        .search-input {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 40px;
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: var(--font-size-sm);
        }

        .search-input::placeholder {
          color: var(--text-tertiary);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .selected-display {
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          background: var(--primary);
        }

        .selected-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .selected-title {
          font-size: var(--font-size-base);
          font-weight: 700;
          color: white;
          margin: 0 0 var(--spacing-xs) 0;
        }

        .selected-subtitle {
          font-size: var(--font-size-sm);
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .accommodation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: var(--spacing-md);
          max-height: 400px;
          overflow-y: auto;
        }

        .accommodation-card {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          text-align: left;
          transition: all 0.2s;
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          cursor: pointer;
        }

        .accommodation-card:not(.selected):hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .accommodation-card.selected {
          background: var(--bg-tertiary);
          border-color: var(--primary);
          opacity: 0.6;
          cursor: default;
        }

        .accommodation-name {
          font-size: var(--font-size-sm);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .accommodation-address {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .accommodation-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-sm);
        }

        .accommodation-type {
          font-size: var(--font-size-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .accommodation-stars {
          font-size: var(--font-size-xs);
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-xl);
        }

        .empty-text {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .accommodation-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}