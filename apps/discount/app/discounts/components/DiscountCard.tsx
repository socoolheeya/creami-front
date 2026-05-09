'use client'

import { Discount, DISCOUNT_TYPE_LABELS, DISCOUNT_STATUS_LABELS, DISCOUNT_TARGET_LABELS } from '@/lib/types/discount'
import { Tag, Percent, DollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@creami/ui'

interface DiscountCardProps {
  discount: Discount
}

export function DiscountCard({ discount }: DiscountCardProps) {
  const statusColor =
    discount.status === 'active' ? 'var(--primary)' :
    discount.status === 'scheduled' ? 'var(--info)' :
    discount.status === 'expired' ? 'var(--text-tertiary)' :
    'var(--neutral)'

  return (
    <Link href={`/discounts/${discount.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg" hover={false}>
        {/* Header */}
        <div
          className="p-md"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div className="flex items-start justify-between mb-sm">
            <div className="flex-1">
              <h3
                className="text-lg mb-xs"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)'
                }}
              >
                {discount.name}
              </h3>
              <div className="flex items-center gap-sm">
                <Tag className="h-md w-md" style={{ color: 'var(--text-secondary)' }} />
                <code
                  className="text-xs px-sm py-xs rounded"
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
              className="px-sm py-xs rounded text-xs whitespace-nowrap ml-sm"
              style={{
                backgroundColor: statusColor,
                color: 'var(--text-on-primary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {DISCOUNT_STATUS_LABELS[discount.status]}
            </span>
          </div>

          {discount.description && (
            <p
              className="text-base mt-sm"
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
        <div className="p-md">
          {/* Discount Value */}
          <div className="mb-md">
            <div className="flex items-center gap-sm mb-xs">
              {discount.type === 'percentage' ? (
                <Percent className="h-icon-md w-icon-md" style={{ color: 'var(--primary)' }} />
              ) : (
                <DollarSign className="h-icon-md w-icon-md" style={{ color: 'var(--primary)' }} />
              )}
              <span className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value.toLocaleString()}원`}
              </span>
            </div>
            <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
              {DISCOUNT_TYPE_LABELS[discount.type]}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-sm text-base">
            <div className="flex items-center gap-sm">
              <Tag className="h-md w-md" style={{ color: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                대상: {DISCOUNT_TARGET_LABELS[discount.target]}
              </span>
            </div>

            <div className="flex items-center gap-sm">
              <Calendar className="h-md w-md" style={{ color: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {discount.startDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ~ {' '}
                {discount.endDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
