'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Rate } from '@/lib/types/rate'
import { Edit } from 'lucide-react'

interface RateTableProps {
  rates: Rate[]
}

export function RateTable({ rates }: RateTableProps) {
  const t = useTranslations()
  const locale = useLocale()
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency || 'KRW'
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
    <div
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)'
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.status')}
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.code')}
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.name')}
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.type')}
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.roomType')}
              </th>
              <th
                className="px-4 py-3 text-right text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.baseRate')}
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.period')}
              </th>
              <th
                className="px-4 py-3 text-center text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {t('ari.rates.table.manage')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr
                key={rate.id}
                className="hover:bg-opacity-50"
                style={{
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <td className="px-4 py-3">
                  <span
                    className="inline-block px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: getStatusColor(rate.status),
                      color: '#ffffff',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {t(`ari.rates.status.${rate.status}`)}
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {rate.code}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {rate.name}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-light)'
                  }}
                >
                  {t(`ari.rates.types.${rate.type}`)}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-light)'
                  }}
                >
                  {rate.roomTypeName || '-'}
                </td>
                <td
                  className="px-4 py-3 text-sm text-right"
                  style={{
                    color: 'var(--primary)',
                    fontWeight: 'var(--font-bold)'
                  }}
                >
                  {formatCurrency(rate.baseRate, rate.currency)}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-light)'
                  }}
                >
                  {formatDate(rate.startDate)} ~ {formatDate(rate.endDate)}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/rates/${rate.id}`}>
                    <button
                      className="inline-flex items-center justify-center p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)'
                      }}
                      title={t('ari.common.edit')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
