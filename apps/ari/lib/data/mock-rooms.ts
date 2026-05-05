export interface RoomType {
  id: string
  propertyId: string
  name: string
  code: string
  capacity: number
}

export const mockRoomTypes: RoomType[] = [
  // 그랜드 호텔 서울
  {
    id: 'r1',
    propertyId: '1',
    name: '스탠다드 더블',
    code: 'STD-DBL',
    capacity: 2
  },
  {
    id: 'r2',
    propertyId: '1',
    name: '디럭스 트윈',
    code: 'DLX-TWN',
    capacity: 2
  },
  {
    id: 'r3',
    propertyId: '1',
    name: '스위트룸',
    code: 'SUITE',
    capacity: 4
  },
  {
    id: 'r4',
    propertyId: '1',
    name: '프레지덴셜 스위트',
    code: 'PRES-SUITE',
    capacity: 6
  },
  // 제주 바다 펜션
  {
    id: 'r5',
    propertyId: '2',
    name: '오션뷰 더블',
    code: 'OCEAN-DBL',
    capacity: 2
  },
  {
    id: 'r6',
    propertyId: '2',
    name: '오션뷰 패밀리',
    code: 'OCEAN-FAM',
    capacity: 4
  },
  {
    id: 'r7',
    propertyId: '2',
    name: '펜트하우스',
    code: 'PENT',
    capacity: 6
  },
  // 부산 스테이 게스트하우스
  {
    id: 'r8',
    propertyId: '3',
    name: '도미토리 (4인실)',
    code: 'DORM-4',
    capacity: 4
  },
  {
    id: 'r9',
    propertyId: '3',
    name: '도미토리 (6인실)',
    code: 'DORM-6',
    capacity: 6
  },
  {
    id: 'r10',
    propertyId: '3',
    name: '프라이빗 룸',
    code: 'PRIVATE',
    capacity: 2
  }
]