'use client'

import { Calendar, Building, User, Tag } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Block } from '@/lib/types/block'

interface BlockCardProps {
  block: Block
}

export function BlockCard({ block }: BlockCardProps) {
  const t = useTranslations()
  const locale = useLocale()
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--primary)'
      case 'released':
        return 'var(--info)'
      case 'cancelled':
        return 'var(--error)'
      case 'expired':
        return 'var(--text-tertiary)'
      default:
        return 'var(--text-tertiary)'
    }
  }

  const getUtilizationPercentage = () => {
    if (block.totalRooms === 0) return 0
    return Math.round((block.bookedRooms / block.totalRooms) * 100)
  }

  const utilizationPercentage = getUtilizationPercentage()

  return (
    <Link href={`/inventories/${block.id}`}>
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
            {t(`ari.inventories.block.types.${block.type}`)}
          </div>

          <div
            className="px-sm py-xs rounded text-xs"
            style={{
              backgroundColor: getStatusColor(block.status),
              color: 'var(--text-on-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`ari.inventories.block.status.${block.status}`)}
          </div>
        </div>

        {/* Block Code */}
        <div className="flex items-center gap-sm mb-sm">
          <Tag className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
          <span
            className="text-base"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {block.code}
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
          {block.name}
        </h3>

        {/* Organization */}
        {block.organization && (
          <div className="flex items-center gap-sm mb-md">
            <Building className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
            <p
              className="text-base truncate"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              {block.organization}
            </p>
          </div>
        )}

        {/* Room Stats */}
        <div
          className="mb-md p-md rounded"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <div className="flex justify-between items-center mb-sm">
            <span
              className="text-base"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              {t('ari.inventories.block.roomUsage')}
            </span>
            <span
              className="text-lg"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--primary)'
              }}
            >
              {utilizationPercentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full h-xs rounded overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${utilizationPercentage}%`,
                backgroundColor: 'var(--primary)'
              }}
            />
          </div>

          <div
            className="flex justify-between mt-sm text-xs"
            style={{
              color: 'var(--text-tertiary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            <span>{t('ari.inventories.block.booked', { count: block.bookedRooms })}</span>
            <span>{t('ari.inventories.block.total', { count: block.totalRooms })}</span>
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
            {formatDate(block.startDate)} - {formatDate(block.endDate)}
          </p>
        </div>

        {/* Contact */}
        {block.contactName && (
          <div className="flex items-center gap-sm text-base" style={{ color: 'var(--text-secondary)' }}>
            <User className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
            <span>{block.contactName}</span>
          </div>
        )}

        {/* Release Date */}
        {block.releaseDate && (
          <div
            className="mt-md pt-md"
            style={{
              borderTop: 'var(--border)'
            }}
          >
            <span
              className="text-xs"
              style={{
                color: 'var(--text-tertiary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              {t('ari.inventories.block.releaseDate', { date: formatDate(block.releaseDate) })}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
