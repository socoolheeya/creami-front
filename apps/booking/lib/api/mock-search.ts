import { SearchRequest, SearchResponse, AvailableRoomRate, CreateBookingRequest } from '../types/search'
import { Booking } from '../types/booking'
import { mockAccommodations } from '../data/mock-accommodations'

// Mock 객실-요금제 데이터
const mockRoomRates: AvailableRoomRate[] = [
  {
    roomId: 'ROOM001',
    roomName: '디럭스 더블룸',
    roomType: 'Double',
    ratePlanId: 'RP001',
    ratePlanName: '조식 포함 요금제',
    mealPlan: '조식 포함',
    basePrice: 140000,
    totalPrice: 0, // 계산됨
    nights: 0, // 계산됨
    available: true,
    maxOccupancy: 2,
    freeCancellation: true,
    cancellationDeadline: '2025-01-15'
  },
  {
    roomId: 'ROOM002',
    roomName: '오션뷰 스위트',
    roomType: 'Suite',
    ratePlanId: 'RP002',
    ratePlanName: '패밀리 패키지',
    mealPlan: '조식 + 석식 포함',
    basePrice: 180000,
    totalPrice: 0,
    nights: 0,
    available: true,
    maxOccupancy: 4,
    freeCancellation: true,
    cancellationDeadline: '2025-01-10'
  },
  {
    roomId: 'ROOM003',
    roomName: '프리미엄 오션뷰',
    roomType: 'Premium',
    ratePlanId: 'RP003',
    ratePlanName: '허니문 스페셜',
    mealPlan: '조식 포함',
    basePrice: 200000,
    totalPrice: 0,
    nights: 0,
    available: true,
    maxOccupancy: 2,
    freeCancellation: false
  },
  {
    roomId: 'ROOM004',
    roomName: '스탠다드 트윈',
    roomType: 'Twin',
    ratePlanId: 'RP004',
    ratePlanName: '비즈니스 요금제',
    mealPlan: '조식 불포함',
    basePrice: 90000,
    totalPrice: 0,
    nights: 0,
    available: true,
    maxOccupancy: 2,
    freeCancellation: true,
    cancellationDeadline: '2025-01-20'
  },
  {
    roomId: 'ROOM005',
    roomName: '이그제큐티브 스위트',
    roomType: 'Executive Suite',
    ratePlanId: 'RP005',
    ratePlanName: '환불 불가 특가',
    mealPlan: '조식 포함',
    basePrice: 150000,
    totalPrice: 0,
    nights: 0,
    available: true,
    maxOccupancy: 3,
    freeCancellation: false
  }
]

// 날짜 차이 계산 (박수)
function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// 검색 API Mock
export async function searchAvailableRooms(request: SearchRequest): Promise<SearchResponse> {
  // 실제로는 API 호출
  await new Promise(resolve => setTimeout(resolve, 500)) // 네트워크 지연 시뮬레이션

  // accommodationId 또는 accommodationQuery로 숙소 찾기
  let accommodation
  if (request.accommodationId) {
    accommodation = mockAccommodations.find(a => a.id === request.accommodationId)
  } else if (request.accommodationQuery) {
    const query = request.accommodationQuery.toLowerCase()
    accommodation = mockAccommodations.find(a =>
      a.id.toLowerCase().includes(query) ||
      a.name.toLowerCase().includes(query)
    )
  }

  const nights = calculateNights(request.checkIn, request.checkOut)

  // 총 인원 계산
  const totalGuests = request.occupancies.reduce((sum, occ) => {
    return sum + occ.adults + occ.children.length
  }, 0)

  // 필터링: 최대 수용 인원이 총 인원보다 크거나 같은 객실만
  const availableRates = mockRoomRates
    .filter(rate => rate.maxOccupancy >= totalGuests)
    .map(rate => ({
      ...rate,
      nights,
      totalPrice: rate.basePrice * nights
    }))

  return {
    accommodationId: accommodation?.id || request.accommodationId || '',
    accommodationName: accommodation?.name || 'Unknown',
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    nights,
    results: availableRates
  }
}

// 예약 생성 API Mock
export async function createBooking(request: CreateBookingRequest): Promise<Booking> {
  // 실제로는 API 호출
  await new Promise(resolve => setTimeout(resolve, 500))

  const accommodation = mockAccommodations.find(a => a.id === request.accommodationId)
  const roomRate = mockRoomRates.find(r => r.roomId === request.roomId && r.ratePlanId === request.ratePlanId)
  const nights = calculateNights(request.checkIn, request.checkOut)

  const totalGuests = request.occupancies.reduce((sum, occ) => {
    return sum + occ.adults + occ.children.length
  }, 0)

  const baseAmount = (roomRate?.basePrice || 100000) * nights
  const commission = baseAmount * 0.1
  const now = new Date()

  // 새 예약 객체 생성
  const newBooking: Booking = {
    id: `BK${Date.now()}`,
    bookingNumber: `BK${now.getFullYear()}${String(Date.now()).slice(-6)}`,
    channel: 'Direct',
    guestName: request.guestName,
    guestPhone: request.guestPhone,
    guestEmail: request.guestEmail,
    accommodationId: request.accommodationId,
    accommodation: accommodation?.name || 'Unknown',
    roomId: request.roomId,
    roomType: roomRate?.roomName || 'Unknown',
    ratePlanId: request.ratePlanId,
    ratePlan: roomRate?.ratePlanName || 'Unknown',
    bookingDate: new Date().toISOString().split('T')[0],
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    nights,
    guests: totalGuests,
    occupancies: request.occupancies.map((occ, idx) => ({
      roomNumber: occ.roomNumber,
      guests: [
        ...Array(occ.adults).fill(null).map((_, i) => ({
          name: i === 0 ? request.guestName : `Adult ${i + 1}`,
          type: 'adult' as const
        })),
        ...occ.children.map((child, i) => ({
          name: `Child ${i + 1}`,
          type: 'child' as const,
          age: child.age
        }))
      ]
    })),
    status: 'confirmed',
    pricing: {
      baseAmount,
      baseAmountType: 'selling',
      commission,
      discounts: [],
      additionalFees: [],
      totalAmount: baseAmount + commission
    },
    cancellationPolicy: {
      type: 'flexible',
      rules: [
        {
          daysBeforeCheckIn: 7,
          refundPercentage: 100,
          description: '체크인 7일 전까지 무료 취소'
        }
      ]
    },
    specialRequests: request.specialRequests,
    createdAt: now,
    updatedAt: now,
    createdBy: 'system',
    updatedBy: 'system'
  }

  return newBooking
}
