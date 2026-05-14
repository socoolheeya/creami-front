export type AccommodationAccessOption = {
  id: string
  name: string
  address: string
  status: 'active' | 'inactive'
}

export const accommodationAccessOptions: AccommodationAccessOption[] = [
  {
    id: 'ACC-001',
    name: '그랜드 호텔 서울',
    address: '서울시 강남구 테헤란로 123',
    status: 'active'
  },
  {
    id: 'ACC-002',
    name: '제주 바다 펜션',
    address: '제주특별자치도 서귀포시 해안로 456',
    status: 'active'
  },
  {
    id: 'ACC-003',
    name: '부산 스테이 게스트하우스',
    address: '부산광역시 해운대구 해변로 789',
    status: 'active'
  },
  {
    id: 'ACC-004',
    name: '강릉 오션 리조트',
    address: '강원특별자치도 강릉시 창해로 12',
    status: 'inactive'
  },
  {
    id: 'ACC-005',
    name: '여수 하버 호텔',
    address: '전라남도 여수시 돌산읍 항구로 88',
    status: 'active'
  }
]
