export type PropertyType =
  | 'hotel'
  | 'resort'
  | 'motel'
  | 'rental_cottage'
  | 'guesthouse'
  | 'pension'
  | 'vacation_home'
  | 'apartment'
  | 'hostel'
  | 'bed_breakfast'
  | 'capsule_hotel'
  | 'camping'
  | 'glamping'
  | 'villa'
  | 'temple_stay'
  | 'farm_stay'
  | 'hanok_stay'
  | 'love_motel'
  | 'condo'
  | 'serviced_apartment'
  | 'boutique_hotel'
  | 'business_hotel'
  | 'family_hotel'
  | 'luxury_hotel'
  | 'budget_hotel'
  | 'eco_hotel'
  | 'other'

export type PropertyStatus = 'draft' | 'active' | 'inactive' | 'archived'

export interface PropertyImage {
  id: string
  name: string
  url: string
  isPrimary: boolean
  sortOrder: number
  altText?: string
}

export type ChargeType = 'percentage' | 'fixed'

export interface ChargeConfig {
  type: ChargeType
  value: number
}

export interface BillingPolicy {
  currency: string // 'KRW', 'USD', 'JPY', etc.
  paymentMethod?: string
  bankName?: string
  accountNumber?: string
  commission: ChargeConfig
  surcharge?: ChargeConfig
  tax?: ChargeConfig
}

export interface Property {
  id: string

  // Step 1: 기본정보
  name: string
  enName?: string
  type: PropertyType
  stars?: number

  // Address
  address: string
  addressDetail?: string
  city?: string
  countryCode?: string
  zipCode?: string

  // Location
  latitude?: number
  longitude?: number

  // Contact
  phone: string
  email?: string
  homepage?: string
  faxNumbers?: string[]

  // Check-in/out
  checkIn: string  // "15:00"
  checkOut: string // "11:00"

  // Language & Settings
  language?: string

  // Property Info
  roomCount?: number
  floorCount?: number

  // Step 2: Description
  description: string
  enDescription?: string
  amenities: string[]

  // Step 3: Images
  images: PropertyImage[]

  // Step 4: Billing Policy
  billingPolicy: BillingPolicy

  status: PropertyStatus
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}

// Wizard 폼 데이터 (각 단계별)
export interface PropertyFormData {
  // Step 1: 기본 정보
  name?: string
  enName?: string
  type?: PropertyType
  stars?: number

  // 주소 정보
  address?: string
  addressDetail?: string
  city?: string
  countryCode?: string
  zipCode?: string

  // 위치 정보
  latitude?: number
  longitude?: number

  // 연락처
  phone?: string
  email?: string

  // 체크인/아웃
  checkIn?: string
  checkOut?: string

  // 숙소 정보
  roomCount?: number
  floorCount?: number

  // Step 2: 상세 설명
  description?: string
  enDescription?: string
  amenities?: string[]

  // Step 3: 이미지
  images?: PropertyImage[]

  // Step 4: 요금 정책
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

// 통화 옵션
export const CURRENCY_OPTIONS = [
  { code: 'KRW', name: '원 (₩)', symbol: '₩' },
  { code: 'USD', name: '달러 ($)', symbol: '$' },
  { code: 'JPY', name: '엔 (¥)', symbol: '¥' },
  { code: 'EUR', name: '유로 (€)', symbol: '€' },
  { code: 'CNY', name: '위안 (¥)', symbol: '¥' }
] as const

// 숙소 타입 라벨
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  hotel: '호텔',
  resort: '리조트',
  motel: '모텔',
  rental_cottage: '렌탈 코티지',
  guesthouse: '게스트하우스',
  pension: '펜션',
  vacation_home: '휴가용 주택',
  apartment: '아파트',
  hostel: '호스텔',
  bed_breakfast: 'B&B',
  capsule_hotel: '캡슐 호텔',
  camping: '캠핑장',
  glamping: '글램핑',
  villa: '빌라',
  temple_stay: '템플스테이',
  farm_stay: '농어촌 민박',
  hanok_stay: '한옥스테이',
  love_motel: '러브 모텔',
  condo: '콘도',
  serviced_apartment: '서비스 아파트',
  boutique_hotel: '부티크 호텔',
  business_hotel: '비즈니스 호텔',
  family_hotel: '가족 호텔',
  luxury_hotel: '럭셔리 호텔',
  budget_hotel: '저예산 호텔',
  eco_hotel: '에코 호텔',
  other: '기타'
}
