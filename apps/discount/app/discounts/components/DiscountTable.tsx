'use client'

import { ArrowUpDown, Edit } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState, useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@creami/ui'
import { Discount, DiscountStatus } from '@/lib/types/discount'

interface DiscountTableProps {
  discounts: Discount[]
  onEdit: (discount: Discount) => void
}

type SortField = 'name' | 'code' | 'value' | 'status' | 'usedCount' | null
type SortOrder = 'asc' | 'desc'

interface SortableHeaderProps {
  field: SortField
  activeField: SortField
  children: ReactNode
  onSort: (field: SortField) => void
}

function SortableHeader({ field, activeField, children, onSort }: SortableHeaderProps) {
  return (
    <th className="px-lg py-md text-left">
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-sm transition-colors"
        style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}
      >
        {children}
        <ArrowUpDown
          className="h-md w-md"
          style={{
            opacity: activeField === field ? 1 : 0.3,
            color: activeField === field ? 'var(--primary)' : 'currentColor'
          }}
        />
      </button>
    </th>
  )
}

export function DiscountTable({ discounts, onEdit }: DiscountTableProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [statusFilter, setStatusFilter] = useState<DiscountStatus | 'all'>('all')
  const [nameSearch, setNameSearch] = useState('')
  const [codeSearch, setCodeSearch] = useState('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...discounts]

    // 검색 필터 적용
    if (nameSearch) {
      result = result.filter(discount =>
        discount.name.toLowerCase().includes(nameSearch.toLowerCase())
      )
    }
    if (codeSearch) {
      result = result.filter(discount =>
        discount.code.toLowerCase().includes(codeSearch.toLowerCase())
      )
    }

    // 상태 필터 적용
    if (statusFilter !== 'all') {
      result = result.filter(discount => discount.status === statusFilter)
    }

    // 정렬 적용
    if (sortField) {
      result.sort((a, b) => {
        let compareValue = 0
        if (sortField === 'name') {
          compareValue = a.name.localeCompare(b.name)
        } else if (sortField === 'code') {
          compareValue = a.code.localeCompare(b.code)
        } else if (sortField === 'value') {
          compareValue = a.value - b.value
        } else if (sortField === 'status') {
          compareValue = a.status.localeCompare(b.status)
        } else if (sortField === 'usedCount') {
          compareValue = a.usedCount - b.usedCount
        }
        return sortOrder === 'asc' ? compareValue : -compareValue
      })
    }

    return result
  }, [discounts, sortField, sortOrder, statusFilter, nameSearch, codeSearch])

  return (
    <div
      className="rounded overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: 'var(--border)',
        boxShadow: 'var(--shadow)'
      }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: 'var(--border)' }}>
            <SortableHeader field="name" activeField={sortField} onSort={handleSort}>{t('discount.discounts.table.name')}</SortableHeader>
            <SortableHeader field="code" activeField={sortField} onSort={handleSort}>{t('discount.discounts.table.code')}</SortableHeader>
            <th className="px-lg py-md text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              {t('discount.discounts.table.type')}
            </th>
            <SortableHeader field="value" activeField={sortField} onSort={handleSort}>{t('discount.discounts.table.value')}</SortableHeader>
            <th className="px-lg py-md text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              {t('discount.discounts.table.period')}
            </th>
            <SortableHeader field="usedCount" activeField={sortField} onSort={handleSort}>{t('discount.discounts.table.usage')}</SortableHeader>
            <SortableHeader field="status" activeField={sortField} onSort={handleSort}>{t('discount.discounts.table.status')}</SortableHeader>
            <th className="px-lg py-md text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              {t('discount.discounts.table.actions')}
            </th>
          </tr>
          {/* Filter Row */}
          <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: 'var(--border)' }}>
            {/* 할인명 검색 */}
            <th className="px-lg py-sm">
              <input
                type="text"
                placeholder={t('discount.common.search')}
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="h-control-sm w-full rounded px-control-px-sm text-base"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 코드 검색 */}
            <th className="px-lg py-sm">
              <input
                type="text"
                placeholder={t('discount.common.search')}
                value={codeSearch}
                onChange={(e) => setCodeSearch(e.target.value)}
                className="h-control-sm w-full rounded px-control-px-sm text-base"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 타입 - 필터 없음 */}
            <th className="px-lg py-sm"></th>
            {/* 할인 금액 - 필터 없음 */}
            <th className="px-lg py-sm"></th>
            {/* 기간 - 필터 없음 */}
            <th className="px-lg py-sm"></th>
            {/* 사용 현황 - 필터 없음 */}
            <th className="px-lg py-sm"></th>
            {/* 상태 필터 */}
            <th className="px-lg py-sm">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as DiscountStatus | 'all')}
                className="h-control-sm w-full rounded px-control-px-sm text-base"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">{t('discount.discounts.table.all')}</option>
                {(['active', 'scheduled', 'expired', 'disabled'] as DiscountStatus[]).map((key) => (
                  <option key={key} value={key}>{t(`discount.labels.status.${key}`)}</option>
                ))}
              </select>
            </th>
            <th className="px-lg py-sm"></th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((discount) => {
            const statusStyle =
              discount.status === 'active' ? { backgroundColor: 'var(--primary-bg)', color: 'var(--primary)' } :
              discount.status === 'scheduled' ? { backgroundColor: 'var(--info-bg)', color: 'var(--info)' } :
              discount.status === 'expired' ? { backgroundColor: 'var(--neutral-bg)', color: 'var(--neutral)' } :
              { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }

            return (
              <tr
                key={discount.id}
                className="transition-colors cursor-pointer"
                style={{ borderBottom: 'var(--border)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {/* 할인명 */}
                <td className="px-lg py-md">
                    <div className="flex flex-col">
                      <span
                        style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                      >
                        {discount.name}
                      </span>
                      {discount.description && (
                        <span className="text-xs mt-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {discount.description}
                        </span>
                      )}
                    </div>
                </td>

                {/* 코드 */}
                <td className="px-lg py-md">
                  <code
                    className="px-sm py-xs rounded text-xs"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {discount.code}
                  </code>
                </td>

                {/* 타입 */}
                <td className="px-lg py-md">
                  <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
                    {t(`discount.labels.types.${discount.type}`)}
                  </span>
                </td>

                {/* 할인 금액/율 */}
                <td className="px-lg py-md">
                  <span className="text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {discount.type === 'percentage'
                      ? `${discount.value}%`
                      : t('discount.labels.amountWon', { value: discount.value.toLocaleString(locale) })}
                  </span>
                </td>

                {/* 기간 */}
                <td className="px-lg py-md">
                  <div className="flex flex-col text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>{discount.startDate.toLocaleDateString(locale)}</span>
                    <span>~ {discount.endDate.toLocaleDateString(locale)}</span>
                  </div>
                </td>

                {/* 사용 현황 */}
                <td className="px-lg py-md">
                  <div className="flex flex-col text-base" style={{ color: 'var(--text-secondary)' }}>
                    <span>{t('discount.labels.used', { count: discount.usedCount })}</span>
                    {discount.usageLimit && (
                      <span className="text-xs">{t('discount.labels.usageLimit', { count: discount.usageLimit })}</span>
                    )}
                  </div>
                </td>

                {/* 상태 */}
                <td className="px-lg py-md">
                  <span
                    className="px-sm py-xs rounded text-base"
                    style={{
                      ...statusStyle,
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {t(`discount.labels.status.${discount.status}`)}
                  </span>
                </td>

                <td className="px-lg py-md">
                  <Button type="button" variant="secondary" size="small" onClick={() => onEdit(discount)}>
                    <Edit className="h-icon-md w-icon-md" />
                    {t('discount.common.edit')}
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
