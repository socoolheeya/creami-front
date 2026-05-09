'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarCheck } from 'lucide-react'
import { SearchRequest, SearchResponse, AvailableRoomRate, CreateBookingRequest } from '@/lib/types/search'
import { searchAvailableRooms, createBooking } from '@/lib/api/mock-search'
import { SearchForm } from './components/SearchForm'
import { RoomRateTable } from './components/RoomRateTable'
import { BookingForm } from './components/BookingForm'

export default function NewBookingPage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null)
  const [selectedRoomRate, setSelectedRoomRate] = useState<AvailableRoomRate | null>(null)
  const [searchRequest, setSearchRequest] = useState<SearchRequest | null>(null)

  const handleSearch = async (request: SearchRequest) => {
    setIsSearching(true)
    setSearchRequest(request)
    setSelectedRoomRate(null)

    try {
      const result = await searchAvailableRooms(request)
      setSearchResult(result)
    } catch (error) {
      alert('검색 중 오류가 발생했습니다')
      console.error(error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleBooking = async (formData: { guestName: string; guestEmail: string; guestPhone: string; specialRequests?: string }) => {
    if (!selectedRoomRate || !searchRequest || !searchResult) return

    setIsBooking(true)

    try {
      const request: CreateBookingRequest = {
        accommodationId: searchResult.accommodationId, // 검색 결과에서 가져온 실제 ID 사용
        roomId: selectedRoomRate.roomId,
        ratePlanId: selectedRoomRate.ratePlanId,
        checkIn: searchRequest.checkIn,
        checkOut: searchRequest.checkOut,
        occupancies: searchRequest.occupancies,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        specialRequests: formData.specialRequests
      }

      const booking = await createBooking(request)
      alert(`예약이 완료되었습니다!\n예약번호: ${booking.bookingNumber}`)
      router.push(`/bookings/${booking.id}`)
    } catch (error) {
      alert('예약 중 오류가 발생했습니다')
      console.error(error)
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-lg">
        <div className="flex items-center gap-md mb-sm">
          <CalendarCheck className="w-icon-lg h-icon-lg" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            예약하기
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          숙소와 날짜를 선택하여 예약 가능한 객실을 확인하세요
        </p>
      </div>

      {/* 2단 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* 왼쪽: 검색 폼 */}
        <div className="lg:col-span-1">
          <SearchForm onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {/* 오른쪽: 검색 결과 + 예약자 정보 */}
        <div className="lg:col-span-2 space-y-lg">
          {/* 검색 결과 */}
          {searchResult && (
            <div
              className="p-lg rounded"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div className="mb-md">
                <h2 className="text-lg mb-xs" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                  예약 가능한 객실 ({searchResult.results.length})
                </h2>
                <p className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                  {searchResult.accommodationName} · {searchResult.checkIn} ~ {searchResult.checkOut} ({searchResult.nights}박)
                </p>
              </div>

              {searchResult.results.length === 0 ? (
                <div
                  className="text-center py-3xl rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px dashed var(--border-color)'
                  }}
                >
                  <p style={{ color: 'var(--text-secondary)' }}>
                    예약 가능한 객실이 없습니다
                  </p>
                </div>
              ) : (
                <RoomRateTable
                  roomRates={searchResult.results}
                  selectedRoomRate={selectedRoomRate}
                  onSelect={setSelectedRoomRate}
                />
              )}
            </div>
          )}

          {/* 검색 전 안내 */}
          {!searchResult && !isSearching && (
            <div
              className="text-center py-3xl rounded"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '2px dashed var(--border-color)'
              }}
            >
              <CalendarCheck className="w-3xl h-3xl mx-auto mb-md" style={{ color: 'var(--text-tertiary)' }} />
              <p className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                왼쪽 검색 폼에서 숙소와 날짜를 선택하여 검색해주세요
              </p>
            </div>
          )}

          {/* 로딩 */}
          {isSearching && (
            <div
              className="text-center py-3xl rounded"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <p style={{ color: 'var(--text-secondary)' }}>검색 중...</p>
            </div>
          )}

          {/* 예약자 정보 폼 (객실 선택 후) */}
          {selectedRoomRate && (
            <BookingForm onSubmit={handleBooking} isLoading={isBooking} />
          )}
        </div>
      </div>
    </div>
  )
}
