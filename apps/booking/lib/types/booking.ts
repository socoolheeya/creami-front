export type BookingStatus = 'confirmed' | 'pending' | 'cancelled'

export interface AdditionalFee {
  name: string // 추가금 항목명 (예: 조식, 주차비, 스파 패키지)
  amount: number // 금액
}

export type DiscountType = 'basic' | 'earlybird' | 'lastminute' | 'freenight'

export interface Discount {
  type: DiscountType // 할인 종류
  name: string // 할인 항목명
  amount: number // 할인 금액 (양수)
}

export interface BookingPricing {
  baseAmount: number // 원금액
  baseAmountType: 'deposit' | 'selling' // 입금가 또는 판매가
  commission: number // 커미션 금액 (양수 - 더해짐)
  discounts: Discount[] // 할인 항목들
  additionalFees: AdditionalFee[] // 추가금 항목들
  totalAmount: number // 총액
}

export interface CancellationPolicyRule {
  daysBeforeCheckIn: number // 체크인 며칠 전
  refundPercentage: number // 환불 비율 (0-100)
  description: string // 설명
}

export interface CancellationPolicy {
  type: 'flexible' | 'moderate' | 'strict' | 'non-refundable' // 취소 정책 유형
  rules: CancellationPolicyRule[]
  additionalInfo?: string // 추가 안내사항
}

export interface Guest {
  name: string // 투숙객 이름
  type: 'adult' | 'child' | 'infant' // 투숙객 타입
  age?: number // 나이 (어린이/유아의 경우)
}

export interface RoomOccupancy {
  roomNumber: number // 객실 번호 (1, 2, 3, ...)
  guests: Guest[] // 해당 객실에 투숙하는 게스트 목록
}

export interface Booking {
  id: string
  bookingNumber: string
  channel: string // 예약 채널 (e.g., Booking.com, Agoda, Direct)
  supplierBookingNumber?: string // 공급사 예약 번호

  // 대표 예약자 정보
  guestName: string
  guestPhone: string
  guestEmail: string

  // 숙소 정보 (ID + 이름)
  accommodationId: string
  accommodation: string

  // 객실 정보 (ID + 이름)
  roomId: string
  roomType: string

  // 요금제 정보 (ID + 이름)
  ratePlanId: string
  ratePlan: string

  bookingDate: string // 예약일
  checkIn: string
  checkOut: string
  nights: number
  guests: number // 총 투숙 인원 수
  occupancies: RoomOccupancy[] // 실제 투숙 인원 상세 (객실별)
  status: BookingStatus
  pricing: BookingPricing
  cancellationPolicy: CancellationPolicy
  specialRequests?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
