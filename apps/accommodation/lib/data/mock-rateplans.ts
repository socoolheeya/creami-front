import { RatePlan } from '../types/rateplan'

export const mockRatePlans: RatePlan[] = [
  {
    id: '1',
    roomId: '101',
    name: '얼리버드 특가',
    enName: 'Early Bird Special',
    benefitName: '30일 전 예약 시 20% 할인',
    ratePlanType: 'standalone',
    status: 'active',
    mealPlan: 'breakfast',
    enabled: true,
    description: {
      description: '30일 전 예약 시 객실 요금의 20%를 할인해드립니다. 조식 포함.',
      enDescription: 'Book 30 days in advance and save 20% on room rates. Breakfast included.',
      benefitName: '30일 전 예약 20% 할인'
    },
    setting: {
      allotment: 10,
      minLos: 1,
      maxLos: 7,
      minThroughDays: 0,
      maxThroughDays: 30,
      minAdvanceDays: 30,
      maxAdvanceDays: 365,
      closedToArrival: false,
      closedToDeparture: false
    },
    salePeriod: {
      bookingStartDate: '2024-01-01',
      bookingEndDate: '2024-12-31',
      stayStartDate: '2024-02-01',
      stayEndDate: '2024-12-31'
    },
    cancellationPolicies: [
      {
        id: '1',
        name: '일반 취소 정책',
        startDateTime: '2024-01-01T00:00:00',
        endDateTime: '2024-12-31T23:59:59',
        priority: 1,
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        penalties: [
          {
            id: '1-1',
            days: 7,
            unit: 'percentage',
            amount: 100,
            currencyUnit: 'KRW'
          },
          {
            id: '1-2',
            days: 14,
            unit: 'percentage',
            amount: 50,
            currencyUnit: 'KRW'
          }
        ]
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    roomId: '101',
    name: '주말 특가',
    enName: 'Weekend Special',
    benefitName: '주말 숙박 15% 할인',
    ratePlanType: 'standalone',
    status: 'active',
    mealPlan: 'bed_and_breakfast',
    enabled: true,
    description: {
      description: '금요일, 토요일 숙박 시 15% 할인. 뷔페 조식 포함.',
      enDescription: 'Save 15% on Friday and Saturday stays. Buffet breakfast included.',
      benefitName: '주말 15% 할인'
    },
    setting: {
      allotment: 5,
      minLos: 1,
      maxLos: 2,
      minThroughDays: 0,
      maxThroughDays: 0,
      minAdvanceDays: 0,
      maxAdvanceDays: 90,
      closedToArrival: false,
      closedToDeparture: false
    },
    salePeriod: {
      bookingStartDate: '2024-01-01',
      bookingEndDate: '2024-12-31',
      stayStartDate: '2024-01-01',
      stayEndDate: '2024-12-31'
    },
    cancellationPolicies: [
      {
        id: '2',
        name: '주말 취소 정책',
        startDateTime: '2024-01-01T00:00:00',
        endDateTime: '2024-12-31T23:59:59',
        priority: 1,
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: true,
        saturday: true,
        penalties: [
          {
            id: '2-1',
            days: 3,
            unit: 'percentage',
            amount: 100,
            currencyUnit: 'KRW'
          }
        ]
      }
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    roomId: '102',
    name: '비즈니스 플랜',
    enName: 'Business Plan',
    benefitName: '기업 계약 요금',
    ratePlanType: 'business',
    status: 'active',
    mealPlan: 'none',
    enabled: true,
    description: {
      description: '기업 계약 고객 전용 요금제. 연간 계약 기준.',
      enDescription: 'Corporate contract rate. Based on annual agreement.',
      benefitName: '기업 계약 할인'
    },
    setting: {
      allotment: 20,
      minLos: 1,
      maxLos: 30,
      minThroughDays: 0,
      maxThroughDays: 0,
      minAdvanceDays: 0,
      maxAdvanceDays: 180,
      closedToArrival: false,
      closedToDeparture: false
    },
    salePeriod: {
      bookingStartDate: '2024-01-01',
      bookingEndDate: '2024-12-31',
      stayStartDate: '2024-01-01',
      stayEndDate: '2024-12-31'
    },
    cancellationPolicies: [
      {
        id: '3',
        name: '비즈니스 취소 정책',
        startDateTime: '2024-01-01T00:00:00',
        endDateTime: '2024-12-31T23:59:59',
        priority: 1,
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        penalties: [
          {
            id: '3-1',
            days: 1,
            unit: 'percentage',
            amount: 100,
            currencyUnit: 'KRW'
          }
        ]
      }
    ],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  }
]
