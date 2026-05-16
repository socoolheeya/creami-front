import type { Booking } from '../types/booking'
import type { AvailableRoomRate, CreateBookingRequest, SearchRequest, SearchResponse } from '../types/search'

export const BOOKING_API_UNAVAILABLE_ERROR = 'BOOKING_API_UNAVAILABLE'

const BOOKING_API_BASE_URL =
  process.env.NEXT_PUBLIC_BOOKING_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:9002'

const AVAILABILITY_API_BASE_URL =
  process.env.NEXT_PUBLIC_AVAILABILITY_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:9001'

const ACCOMMODATION_API_BASE_URL =
  process.env.NEXT_PUBLIC_ACCOMMODATION_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:8080'

export interface AccommodationOption {
  id: string
  name: string
  address: string
}

interface BookingListResponse {
  bookings: Booking[]
}

interface BookingCreateResponse {
  bookingId: string
  bookingNumber: string
}

interface PropertySearchResponse {
  properties: Array<{
    propertyId?: string | number
    name: string
    address?: {
      address1?: string
      address2?: string
      city?: string
      state?: string
      country?: string
    }
  }>
}

interface AvailabilityResponse {
  checkInDate: string
  checkOutDate: string
  items: Array<{
    propertyId: string | number
    roomId: string | number
    ratePlanId: string | number
    roomType?: string
    roomView?: string
    bedType?: string
    maxOccupancy?: number
    refundable: boolean
    breakfast: boolean
    dinner: boolean
    totalPrice?: number | string
    currency?: string
  }>
  totalCount: number
}

export function getBookingApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message === BOOKING_API_UNAVAILABLE_ERROR) {
    return '예약 API 서버에 연결할 수 없습니다. 백엔드 실행 상태와 포트를 확인하세요.'
  }

  return fallbackMessage
}

export async function fetchBookings(): Promise<Booking[]> {
  const response = await request<BookingListResponse>(BOOKING_API_BASE_URL, '/bookings')
  return response.bookings.map(normalizeBooking)
}

export async function fetchBookingById(bookingId: string): Promise<Booking | null> {
  try {
    return normalizeBooking(await request<Booking>(BOOKING_API_BASE_URL, `/bookings/${bookingId}`))
  } catch (error) {
    if (error instanceof Error && error.message === 'BOOKING_API_ERROR_404') {
      return null
    }
    throw error
  }
}

export async function searchAccommodations(query: string): Promise<AccommodationOption[]> {
  const searchParams = new URLSearchParams({
    size: '20',
    enabled: 'true'
  })

  const normalizedQuery = query.trim()
  if (normalizedQuery) {
    searchParams.set(/^\d+$/.test(normalizedQuery) ? 'propertyId' : 'name', normalizedQuery)
  }

  const response = await request<PropertySearchResponse>(
    ACCOMMODATION_API_BASE_URL,
    `/properties/search?${searchParams}`
  )

  return response.properties
    .filter((property) => property.propertyId != null)
    .map((property) => ({
      id: String(property.propertyId),
      name: property.name,
      address: formatAddress(property.address)
    }))
}

export async function searchAvailableRooms(requestBody: SearchRequest): Promise<SearchResponse> {
  const accommodation = await resolveAccommodation(requestBody)
  const nights = calculateNights(requestBody.checkIn, requestBody.checkOut)
  const response = await request<AvailabilityResponse>(AVAILABILITY_API_BASE_URL, '/api/v1/availability/base', {
    method: 'POST',
    body: JSON.stringify({
      checkInDate: requestBody.checkIn,
      checkOutDate: requestBody.checkOut,
      occupancies: requestBody.occupancies.map((occupancy) => ({
        adults: occupancy.adults,
        children: occupancy.children.length,
        primaryGuest: {
          firstName: '',
          lastName: '',
          guestType: 'ADULT'
        },
        guests: []
      })),
      channelIds: [1],
      propertyIds: [accommodation.id],
      cityId: 0
    })
  })

  return {
    accommodationId: accommodation.id,
    accommodationName: accommodation.name,
    checkIn: requestBody.checkIn,
    checkOut: requestBody.checkOut,
    nights,
    results: response.items.map((item): AvailableRoomRate => {
      const totalPrice = Number(item.totalPrice ?? 0)
      const roomLabel = [item.roomType, item.roomView, item.bedType].filter(Boolean).join(' / ')
      const mealPlan = item.breakfast && item.dinner ? '조식 + 석식 포함' : item.breakfast ? '조식 포함' : '식사 불포함'

      return {
        roomId: String(item.roomId),
        roomName: roomLabel || `객실 ${item.roomId}`,
        roomType: item.roomType || 'Room',
        ratePlanId: String(item.ratePlanId),
        ratePlanName: `${mealPlan}${item.refundable ? ' 요금제' : ' 환불 불가 요금제'}`,
        mealPlan,
        basePrice: nights > 0 ? Math.round(totalPrice / nights) : totalPrice,
        totalPrice,
        nights,
        available: true,
        maxOccupancy: item.maxOccupancy ?? 1,
        freeCancellation: item.refundable
      }
    })
  }
}

export async function createBooking(requestBody: CreateBookingRequest): Promise<Booking> {
  const totalGuests = requestBody.occupancies.reduce((sum, occupancy) => {
    return sum + occupancy.adults + occupancy.children.length
  }, 0)
  const selectedTotalPrice = requestBody.totalPrice ?? 0
  const [lastName, ...firstNameParts] = requestBody.guestName.trim().split(/\s+/)
  const response = await request<BookingCreateResponse>(BOOKING_API_BASE_URL, '/bookings/request', {
    method: 'POST',
    body: JSON.stringify({
      accommodationId: requestBody.accommodationId,
      accommodationName: requestBody.accommodationName,
      checkInDate: requestBody.checkIn,
      checkOutDate: requestBody.checkOut,
      adults: requestBody.occupancies.reduce((sum, occupancy) => sum + occupancy.adults, 0),
      children: requestBody.occupancies.reduce((sum, occupancy) => sum + occupancy.children.length, 0),
      primaryGuest: {
        firstName: firstNameParts.join(' '),
        lastName,
        email: requestBody.guestEmail,
        phoneNumber: requestBody.guestPhone
      },
      amount: selectedTotalPrice,
      room: {
        roomId: Number(requestBody.roomId),
        name: requestBody.roomName || `객실 ${requestBody.roomId}`
      },
      ratePlan: {
        ratePlanId: requestBody.ratePlanId,
        name: requestBody.ratePlanName || `요금제 ${requestBody.ratePlanId}`,
        benefitName: null,
        type: 'STANDALONE',
        ratePlanMeal: {
          ratePlanMealId: 0,
          mealType: 'NONE',
          otherMeal: null
        },
        ratePlanCancellationPolicy: {
          cancellationPolicyId: 0,
          name: '기본 취소 정책',
          cancellationPenalties: [
            {
              cancellationPenaltyId: 0,
              name: '체크인 당일 환불 불가',
              amount: 100,
              unit: 'PERCENTAGE'
            }
          ]
        }
      },
      channelId: 1,
      specialRequests: requestBody.specialRequests
    })
  })

  const createdBooking = await fetchBookingById(response.bookingId)
  if (createdBooking) return createdBooking

  return {
    id: response.bookingId,
    bookingNumber: response.bookingNumber,
    channel: 'Direct',
    guestName: requestBody.guestName,
    guestPhone: requestBody.guestPhone,
    guestEmail: requestBody.guestEmail,
    accommodationId: requestBody.accommodationId,
    accommodation: requestBody.accommodationName || requestBody.accommodationId,
    roomId: requestBody.roomId,
    roomType: requestBody.roomName || requestBody.roomId,
    ratePlanId: requestBody.ratePlanId,
    ratePlan: requestBody.ratePlanName || requestBody.ratePlanId,
    bookingDate: new Date().toISOString().split('T')[0],
    checkIn: requestBody.checkIn,
    checkOut: requestBody.checkOut,
    nights: calculateNights(requestBody.checkIn, requestBody.checkOut),
    guests: totalGuests,
    occupancies: [],
    status: 'confirmed',
    pricing: {
      baseAmount: selectedTotalPrice,
      baseAmountType: 'selling',
      commission: 0,
      discounts: [],
      additionalFees: [],
      totalAmount: selectedTotalPrice
    },
    cancellationPolicy: {
      type: 'moderate',
      rules: [
        {
          daysBeforeCheckIn: 7,
          refundPercentage: 100,
          description: '체크인 7일 전까지 무료 취소'
        }
      ]
    },
    specialRequests: requestBody.specialRequests,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system'
  }
}

export async function cancelBooking(params: {
  bookingId: string
  bookingAmount: number
  penaltyAmount: number
  refundAmount: number
  reason: string
}) {
  return request<{ bookingId: string }>(BOOKING_API_BASE_URL, '/bookings/cancel', {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

async function resolveAccommodation(requestBody: SearchRequest): Promise<AccommodationOption> {
  if (requestBody.accommodationId) {
    const matches = await searchAccommodations(requestBody.accommodationId)
    return matches.find((item) => item.id === requestBody.accommodationId) ?? {
      id: requestBody.accommodationId,
      name: requestBody.accommodationQuery || requestBody.accommodationId,
      address: ''
    }
  }

  const matches = await searchAccommodations(requestBody.accommodationQuery || '')
  const accommodation = matches[0]
  if (!accommodation) {
    throw new Error('BOOKING_API_ERROR_NO_PROPERTY')
  }

  return accommodation
}

async function request<T>(baseUrl: string, endpoint: string, init: RequestInit = {}): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${baseUrl}${endpoint}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      cache: 'no-store'
    })
  } catch {
    throw new Error(BOOKING_API_UNAVAILABLE_ERROR)
  }

  if (!response.ok) {
    throw new Error(`BOOKING_API_ERROR_${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function normalizeBooking(booking: Booking): Booking {
  return {
    ...booking,
    createdAt: new Date(booking.createdAt),
    updatedAt: new Date(booking.updatedAt)
  }
}

function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.max(0, end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function formatAddress(address: PropertySearchResponse['properties'][number]['address']): string {
  if (!address) return ''

  return [
    address.country,
    address.state,
    address.city,
    address.address1,
    address.address2
  ].filter(Boolean).join(' ')
}
