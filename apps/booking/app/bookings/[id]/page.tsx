'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, User, Building2, Clock, Phone, Mail, Users, BedDouble, ChevronRight, Plus, Minus, DollarSign, AlertCircle, Shield, Globe } from 'lucide-react'
import { getBookingById } from '@/lib/data/mock-bookings'

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const booking = getBookingById(bookingId)

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

  if (!booking) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            예약을 찾을 수 없습니다
          </h1>
          <button
            onClick={() => router.push('/bookings')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const statusConfig = {
    confirmed: { label: '확정', color: '#10b981', bgColor: '#d1fae5' },
    pending: { label: '대기', color: '#f59e0b', bgColor: '#fef3c7' },
    cancelled: { label: '취소', color: '#ef4444', bgColor: '#fee2e2' }
  }

  const status = statusConfig[booking.status]

  const policyTypeConfig = {
    flexible: { label: '유연함', color: '#10b981', bgColor: '#d1fae5' },
    moderate: { label: '보통', color: '#f59e0b', bgColor: '#fef3c7' },
    strict: { label: '엄격함', color: '#ef4444', bgColor: '#fee2e2' },
    'non-refundable': { label: '환불불가', color: '#6b7280', bgColor: '#f3f4f6' }
  }

  const policyType = policyTypeConfig[booking.cancellationPolicy.type]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/bookings')}
          className="flex items-center gap-2 mb-4 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>목록으로</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {booking.bookingNumber}
              </h1>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: status.bgColor,
                  color: status.color,
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {status.label}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2" style={{ color: 'var(--text-secondary)' }}>
              <span>예약일: {new Date(booking.bookingDate).toLocaleDateString('ko-KR')}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
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
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - 예약 정보 */}
        <div className="col-span-2 space-y-6">
          {/* 숙박 정보 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              숙박 정보
            </h2>

            <div className="space-y-4">
              {/* 숙소 */}
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                <div>
                  <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>숙소</div>
                  <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                    {booking.accommodation}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                    ID: {booking.accommodationId}
                  </div>
                </div>
              </div>

              {/* 객실 타입과 요금제 (가로 배치) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <BedDouble className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>객실 타입</div>
                    <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.roomType}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      ID: {booking.roomId}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>요금제</div>
                    <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.ratePlan}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      ID: {booking.ratePlanId}
                    </div>
                  </div>
                </div>
              </div>

              {/* 체크인/체크아웃과 투숙 인원 (가로 배치) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>체크인 / 체크아웃</div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {new Date(booking.checkIn).toLocaleDateString('ko-KR')}
                      </span>
                      <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {new Date(booking.checkOut).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {booking.nights}박 {booking.nights + 1}일
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>투숙 인원</div>
                    <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      총 {booking.guests}명
                    </div>
                    <div className="mt-1 space-y-1">
                      {booking.occupancies.map((roomOcc, roomIdx) => (
                        <div key={roomIdx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          객실 {roomOcc.roomNumber}: {roomOcc.guests.length}명
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div
                  className="p-4 rounded-lg mt-4"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-medium)' }}>
                    특별 요청사항
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    {booking.specialRequests}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 고객 정보 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              고객 정보
            </h2>

            <div className="space-y-4">
              {/* 대표 예약자 정보 */}
              <div>
                <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  대표 예약자
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                    <div>
                      <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>예약자명</div>
                      <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {booking.guestName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                    <div>
                      <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>연락처</div>
                      <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {booking.guestPhone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                    <div>
                      <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>이메일</div>
                      <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
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
                <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  실제 투숙 인원
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>총 인원</div>
                    <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {booking.guests}명
                    </div>
                    <div className="mt-2 space-y-2">
                      {booking.occupancies.map((roomOcc, roomIdx) => (
                        <div key={roomIdx}>
                          <div className="text-sm mb-1" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                            객실 {roomOcc.roomNumber}
                          </div>
                          <div className="space-y-1 ml-2">
                            {roomOcc.guests.map((guest, guestIdx) => {
                              const typeLabel = guest.type === 'adult' ? '성인' : guest.type === 'child' ? '어린이' : '유아'
                              const ageInfo = guest.age ? ` (${guest.age}세)` : ''
                              return (
                                <div key={guestIdx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
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
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                취소 및 환불 규정
              </h2>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: policyType.bgColor,
                  color: policyType.color,
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {policyType.label}
              </span>
            </div>

            <div className="space-y-3">
              {booking.cancellationPolicy.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <Shield
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{
                      color: rule.refundPercentage === 100 ? '#10b981' :
                             rule.refundPercentage >= 50 ? '#f59e0b' :
                             rule.refundPercentage > 0 ? '#f97316' : '#ef4444'
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {rule.description}
                      </span>
                      {rule.refundPercentage > 0 && (
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: rule.refundPercentage === 100 ? '#d1fae5' :
                                           rule.refundPercentage >= 50 ? '#fef3c7' : '#fed7aa',
                            color: rule.refundPercentage === 100 ? '#10b981' :
                                   rule.refundPercentage >= 50 ? '#f59e0b' : '#f97316',
                            fontWeight: 'var(--font-bold)'
                          }}
                        >
                          {rule.refundPercentage}% 환불
                        </span>
                      )}
                      {rule.refundPercentage === 0 && (
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: '#fee2e2',
                            color: '#ef4444',
                            fontWeight: 'var(--font-bold)'
                          }}
                        >
                          환불 불가
                        </span>
                      )}
                    </div>

                    {/* 실제 취소 마감일 표시 */}
                    {rule.daysBeforeCheckIn > 0 && (
                      <div className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                        {getCancellationDeadline(booking.checkIn, rule.daysBeforeCheckIn).toLocaleDateString('ko-KR')}까지
                      </div>
                    )}

                    {/* 위약금 표시 */}
                    {rule.refundPercentage < 100 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm" style={{ color: '#ef4444', fontWeight: 'var(--font-medium)' }}>
                          위약금: ₩{calculatePenaltyAmount(booking.pricing.totalAmount, rule.refundPercentage).toLocaleString()}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
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
                className="mt-4 p-4 rounded-lg flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--primary)'
                }}
              >
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                <div>
                  <div className="text-sm mb-1" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                    주의사항
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {booking.cancellationPolicy.additionalInfo}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - 금액 정보 */}
        <div className="col-span-1">
          <div
            className="p-6 rounded-lg sticky top-8"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-6" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              금액 정보
            </h2>

            <div className="space-y-4 mb-6">
              {/* 원금액 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--text-secondary)' }}>원금액</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: booking.pricing.baseAmountType === 'deposit' ? '#dbeafe' : '#fef3c7',
                        color: booking.pricing.baseAmountType === 'deposit' ? '#3b82f6' : '#f59e0b',
                        fontWeight: 'var(--font-bold)'
                      }}
                    >
                      {booking.pricing.baseAmountType === 'deposit' ? '입금가' : '판매가'}
                    </span>
                  </div>
                </div>
                <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                  ₩{booking.pricing.baseAmount.toLocaleString()}
                </span>
              </div>

              {/* 커미션 */}
              {booking.pricing.commission !== 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" style={{ color: '#10b981' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>커미션</span>
                  </div>
                  <span style={{ fontWeight: 'var(--font-medium)', color: '#10b981' }}>
                    +₩{booking.pricing.commission.toLocaleString()}
                  </span>
                </div>
              )}

              {/* 할인 - 통합 표시 */}
              {booking.pricing.discounts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Minus className="w-4 h-4" style={{ color: '#ef4444' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>할인</span>
                    </div>
                    <span style={{ fontWeight: 'var(--font-medium)', color: '#ef4444' }}>
                      -₩{booking.pricing.discounts.reduce((sum, disc) => sum + disc.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  {/* 할인 세부내역 */}
                  <div className="ml-6 mt-2 space-y-1">
                    {booking.pricing.discounts.map((discount, index) => {
                      const discountTypeConfig = {
                        basic: { label: 'Basic', color: '#6b7280', bgColor: '#f3f4f6' },
                        earlybird: { label: 'EarlyBird', color: '#10b981', bgColor: '#d1fae5' },
                        lastminute: { label: 'LastMinute', color: '#f59e0b', bgColor: '#fef3c7' },
                        freenight: { label: 'FreeNight', color: '#8b5cf6', bgColor: '#ede9fe' }
                      }
                      const typeStyle = discountTypeConfig[discount.type]

                      return (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span style={{ color: 'var(--text-tertiary)' }}>- {discount.name}</span>
                            <span
                              className="px-2 py-0.5 rounded text-xs"
                              style={{
                                backgroundColor: typeStyle.bgColor,
                                color: typeStyle.color,
                                fontWeight: 'var(--font-bold)',
                                fontSize: '10px'
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
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" style={{ color: '#10b981' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>추가금</span>
                    </div>
                    <span style={{ fontWeight: 'var(--font-medium)', color: '#10b981' }}>
                      +₩{booking.pricing.additionalFees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  {/* 추가금 세부내역 */}
                  <div className="ml-6 mt-2 space-y-1">
                    {booking.pricing.additionalFees.map((fee, index) => (
                      <div key={index} className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
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
              className="my-6"
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
              className="mt-6 p-4 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)'
              }}
            >
              <div className="mb-2" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                계산식
              </div>
              <div>
                원금액
                {booking.pricing.commission !== 0 && ` + 커미션`}
                {booking.pricing.discounts.length > 0 && ` - 할인`}
                {booking.pricing.additionalFees.length > 0 && ` + 추가금`}
                {' = 총액'}
              </div>
              <div className="mt-2 text-xs">
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
    </div>
  )
}
