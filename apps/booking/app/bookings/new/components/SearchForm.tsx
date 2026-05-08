'use client'

import { Search, ChevronDown } from 'lucide-react'
import { SearchRequest, RoomOccupancy } from '@/lib/types/search'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { OccupancyInput } from './OccupancyInput'
import { useState, useRef, useEffect } from 'react'

interface SearchFormProps {
  onSearch: (request: SearchRequest) => void
  isLoading: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [accommodationId, setAccommodationId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [occupancies, setOccupancies] = useState<RoomOccupancy[]>([
    { roomNumber: 1, adults: 2, children: [] }
  ])

  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredAccommodations = mockAccommodations.filter(acc =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAccommodationSelect = (id: string, name: string) => {
    setAccommodationId(id)
    setSearchQuery(name)
    setShowDropdown(false)
  }

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value)
    setShowDropdown(true)
    if (!value) {
      setAccommodationId('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if ((!accommodationId && !searchQuery) || !checkIn || !checkOut) {
      alert('모든 필수 항목을 입력해주세요')
      return
    }

    const request: SearchRequest = {
      ...(accommodationId ? { accommodationId } : { accommodationQuery: searchQuery }),
      checkIn,
      checkOut,
      occupancies
    }

    onSearch(request)
  }

  return (
    <div
      className="p-6 rounded-lg h-fit"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        position: 'sticky',
        top: '80px'
      }}
    >
      <h2 className="text-xl mb-6" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        예약 검색
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 숙소 검색 */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <label className="block mb-2" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
            숙소 *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              placeholder="숙소명 또는 숙소ID 검색..."
              required={!accommodationId && !searchQuery}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                paddingRight: '32px'
              }}
            />
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--text-tertiary)' }}
            />
          </div>

          {/* 드롭다운 */}
          {showDropdown && (
            <div
              className="absolute w-full mt-1 rounded-lg overflow-hidden z-10"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow)',
                maxHeight: '240px',
                overflowY: 'auto'
              }}
            >
              {filteredAccommodations.length > 0 ? (
                filteredAccommodations.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => handleAccommodationSelect(acc.id, acc.name)}
                    className="px-3 py-2 cursor-pointer transition-colors"
                    style={{
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <div style={{ fontWeight: 'var(--font-medium)' }}>{acc.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      ID: {acc.id} · {acc.address}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="px-3 py-4 text-center"
                  style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}
                >
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          )}
        </div>

        {/* 체크인 */}
        <div>
          <label className="block mb-2" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
            체크인 *
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 체크아웃 */}
        <div>
          <label className="block mb-2" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
            체크아웃 *
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            min={checkIn}
            className="w-full px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* 인원 설정 */}
        <OccupancyInput occupancies={occupancies} onChange={setOccupancies} />

        {/* 검색 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors"
          style={{
            backgroundColor: isLoading ? 'var(--text-tertiary)' : 'var(--primary)',
            color: '#ffffff',
            fontWeight: 'var(--font-bold)',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          <Search className="w-5 h-5" />
          {isLoading ? '검색 중...' : '검색하기'}
        </button>
      </form>
    </div>
  )
}