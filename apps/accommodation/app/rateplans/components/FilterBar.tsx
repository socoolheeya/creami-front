'use client'

import { Search, Table, LayoutGrid } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { RatePlanStatus } from '@/lib/types/rateplan'

interface FilterBarProps {
  statusFilter: RatePlanStatus | 'all'
  searchQuery: string
  viewMode: 'table' | 'card'
  onStatusFilterChange: (status: RatePlanStatus | 'all') => void
  onSearchQueryChange: (query: string) => void
  onViewModeChange: (mode: 'table' | 'card') => void
  totalCount: number
  filteredCount: number
}

export function FilterBar({
  statusFilter,
  searchQuery,
  viewMode,
  onStatusFilterChange,
  onSearchQueryChange,
  onViewModeChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
  const statusOptions: Array<{ value: RatePlanStatus | 'all'; label: string }> = [
    { value: 'all', label: commonT('all') },
    { value: 'draft', label: t('statuses.draft') },
    { value: 'active', label: t('statuses.active') },
    { value: 'inactive', label: t('statuses.inactive') },
  ]

  return (
    <div className="filter-container">
      <div className="filter-top">
        {/* Status Filter */}
        <div className="status-filters">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onStatusFilterChange(option.value)}
              className={`status-btn ${statusFilter === option.value ? 'active' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="view-toggle">
          <button
            onClick={() => onViewModeChange('table')}
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            title={t('filter.tableView')}
          >
            <Table className="view-icon" />
          </button>
          <button
            onClick={() => onViewModeChange('card')}
            className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
            title={t('filter.cardView')}
          >
            <LayoutGrid className="view-icon" />
          </button>
        </div>
      </div>

      <div className="filter-bottom">
        {/* Search */}
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder={t('filter.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Result Count */}
        <div className="result-count">
          {filteredCount !== totalCount && (
            <>
              <span className="count-filtered">{filteredCount}</span>
              <span className="count-separator">/</span>
            </>
          )}
          <span className="count-total">{commonT('countItems', { count: totalCount })}</span>
        </div>
      </div>

      <style jsx>{`
        .filter-container {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-md);
          border: 1px solid var(--border-color);
          margin-bottom: var(--spacing-md);
        }

        .filter-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .status-filters {
          display: flex;
          gap: var(--spacing-xs);
          flex-wrap: wrap;
        }

        .status-btn {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-xs);
          font-weight: 500;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .status-btn:hover {
          border-color: var(--primary);
          color: var(--text-primary);
        }

        .status-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .view-toggle {
          display: flex;
          gap: var(--spacing-xs);
          background: var(--bg-primary);
          padding: var(--spacing-xs);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .view-btn {
          padding: var(--spacing-xs) var(--spacing-xs);
          border-radius: var(--radius-md);
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .view-btn.active {
          background: var(--primary);
          color: white;
        }

        :global(.view-btn .view-icon) {
          width: 16px;
          height: 16px;
        }

        .filter-bottom {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .search-wrapper {
          flex: 1;
          position: relative;
        }

        :global(.search-wrapper .search-icon) {
          position: absolute;
          left: var(--spacing-sm);
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: var(--text-tertiary);
        }

        .search-input {
          width: 100%;
          padding: var(--spacing-xs) var(--spacing-sm) var(--spacing-xs) 36px;
          border-radius: var(--radius-lg);
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

        .result-count {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .count-filtered {
          color: var(--primary);
          font-weight: 700;
        }

        .count-separator {
          color: var(--text-tertiary);
        }

        .count-total {
          color: var(--text-primary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .filter-top {
            flex-direction: column;
            align-items: stretch;
          }

          .status-filters {
            justify-content: space-between;
          }

          .view-toggle {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}
