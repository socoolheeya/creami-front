import { Accommodation } from '@/lib/types/accommodation'
import { Discount } from '@/lib/types/discount'
import { DiscountRatePlanMapping, RatePlan } from '@/lib/types/rateplan'

const DISCOUNT_API_BASE_URL =
  process.env.NEXT_PUBLIC_DISCOUNT_API_URL ||
  'http://localhost:9003'

const ACCOMMODATION_API_BASE_URL =
  process.env.NEXT_PUBLIC_ACCOMMODATION_API_URL ||
  'http://localhost:9001'

type BackendDiscountStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
type BackendDiscountUnit = 'PERCENTAGE' | 'AMOUNT' | 'NIGHT'

type BackendDiscount = {
  discountId: number | string
  name: string
  type: string
  audienceType?: string
  bookingStartDate?: string | null
  bookingEndDate?: string | null
  stayStartDate?: string | null
  stayEndDate?: string | null
  amount: number | string
  unit: BackendDiscountUnit
  status?: BackendDiscountStatus
  createdAt?: string | null
  updatedAt?: string | null
}

type BackendDiscountsResponse = {
  discounts: BackendDiscount[]
}

type BackendProperty = {
  propertyId?: number | string
  name: string
  type?: string
  status?: string
  address?: { address?: string; roadAddress?: string }
}

type BackendPropertiesResponse = {
  properties: BackendProperty[]
}

type BackendRatePlan = {
  ratePlanId: number | string
  roomId?: number | string | null
  name?: string | null
  benefitName?: string | null
  status?: string
}

type BackendRatePlansResponse = {
  ratePlans: BackendRatePlan[]
}

type BackendMapping = {
  ratePlanId: number | string
  discountIds: Array<number | string>
}

type BackendMappingsResponse = {
  mappings: BackendMapping[]
}

async function request<T>(baseUrl: string, endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}

function toDate(value: string | null | undefined, fallback: Date): Date {
  if (!value) {
    return fallback
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? fallback : date
}

function toDiscountStatus(status: BackendDiscountStatus | undefined): Discount['status'] {
  if (status === 'ACTIVE') return 'active'
  if (status === 'INACTIVE') return 'disabled'
  if (status === 'ARCHIVED') return 'expired'
  return 'scheduled'
}

function toDiscountType(unit: BackendDiscountUnit): Discount['type'] {
  return unit === 'PERCENTAGE' ? 'percentage' : 'fixed'
}

function toDiscount(dto: BackendDiscount): Discount {
  const id = String(dto.discountId)
  const now = new Date()

  return {
    id,
    name: dto.name,
    code: `DISCOUNT-${id}`,
    discountType: dto.type,
    description: undefined,
    type: toDiscountType(dto.unit),
    value: Number(dto.amount),
    target: 'all',
    usedCount: 0,
    startDate: toDate(dto.bookingStartDate ?? dto.stayStartDate, new Date('1970-01-01T00:00:00.000Z')),
    endDate: toDate(dto.bookingEndDate ?? dto.stayEndDate, new Date('2999-12-31T23:59:59.999Z')),
    status: toDiscountStatus(dto.status),
    isPublic: dto.audienceType === undefined || dto.audienceType === 'PUBLIC',
    createdAt: toDate(dto.createdAt, now),
    updatedAt: toDate(dto.updatedAt, now),
  }
}

function toAccommodation(dto: BackendProperty): Accommodation | null {
  if (dto.propertyId === undefined || dto.propertyId === null) {
    return null
  }

  return {
    id: String(dto.propertyId),
    name: dto.name,
    type: dto.type ?? '-',
    address: dto.address?.roadAddress ?? dto.address?.address,
    isActive: dto.status === undefined || dto.status === 'ACTIVE',
  }
}

function toRatePlan(dto: BackendRatePlan, accommodation: Accommodation | null): RatePlan {
  return {
    id: String(dto.ratePlanId),
    name: dto.name ?? dto.benefitName ?? `RatePlan ${dto.ratePlanId}`,
    accommodationId: accommodation?.id ?? '',
    accommodationName: accommodation?.name ?? '',
    roomId: dto.roomId === undefined || dto.roomId === null ? undefined : String(dto.roomId),
    description: dto.benefitName ?? undefined,
    isActive: dto.status === undefined || dto.status === 'ACTIVE',
  }
}

export async function fetchDiscounts(params: { search?: string; activeOnly?: boolean } = {}): Promise<Discount[]> {
  const searchParams = new URLSearchParams()
  if (params.search?.trim()) {
    searchParams.set('name', params.search.trim())
  }
  if (params.activeOnly) {
    searchParams.set('activeOnly', 'true')
  }

  const query = searchParams.toString()
  const response = await request<BackendDiscountsResponse>(
    DISCOUNT_API_BASE_URL,
    `/discounts${query ? `?${query}` : ''}`
  )

  return response.discounts.map(toDiscount)
}

export async function fetchAccommodations(params: { search?: string } = {}): Promise<Accommodation[]> {
  const searchParams = new URLSearchParams({ size: '100' })
  if (params.search?.trim()) {
    searchParams.set('name', params.search.trim())
  }

  const response = await request<BackendPropertiesResponse>(
    ACCOMMODATION_API_BASE_URL,
    `/properties/search?${searchParams.toString()}`
  )

  return response.properties.map(toAccommodation).filter((item): item is Accommodation => item !== null)
}

export async function fetchRatePlans(
  accommodationId: string,
  accommodation: Accommodation | null,
  params: { search?: string } = {},
): Promise<RatePlan[]> {
  const searchParams = new URLSearchParams({
    propertyId: accommodationId,
    size: '100',
  })
  if (params.search?.trim()) {
    searchParams.set('name', params.search.trim())
  }

  const response = await request<BackendRatePlansResponse>(
    ACCOMMODATION_API_BASE_URL,
    `/rate-plans/search?${searchParams.toString()}`
  )

  return response.ratePlans.map((ratePlan) => toRatePlan(ratePlan, accommodation))
}

export async function fetchDiscountRatePlanMappings(ratePlanIds: string[]): Promise<DiscountRatePlanMapping[]> {
  if (ratePlanIds.length === 0) {
    return []
  }

  const searchParams = new URLSearchParams()
  ratePlanIds.forEach((ratePlanId) => searchParams.append('ratePlanIds', ratePlanId))

  const response = await request<BackendMappingsResponse>(
    DISCOUNT_API_BASE_URL,
    `/discount-rate-plan-mappings?${searchParams.toString()}`
  )

  return response.mappings.map((mapping) => ({
    ratePlanId: String(mapping.ratePlanId),
    discountIds: mapping.discountIds.map(String),
  }))
}

export async function saveDiscountRatePlanMappings(
  mappings: DiscountRatePlanMapping[],
): Promise<DiscountRatePlanMapping[]> {
  const response = await request<BackendMappingsResponse>(
    DISCOUNT_API_BASE_URL,
    '/discount-rate-plan-mappings',
    {
      method: 'PUT',
      body: JSON.stringify({
        mappings: mappings.map((mapping) => ({
          ratePlanId: mapping.ratePlanId,
          discountIds: mapping.discountIds,
        })),
      }),
    }
  )

  return response.mappings.map((mapping) => ({
    ratePlanId: String(mapping.ratePlanId),
    discountIds: mapping.discountIds.map(String),
  }))
}
