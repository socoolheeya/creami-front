export type AccommodationType = 'hotel' | 'motel' | 'pension' | 'guesthouse'

export type AccommodationStatus = 'active' | 'inactive'

export interface AccommodationImage {
  id: string
  url: string
  isPrimary: boolean
  order: number
}

export interface BillingPolicy {
  cancellationPolicy: string
  depositPolicy: string
  paymentMethods: string[]
}

export interface Accommodation {
  id: string

  // Step 1: 기본정보
  name: string
  type: AccommodationType
  address: string
  phone: string
  email: string
  checkIn: string  // "15:00"
  checkOut: string // "11:00"

  // Step 2: Description
  description: string
  amenities: string[]

  // Step 3: Images
  images: AccommodationImage[]

  // Step 4: Billing Policy
  billingPolicy: BillingPolicy

  status: AccommodationStatus
  createdAt: Date
  updatedAt: Date
}

// Wizard 폼 데이터 (각 단계별)
export interface AccommodationFormData {
  // Step 1
  name?: string
  type?: AccommodationType
  address?: string
  phone?: string
  email?: string
  checkIn?: string
  checkOut?: string

  // Step 2
  description?: string
  amenities?: string[]

  // Step 3
  images?: AccommodationImage[]

  // Step 4
  billingPolicy?: Partial<BillingPolicy>
}

// 편의시설 옵션
export const AMENITY_OPTIONS = [
  'WiFi',
  '주차장',
  '조식',
  '수영장',
  '피트니스',
  '레스토랑',
  '바/라운지',
  '스파',
  '비즈니스센터',
  '세탁 서비스',
  '룸서비스',
  '공항 셔틀'
] as const

// 결제 수단 옵션
export const PAYMENT_METHOD_OPTIONS = [
  '현금',
  '신용카드',
  '체크카드',
  '계좌이체',
  '간편결제'
] as const

// 숙소 타입 라벨
export const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, string> = {
  hotel: '호텔',
  motel: '모텔',
  pension: '펜션',
  guesthouse: '게스트하우스'
}
