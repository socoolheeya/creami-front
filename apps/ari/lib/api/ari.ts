export const API_UNAVAILABLE_ERROR = 'ARI_API_UNAVAILABLE'

const ARI_API_BASE_URL =
  process.env.NEXT_PUBLIC_ARI_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:9004'

export interface AriProperty {
  id: string
  code: string
  name: string
}

export interface AriRoom {
  id: string
  propertyId: string
  code: string
  name: string
}

export interface AriPackage {
  id: string
  propertyId: string
  code: string
  name: string
  rateType: 'net_rate' | 'sell_rate_no_commission' | 'commission_included' | 'net_and_sell'
  commission: {
    type: 'percentage' | 'fixed'
    value: number
  }
}

export interface DayRate {
  date: string
  rate: number
  currency: string
}

export interface RateRow {
  id: string
  name: string
  dates: Record<string, DayRate>
}

export interface RateMatrix {
  rows: RateRow[]
}

export interface RateUpdate {
  roomId: string
  packageId: string
  date: string
  rate: number
}

export interface DayInventory {
  date: string
  total: number
  available: number
  booked: number
}

export interface InventoryRow {
  id: string
  name: string
  dates: Record<string, DayInventory>
}

export interface InventoryMatrix {
  rows: InventoryRow[]
  blocks: unknown[]
}

export interface InventoryUpdate {
  roomId: string
  date: string
  available: number
}

export function getDisplayApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message === API_UNAVAILABLE_ERROR) {
    return 'ARI API 서버에 연결할 수 없습니다. 백엔드 실행 상태와 포트를 확인하세요.'
  }

  return fallbackMessage
}

export async function fetchAriProperties() {
  return request<AriProperty[]>('/api/v1/ari/properties')
}

export async function fetchAriRooms(propertyId: string) {
  return request<AriRoom[]>(`/api/v1/ari/rooms?${new URLSearchParams({ propertyId })}`)
}

export async function fetchAriPackages(propertyId: string) {
  return request<AriPackage[]>(`/api/v1/ari/packages?${new URLSearchParams({ propertyId })}`)
}

export async function fetchAriRates(params: {
  propertyId: string
  criteriaType: 'package' | 'room'
  packageId?: string
  roomId?: string
  roomIds?: string[]
  packageIds?: string[]
  startDate: string
  endDate: string
}) {
  const searchParams = new URLSearchParams({
    propertyId: params.propertyId,
    criteriaType: params.criteriaType,
    startDate: params.startDate,
    endDate: params.endDate
  })

  if (params.packageId) searchParams.set('packageId', params.packageId)
  if (params.roomId) searchParams.set('roomId', params.roomId)
  if (params.roomIds?.length) searchParams.set('roomIds', params.roomIds.join(','))
  if (params.packageIds?.length) searchParams.set('packageIds', params.packageIds.join(','))

  return request<RateMatrix>(`/api/v1/ari/rates?${searchParams}`)
}

export async function updateAriRates(propertyId: string, updates: RateUpdate[]) {
  return request<void>('/api/v1/ari/rates', {
    method: 'PATCH',
    body: JSON.stringify({ propertyId, updates })
  })
}

export async function fetchAriInventories(params: {
  propertyId: string
  roomIds: string[]
  startDate: string
  endDate: string
}) {
  const searchParams = new URLSearchParams({
    propertyId: params.propertyId,
    roomIds: params.roomIds.join(','),
    startDate: params.startDate,
    endDate: params.endDate
  })

  return request<InventoryMatrix>(`/api/v1/ari/inventories?${searchParams}`)
}

export async function updateAriInventories(propertyId: string, updates: InventoryUpdate[]) {
  return request<void>('/api/v1/ari/inventories', {
    method: 'PATCH',
    body: JSON.stringify({ propertyId, updates })
  })
}

async function request<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${ARI_API_BASE_URL}${endpoint}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      cache: 'no-store'
    })
  } catch {
    throw new Error(API_UNAVAILABLE_ERROR)
  }

  if (!response.ok) {
    throw new Error(`ARI_API_ERROR_${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
