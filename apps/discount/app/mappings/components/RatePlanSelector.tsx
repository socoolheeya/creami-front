'use client'

import { RatePlan } from '@/lib/types/rateplan'
import { Search } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { Button, Card } from '@creami/ui'

interface RatePlanSelectorProps {
  ratePlans: RatePlan[]
  selectedIds: string[]
  onSelectionChange: (selectedIds: string[]) => void
  compact?: boolean
  disabled?: boolean
  onApply?: () => void
}

export function RatePlanSelector({
  ratePlans,
  selectedIds,
  onSelectionChange,
  compact = false,
  disabled = false,
  onApply
}: RatePlanSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRatePlans = ratePlans.filter(ratePlan => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) return true

    return (
      ratePlan.id.toLowerCase().includes(normalizedQuery) ||
      ratePlan.name.toLowerCase().includes(normalizedQuery)
    )
  })

  const toggleRatePlan = (ratePlanId: string) => {
    if (disabled) return

    if (selectedIds.includes(ratePlanId)) {
      onSelectionChange(selectedIds.filter(id => id !== ratePlanId))
    } else {
      onSelectionChange([...selectedIds, ratePlanId])
    }
  }

  const selectAll = () => {
    if (disabled) return

    const visibleIds = filteredRatePlans.map(ratePlan => ratePlan.id)
    onSelectionChange(Array.from(new Set([...selectedIds, ...visibleIds])))
  }

  const clearAll = () => {
    if (disabled) return

    onSelectionChange([])
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Card className={compact ? 'p-md' : 'p-lg'} hover={false}>
      <div className={`flex items-center justify-between ${compact ? 'mb-sm' : 'mb-md'}`}>
        <h2 className="text-xl font-bold text-text-primary">
          요금제 선택 ({selectedIds.length}/{ratePlans.length})
        </h2>
        <div className="flex gap-sm">
          <Button
            type="button"
            onClick={selectAll}
            disabled={disabled || filteredRatePlans.length === 0}
            variant="secondary"
            size="small"
          >
            전체 선택
          </Button>
          <Button
            type="button"
            onClick={clearAll}
            disabled={disabled || selectedIds.length === 0}
            variant="secondary"
            size="small"
          >
            선택 해제
          </Button>
          {onApply && (
            <Button
              type="button"
              onClick={onApply}
              disabled={disabled || selectedIds.length === 0}
              variant="primary"
              size="small"
            >
              적용
            </Button>
          )}
        </div>
      </div>

      <div className={`${compact ? 'mb-sm' : 'mb-md'} relative`}>
        <Search className="absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          disabled={disabled}
          placeholder={disabled ? '숙소를 먼저 선택하세요' : 'ID 또는 요금제명으로 검색...'}
          className="h-control-md w-full rounded pr-control-px-md text-base"
          style={{
            backgroundColor: disabled ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            paddingLeft: 'var(--control-search-padding)'
          }}
        />
      </div>

      <div className="flex flex-wrap gap-sm">
        {filteredRatePlans.map((ratePlan) => {
          const isSelected = selectedIds.includes(ratePlan.id)

          return (
            <button
              key={ratePlan.id}
              type="button"
              onClick={() => toggleRatePlan(ratePlan.id)}
              disabled={disabled}
              className="rounded px-md py-sm text-left transition-colors"
              style={{
                backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-secondary)',
                border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                color: isSelected ? 'var(--text-on-primary)' : 'var(--text-primary)'
              }}
              aria-pressed={isSelected}
              title={isSelected ? '선택 해제' : '선택'}
            >
              <span
                className="mr-sm text-xs font-light"
                style={{ color: isSelected ? 'var(--text-on-primary-muted)' : 'var(--text-secondary)' }}
              >
                {ratePlan.id}
              </span>
              <span className="text-base font-bold">
                {ratePlan.name}
              </span>
            </button>
          )
        })}
      </div>

      {!disabled && searchQuery && filteredRatePlans.length === 0 && (
        <div className="py-md text-center text-base font-light text-text-secondary">
          검색 결과가 없습니다
        </div>
      )}
    </Card>
  )
}
