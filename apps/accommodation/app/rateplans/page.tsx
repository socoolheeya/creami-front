'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import { mockRooms } from '@/lib/data/mock-rooms'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { RatePlanStatus } from '@/lib/types/rateplan'
import { AccommodationSelector } from './components/AccommodationSelector'
import { FilterBar } from './components/FilterBar'
import { RatePlanTableView } from './components/RatePlanTableView'
import { RatePlanCardView } from './components/RatePlanCardView'

export default function RatePlansPage() {
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
  const [statusFilter, setStatusFilter] = useState<RatePlanStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter rooms by selected accommodation
  const filteredRooms = useMemo(() => {
    if (!selectedAccommodationId) return mockRooms
    return mockRooms.filter(room => room.accommodationId === selectedAccommodationId)
  }, [selectedAccommodationId])

  // Filter rateplans by filtered rooms
  const accommodationRatePlans = useMemo(() => {
    if (!selectedAccommodationId) return mockRatePlans
    const roomIds = new Set(filteredRooms.map(room => room.id))
    return mockRatePlans.filter(rp => rp.roomId && roomIds.has(rp.roomId))
  }, [selectedAccommodationId, filteredRooms])

  // Apply status filter and search
  const filteredRatePlans = useMemo(() => {
    let result = accommodationRatePlans

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(rp => rp.status === statusFilter)
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(rp =>
        rp.name.toLowerCase().includes(query) ||
        rp.enName?.toLowerCase().includes(query) ||
        rp.benefitName.toLowerCase().includes(query)
      )
    }

    return result
  }, [accommodationRatePlans, statusFilter, searchQuery])

  // Stats based on accommodation filtered rateplans
  const stats = useMemo(() => ({
    total: accommodationRatePlans.length,
    active: accommodationRatePlans.filter(rp => rp.status === 'active').length,
    draft: accommodationRatePlans.filter(rp => rp.status === 'draft').length,
    inactive: accommodationRatePlans.filter(rp => rp.status === 'inactive').length,
  }), [accommodationRatePlans])

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">요금제 관리</h1>
          <p className="page-description">
            객실별 요금제를 관리하고 할인 정책을 설정합니다
          </p>
        </div>
        <Link href="/rateplans/new" className="btn btn-primary">
          요금제 추가
        </Link>
      </div>

      {/* Accommodation Selector */}
      <AccommodationSelector
        accommodations={mockAccommodations}
        selectedId={selectedAccommodationId}
        onSelect={setSelectedAccommodationId}
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">전체 요금제</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">활성 요금제</div>
          <div className="stat-value">{stats.active}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">초안</div>
          <div className="stat-value">{stats.draft}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">비활성</div>
          <div className="stat-value">{stats.inactive}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        viewMode={viewMode}
        onStatusFilterChange={setStatusFilter}
        onSearchQueryChange={setSearchQuery}
        onViewModeChange={setViewMode}
        totalCount={accommodationRatePlans.length}
        filteredCount={filteredRatePlans.length}
      />

      {/* Rate Plans View */}
      {selectedAccommodationId && accommodationRatePlans.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">
            선택한 숙소에 등록된 요금제가 없습니다
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <RatePlanTableView ratePlans={filteredRatePlans} />
          ) : (
            <RatePlanCardView ratePlans={filteredRatePlans} />
          )}
        </>
      )}

      <style jsx>{`
        .container {
          padding: var(--spacing-lg);
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-xl);
        }

        .page-title {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .page-description {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
        }

        .btn {
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-sm);
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .stat-card {
          background: var(--bg-secondary);
          padding: var(--spacing-lg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .stat-label {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xs);
        }

        .stat-value {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-xl);
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .empty-text {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}