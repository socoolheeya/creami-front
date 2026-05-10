'use client'

import { Discount } from '@/lib/types/discount'
import { Tag } from 'lucide-react'
import { ReactNode } from 'react'
import { useLocale, useTranslations } from 'next-intl'

interface DiscountListProps {
  discounts: Discount[]
  onDiscountClick: (discountId: string) => void
  emptyMessage: string
  actionIcon: ReactNode
  layout?: 'catalog' | 'compact'
  totalCount?: number
  onShowMore?: () => void
  showMoreLabel?: string
}

const getDiscountValueLabel = (discount: Discount, t: ReturnType<typeof useTranslations>, locale: string) => (
  discount.type === 'percentage'
    ? `${discount.value}%`
    : t('discount.labels.amountWon', { value: discount.value.toLocaleString(locale) })
)

const getPeriodLabel = (discount: Discount, locale: string) => (
  `${discount.startDate.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} ~ ${discount.endDate.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`
)

export function DiscountList({
  discounts,
  onDiscountClick,
  emptyMessage,
  actionIcon,
  layout = 'compact',
  totalCount,
  onShowMore,
  showMoreLabel
}: DiscountListProps) {
  const t = useTranslations()
  const locale = useLocale()
  const resolvedShowMoreLabel = showMoreLabel ?? t('discount.common.showMore', { count: 50 })

  if (discounts.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-2xl rounded"
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '2px dashed var(--border-color)'
        }}
      >
        <Tag className="h-2xl w-2xl mb-md" style={{ color: 'var(--text-tertiary)' }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
          {emptyMessage}
        </p>
      </div>
    )
  }

  const catalogTotalCount = totalCount ?? discounts.length
  const hasMore = catalogTotalCount > discounts.length && onShowMore

  if (layout === 'catalog') {
    return (
      <div className="rounded bg-bg-primary" style={{ border: '1px solid var(--border-color)' }}>
        <div className="flex items-center justify-between gap-md border-b border-border px-md py-sm">
          <p className="text-base font-light text-text-secondary">
            {t('discount.common.shownOfTotal', {
              total: catalogTotalCount.toLocaleString(locale),
              shown: discounts.length.toLocaleString(locale)
            })}
          </p>
          {hasMore && (
            <button
              type="button"
              onClick={onShowMore}
              className="rounded px-sm py-xs text-base font-bold text-primary transition-colors hover:bg-bg-secondary"
            >
              {resolvedShowMoreLabel}
            </button>
          )}
        </div>

        <div className="max-h-[calc(var(--spacing-3xl)*9)] overflow-y-auto">
          {discounts.map((discount) => {
            const discountValueLabel = getDiscountValueLabel(discount, t, locale)
            const periodLabel = getPeriodLabel(discount, locale)

            return (
              <button
                key={discount.id}
                type="button"
                onClick={() => onDiscountClick(discount.id)}
                className="flex w-full items-center justify-between gap-md border-b border-border px-md py-sm text-left transition-colors last:border-b-0 hover:bg-bg-secondary"
              >
                <div className="min-w-0">
                  <span className="block truncate text-base font-bold text-text-primary">
                    {discount.name}
                  </span>
                  <div className="mt-xs flex min-w-0 flex-wrap items-center gap-xs">
                    <code className="rounded bg-bg-tertiary px-sm py-xs text-xs font-medium text-text-secondary">
                      ID {discount.id}
                    </code>
                    {discount.discountType && (
                      <code className="rounded bg-primary-bg px-sm py-xs text-xs font-medium text-primary">
                        {discount.discountType}
                      </code>
                    )}
                    <code className="rounded bg-bg-tertiary px-sm py-xs text-xs font-medium text-text-secondary">
                      {discountValueLabel}
                    </code>
                    <code className="rounded bg-bg-tertiary px-sm py-xs text-xs font-medium text-text-secondary">
                      {periodLabel}
                    </code>
                  </div>
                </div>

                <span className="flex h-control-sm w-control-sm shrink-0 items-center justify-center rounded bg-bg-secondary text-text-primary">
                  {actionIcon}
                </span>
              </button>
            )
          })}
        </div>

        {hasMore && (
          <div className="border-t border-border p-md">
            <button
              type="button"
              onClick={onShowMore}
              className="w-full rounded bg-bg-secondary px-md py-sm text-base font-bold text-text-primary transition-colors hover:bg-bg-tertiary"
            >
              {resolvedShowMoreLabel}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-md">
      {discounts.map((discount) => {
        const discountValueLabel = getDiscountValueLabel(discount, t, locale)
        const periodLabel = getPeriodLabel(discount, locale)

        return (
          <button
            key={discount.id}
            type="button"
            onClick={() => onDiscountClick(discount.id)}
            className="w-full p-md rounded text-left transition-all hover:shadow-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div className="flex items-start justify-between gap-md">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold text-text-primary">
                  {discount.name}
                </h3>
                <div className="mt-xs flex min-w-0 flex-wrap items-center gap-xs">
                  <code className="rounded bg-bg-tertiary px-sm py-xs text-xs font-medium text-text-secondary">
                    ID {discount.id}
                  </code>
                  {discount.discountType && (
                    <code className="rounded bg-primary-bg px-sm py-xs text-xs font-medium text-primary">
                      {discount.discountType}
                    </code>
                  )}
                  <code className="rounded bg-bg-tertiary px-sm py-xs text-xs font-medium text-text-secondary">
                    {discountValueLabel}
                  </code>
                  <code className="rounded bg-bg-tertiary px-sm py-xs text-xs font-medium text-text-secondary">
                    {periodLabel}
                  </code>
                </div>
              </div>

              <div
                className="flex h-control-sm w-control-sm shrink-0 items-center justify-center rounded transition-colors"
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
