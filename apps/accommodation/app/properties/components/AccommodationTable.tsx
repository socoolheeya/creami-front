'use client'

import { Edit, MapPin, Phone, Mail, Calendar, ArrowUpDown, Filter } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Accommodation, ACCOMMODATION_TYPE_LABELS, AccommodationType } from '@/lib/types/accommodation'

interface AccommodationTableProps {
  accommodations: Accommodation[]
}

type SortField = 'name' | 'type' | 'status' | null
type SortOrder = 'asc' | 'desc'

export function AccommodationTable({ accommodations }: AccommodationTableProps) {
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [typeFilter, setTypeFilter] = useState<AccommodationType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [nameSearch, setNameSearch] = useState('')
  const [addressSearch, setAddressSearch] = useState('')
  const [contactSearch, setContactSearch] = useState('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...accommodations]

    // 검색 필터 적용
    if (nameSearch) {
      result = result.filter(acc =>
        acc.name.toLowerCase().includes(nameSearch.toLowerCase())
      )
    }
    if (addressSearch) {
      result = result.filter(acc =>
        acc.address.toLowerCase().includes(addressSearch.toLowerCase())
      )
    }
    if (contactSearch) {
      result = result.filter(acc =>
        acc.phone.includes(contactSearch) ||
        (acc.email && acc.email.toLowerCase().includes(contactSearch.toLowerCase()))
      )
    }

    // 드롭다운 필터 적용
    if (typeFilter !== 'all') {
      result = result.filter(acc => acc.type === typeFilter)
    }
    if (statusFilter !== 'all') {
      result = result.filter(acc => acc.status === statusFilter)
    }

    // 정렬 적용
    if (sortField) {
      result.sort((a, b) => {
        let compareValue = 0
        if (sortField === 'name') {
          compareValue = a.name.localeCompare(b.name)
        } else if (sortField === 'type') {
          compareValue = a.type.localeCompare(b.type)
        } else if (sortField === 'status') {
          compareValue = a.status.localeCompare(b.status)
        }
        return sortOrder === 'asc' ? compareValue : -compareValue
      })
    }

    return result
  }, [accommodations, sortField, sortOrder, typeFilter, statusFilter, nameSearch, addressSearch, contactSearch])

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
            <SortableHeader field="name">숙소명</SortableHeader>
            <SortableHeader field="type">유형</SortableHeader>
            <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              주소
            </th>
            <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              연락처
            </th>
            <th className="px-6 py-4 text-left" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
              체크인/아웃
            </th>
            <SortableHeader field="status">상태</SortableHeader>
          </tr>
          {/* Filter Row */}
          <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
            {/* 숙소명 검색 */}
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
            {/* 유형 필터 */}
            <th className="px-6 py-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as AccommodationType | 'all')}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">전체</option>
                {Object.entries(ACCOMMODATION_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </th>
            {/* 주소 검색 */}
            <th className="px-6 py-3">
              <input
                type="text"
                placeholder="검색..."
                value={addressSearch}
                onChange={(e) => setAddressSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 연락처 검색 */}
            <th className="px-6 py-3">
              <input
                type="text"
                placeholder="검색..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </th>
            {/* 체크인/아웃 - 필터 없음 */}
            <th className="px-6 py-3"></th>
            {/* 상태 필터 */}
            <th className="px-6 py-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="w-full px-3 py-1.5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">전체</option>
                <option value="active">운영중</option>
                <option value="inactive">중지</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((accommodation) => (
            <tr
              key={accommodation.id}
              className="transition-colors cursor-pointer"
              style={{ borderBottom: '1px solid var(--border-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {/* 숙소명 */}
              <td className="px-6 py-4">
                <Link href={`/properties/${accommodation.id}`}>
                  <div className="flex flex-col cursor-pointer">
                    <span
                      className="hover:underline"
                      style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                    >
                      {accommodation.name}
                    </span>
                    <span className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      {accommodation.images.length}장 사진 • {accommodation.amenities.length}개 편의시설
                    </span>
                  </div>
                </Link>
              </td>

              {/* 유형 */}
              <td className="px-6 py-4">
                <span
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {ACCOMMODATION_TYPE_LABELS[accommodation.type]}
                </span>
              </td>

              {/* 주소 */}
              <td className="px-6 py-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-tertiary)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {accommodation.address}
                  </span>
                </div>
              </td>

              {/* 연락처 */}
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {accommodation.phone}
                    </span>
                  </div>
                  {accommodation.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {accommodation.email}
                      </span>
                    </div>
                  )}
                </div>
              </td>

              {/* 체크인/아웃 */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div className="flex flex-col text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span>IN: {accommodation.checkIn}</span>
                    <span>OUT: {accommodation.checkOut}</span>
                  </div>
                </div>
              </td>

              {/* 상태 */}
              <td className="px-6 py-4">
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: accommodation.status === 'active' ? '#d1fae5' : '#fee2e2',
                    color: accommodation.status === 'active' ? '#065f46' : '#991b1b',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {accommodation.status === 'active' ? '운영중' : '중지'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
