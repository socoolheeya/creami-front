import { Rate } from '../types/rate'

export const mockRates: Rate[] = [
  {
    id: '1',
    code: 'BAR',
    name: '기본 객실 요금',
    description: '일반 고객을 위한 기본 객실 요금입니다.',
    type: 'standard',
    roomTypeName: '스탠다드 더블',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    currency: 'KRW',
    baseRate: 150000,
    occupancyRates: [
      { occupancy: 1, rate: 130000 },
      { occupancy: 2, rate: 150000 },
      { occupancy: 3, rate: 180000 }
    ],
    weeklyRates: [
      {
        dayOfWeek: 'mon',
        baseRate: 130000,
        occupancyRates: [
          { occupancy: 1, rate: 110000 },
          { occupancy: 2, rate: 130000 }
        ]
      },
      {
        dayOfWeek: 'tue',
        baseRate: 130000,
        occupancyRates: [
          { occupancy: 1, rate: 110000 },
          { occupancy: 2, rate: 130000 }
        ]
      },
      {
        dayOfWeek: 'wed',
        baseRate: 130000,
        occupancyRates: [
          { occupancy: 1, rate: 110000 },
          { occupancy: 2, rate: 130000 }
        ]
      },
      {
        dayOfWeek: 'thu',
        baseRate: 130000,
        occupancyRates: [
          { occupancy: 1, rate: 110000 },
          { occupancy: 2, rate: 130000 }
        ]
      },
      {
        dayOfWeek: 'fri',
        baseRate: 180000,
        occupancyRates: [
          { occupancy: 1, rate: 160000 },
          { occupancy: 2, rate: 180000 }
        ]
      },
      {
        dayOfWeek: 'sat',
        baseRate: 200000,
        occupancyRates: [
          { occupancy: 1, rate: 180000 },
          { occupancy: 2, rate: 200000 }
        ]
      },
      {
        dayOfWeek: 'sun',
        baseRate: 170000,
        occupancyRates: [
          { occupancy: 1, rate: 150000 },
          { occupancy: 2, rate: 170000 }
        ]
      }
    ],
    minLengthOfStay: 1,
    includesTax: false,
    status: 'active',
    priority: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    code: 'CORP01',
    name: '기업 할인 요금',
    description: '계약 기업 고객을 위한 특별 할인 요금입니다.',
    type: 'corporate',
    roomTypeName: '스탠다드 더블',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    currency: 'KRW',
    baseRate: 120000,
    occupancyRates: [
      { occupancy: 1, rate: 100000 },
      { occupancy: 2, rate: 120000 }
    ],
    minLengthOfStay: 1,
    minAdvanceBooking: 3,
    includesBreakfast: true,
    includesTax: true,
    cancellationPolicy: '체크인 24시간 전까지 무료 취소',
    status: 'active',
    priority: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    code: 'PROMO2024',
    name: '봄맞이 프로모션',
    description: '봄 시즌 특별 프로모션 요금입니다.',
    type: 'promotional',
    roomTypeName: '디럭스 트윈',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-05-31'),
    currency: 'KRW',
    baseRate: 99000,
    occupancyRates: [
      { occupancy: 1, rate: 89000 },
      { occupancy: 2, rate: 99000 }
    ],
    minLengthOfStay: 2,
    minAdvanceBooking: 7,
    maxAdvanceBooking: 90,
    includesBreakfast: true,
    includesTax: false,
    cancellationPolicy: '체크인 72시간 전까지 무료 취소, 이후 1박 요금 부과',
    status: 'active',
    priority: 3,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '4',
    code: 'PKG-ROMANTIC',
    name: '로맨틱 패키지',
    description: '커플을 위한 로맨틱 패키지 (샴페인, 케이크, 조식 포함)',
    type: 'package',
    roomTypeName: '스위트룸',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    currency: 'KRW',
    baseRate: 350000,
    occupancyRates: [
      { occupancy: 2, rate: 350000 }
    ],
    minLengthOfStay: 1,
    minAdvanceBooking: 3,
    includesBreakfast: true,
    includesTax: true,
    cancellationPolicy: '체크인 48시간 전까지 무료 취소',
    status: 'active',
    priority: 4,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    code: 'GROUP-10',
    name: '단체 할인 (10인 이상)',
    description: '10인 이상 단체 예약을 위한 특별 할인 요금입니다.',
    type: 'group',
    roomTypeName: '스탠다드 더블',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    currency: 'KRW',
    baseRate: 110000,
    occupancyRates: [
      { occupancy: 2, rate: 110000 }
    ],
    minLengthOfStay: 2,
    minAdvanceBooking: 14,
    includesBreakfast: false,
    includesTax: false,
    cancellationPolicy: '체크인 14일 전까지 무료 취소',
    status: 'active',
    priority: 5,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '6',
    code: 'WINTER2023',
    name: '겨울 특가',
    description: '2023년 겨울 시즌 특가 (종료됨)',
    type: 'promotional',
    roomTypeName: '스탠다드 더블',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-02-29'),
    currency: 'KRW',
    baseRate: 95000,
    occupancyRates: [
      { occupancy: 1, rate: 85000 },
      { occupancy: 2, rate: 95000 }
    ],
    minLengthOfStay: 1,
    includesBreakfast: false,
    includesTax: false,
    status: 'expired',
    priority: 10,
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2024-03-01')
  }
]