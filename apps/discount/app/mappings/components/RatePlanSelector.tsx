'use client'

import { RatePlan } from '@/lib/types/rateplan'
import { Check } from 'lucide-react'

interface RatePlanSelectorProps {
  ratePlans: RatePlan[]
  selectedIds: string[]
  onSelectionChange: (selectedIds: string[]) => void
}

export function RatePlanSelector({ ratePlans, selectedIds, onSelectionChange }: RatePlanSelectorProps) {
  const toggleRatePlan = (ratePlanId: string) => {
    if (selectedIds.includes(ratePlanId)) {
      onSelectionChange(selectedIds.filter(id => id !== ratePlanId))
    } else {
      onSelectionChange([...selectedIds, ratePlanId])
    }
  }

  const selectAll = () => {
    onSelectionChange(ratePlans.map(rp => rp.id))
  }

  const clearAll = () => {
    onSelectionChange([])
  }

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
        <h2 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          요금제 선택 ({selectedIds.length}/{ratePlans.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-3 py-1 rounded text-sm transition-colors"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            전체 선택
          </button>
          <button
            onClick={clearAll}
            disabled={selectedIds.length === 0}
            className="px-3 py-1 rounded text-sm transition-colors"
            style={{
              backgroundColor: selectedIds.length === 0 ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: selectedIds.length === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)',
              cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            선택 해제
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {ratePlans.map((ratePlan) => {
          const isSelected = selectedIds.includes(ratePlan.id)

          return (
            <button
              key={ratePlan.id}
              onClick={() => toggleRatePlan(ratePlan.id)}
              className="p-4 rounded-lg text-left transition-all"
              style={{
                backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-secondary)',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-sm)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3
                    className="text-sm mb-1"
                    style={{
                      fontWeight: 'var(--font-bold)',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)'
                    }}
                  >
                    {ratePlan.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{
                      color: isSelected ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {ratePlan.accommodationName}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center"
                  style={{
                    backgroundColor: isSelected ? '#ffffff' : 'var(--bg-tertiary)',
                    border: `2px solid ${isSelected ? '#ffffff' : 'var(--border-color)'}`
                  }}
                >
                  {isSelected && <Check className="w-3 h-3" style={{ color: 'var(--primary)' }} />}
                </div>
              </div>
              {ratePlan.roomName && (
                <p
                  className="text-xs"
                  style={{
                    color: isSelected ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-tertiary)',
                    fontWeight: 'var(--font-light)'
                  }}
                >
                  {ratePlan.roomName}
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
