'use client'

import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Discount, DISCOUNT_TYPE_LABELS, DISCOUNT_STATUS_LABELS, DISCOUNT_TARGET_LABELS, DiscountStatus } from '@/lib/types/discount'

interface DiscountTableProps {
  discounts: Discount[]
}

type SortField = 'name' | 'code' | 'value' | 'status' | 'usedCount' | null
type SortOrder = 'asc' | 'desc'

export function DiscountTable({ discounts }: DiscountTableProps) {
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

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="px-6 py-4 text-left">
      <button
        onClick={() => handleSort(field)}
        className="flex items-center gap-2 transition-colors"
        style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}
      >
        {children}
        <ArrowUpDown
          className="w-4 h-4"
          style={{
            opacity: sortField === field ? 1 : 0.3,
            color: sortField === field ? 'var(--primary)' : 'currentColor'
          }}
        />
      </button>
    </th>
  )

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow)'
      }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
            <SortableHeader field="name">할인명</SortableHeader>
            <SortableHeader field="code">코드</SortableHeader>
            <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              타입
            </th>
            <SortableHeader field="value">할인 금액/율</SortableHeader>
            <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              기간
            </th>
            <SortableHeader field="usedCount">사용 현황</SortableHeader>
            <SortableHeader field="status">상태</SortableHeader>
          </tr>
          {/* Filter Row */}
          <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
            {/* 할인명 검색 */}
            <th className="px-6 py-3">
              <input
                type="text"
                placeholder="검색..."
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 코드 검색 */}
            <th className="px-6 py-3">
              <input
                type="text"
                placeholder="검색..."
                value={codeSearch}
                onChange={(e) => setCodeSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 타입 - 필터 없음 */}
            <th className="px-6 py-3"></th>
            {/* 할인 금액 - 필터 없음 */}
            <th className="px-6 py-3"></th>
            {/* 기간 - 필터 없음 */}
            <th className="px-6 py-3"></th>
            {/* 사용 현황 - 필터 없음 */}
            <th className="px-6 py-3"></th>
            {/* 상태 필터 */}
            <th className="px-6 py-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as DiscountStatus | 'all')}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">전체</option>
                {Object.entries(DISCOUNT_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((discount) => {
            const statusColor =
              discount.status === 'active' ? '#10b981' :
              discount.status === 'scheduled' ? '#3b82f6' :
              discount.status === 'expired' ? '#6b7280' :
              '#9ca3af'

            return (
              <tr
                key={discount.id}
                className="transition-colors cursor-pointer"
                style={{ borderBottom: '1px solid var(--border-color)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {/* 할인명 */}
                <td className="px-6 py-4">
                  <Link href={`/discounts/${discount.id}`}>
                    <div className="flex flex-col cursor-pointer">
                      <span
                        className="hover:underline"
                        style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                      >
                        {discount.name}
                      </span>
                      {discount.description && (
                        <span className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          {discount.description}
                        </span>
                      )}
                    </div>
                  </Link>
                </td>

                {/* 코드 */}
                <td className="px-6 py-4">
                  <code
                    className="px-2 py-1 rounded text-sm"
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
                <td className="px-6 py-4">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {DISCOUNT_TYPE_LABELS[discount.type]}
                  </span>
                </td>

                {/* 할인 금액/율 */}
                <td className="px-6 py-4">
                  <span className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value.toLocaleString()}원`}
                  </span>
                </td>

                {/* 기간 */}
                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>{discount.startDate.toLocaleDateString('ko-KR')}</span>
                    <span>~ {discount.endDate.toLocaleDateString('ko-KR')}</span>
                  </div>
                </td>

                {/* 사용 현황 */}
                <td className="px-6 py-4">
                  <div className="flex flex-col text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span>{discount.usedCount}회 사용</span>
                    {discount.usageLimit && (
                      <span className="text-xs">/ {discount.usageLimit}회 한도</span>
                    )}
                  </div>
                </td>

                {/* 상태 */}
                <td className="px-6 py-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {DISCOUNT_STATUS_LABELS[discount.status]}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}