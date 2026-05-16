'use client'

import { Search, ChevronDown } from 'lucide-react'
import { SearchRequest, RoomOccupancy } from '@/lib/types/search'
import { AccommodationOption, searchAccommodations } from '@/lib/api/bookings'
import { OccupancyInput } from './OccupancyInput'
import { useState, useRef, useEffect } from 'react'
import { Button, DatePicker } from '@creami/ui'

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
  const [accommodationOptions, setAccommodationOptions] = useState<AccommodationOption[]>([])
  const [occupancies, setOccupancies] = useState<RoomOccupancy[]>([
    { roomNumber: 1, adults: 2, children: [] }
  ])

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function loadAccommodations() {
      try {
        const result = await searchAccommodations(searchQuery)
        if (!cancelled) {
          setAccommodationOptions(result)
        }
      } catch {
        if (!cancelled) {
          setAccommodationOptions([])
        }
      }
    }

    loadAccommodations()

    return () => {
      cancelled = true
    }
  }, [searchQuery])


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
      className="p-lg rounded h-fit"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: 'var(--border)',
        position: 'sticky',
        top: 'var(--sticky-search-top)'
      }}
    >
      <h2 className="text-xl mb-lg" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        예약 검색
      </h2>

      <form onSubmit={handleSubmit} className="space-y-md">
        {/* 숙소 검색 */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <label className="block mb-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
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
              className="w-full h-control-md px-control-px-md py-none rounded text-base leading-none"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: 'var(--border)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                paddingRight: 'var(--control-search-padding)',
                fontWeight: 'var(--font-medium)'
              }}
            />
            <ChevronDown
              className="absolute right-md top-1/2 transform -translate-y-1/2 w-icon-md h-icon-md pointer-events-none"
              style={{ color: 'var(--text-tertiary)' }}
            />
          </div>

          {/* 드롭다운 */}
          {showDropdown && (
            <div
              className="absolute w-full mt-xs rounded overflow-hidden z-10"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: 'var(--border)',
                boxShadow: 'var(--shadow)',
                maxHeight: 'var(--search-result-height)',
                overflowY: 'auto'
              }}
            >
              {accommodationOptions.length > 0 ? (
                accommodationOptions.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => handleAccommodationSelect(acc.id, acc.name)}
                    className="px-md py-sm cursor-pointer transition-colors"
                    style={{
                      color: 'var(--text-primary)',
                      borderBottom: 'var(--border)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)' }}>{acc.name}</div>
                    <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                      ID: {acc.id} · {acc.address}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="px-md py-lg text-center text-base"
                  style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}
                >
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          )}
        </div>

        {/* 체크인 */}
        <div>
          <DatePicker
            label="체크인 *"
            value={checkIn}
            onChange={setCheckIn}
            placeholder="체크인 선택"
          />
        </div>

        {/* 체크아웃 */}
        <div>
          <DatePicker
            label="체크아웃 *"
            value={checkOut}
            onChange={setCheckOut}
            placeholder="체크아웃 선택"
          />
        </div>

        {/* 인원 설정 */}
        <OccupancyInput occupancies={occupancies} onChange={setOccupancies} />

        {/* 검색 버튼 */}
        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          size="large"
        >
          <Search className="w-icon-md h-icon-md" />
          {isLoading ? '검색 중...' : '검색하기'}
        </Button>
      </form>
    </div>
  )
}
