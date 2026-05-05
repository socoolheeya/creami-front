'use client'

import Link from 'next/link'
import { RatePlan, RATE_PLAN_TYPE_LABELS, MEAL_PLAN_LABELS, RATE_PLAN_STATUS_LABELS, PRICE_TYPE_LABELS } from '@/lib/types/rateplan'
import { Eye, Edit } from 'lucide-react'

interface RatePlanTableViewProps {
  ratePlans: RatePlan[]
}

export function RatePlanTableView({ ratePlans }: RatePlanTableViewProps) {
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
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)'
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                ID
              </th>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                요금제명
              </th>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                상태
              </th>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                혜택명
              </th>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                유형
              </th>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                요금 타입
              </th>
              <th
                className="px-3 py-2 text-left text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                식사
              </th>
              <th
                className="px-3 py-2 text-center text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                최소 숙박
              </th>
              <th
                className="px-3 py-2 text-center text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                최대 숙박
              </th>
              <th
                className="px-3 py-2 text-center text-sm"
                style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
              >
                액션
              </th>
            </tr>
          </thead>
          <tbody>
            {ratePlans.map((ratePlan, index) => (
              <tr
                key={ratePlan.id}
                className="transition-colors hover:bg-opacity-50"
                style={{
                  borderBottom: index < ratePlans.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <td className="px-3 py-2">
                  <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                    {ratePlan.id}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div>
                    <p
                      className="text-sm mb-1"
                      style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                    >
                      {ratePlan.name}
                    </p>
                    {ratePlan.enName && (
                      <p
                        className="text-xs"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {ratePlan.enName}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs inline-block"
                    style={{
                      backgroundColor: getStatusColor(ratePlan.status) + '20',
                      color: getStatusColor(ratePlan.status),
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {RATE_PLAN_STATUS_LABELS[ratePlan.status]}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--primary)', fontWeight: 'var(--font-medium)' }}
                  >
                    {ratePlan.benefitName}
                  </p>
                </td>
                <td className="px-3 py-2">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {RATE_PLAN_TYPE_LABELS[ratePlan.ratePlanType]}
                  </p>
                </td>
                <td className="px-3 py-2">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {PRICE_TYPE_LABELS[ratePlan.priceType]}
                  </p>
                </td>
                <td className="px-3 py-2">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {MEAL_PLAN_LABELS[ratePlan.mealPlan]}
                  </p>
                </td>
                <td className="px-3 py-2 text-center">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {ratePlan.setting?.minLos || '-'}박
                  </p>
                </td>
                <td className="px-3 py-2 text-center">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {ratePlan.setting?.maxLos || '-'}박
                  </p>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/rateplans/${ratePlan.id}`}>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                      </button>
                    </Link>
                    <Link href={`/rateplans/${ratePlan.id}/edit`}>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: 'var(--primary)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        title="수정"
                      >
                        <Edit className="w-4 h-4" style={{ color: '#ffffff' }} />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
