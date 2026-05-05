import { Room } from '../types/room'

export const mockRooms: Room[] = [
  {
    id: '1',
    name: '101호 - 디럭스 더블',
    type: 'deluxe',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    size: 30,
    sizeUnit: 'sqm',
    floor: 1,
    bedConfiguration: [
      { type: 'king', count: 1 }
    ],
    standardOccupancy: 2,
    maxOccupancy: 4,
    extraBedAvailable: true,
    extraBedCount: 2,
    viewType: 'city',
    smokingAllowed: false,
    amenities: ['TV', '에어컨', '냉장고', '미니바', '커피머신', '욕조', '발코니', '업무용 책상', '금고'],
    accessibilityFeatures: [],
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        isPrimary: true,
        order: 0
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        isPrimary: false,
        order: 1
      }
    ],
    status: 'available',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '2',
    name: '201호 - 스위트',
    type: 'suite',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    size: 45,
    sizeUnit: 'sqm',
    floor: 2,
    bedConfiguration: [
      { type: 'king', count: 1 },
      { type: 'sofa', count: 1 }
    ],
    standardOccupancy: 2,
    maxOccupancy: 6,
    extraBedAvailable: true,
    extraBedCount: 2,
    viewType: 'city',
    smokingAllowed: false,
    amenities: ['TV', '에어컨', '냉장고', '미니바', '커피머신', '전자레인지', '욕조', '샤워부스', '발코니', '업무용 책상', '금고', '가운'],
    accessibilityFeatures: ['휠체어 접근 가능', '넓은 출입구', '욕실 손잡이'],
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    status: 'available',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '3',
    name: '301호 - 트윈',
    type: 'twin',
    accommodationId: '1',
    accommodationName: '그랜드 호텔 서울',
    size: 25,
    sizeUnit: 'sqm',
    floor: 3,
    bedConfiguration: [
      { type: 'single', count: 2 }
    ],
    standardOccupancy: 2,
    maxOccupancy: 3,
    extraBedAvailable: true,
    extraBedCount: 1,
    viewType: 'city',
    smokingAllowed: false,
    amenities: ['TV', '에어컨', '냉장고', '전기포트', '헤어드라이어', '샤워부스', '업무용 책상'],
    accessibilityFeatures: [],
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    status: 'available',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '4',
    name: 'A동 - 오션뷰',
    type: 'double',
    accommodationId: '2',
    accommodationName: '제주 바다 펜션',
    size: 35,
    sizeUnit: 'sqm',
    floor: 1,
    bedConfiguration: [
      { type: 'queen', count: 1 }
    ],
    standardOccupancy: 2,
    maxOccupancy: 4,
    extraBedAvailable: true,
    extraBedCount: 2,
    viewType: 'ocean',
    smokingAllowed: false,
    amenities: ['TV', '에어컨', '냉장고', '전자레인지', '전기포트', '헤어드라이어', '욕조', '발코니'],
    accessibilityFeatures: [],
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    status: 'available',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '5',
    name: 'B동 - 가든뷰',
    type: 'family',
    accommodationId: '2',
    accommodationName: '제주 바다 펜션',
    size: 50,
    sizeUnit: 'sqm',
    floor: 1,
    bedConfiguration: [
      { type: 'queen', count: 1 },
      { type: 'double', count: 1 }
    ],
    standardOccupancy: 4,
    maxOccupancy: 6,
    extraBedAvailable: true,
    extraBedCount: 2,
    viewType: 'garden',
    smokingAllowed: false,
    amenities: ['TV', '에어컨', '냉장고', '전자레인지', '전기포트', '헤어드라이어', '욕조', '샤워부스', '발코니', '업무용 책상'],
    accessibilityFeatures: [],
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    status: 'available',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '6',
    name: '101호 - 도미토리',
    type: 'family',
    accommodationId: '3',
    accommodationName: '부산 스테이 게스트하우스',
    size: 20,
    sizeUnit: 'sqm',
    floor: 1,
    bedConfiguration: [
      { type: 'single', count: 4 }
    ],
    standardOccupancy: 4,
    maxOccupancy: 4,
    extraBedAvailable: false,
    viewType: 'none',
    smokingAllowed: false,
    amenities: ['에어컨', '냉장고', '전기포트', '헤어드라이어', '샤워부스'],
    accessibilityFeatures: [],
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    status: 'available',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '7',
    name: '201호 - 개인실',
    type: 'single',
    accommodationId: '3',
    accommodationName: '부산 스테이 게스트하우스',
    size: 12,
    sizeUnit: 'sqm',
    floor: 2,
    bedConfiguration: [
      { type: 'single', count: 1 }
    ],
    standardOccupancy: 1,
    maxOccupancy: 1,
    extraBedAvailable: false,
    viewType: 'city',
    smokingAllowed: false,
    amenities: ['에어컨', '전기포트', '헤어드라이어', '샤워부스'],
    accessibilityFeatures: [],
    images: [
      {
        id: '7-1',
        url: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    status: 'maintenance',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    createdBy: 'admin',
    updatedBy: 'admin'
  }
]