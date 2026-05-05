import { Booking } from '../types/booking'

export const mockBookings: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BK2026050001',
    channel: 'Booking.com',
    supplierBookingNumber: 'BDC-3492857610',
    guestName: '김철수',
    guestPhone: '010-1234-5678',
    guestEmail: 'kim@example.com',
    accommodationId: 'ACC001',
    accommodation: 'Grand Hotel Seoul',
    roomId: 'ROOM001',
    roomType: '디럭스 더블룸',
    ratePlanId: 'RP001',
    ratePlan: '조식 포함 요금제',
    bookingDate: '2026-05-01',
    checkIn: '2026-05-10',
    checkOut: '2026-05-12',
    nights: 2,
    guests: 2,
    occupancies: [
      {
        roomNumber: 1,
        guests: [
          { name: '김철수', type: 'adult' },
          { name: '김영희', type: 'adult' }
        ]
      }
    ],
    status: 'confirmed',
    pricing: {
      baseAmount: 280000, // 140,000 x 2박
      baseAmountType: 'selling', // 판매가
      commission: 28000, // 10% 커미션
      discounts: [
        { type: 'earlybird', name: '얼리버드 할인', amount: 20000 }
      ],
      additionalFees: [
        { name: '조식', amount: 8000 }
      ],
      totalAmount: 296000 // 280000 + 28000 - 20000 + 8000
    },
    cancellationPolicy: {
      type: 'flexible',
      rules: [
        {
          daysBeforeCheckIn: 7,
          refundPercentage: 100,
          description: '체크인 7일 전까지 무료 취소'
        },
        {
          daysBeforeCheckIn: 3,
          refundPercentage: 50,
          description: '체크인 3-7일 전 취소 시 50% 환불'
        },
        {
          daysBeforeCheckIn: 0,
          refundPercentage: 0,
          description: '체크인 3일 이내 취소 시 환불 불가'
        }
      ],
      additionalInfo: '노쇼(No-Show) 시 전액 환불 불가'
    },
    specialRequests: '금연 객실 요청',
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-01'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '2',
    bookingNumber: 'BK2026050002',
    channel: 'Agoda',
    supplierBookingNumber: 'AGD-78562341',
    guestName: '이영희',
    guestPhone: '010-2345-6789',
    guestEmail: 'lee@example.com',
    accommodationId: 'ACC002',
    accommodation: 'Sunset Resort Busan',
    roomId: 'ROOM002',
    roomType: '오션뷰 스위트',
    ratePlanId: 'RP002',
    ratePlan: '패밀리 패키지',
    bookingDate: '2026-05-03',
    checkIn: '2026-05-15',
    checkOut: '2026-05-17',
    nights: 2,
    guests: 3,
    occupancies: [
      {
        roomNumber: 1,
        guests: [
          { name: '이영희', type: 'adult' },
          { name: '이민준', type: 'adult' },
          { name: '이서연', type: 'child', age: 7 }
        ]
      }
    ],
    status: 'pending',
    pricing: {
      baseAmount: 360000, // 180,000 x 2박
      baseAmountType: 'deposit', // 입금가
      commission: 36000, // 10% 커미션
      discounts: [],
      additionalFees: [],
      totalAmount: 396000 // 360000 + 36000
    },
    cancellationPolicy: {
      type: 'moderate',
      rules: [
        {
          daysBeforeCheckIn: 14,
          refundPercentage: 100,
          description: '체크인 14일 전까지 무료 취소'
        },
        {
          daysBeforeCheckIn: 7,
          refundPercentage: 50,
          description: '체크인 7-14일 전 취소 시 50% 환불'
        },
        {
          daysBeforeCheckIn: 3,
          refundPercentage: 30,
          description: '체크인 3-7일 전 취소 시 30% 환불'
        },
        {
          daysBeforeCheckIn: 0,
          refundPercentage: 0,
          description: '체크인 3일 이내 취소 시 환불 불가'
        }
      ]
    },
    createdAt: new Date('2026-05-03'),
    updatedAt: new Date('2026-05-03'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '3',
    bookingNumber: 'BK2026050003',
    channel: 'Direct',
    guestName: 'John Smith',
    guestPhone: '010-3456-7890',
    guestEmail: 'john@example.com',
    accommodationId: 'ACC003',
    accommodation: 'Jeju Paradise Hotel',
    roomId: 'ROOM003',
    roomType: '프리미엄 오션뷰',
    ratePlanId: 'RP003',
    ratePlan: '허니문 스페셜',
    bookingDate: '2026-04-28',
    checkIn: '2026-05-20',
    checkOut: '2026-05-25',
    nights: 5,
    guests: 2,
    occupancies: [
      {
        roomNumber: 1,
        guests: [
          { name: 'John Smith', type: 'adult' },
          { name: 'Jane Smith', type: 'adult' }
        ]
      }
    ],
    status: 'confirmed',
    pricing: {
      baseAmount: 900000, // 180,000 x 5박
      baseAmountType: 'deposit', // 입금가
      commission: 90000, // 10% 커미션
      discounts: [
        { type: 'freenight', name: '5박 이상 1박 무료', amount: 50000 }
      ],
      additionalFees: [
        { name: '스파 패키지', amount: 60000 },
        { name: '공항 픽업', amount: 30000 }
      ],
      totalAmount: 1030000 // 900000 + 90000 - 50000 + 60000 + 30000
    },
    cancellationPolicy: {
      type: 'strict',
      rules: [
        {
          daysBeforeCheckIn: 30,
          refundPercentage: 100,
          description: '체크인 30일 전까지 무료 취소'
        },
        {
          daysBeforeCheckIn: 14,
          refundPercentage: 50,
          description: '체크인 14-30일 전 취소 시 50% 환불'
        },
        {
          daysBeforeCheckIn: 7,
          refundPercentage: 25,
          description: '체크인 7-14일 전 취소 시 25% 환불'
        },
        {
          daysBeforeCheckIn: 0,
          refundPercentage: 0,
          description: '체크인 7일 이내 취소 시 환불 불가'
        }
      ],
      additionalInfo: '성수기 예약으로 엄격한 취소 정책이 적용됩니다'
    },
    specialRequests: '고층 객실, 허니문 패키지',
    createdAt: new Date('2026-05-02'),
    updatedAt: new Date('2026-05-02'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '4',
    bookingNumber: 'BK2026050004',
    channel: 'Expedia',
    supplierBookingNumber: 'EXP-529648127',
    guestName: '박민수',
    guestPhone: '010-4567-8901',
    guestEmail: 'park@example.com',
    accommodationId: 'ACC004',
    accommodation: 'Seoul City Hotel',
    roomId: 'ROOM004',
    roomType: '스탠다드 트윈',
    ratePlanId: 'RP004',
    ratePlan: '비즈니스 요금제',
    bookingDate: '2026-05-05',
    checkIn: '2026-05-22',
    checkOut: '2026-05-24',
    nights: 2,
    guests: 2,
    occupancies: [
      {
        roomNumber: 1,
        guests: [
          { name: '박민수', type: 'adult' },
          { name: '박지영', type: 'adult' }
        ]
      }
    ],
    status: 'confirmed',
    pricing: {
      baseAmount: 180000, // 90,000 x 2박
      baseAmountType: 'selling', // 판매가
      commission: 18000, // 10% 커미션
      discounts: [
        { type: 'basic', name: '회원 할인', amount: 10000 }
      ],
      additionalFees: [
        { name: '주차비', amount: 8000 }
      ],
      totalAmount: 196000 // 180000 + 18000 - 10000 + 8000
    },
    cancellationPolicy: {
      type: 'flexible',
      rules: [
        {
          daysBeforeCheckIn: 5,
          refundPercentage: 100,
          description: '체크인 5일 전까지 무료 취소'
        },
        {
          daysBeforeCheckIn: 2,
          refundPercentage: 50,
          description: '체크인 2-5일 전 취소 시 50% 환불'
        },
        {
          daysBeforeCheckIn: 0,
          refundPercentage: 0,
          description: '체크인 2일 이내 취소 시 환불 불가'
        }
      ]
    },
    createdAt: new Date('2026-05-05'),
    updatedAt: new Date('2026-05-05'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '5',
    bookingNumber: 'BK2026050005',
    channel: 'Airbnb',
    supplierBookingNumber: 'ABB-HMKXZ9R8Q3',
    guestName: '최지혜',
    guestPhone: '010-5678-9012',
    guestEmail: 'choi@example.com',
    accommodationId: 'ACC005',
    accommodation: 'Gangnam Premium Residence',
    roomId: 'ROOM005',
    roomType: '이그제큐티브 스위트',
    ratePlanId: 'RP005',
    ratePlan: '환불 불가 특가',
    bookingDate: '2026-05-02',
    checkIn: '2026-05-18',
    checkOut: '2026-05-21',
    nights: 3,
    guests: 1,
    occupancies: [
      {
        roomNumber: 1,
        guests: [
          { name: '최지혜', type: 'adult' }
        ]
      }
    ],
    status: 'cancelled',
    pricing: {
      baseAmount: 600000, // 200,000 x 3박
      baseAmountType: 'selling', // 판매가
      commission: 60000, // 10% 커미션
      discounts: [
        { type: 'lastminute', name: '라스트미닛 할인', amount: 30000 }
      ],
      additionalFees: [
        { name: '룸서비스', amount: 15000 },
        { name: '미니바', amount: 5000 }
      ],
      totalAmount: 650000 // 600000 + 60000 - 30000 + 15000 + 5000
    },
    cancellationPolicy: {
      type: 'non-refundable',
      rules: [
        {
          daysBeforeCheckIn: 0,
          refundPercentage: 0,
          description: '환불 불가 상품'
        }
      ],
      additionalInfo: '특가 상품으로 예약 후 취소 및 변경이 불가능합니다. 예약 즉시 결제가 진행되며 어떠한 경우에도 환불되지 않습니다.'
    },
    specialRequests: '비즈니스 목적, 조용한 객실',
    createdAt: new Date('2026-05-03'),
    updatedAt: new Date('2026-05-03'),
    createdBy: 'admin',
    updatedBy: 'admin'
  }
]

export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(booking => booking.id === id)
}
