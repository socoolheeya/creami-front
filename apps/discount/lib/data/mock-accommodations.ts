import { Accommodation } from '../types/accommodation'

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: '그랜드 호텔 서울',
    type: 'hotel',
    address: '서울특별시 중구',
    isActive: true
  },
  {
    id: '2',
    name: '제주 바다 펜션',
    type: 'pension',
    address: '제주특별자치도 서귀포시',
    isActive: true
  },
  {
    id: '3',
    name: '부산 스테이 게스트하우스',
    type: 'guesthouse',
    address: '부산광역시 해운대구',
    isActive: true
  },
  {
    id: '4',
    name: '강릉 오션뷰 리조트',
    type: 'resort',
    address: '강원도 강릉시',
    isActive: true
  },
  {
    id: '5',
    name: '속초 힐링 펜션',
    type: 'pension',
    address: '강원도 속초시',
    isActive: true
  }
]
