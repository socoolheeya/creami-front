// Rate Plan Types based on backend schema

export type RatePlanType = 'standalone' | 'package' | 'business' | 'opaque' | 'b2b'
export type RatePlanStatus = 'draft' | 'active' | 'inactive' | 'archived'
export type MealPlan = 'none' | 'breakfast' | 'lunch' | 'dinner' | 'all_inclusive' | 'breakfast_and_lunch' | 'lunch_and_dinner' | 'bed_and_breakfast' | 'buffet_breakfast'
export type CancellationPenaltyUnit = 'percentage' | 'fixed'

export interface RatePlan {
  id: string
  roomId?: string
  name: string
  enName?: string
  benefitName: string
  ratePlanType: RatePlanType
  status: RatePlanStatus
  mealPlan: MealPlan
  enabled: boolean

  // Related data
  description?: RatePlanDescription
  setting?: RatePlanSetting
  salePeriod?: RatePlanSalePeriod
  cancellationPolicies: RatePlanCancellationPolicy[]

  createdAt: Date
  updatedAt: Date
}

export interface RatePlanDescription {
  description?: string
  enDescription?: string
  benefitName?: string
}

export interface RatePlanSetting {
  allotment: number
  minLos: number  // minimum length of stay
  maxLos: number  // maximum length of stay
  minThroughDays: number
  maxThroughDays: number
  minAdvanceDays: number
  maxAdvanceDays: number
  closedToArrival: boolean
  closedToDeparture: boolean
}

export interface RatePlanSalePeriod {
  bookingStartDate?: string
  bookingEndDate?: string
  stayStartDate?: string
  stayEndDate?: string
}

export interface RatePlanCancellationPolicy {
  id?: string
  name: string
  startDateTime: string
  endDateTime: string
  priority: number
  sunday: boolean
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  penalties: RatePlanCancellationPenalty[]
}

export interface RatePlanCancellationPenalty {
  id?: string
  days: number
  unit: CancellationPenaltyUnit
  amount: number
  currencyUnit?: string
}

export const RATE_PLAN_TYPE_LABELS: Record<RatePlanType, string> = {
  standalone: '호텔 전용',
  package: '패키지 혼합',
  business: '비즈니스 계약용',
  opaque: '비공개 할인 노출',
  b2b: 'B2B 전용'
}

export const MEAL_PLAN_LABELS: Record<MealPlan, string> = {
  none: '식사 미포함',
  breakfast: '조식',
  lunch: '중식',
  dinner: '석식',
  all_inclusive: '올인클루시브',
  breakfast_and_lunch: '조식 & 중식',
  lunch_and_dinner: '중식 & 석식',
  bed_and_breakfast: '숙박 & 조식',
  buffet_breakfast: '뷔페 조식'
}

export const RATE_PLAN_STATUS_LABELS: Record<RatePlanStatus, string> = {
  draft: '초안',
  active: '활성',
  inactive: '비활성',
  archived: '보관'
}
