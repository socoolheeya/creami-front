'use client'

import { Calendar, Users, Tag } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Rate } from '@/lib/types/rate'

interface RateCardProps {
  rate: Rate
}

export function RateCard({ rate }: RateCardProps) {
  const t = useTranslations()
  const locale = useLocale()
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: rate.currency || 'KRW'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--primary)'
      case 'scheduled':
        return 'var(--info)'
      case 'inactive':
        return 'var(--text-tertiary)'
      case 'expired':
        return 'var(--error)'
      default:
        return 'var(--text-tertiary)'
    }
  }

  return (
    <Link href={`/rates/${rate.id}`}>
      <div
        className="rounded overflow-hidden transition-all hover:shadow-lg cursor-pointer p-lg"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: 'var(--border)'
        }}
      >
        {/* Header with Status Badge */}
        <div className="flex items-start justify-between mb-md">
          <div
            className="inline-block px-sm py-xs rounded text-xs"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`ari.rates.types.${rate.type}`)}
          </div>

          <div
            className="px-sm py-xs rounded text-xs"
            style={{
              backgroundColor: getStatusColor(rate.status),
              color: 'var(--text-on-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`ari.rates.status.${rate.status}`)}
          </div>
        </div>

        {/* Rate Code */}
        <div className="flex items-center gap-sm mb-sm">
          <Tag className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
          <span
            className="text-base"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {rate.code}
          </span>
        </div>

        {/* Name */}
        <h3
          className="text-lg mb-sm truncate"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          {rate.name}
        </h3>

        {/* Room Type */}
        {rate.roomTypeName && (
          <p
            className="text-base mb-md truncate"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {rate.roomTypeName}
          </p>
        )}

        {/* Base Rate */}
        <div className="mb-md">
          <div
            className="text-2xl"
            style={{
              fontWeight: 'var(--font-bold)',
              color: 'var(--primary)'
            }}
          >
            {formatCurrency(rate.baseRate)}
          </div>
          <div
            className="text-xs"
            style={{
              color: 'var(--text-tertiary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {t('ari.rates.table.baseRate')}
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-sm mb-md">
          <Calendar className="w-md h-md flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
          <p
            className="text-base"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {formatDate(rate.startDate)} - {formatDate(rate.endDate)}
          </p>
        </div>

        {/* Occupancy Info */}
        {rate.occupancyRates && rate.occupancyRates.length > 0 && (
          <div className="flex items-center gap-sm text-base" style={{ color: 'var(--text-secondary)' }}>
            <Users className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
            <span>{t('ari.rates.grid.occupancyRateSteps', { count: rate.occupancyRates.length })}</span>
          </div>
        )}

        {/* Features */}
        <div className="mt-md flex flex-wrap gap-sm">
          {rate.includesBreakfast && (
            <span
              className="text-xs px-sm py-xs rounded"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)'
              }}
            >
              {t('ari.rates.grid.breakfastIncluded')}
            </span>
          )}
          {rate.includesTax && (
            <span
              className="text-xs px-sm py-xs rounded"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)'
              }}
            >
              {t('ari.rates.grid.taxIncluded')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
