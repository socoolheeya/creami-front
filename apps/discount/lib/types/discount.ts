export type DiscountType = 'percentage' | 'fixed' // 퍼센트 할인 또는 정액 할인
export type DiscountTarget = 'all' | 'accommodation' | 'room' | 'rateplan' // 할인 적용 대상
export type DiscountStatus = 'active' | 'scheduled' | 'expired' | 'disabled' // 할인 상태
export type DiscountBusinessType = 'EARLYBIRD' | 'BASE_DISCOUNT' | 'LAST_MINUTES' | 'WELCOME' | 'VIP' | 'WEEKEND' | 'LONG_STAY' | 'SEASONAL' | 'TEST'

export interface Discount {
  id: string

  // 기본 정보
  name: string                    // 할인명 (예: "여름 특가 할인", "조기 예약 할인")
  code: string                    // 할인 코드 (쿠폰 코드)
  discountType?: DiscountBusinessType | string // 백엔드 할인 타입 (예: EARLYBIRD, BASE_DISCOUNT)
  description?: string            // 설명

  // 할인 타입
  type: DiscountType
  value: number                   // 퍼센트(%) 또는 금액(원)

  // 적용 대상
  target: DiscountTarget
  targetIds?: string[]            // 특정 숙소/객실/요금제 ID (target이 all이 아닐 경우)

  // 조건
  minPurchaseAmount?: number      // 최소 구매 금액
  maxDiscountAmount?: number      // 최대 할인 금액 (퍼센트 할인일 경우)

  // 사용 제한
  usageLimit?: number             // 전체 사용 가능 횟수
  usageLimitPerUser?: number      // 사용자당 사용 가능 횟수
  usedCount: number               // 현재까지 사용된 횟수

  // 기간
  startDate: Date
  endDate: Date

  // 상태
  status: DiscountStatus
  isPublic: boolean               // 공개 여부 (공개: 누구나 사용 가능, 비공개: 코드 입력 필요)

  // 메타데이터
  createdAt: Date
  updatedAt: Date
}

// 할인 생성/수정 폼 데이터
export interface DiscountFormData {
  name?: string
  code?: string
  description?: string
  type?: DiscountType
  value?: number
  target?: DiscountTarget
  targetIds?: string[]
  minPurchaseAmount?: number
  maxDiscountAmount?: number
  usageLimit?: number
  usageLimitPerUser?: number
  startDate?: Date
  endDate?: Date
  isPublic?: boolean
}

// 할인 타입 라벨
export const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  percentage: '퍼센트 할인',
  fixed: '정액 할인'
}

// 할인 대상 라벨
export const DISCOUNT_TARGET_LABELS: Record<DiscountTarget, string> = {
  all: '전체',
  accommodation: '특정 숙소',
  room: '특정 객실',
  rateplan: '특정 요금제'
}

// 할인 상태 라벨
export const DISCOUNT_STATUS_LABELS: Record<DiscountStatus, string> = {
  active: '활성',
  scheduled: '예정',
  expired: '만료',
  disabled: '비활성'
}
