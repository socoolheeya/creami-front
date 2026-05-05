// 검색 요청 타입
export interface OccupancyGuest {
  type: 'adult' | 'child'
  age?: number // child인 경우 필수
}

export interface RoomOccupancy {
  roomNumber: number
  adults: number
  children: OccupancyGuest[]
}

export interface SearchRequest {
  accommodationId: string
  checkIn: string // YYYY-MM-DD
  checkOut: string // YYYY-MM-DD
  occupancies: RoomOccupancy[]
}

// 검색 응답 타입
export interface AvailableRoomRate {
  roomId: string
  roomName: string
  roomType: string
  ratePlanId: string
  ratePlanName: string
  mealPlan: string
  basePrice: number // 1박 기준가
  totalPrice: number // 전체 가격 (박수 * 기본가)
  nights: number
  available: boolean
  maxOccupancy: number
}

export interface SearchResponse {
  accommodationId: string
  accommodationName: string
  checkIn: string
  checkOut: string
  nights: number
  results: AvailableRoomRate[]
}

// 예약 생성 요청 타입
export interface CreateBookingRequest {
  accommodationId: string
  roomId: string
  ratePlanId: string
  checkIn: string
  checkOut: string
  occupancies: RoomOccupancy[]
  guestName: string
  guestEmail: string
  guestPhone: string
  specialRequests?: string
}