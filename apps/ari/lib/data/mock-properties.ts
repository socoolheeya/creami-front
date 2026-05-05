export interface Property {
  id: string
  name: string
  code: string
}

export const mockProperties: Property[] = [
  {
    id: '1',
    name: '그랜드 호텔 서울',
    code: 'GRAND-SEL'
  },
  {
    id: '2',
    name: '제주 바다 펜션',
    code: 'JEJU-SEA'
  },
  {
    id: '3',
    name: '부산 스테이 게스트하우스',
    code: 'BUSAN-STAY'
  }
]
