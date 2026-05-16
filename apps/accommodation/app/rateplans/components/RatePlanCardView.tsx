'use client'

import Link from 'next/link'
import { RatePlan } from '@/lib/types/rateplan'
import { Eye, Edit } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface RatePlanCardViewProps {
  ratePlan: RatePlan
}

export function RatePlanCardView({ ratePlan }: RatePlanCardViewProps) {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--primary)'
      case 'draft':
        return 'var(--text-secondary)'
      case 'inactive':
        return 'var(--text-tertiary)'
      default:
        return 'var(--text-tertiary)'
    }
  }

  return (
    <div
      className="rounded overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: 'var(--border)'
      }}
    >
      <div className="p-md">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-sm">
          <div className="flex-1">
            <h3
              className="text-base mb-xs"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              {ratePlan.name}
            </h3>
            {ratePlan.enName && (
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {ratePlan.enName}
              </p>
            )}
          </div>
          <span
            className="px-sm py-xs rounded text-xs"
            style={{
              backgroundColor: getStatusColor(ratePlan.status) + '20',
              color: getStatusColor(ratePlan.status),
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`statuses.${ratePlan.status}`)}
          </span>
        </div>

        {/* Benefit */}
        <div
          className="mb-sm p-sm rounded"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: 'var(--border)'
          }}
        >
          <p
            className="text-xs mb-xs"
            style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}
          >
            {t('fields.benefitName')}
          </p>
          <p
            className="text-base"
            style={{
              color: 'var(--primary)',
              fontWeight: 'var(--font-bold)'
            }}
          >
            {ratePlan.benefitName}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-sm mb-sm">
          <div>
            <p
              className="text-xs mb-xs"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}
            >
              {t('fields.ratePlanType')}
            </p>
            <p
              className="text-base"
              style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}
            >
              {t(`types.${ratePlan.ratePlanType}`)}
            </p>
          </div>
          <div>
            <p
              className="text-xs mb-xs"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}
            >
              {t('fields.priceType')}
            </p>
            <p
              className="text-base"
              style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}
            >
              {t(`priceTypes.${ratePlan.priceType}`)}
            </p>
          </div>
          <div className="col-span-2">
            <p
              className="text-xs mb-xs"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}
            >
              {t('fields.mealIncluded')}
            </p>
            <p
              className="text-base"
              style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}
            >
              {t(`mealPlans.${ratePlan.mealPlan}`)}
            </p>
          </div>
        </div>

        {/* Settings */}
        {ratePlan.setting && (
          <div
            className="grid grid-cols-2 gap-sm p-sm mb-sm rounded"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <div className="text-center">
              <p
                className="text-xs mb-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('fields.minLos')}
              </p>
              <p
                className="text-base"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                {commonT('night', { count: ratePlan.setting.minLos })}
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-xs mb-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('fields.maxLos')}
              </p>
              <p
                className="text-base"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                {commonT('night', { count: ratePlan.setting.maxLos })}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-sm pt-sm" style={{ borderTop: 'var(--border)' }}>
          <Link href={`/rateplans/${ratePlan.id}`} className="flex-1">
            <button
              className="w-full flex items-center justify-center gap-xs px-sm py-xs rounded transition-colors text-xs"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: 'var(--border)',
                color: 'var(--text-primary)',
                fontWeight: 'var(--font-medium)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <Eye className="w-3 h-3" />
              {t('actions.viewDetail')}
            </button>
          </Link>
          <Link href={`/rateplans/${ratePlan.id}/edit`} className="flex-1">
            <button
              className="w-full flex items-center justify-center gap-xs px-sm py-xs rounded transition-colors text-xs"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--text-on-primary)',
                fontWeight: 'var(--font-medium)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <Edit className="w-3 h-3" />
              {commonT('edit')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
