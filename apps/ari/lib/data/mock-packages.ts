export interface Package {
  id: string
  propertyId: string
  name: string
  code: string
  description: string
}

export const mockPackages: Package[] = [
  // 그랜드 호텔 서울
  {
    id: 'pkg1',
    propertyId: '1',
    name: '프리미엄 패키지',
    code: 'PREMIUM',
    description: '조식 포함 + 레이트 체크아웃'
  },
  {
    id: 'pkg2',
    propertyId: '1',
    name: '비즈니스 패키지',
    code: 'BUSINESS',
    description: '회의실 이용 + 조식'
  },
  {
    id: 'pkg3',
    propertyId: '1',
    name: '로맨틱 패키지',
    code: 'ROMANTIC',
    description: '와인 + 꽃다발 + 조식'
  },
  // 제주 바다 펜션
  {
    id: 'pkg4',
    propertyId: '2',
    name: '힐링 패키지',
    code: 'HEALING',
    description: '스파 이용권 + 조식'
  },
  {
    id: 'pkg5',
    propertyId: '2',
    name: '가족 패키지',
    code: 'FAMILY',
    description: '키즈 프로그램 + 조식 2인'
  },
  // 부산 스테이 게스트하우스
  {
    id: 'pkg6',
    propertyId: '3',
    name: '백패커 패키지',
    code: 'BACKPACKER',
    description: '시티투어 할인권'
  }
]
