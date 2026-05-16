'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, User, Building2, Phone, Mail, Users, BedDouble, ChevronRight, Plus, Minus, DollarSign, AlertCircle, Shield, Globe, X, Ban } from 'lucide-react'
import { cancelBooking, fetchBookingById, getBookingApiErrorMessage } from '@/lib/api/bookings'
import type { Booking } from '@/lib/types/booking'
import { Button } from '@creami/ui'

const DAY_IN_MS = 1000 * 60 * 60 * 24

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadBooking() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const result = await fetchBookingById(bookingId)
        if (!cancelled) {
          setBooking(result)
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(getBookingApiErrorMessage(error, '예약 상세를 불러오지 못했습니다.'))
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadBooking()

    return () => {
      cancelled = true
    }
  }, [bookingId])

  // Helper function to calculate cancellation deadline date
  const getCancellationDeadline = (checkInDate: string, daysBeforeCheckIn: number): Date => {
    const checkIn = new Date(checkInDate)
    const deadline = new Date(checkIn)
    deadline.setDate(checkIn.getDate() - daysBeforeCheckIn)
    return deadline
  }

  // Helper function to calculate penalty amount
  const calculatePenaltyAmount = (totalAmount: number, refundPercentage: number): number => {
    return Math.round(totalAmount * (100 - refundPercentage) / 100)
  }

  const getDaysUntilCheckIn = (checkInDate: string): number => {
    const today = new Date()
    const checkIn = new Date(checkInDate)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const checkInStart = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate())

    return Math.max(0, Math.ceil((checkInStart.getTime() - todayStart.getTime()) / DAY_IN_MS))
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          예약 상세를 불러오는 중입니다.
        </p>
      </div>
    )
  }

  if (!booking || errorMessage) {
    return (
      <div>
        <div className="text-center">
          <h1 className="text-2xl mb-md" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {errorMessage || '예약을 찾을 수 없습니다'}
          </h1>
          <Button type="button" onClick={() => router.push('/bookings')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  const statusConfig = {
    confirmed: { label: '확정', color: 'var(--success)', bgColor: 'var(--success-bg)' },
    pending: { label: '대기', color: 'var(--warning)', bgColor: 'var(--warning-bg)' },
    cancelled: { label: '취소', color: 'var(--error)', bgColor: 'var(--error-bg)' }
  }

  const status = statusConfig[booking.status]

  const policyTypeConfig = {
    flexible: { label: '유연함', color: 'var(--success)', bgColor: 'var(--success-bg)' },
    moderate: { label: '보통', color: 'var(--warning)', bgColor: 'var(--warning-bg)' },
    strict: { label: '엄격함', color: 'var(--error)', bgColor: 'var(--error-bg)' },
    'non-refundable': { label: '환불불가', color: 'var(--text-secondary)', bgColor: 'var(--bg-tertiary)' }
  }

  const policyType = policyTypeConfig[booking.cancellationPolicy.type]
  const daysUntilCheckIn = getDaysUntilCheckIn(booking.checkIn)
  const applicableCancellationRule = [...booking.cancellationPolicy.rules]
    .sort((a, b) => b.daysBeforeCheckIn - a.daysBeforeCheckIn)
    .find(rule => daysUntilCheckIn >= rule.daysBeforeCheckIn) ?? booking.cancellationPolicy.rules[booking.cancellationPolicy.rules.length - 1]
  const cancellationPenaltyAmount = calculatePenaltyAmount(booking.pricing.totalAmount, applicableCancellationRule.refundPercentage)
  const cancellationRefundAmount = booking.pricing.totalAmount - cancellationPenaltyAmount

  const handleConfirmCancellation = async () => {
    try {
      await cancelBooking({
        bookingId: booking.id,
        bookingAmount: booking.pricing.totalAmount,
        penaltyAmount: cancellationPenaltyAmount,
        refundAmount: cancellationRefundAmount,
        reason: '고객 요청'
      })
      setBooking({ ...booking, status: 'cancelled' })
      setIsCancelPopupOpen(false)
      alert('예약 취소가 확정되었습니다')
    } catch (error) {
      alert(getBookingApiErrorMessage(error, '예약 취소 중 오류가 발생했습니다'))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-lg">
        <button
          onClick={() => router.push('/bookings')}
          className="mb-md flex h-control-md items-center gap-sm rounded border-none bg-transparent px-none py-none text-base leading-none transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          <ArrowLeft className="w-icon-md h-icon-md" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>목록으로</span>
        </button>

        <div className="flex items-start justify-between gap-md">
          <div>
            <div className="flex items-center gap-md mb-sm">
              <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {booking.bookingNumber}
              </h1>
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
            </div>
            <div className="mt-sm flex flex-wrap items-center gap-md text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
              <span>예약일: {new Date(booking.bookingDate).toLocaleDateString('ko-KR')}</span>
              <span>•</span>
              <div className="flex items-center gap-sm">
                <Globe className="w-md h-md" />
                <span>채널: {booking.channel}</span>
              </div>
              {booking.supplierBookingNumber && (
                <>
                  <span>•</span>
                  <span>공급사 번호: {booking.supplierBookingNumber}</span>
                </>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="medium"
            disabled={booking.status === 'cancelled'}
            className={booking.status === 'cancelled' ? '' : 'bg-error text-white hover:opacity-90'}
            onClick={() => setIsCancelPopupOpen(true)}
          >
            <Ban className="h-icon-md w-icon-md" />
            예약 취소
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-3">
        {/* Left Column - 예약 정보 */}
        <div className="space-y-lg xl:col-span-2">
          {/* 숙박 정보 */}
          <div
            className="p-lg rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-md" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              숙박 정보
            </h2>

            <div className="space-y-md">
              <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
                <div className="flex items-start gap-md">
                  <Building2 className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>숙소</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.accommodation}
                    </div>
                    <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                      ID: {booking.accommodationId}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <BedDouble className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>객실 타입</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.roomType}
                    </div>
                    <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                      ID: {booking.roomId}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <DollarSign className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>요금제</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.ratePlan}
                    </div>
                    <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                      ID: {booking.ratePlanId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
                <div className="flex items-start gap-md">
                  <Calendar className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>예약일</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {new Date(booking.bookingDate).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <Calendar className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>체크인 / 체크아웃</div>
                    <div className="flex items-center gap-sm text-base">
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {new Date(booking.checkIn).toLocaleDateString('ko-KR')}
                      </span>
                      <ChevronRight className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {new Date(booking.checkOut).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <div className="text-base mt-xs" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                      {booking.nights}박 {booking.nights + 1}일
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <Users className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>투숙 인원</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      총 {booking.guests}명
                    </div>
                    <div className="mt-xs space-y-xs">
                      {booking.occupancies.map((roomOcc, roomIdx) => (
                        <div key={roomIdx} className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                          객실 {roomOcc.roomNumber}: {roomOcc.guests.length}명
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div
                  className="p-md rounded mt-md"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-medium)' }}>
                    특별 요청사항
                  </div>
                  <div className="text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {booking.specialRequests}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 고객 정보 */}
          <div
            className="p-lg rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-md" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              고객 정보
            </h2>

            <div className="space-y-md">
              {/* 대표 예약자 정보 */}
              <div>
                <div className="text-base mb-sm" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase' }}>
                  대표 예약자
                </div>
                <div className="grid grid-cols-1 gap-md md:grid-cols-3">
                  <div className="flex items-start gap-md">
                    <User className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                    <div>
                      <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>예약자명</div>
                      <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {booking.guestName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-md">
                    <Phone className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                    <div>
                      <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>연락처</div>
                      <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {booking.guestPhone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-md">
                    <Mail className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                    <div>
                      <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>이메일</div>
                      <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {booking.guestEmail}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 구분선 */}
              <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

              {/* 실제 투숙 인원 */}
              <div>
                <div className="text-base mb-sm" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase' }}>
                  실제 투숙 인원
                </div>
                <div className="flex items-start gap-md">
                  <Users className="w-icon-md h-icon-md mt-xs" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-base mb-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>총 인원</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.guests}명
                    </div>
                    <div className="mt-sm space-y-sm">
                      {booking.occupancies.map((roomOcc, roomIdx) => (
                        <div key={roomIdx}>
                          <div className="text-base mb-xs" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                            객실 {roomOcc.roomNumber}
                          </div>
                          <div className="space-y-xs ml-md">
                            {roomOcc.guests.map((guest, guestIdx) => {
                              const typeLabel = guest.type === 'adult' ? '성인' : guest.type === 'child' ? '어린이' : '유아'
                              const ageInfo = guest.age ? ` (${guest.age}세)` : ''
                              return (
                                <div key={guestIdx} className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                                  • {guest.name} - {typeLabel}{ageInfo}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 취소규정 */}
          <div
            className="p-lg rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div className="flex items-center justify-between mb-md gap-md">
              <h2 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                취소 및 환불 규정
              </h2>
              <span
                className="inline-flex h-control-sm items-center rounded px-control-px-sm py-none text-base leading-none"
                style={{
                  backgroundColor: policyType.bgColor,
                  color: policyType.color,
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {policyType.label}
              </span>
            </div>

            <div className="space-y-md">
              {booking.cancellationPolicy.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-md p-md rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <Shield
                    className="w-icon-md h-icon-md mt-xs flex-shrink-0"
                    style={{
                      color: rule.refundPercentage === 100 ? 'var(--success)' :
                             rule.refundPercentage >= 50 ? 'var(--warning)' :
                             rule.refundPercentage > 0 ? 'var(--primary)' : 'var(--error)'
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-sm mb-xs">
                      <span className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {rule.description}
                      </span>
                      {rule.refundPercentage > 0 && (
                        <span
                          className="inline-flex h-control-mini items-center rounded px-control-px-mini py-none text-base leading-none"
                          style={{
                            backgroundColor: rule.refundPercentage === 100 ? 'var(--success-bg)' :
                                           rule.refundPercentage >= 50 ? 'var(--warning-bg)' : 'var(--primary-bg)',
                            color: rule.refundPercentage === 100 ? 'var(--success)' :
                                   rule.refundPercentage >= 50 ? 'var(--warning)' : 'var(--primary)',
                            fontWeight: 'var(--font-bold)'
                          }}
                        >
                          {rule.refundPercentage}% 환불
                        </span>
                      )}
                      {rule.refundPercentage === 0 && (
                        <span
                          className="inline-flex h-control-mini items-center rounded px-control-px-mini py-none text-base leading-none"
                          style={{
                            backgroundColor: 'var(--error-bg)',
                            color: 'var(--error)',
                            fontWeight: 'var(--font-bold)'
                          }}
                        >
                          환불 불가
                        </span>
                      )}
                    </div>

                    {/* 실제 취소 마감일 표시 */}
                    {rule.daysBeforeCheckIn > 0 && (
                      <div className="text-base mt-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                        {getCancellationDeadline(booking.checkIn, rule.daysBeforeCheckIn).toLocaleDateString('ko-KR')}까지
                      </div>
                    )}

                    {/* 위약금 표시 */}
                    {rule.refundPercentage < 100 && (
                      <div className="flex flex-wrap items-center gap-sm mt-xs">
                        <span className="text-base" style={{ color: 'var(--error)', fontWeight: 'var(--font-medium)' }}>
                          위약금: ₩{calculatePenaltyAmount(booking.pricing.totalAmount, rule.refundPercentage).toLocaleString()}
                        </span>
                        <span className="text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                          (환불금: ₩{Math.round(booking.pricing.totalAmount * rule.refundPercentage / 100).toLocaleString()})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {booking.cancellationPolicy.additionalInfo && (
              <div
                className="mt-md p-md rounded flex items-start gap-md"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius)',
                  borderLeft: '1px solid var(--primary)'
                }}
              >
                <AlertCircle className="w-icon-md h-icon-md mt-xs flex-shrink-0" style={{ color: 'var(--primary)' }} />
                <div>
                  <div className="text-base mb-xs" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                    주의사항
                  </div>
                  <div className="text-base" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: 'var(--font-light)' }}>
                    {booking.cancellationPolicy.additionalInfo}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - 금액 정보 */}
        <div>
          <div
            className="sticky top-lg p-lg rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-lg" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              금액 정보
            </h2>

            <div className="space-y-md mb-lg">
              {/* 원금액 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <DollarSign className="w-md h-md" style={{ color: 'var(--text-tertiary)' }} />
                  <div className="flex items-center gap-sm">
                    <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>원금액</span>
                    <span
                      className="inline-flex h-control-mini items-center rounded px-control-px-mini py-none text-base leading-none"
                      style={{
                        backgroundColor: booking.pricing.baseAmountType === 'deposit' ? 'var(--primary-bg)' : 'var(--warning-bg)',
                        color: booking.pricing.baseAmountType === 'deposit' ? 'var(--primary)' : 'var(--warning)',
                        fontWeight: 'var(--font-bold)'
                      }}
                    >
                      {booking.pricing.baseAmountType === 'deposit' ? '입금가' : '판매가'}
                    </span>
                  </div>
                </div>
                <span className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                  ₩{booking.pricing.baseAmount.toLocaleString()}
                </span>
              </div>

              {/* 커미션 */}
              {booking.pricing.commission !== 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <Plus className="w-md h-md" style={{ color: 'var(--success)' }} />
                    <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>커미션</span>
                  </div>
                  <span className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--success)' }}>
                    +₩{booking.pricing.commission.toLocaleString()}
                  </span>
                </div>
              )}

              {/* 할인 - 통합 표시 */}
              {booking.pricing.discounts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-sm">
                      <Minus className="w-md h-md" style={{ color: 'var(--error)' }} />
                      <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>할인</span>
                    </div>
                    <span className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--error)' }}>
                      -₩{booking.pricing.discounts.reduce((sum, disc) => sum + disc.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  {/* 할인 세부내역 */}
                  <div className="ml-lg mt-sm space-y-xs">
                    {booking.pricing.discounts.map((discount, index) => {
                      const discountTypeConfig = {
                        basic: { label: 'Basic', color: 'var(--text-secondary)', bgColor: 'var(--bg-tertiary)' },
                        earlybird: { label: 'EarlyBird', color: 'var(--success)', bgColor: 'var(--success-bg)' },
                        lastminute: { label: 'LastMinute', color: 'var(--warning)', bgColor: 'var(--warning-bg)' },
                        freenight: { label: 'FreeNight', color: 'var(--primary)', bgColor: 'var(--primary-bg)' }
                      }
                      const typeStyle = discountTypeConfig[discount.type]

                      return (
                        <div key={index} className="flex items-center justify-between text-base">
                          <div className="flex items-center gap-sm">
                            <span style={{ color: 'var(--text-tertiary)' }}>- {discount.name}</span>
                            <span
                              className="inline-flex h-control-mini items-center rounded px-control-px-mini py-none text-base leading-none"
                              style={{
                                backgroundColor: typeStyle.bgColor,
                                color: typeStyle.color,
                                fontWeight: 'var(--font-bold)'
                              }}
                            >
                              {typeStyle.label}
                            </span>
                          </div>
                          <span style={{ color: 'var(--text-tertiary)' }}>₩{discount.amount.toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 추가금 - 통합 표시 */}
              {booking.pricing.additionalFees.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-sm">
                      <Plus className="w-md h-md" style={{ color: 'var(--success)' }} />
                      <span className="text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>추가금</span>
                    </div>
                    <span className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--success)' }}>
                      +₩{booking.pricing.additionalFees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  {/* 추가금 세부내역 */}
                  <div className="ml-lg mt-sm space-y-xs">
                    {booking.pricing.additionalFees.map((fee, index) => (
                      <div key={index} className="flex items-center justify-between text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                        <span>- {fee.name}</span>
                        <span>₩{fee.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 구분선 */}
            <div
              className="my-lg"
              style={{
                height: '1px',
                backgroundColor: 'var(--border-color)'
              }}
            />

            {/* 총액 */}
            <div className="flex items-center justify-between">
              <span className="text-lg" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                총액
              </span>
              <span className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--primary)' }}>
                ₩{booking.pricing.totalAmount.toLocaleString()}
              </span>
            </div>

            {/* 계산식 설명 */}
            <div
              className="mt-lg p-md rounded text-base"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              <div className="mb-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                계산식
              </div>
              <div>
                원금액
                {booking.pricing.commission !== 0 && ` + 커미션`}
                {booking.pricing.discounts.length > 0 && ` - 할인`}
                {booking.pricing.additionalFees.length > 0 && ` + 추가금`}
                {' = 총액'}
              </div>
              <div className="mt-sm text-base">
                ₩{booking.pricing.baseAmount.toLocaleString()}
                {booking.pricing.commission !== 0 && ` + ₩${booking.pricing.commission.toLocaleString()}`}
                {booking.pricing.discounts.length > 0 && ` - ₩${booking.pricing.discounts.reduce((sum, disc) => sum + disc.amount, 0).toLocaleString()}`}
                {booking.pricing.additionalFees.length > 0 && ` + ₩${booking.pricing.additionalFees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}`}
                {' = ₩' + booking.pricing.totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCancelPopupOpen && (
        <div className="booking-cancel-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cancel-popup-title">
          <div className="booking-cancel-modal">
            <div className="flex items-start justify-between gap-md border-b border-border p-lg">
              <div>
                <h2 id="cancel-popup-title" className="text-xl font-bold text-text-primary">
                  예약 취소
                </h2>
                <p className="mt-xs text-base font-light text-text-secondary">
                  취소 규정에 따라 계산된 취소 금액을 확인해주세요.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-sm">
                <Button
                  type="button"
                  variant="primary"
                  size="small"
                  onClick={handleConfirmCancellation}
                >
                  취소확정
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={() => setIsCancelPopupOpen(false)}
                >
                  <X className="h-icon-md w-icon-md" />
                  닫기
                </Button>
              </div>
            </div>

            <div className="space-y-lg p-lg">
              <div className="grid grid-cols-1 gap-md md:grid-cols-3">
                <div className="booking-cancel-rule-card p-md">
                  <p className="text-base font-light text-text-secondary">
                    예약 금액
                  </p>
                  <p className="mt-xs text-xl font-bold text-text-primary">
                    ₩{booking.pricing.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="booking-cancel-rule-card p-md">
                  <p className="text-base font-light text-text-secondary">
                    취소 금액
                  </p>
                  <p className="mt-xs text-xl font-bold text-error">
                    ₩{cancellationPenaltyAmount.toLocaleString()}
                  </p>
                </div>
                <div className="booking-cancel-rule-card p-md">
                  <p className="text-base font-light text-text-secondary">
                    환불 금액
                  </p>
                  <p className="mt-xs text-xl font-bold text-primary">
                    ₩{cancellationRefundAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="booking-cancel-rule-card p-md">
                <div className="mb-sm flex flex-wrap items-center justify-between gap-sm">
                  <h3 className="text-lg font-bold text-text-primary">
                    적용된 취소 규정
                  </h3>
                  <span className="inline-flex h-control-sm items-center rounded bg-bg-tertiary px-control-px-sm py-none text-base font-medium leading-none text-text-secondary">
                    체크인 {daysUntilCheckIn}일 전
                  </span>
                </div>
                <p className="text-base font-medium text-text-primary">
                  {applicableCancellationRule.description}
                </p>
                <div className="mt-sm flex flex-wrap items-center gap-sm">
                  <span className="inline-flex h-control-sm items-center rounded bg-primary-bg px-control-px-sm py-none text-base font-bold leading-none text-primary">
                    {applicableCancellationRule.refundPercentage}% 환불
                  </span>
                  <span className="text-base font-light text-text-secondary">
                    취소 금액은 총액의 {100 - applicableCancellationRule.refundPercentage}%입니다.
                  </span>
                </div>
              </div>

              {booking.cancellationPolicy.additionalInfo && (
                <div className="flex items-start gap-md rounded bg-bg-tertiary p-md">
                  <AlertCircle className="mt-xs h-icon-md w-icon-md shrink-0 text-primary" />
                  <div>
                    <p className="text-base font-bold text-text-primary">
                      주의사항
                    </p>
                    <p className="mt-xs text-base font-light text-text-secondary">
                      {booking.cancellationPolicy.additionalInfo}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
