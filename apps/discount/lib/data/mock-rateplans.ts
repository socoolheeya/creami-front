import { RatePlan, DiscountRatePlanMapping } from '../types/rateplan'

export const mockRatePlans: RatePlan[] = [
  {
    id: 'rp-1',
    name: '스탠다드 요금제',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    roomId: '1',
    roomName: '101호 - 디럭스 더블',
    description: '기본 요금제',
    isActive: true
  },
  {
    id: 'rp-2',
    name: '주말 요금제',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    roomId: '1',
    roomName: '101호 - 디럭스 더블',
    description: '금-일요일 적용',
    isActive: true
  },
  {
    id: 'rp-3',
    name: '얼리버드 요금제',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    roomId: '2',
    roomName: '201호 - 스위트',
    description: '30일 전 예약',
    isActive: true
  },
  {
    id: 'rp-4',
    name: '장기 투숙 요금제',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    roomId: '2',
    roomName: '201호 - 스위트',
    description: '7박 이상',
    isActive: true
  },
  {
    id: 'rp-5',
    name: '성수기 요금제',
    accommodationId: '2',
    accommodationName: '제주 바다 펜션',
    roomId: '4',
    roomName: 'A동 - 오션뷰',
    description: '7-8월 적용',
    isActive: true
  },
  {
    id: 'rp-6',
    name: '비수기 요금제',
    accommodationId: '2',
    accommodationName: '제주 바다 펜션',
    roomId: '4',
    roomName: 'A동 - 오션뷰',
    description: '11-2월 적용',
    isActive: true
  },
  {
    id: 'rp-7',
    name: '패밀리 패키지',
    accommodationId: '2',
    accommodationName: '제주 바다 펜션',
    roomId: '5',
    roomName: 'B동 - 가든뷰',
    description: '가족 단위 할인',
    isActive: true
  },
  {
    id: 'rp-8',
    name: '도미토리 요금제',
    accommodationId: '3',
    accommodationName: '부산 스테이 게스트하우스',
    roomId: '6',
    roomName: '101호 - 도미토리',
    description: '1인당 요금',
    isActive: true
  }
]

// 초기 매핑 데이터 (일부 요금제에는 이미 할인이 매핑되어 있음)
export const mockDiscountRatePlanMappings: DiscountRatePlanMapping[] = [
  {
    ratePlanId: 'rp-1',
    discountIds: ['2', '3'] // 조기 예약 할인, 신규 회원 환영 할인
  },
  {
    ratePlanId: 'rp-2',
    discountIds: ['5'] // 주말 특가
  },
  {
    ratePlanId: 'rp-3',
    discountIds: ['2', '4'] // 조기 예약 할인, VIP 전용 할인
  },
  {
    ratePlanId: 'rp-4',
    discountIds: ['7'] // 장기 투숙 할인
  },
  {
    ratePlanId: 'rp-5',
    discountIds: ['1'] // 여름 특가 할인
  },
  {
    ratePlanId: 'rp-6',
    discountIds: ['2', '3'] // 조기 예약 할인, 신규 회원 환영 할인
  },
  {
    ratePlanId: 'rp-7',
    discountIds: [] // 매핑 없음
  },
  {
    ratePlanId: 'rp-8',
    discountIds: ['3'] // 신규 회원 환영 할인
  }
]
