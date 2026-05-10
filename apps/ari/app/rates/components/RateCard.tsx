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
        return '#60a5fa'
      case 'inactive':
        return 'var(--text-tertiary)'
      case 'expired':
        return '#ef4444'
      default:
        return 'var(--text-tertiary)'
    }
  }

  return (
    <Link href={`/rates/${rate.id}`}>
      <div
        className="rounded-lg overflow-hidden transition-all hover:shadow-lg cursor-pointer p-5"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Header with Status Badge */}
        <div className="flex items-start justify-between mb-3">
          <div
            className="inline-block px-2 py-0.5 rounded text-xs"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`ari.rates.types.${rate.type}`)}
          </div>

          <div
            className="px-2 py-1 rounded text-xs"
            style={{
              backgroundColor: getStatusColor(rate.status),
              color: '#ffffff',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`ari.rates.status.${rate.status}`)}
          </div>
        </div>

        {/* Rate Code */}
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span
            className="text-sm"
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
          className="text-lg mb-2 truncate"
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
            className="text-sm mb-3 truncate"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {rate.roomTypeName}
          </p>
        )}

        {/* Base Rate */}
        <div className="mb-4">
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
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
          <p
            className="text-sm"
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
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Users className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <span>{t('ari.rates.grid.occupancyRateSteps', { count: rate.occupancyRates.length })}</span>
          </div>
        )}

        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-2">
          {rate.includesBreakfast && (
            <span
              className="text-xs px-2 py-1 rounded"
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
              className="text-xs px-2 py-1 rounded"
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
