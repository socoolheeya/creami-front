'use client'

import { Discount, DISCOUNT_TYPE_LABELS, DISCOUNT_STATUS_LABELS } from '@/lib/types/discount'
import { Tag, Percent, DollarSign } from 'lucide-react'
import { ReactNode } from 'react'

interface DiscountListProps {
  discounts: Discount[]
  onDiscountClick: (discountId: string) => void
  emptyMessage: string
  actionIcon: ReactNode
}

export function DiscountList({ discounts, onDiscountClick, emptyMessage, actionIcon }: DiscountListProps) {
  if (discounts.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          border: '2px dashed var(--border-color)'
        }}
      >
        <Tag className="w-12 h-12 mb-3" style={{ color: 'var(--text-tertiary)' }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {discounts.map((discount) => {
        const statusColor =
          discount.status === 'active' ? 'var(--primary)' :
          discount.status === 'scheduled' ? '#3b82f6' :
          discount.status === 'expired' ? 'var(--text-tertiary)' :
          '#6b7280'

        return (
          <button
            key={discount.id}
            onClick={() => onDiscountClick(discount.id)}
            className="w-full p-4 rounded-lg text-left transition-all hover:shadow-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Name and Code */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className="text-base"
                    style={{
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {discount.name}
                  </h3>
                  <code
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {discount.code}
                  </code>
                </div>

                {/* Discount Value */}
                <div className="flex items-center gap-2 mb-2">
                  {discount.type === 'percentage' ? (
                    <Percent className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  ) : (
                    <DollarSign className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  )}
                  <span className="text-lg" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                    {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value.toLocaleString()}원`}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {DISCOUNT_TYPE_LABELS[discount.type]}
                  </span>
                </div>

                {/* Status and Period */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: statusColor,
                      color: '#ffffff',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {DISCOUNT_STATUS_LABELS[discount.status]}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {discount.startDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ~ {' '}
                    {discount.endDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Action Icon */}
              <div
                className="flex-shrink-0 ml-4 p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                {actionIcon}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
