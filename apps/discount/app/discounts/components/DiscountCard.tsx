'use client'

import { Discount, DISCOUNT_TYPE_LABELS, DISCOUNT_STATUS_LABELS, DISCOUNT_TARGET_LABELS } from '@/lib/types/discount'
import { Tag, Percent, DollarSign, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

interface DiscountCardProps {
  discount: Discount
}

export function DiscountCard({ discount }: DiscountCardProps) {
  const statusColor =
    discount.status === 'active' ? 'var(--primary)' :
    discount.status === 'scheduled' ? '#3b82f6' :
    discount.status === 'expired' ? 'var(--text-tertiary)' :
    '#6b7280'

  const usagePercentage = discount.usageLimit
    ? (discount.usedCount / discount.usageLimit) * 100
    : 0

  return (
    <Link href={`/discounts/${discount.id}`}>
      <div
        className="rounded-lg overflow-hidden transition-all hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Header */}
        <div
          className="p-4"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3
                className="text-lg mb-1"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)'
                }}
              >
                {discount.name}
              </h3>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <code
                  className="text-sm px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {discount.code}
                </code>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className="px-2 py-1 rounded text-xs whitespace-nowrap ml-2"
              style={{
                backgroundColor: statusColor,
                color: '#ffffff',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {DISCOUNT_STATUS_LABELS[discount.status]}
            </span>
          </div>

          {discount.description && (
            <p
              className="text-sm mt-2"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              {discount.description}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Discount Value */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              {discount.type === 'percentage' ? (
                <Percent className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              ) : (
                <DollarSign className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              )}
              <span className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value.toLocaleString()}원`}
              </span>
            </div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {DISCOUNT_TYPE_LABELS[discount.type]}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                대상: {DISCOUNT_TARGET_LABELS[discount.target]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {discount.startDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ~ {' '}
                {discount.endDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            {discount.usageLimit && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  사용: {discount.usedCount} / {discount.usageLimit}회
                </span>
              </div>
            )}
          </div>

          {/* Usage Progress Bar */}
          {discount.usageLimit && (
            <div className="mt-4">
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(usagePercentage, 100)}%`,
                    backgroundColor: usagePercentage >= 90 ? '#ef4444' : usagePercentage >= 70 ? '#f59e0b' : 'var(--primary)'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}