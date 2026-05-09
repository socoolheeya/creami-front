'use client'

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Calendar, User, Building2, X } from 'lucide-react'
import Link from 'next/link'
import { mockBookings } from '@/lib/data/mock-bookings'
import {
  Button,
  DatePicker,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@creami/ui'

const BOOKING_LIST_FILTER_ENABLED = true

function FilterControl({
  children,
  onClear,
  disabled,
  label
}: {
  children: ReactNode
  onClear: () => void
  disabled: boolean
  label: string
}) {
  return (
    <div className="flex items-center gap-xs">
      <div className="min-w-0 flex-1">
        {children}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="mini"
        iconOnly
        onClick={onClear}
        disabled={disabled}
        aria-label={label}
        title={label}
      >
        <X className="h-md w-md" />
      </Button>
    </div>
  )
}

export default function BookingsPage() {
  const [bookingNumberFilter, setBookingNumberFilter] = useState('')
  const [guestNameFilter, setGuestNameFilter] = useState('')
  const [stayFilter, setStayFilter] = useState('')
  const [bookingDateFilter, setBookingDateFilter] = useState('')
  const [checkInFilter, setCheckInFilter] = useState('')
  const [checkOutFilter, setCheckOutFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statusConfig = {
    confirmed: { label: '확정', color: 'var(--success)', bgColor: 'var(--success-bg)' },
    pending: { label: '대기', color: 'var(--warning)', bgColor: 'var(--warning-bg)' },
    cancelled: { label: '취소', color: 'var(--error)', bgColor: 'var(--error-bg)' }
  }

  const bookings = useMemo(() => {
    const bookingNumber = bookingNumberFilter.trim().toLowerCase()
    const guestName = guestNameFilter.trim().toLowerCase()
    const stayKeyword = stayFilter.trim().toLowerCase()

    return mockBookings.filter((booking) => {
      const matchesBookingNumber = !bookingNumber || booking.bookingNumber.toLowerCase().includes(bookingNumber)
      const matchesGuestName = !guestName || booking.guestName.toLowerCase().includes(guestName)
      const matchesStay = !stayKeyword || [
        booking.accommodation,
        booking.roomType,
        booking.ratePlan
      ].some((value) => value.toLowerCase().includes(stayKeyword))
      const matchesBookingDate = !bookingDateFilter || booking.bookingDate === bookingDateFilter
      const matchesCheckIn = !checkInFilter || booking.checkIn === checkInFilter
      const matchesCheckOut = !checkOutFilter || booking.checkOut === checkOutFilter
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter

      return matchesBookingNumber && matchesGuestName && matchesStay && matchesBookingDate && matchesCheckIn && matchesCheckOut && matchesStatus
    })
  }, [bookingDateFilter, bookingNumberFilter, checkInFilter, checkOutFilter, guestNameFilter, statusFilter, stayFilter])

  const resetFilters = () => {
    setBookingNumberFilter('')
    setGuestNameFilter('')
    setStayFilter('')
    setBookingDateFilter('')
    setCheckInFilter('')
    setCheckOutFilter('')
    setStatusFilter('all')
  }

  return (
    <div>
      <div className="mb-lg flex flex-col gap-md xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex items-center gap-md mb-sm">
            <Calendar className="w-icon-lg h-icon-lg" style={{ color: 'var(--primary)' }} />
            <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              예약 목록
            </h1>
          </div>
          <p className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            전체 예약 내역을 확인하고 관리하세요
          </p>
        </div>
        <Link href="/bookings/new">
          <Button size="medium">
            새 예약 추가
          </Button>
        </Link>
      </div>

      <div
        className="rounded"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow)'
        }}
      >
        <Table overflow="visible">
          <TableHeader className="border-b border-border">
            <TableRow className="bg-bg-tertiary">
              <TableHead className="py-sm">예약 번호</TableHead>
              <TableHead className="py-sm">고객명</TableHead>
              <TableHead className="py-sm">숙소 / 객실 / 요금제</TableHead>
              <TableHead className="py-sm">예약일</TableHead>
              <TableHead className="py-sm">체크인</TableHead>
              <TableHead className="py-sm">체크아웃</TableHead>
              <TableHead className="py-sm">상태</TableHead>
              <TableHead className="py-sm" align="right">금액</TableHead>
            </TableRow>
            {BOOKING_LIST_FILTER_ENABLED && (
              <TableRow className="bg-bg-primary">
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setBookingNumberFilter('')}
                    disabled={!bookingNumberFilter}
                    label="예약 번호 필터 초기화"
                  >
                    <Input
                      size="small"
                      value={bookingNumberFilter}
                      onChange={(event) => setBookingNumberFilter(event.target.value)}
                      placeholder="예약번호"
                      aria-label="예약 번호 필터"
                    />
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setGuestNameFilter('')}
                    disabled={!guestNameFilter}
                    label="고객명 필터 초기화"
                  >
                    <Input
                      size="small"
                      value={guestNameFilter}
                      onChange={(event) => setGuestNameFilter(event.target.value)}
                      placeholder="고객명"
                      aria-label="고객명 필터"
                    />
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setStayFilter('')}
                    disabled={!stayFilter}
                    label="숙소 객실 요금제 필터 초기화"
                  >
                    <Input
                      size="small"
                      value={stayFilter}
                      onChange={(event) => setStayFilter(event.target.value)}
                      placeholder="숙소, 객실, 요금제"
                      aria-label="숙소 객실 요금제 필터"
                    />
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setBookingDateFilter('')}
                    disabled={!bookingDateFilter}
                    label="예약일 필터 초기화"
                  >
                    <DatePicker
                      size="small"
                      value={bookingDateFilter}
                      onChange={setBookingDateFilter}
                      placeholder="예약일"
                    />
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setCheckInFilter('')}
                    disabled={!checkInFilter}
                    label="체크인 필터 초기화"
                  >
                    <DatePicker
                      size="small"
                      value={checkInFilter}
                      onChange={setCheckInFilter}
                      placeholder="체크인"
                    />
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setCheckOutFilter('')}
                    disabled={!checkOutFilter}
                    label="체크아웃 필터 초기화"
                  >
                    <DatePicker
                      size="small"
                      value={checkOutFilter}
                      onChange={setCheckOutFilter}
                      placeholder="체크아웃"
                      align="right"
                    />
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm">
                  <FilterControl
                    onClear={() => setStatusFilter('all')}
                    disabled={statusFilter === 'all'}
                    label="예약 상태 필터 초기화"
                  >
                    <Select
                      size="small"
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      aria-label="예약 상태 필터"
                    >
                      <option value="all">전체 상태</option>
                      <option value="confirmed">확정</option>
                      <option value="pending">대기</option>
                      <option value="cancelled">취소</option>
                    </Select>
                  </FilterControl>
                </TableHead>
                <TableHead className="py-sm" align="right">
                  <Button type="button" size="small" variant="secondary" onClick={resetFilters}>
                    초기화
                  </Button>
                </TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const status = statusConfig[booking.status]
              return (
                <TableRow
                  key={booking.id}
                >
                  <TableCell className="py-sm">
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="flex items-center gap-sm text-base transition-colors"
                      style={{ color: 'var(--primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none'
                      }}
                    >
                      <Calendar className="w-md h-md" />
                      <span style={{ fontWeight: 'var(--font-medium)' }}>
                        {booking.bookingNumber}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell className="py-sm">
                    <div className="flex items-center gap-sm">
                      <User className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
                      <span className="text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {booking.guestName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-sm">
                    <div className="flex items-start gap-sm">
                      <Building2 className="w-md h-md mt-xs" style={{ color: 'var(--text-tertiary)' }} />
                      <div>
                        <div className="text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                          {booking.accommodation}
                        </div>
                        <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                          {booking.roomType} • {booking.ratePlan}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-sm">
                    <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                      {booking.bookingDate}
                    </span>
                  </TableCell>
                  <TableCell className="py-sm">
                    <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                      {booking.checkIn}
                    </span>
                  </TableCell>
                  <TableCell className="py-sm">
                    <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                      {booking.checkOut}
                    </span>
                  </TableCell>
                  <TableCell className="py-sm">
                    <span
                      className="inline-flex h-control-sm items-center rounded px-control-px-sm py-none text-base leading-none"
                      style={{
                        backgroundColor: status.bgColor,
                        color: status.color,
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="py-sm" align="right">
                    <span className="text-base" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                      ₩{booking.pricing.totalAmount.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell className="py-lg" align="center" colSpan={8}>
                  <span className="text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                    검색 결과가 없습니다.
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
