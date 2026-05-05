export type BlockStatus = 'active' | 'released' | 'cancelled' | 'expired'

export type BlockType = 'allotment' | 'group' | 'event' | 'maintenance' | 'owner' | 'corporate'

export interface BlockRoom {
  roomTypeId: string
  roomTypeName: string
  quantity: number
  remaining: number
  released: number
}

export interface BlockDateRange {
  startDate: Date
  endDate: Date
}

export interface Block {
  id: string
  code: string // Block code (e.g., "BLOCK2024-001", "EVENT-WEDDING")
  name: string
  description?: string
  type: BlockType

  // Date Range
  startDate: Date
  endDate: Date

  // Release Information
  releaseDate?: Date // When unused rooms will be released back
  cutoffDays?: number // Days before arrival to release

  // Room Allocations
  rooms: BlockRoom[]

  // Associated Rate
  rateCode?: string
  rateName?: string
  specialRate?: number

  // Contact Information
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  organization?: string

  // Booking Information
  totalRooms: number
  bookedRooms: number
  availableRooms: number

  // Restrictions
  minLengthOfStay?: number
  requiresDeposit?: boolean
  depositAmount?: number
  cancellationPolicy?: string

  // Notes
  notes?: string
  internalNotes?: string

  status: BlockStatus
  createdAt: Date
  updatedAt: Date
}

export interface BlockFormData {
  code?: string
  name?: string
  description?: string
  type?: BlockType
  startDate?: string
  endDate?: string
  releaseDate?: string
  rooms?: BlockRoom[]
  contactName?: string
  contactEmail?: string
  organization?: string
}

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  allotment: '할당 블록',
  group: '단체 블록',
  event: '이벤트 블록',
  maintenance: '정비 블록',
  owner: '오너 블록',
  corporate: '기업 블록'
}

export const BLOCK_STATUS_LABELS: Record<BlockStatus, string> = {
  active: '활성',
  released: '릴리즈됨',
  cancelled: '취소됨',
  expired: '만료됨'
}