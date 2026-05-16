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
  accommodationId?: string // 숙소 ID로 검색 (accommodationQuery와 둘 중 하나만 사용)
  accommodationQuery?: string // 숙소명 또는 ID로 텍스트 검색 (accommodationId와 둘 중 하나만 사용)
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
  freeCancellation: boolean // 무료 취소 가능 여부
  cancellationDeadline?: string // 무료 취소 마감일 (YYYY-MM-DD)
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
  accommodationName?: string
  roomId: string
  roomName?: string
  ratePlanId: string
  ratePlanName?: string
  checkIn: string
  checkOut: string
  occupancies: RoomOccupancy[]
  guestName: string
  guestEmail: string
  guestPhone: string
  totalPrice?: number
  specialRequests?: string
}
