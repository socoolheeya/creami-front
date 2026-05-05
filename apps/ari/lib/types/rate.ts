export type RateStatus = 'active' | 'inactive' | 'scheduled' | 'expired'

export type RateType = 'standard' | 'corporate' | 'government' | 'promotional' | 'package' | 'group'

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface OccupancyRate {
  occupancy: number // 1, 2, 3, 4...
  rate: number
}

export interface DailyRate {
  dayOfWeek: DayOfWeek
  baseRate: number
  occupancyRates?: OccupancyRate[]
}

export interface SeasonalRate {
  id: string
  name: string
  startDate: Date
  endDate: Date
  dailyRates: DailyRate[]
}

export interface Rate {
  id: string
  code: string // Rate code (e.g., "BAR", "CORP01", "PROMO2024")
  name: string
  description?: string
  type: RateType

  // Room Type
  roomTypeId?: string
  roomTypeName?: string

  // Date Range
  startDate: Date
  endDate: Date

  // Base pricing
  currency: string
  baseRate: number

  // Occupancy-based pricing
  occupancyRates?: OccupancyRate[]

  // Weekly rates (if different by day)
  weeklyRates?: DailyRate[]

  // Seasonal variations
  seasonalRates?: SeasonalRate[]

  // Restrictions
  minLengthOfStay?: number
  maxLengthOfStay?: number
  minAdvanceBooking?: number // days
  maxAdvanceBooking?: number // days
  closedToArrival?: boolean
  closedToDeparture?: boolean

  // Add-ons
  includesBreakfast?: boolean
  includesTax?: boolean
  cancellationPolicy?: string

  status: RateStatus
  priority?: number // Display priority

  createdAt: Date
  updatedAt: Date
}

export interface RateFormData {
  code?: string
  name?: string
  description?: string
  type?: RateType
  roomTypeId?: string
  startDate?: string
  endDate?: string
  currency?: string
  baseRate?: number
  occupancyRates?: OccupancyRate[]
  minLengthOfStay?: number
  maxLengthOfStay?: number
}

export const RATE_TYPE_LABELS: Record<RateType, string> = {
  standard: '기본 요금',
  corporate: '기업 요금',
  government: '관공서 요금',
  promotional: '프로모션 요금',
  package: '패키지 요금',
  group: '단체 요금'
}

export const DAY_OF_WEEK_LABELS: Record<DayOfWeek, string> = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
  sat: '토',
  sun: '일'
}
