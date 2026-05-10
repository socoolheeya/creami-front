export type MasterPropertyStatus = 'active' | 'inactive'
export type MasterPropertyType = 'hotel' | 'resort' | 'pension' | 'guesthouse' | 'motel' | 'villa'

export const masterPropertyTypeLabels: Record<MasterPropertyType, string> = {
  hotel: '호텔',
  resort: '리조트',
  pension: '펜션',
  guesthouse: '게스트하우스',
  motel: '모텔',
  villa: '빌라'
}

export type SupplierProperty = {
  id: string
  supplierId: string
  supplierName: string
  propertyName: string
  address: string
  city: string
}

export type MasterProperty = {
  id: string
  name: string
  enName: string
  status: MasterPropertyStatus
  type: MasterPropertyType
  stars: number
  address: string
  addressDetail: string
  city: string
  countryCode: string
  zipCode: string
  latitude: number
  longitude: number
  checkIn: string
  checkOut: string
  floorCount: number
  roomCount: number
  description: string
  mappedSupplierPropertyIds: string[]
  createdById: string
  createdAt: string
  updatedById: string
  updatedAt: string
}

export const supplierProperties: SupplierProperty[] = [
  {
    id: 'SP-001',
    supplierId: 'SUP-001',
    supplierName: 'Creami Partner',
    propertyName: '호텔신라 서울',
    address: '서울 중구 동호로 249',
    city: '서울'
  },
  {
    id: 'SP-002',
    supplierId: 'SUP-002',
    supplierName: 'Stay API Hub',
    propertyName: '서울 신라호텔',
    address: '서울특별시 중구 장충동2가 202',
    city: '서울'
  },
  {
    id: 'SP-003',
    supplierId: 'SUP-003',
    supplierName: 'Global Stay',
    propertyName: 'The Shilla Seoul',
    address: '249 Dongho-ro, Jung-gu, Seoul',
    city: '서울'
  },
  {
    id: 'SP-004',
    supplierId: 'SUP-001',
    supplierName: 'Creami Partner',
    propertyName: '그랜드 호텔 서울',
    address: '서울시 강남구 테헤란로 123',
    city: '서울'
  },
  {
    id: 'SP-005',
    supplierId: 'SUP-002',
    supplierName: 'Stay API Hub',
    propertyName: '제주 바다 펜션',
    address: '제주특별자치도 서귀포시 해안로 456',
    city: '서귀포'
  },
  {
    id: 'SP-006',
    supplierId: 'SUP-003',
    supplierName: 'Global Stay',
    propertyName: 'Jeju Sea Pension',
    address: '456 Haean-ro, Seogwipo-si, Jeju',
    city: '서귀포'
  }
]

export const masterProperties: MasterProperty[] = [
  {
    id: 'MP-001',
    name: '호텔신라',
    enName: 'The Shilla',
    status: 'active',
    type: 'hotel',
    stars: 5,
    address: '서울 중구 동호로 249',
    addressDetail: '장충동2가',
    city: '서울',
    countryCode: 'KR',
    zipCode: '04605',
    latitude: 37.5559,
    longitude: 127.0052,
    checkIn: '15:00',
    checkOut: '11:00',
    floorCount: 23,
    roomCount: 464,
    description: '여러 공급사에서 제각각 제공하는 호텔신라 시설을 하나의 대표숙소로 관리합니다.',
    mappedSupplierPropertyIds: ['SP-001', 'SP-002', 'SP-003'],
    createdById: 'USR-001',
    createdAt: '2026-05-01 09:00',
    updatedById: 'USR-001',
    updatedAt: '2026-05-10 13:30'
  },
  {
    id: 'MP-002',
    name: '그랜드 호텔 서울',
    enName: 'Grand Hotel Seoul',
    status: 'active',
    type: 'hotel',
    stars: 5,
    address: '서울시 강남구 테헤란로 123',
    addressDetail: '테헤란빌딩 3-5층',
    city: '서울',
    countryCode: 'KR',
    zipCode: '06234',
    latitude: 37.5012,
    longitude: 127.0396,
    checkIn: '15:00',
    checkOut: '11:00',
    floorCount: 15,
    roomCount: 250,
    description: '서울 강남 지역 대표 호텔 시설입니다.',
    mappedSupplierPropertyIds: ['SP-004'],
    createdById: 'USR-001',
    createdAt: '2026-05-03 10:30',
    updatedById: 'USR-002',
    updatedAt: '2026-05-09 16:20'
  },
  {
    id: 'MP-003',
    name: '제주 바다 펜션',
    enName: 'Jeju Sea Pension',
    status: 'active',
    type: 'pension',
    stars: 3,
    address: '제주특별자치도 서귀포시 해안로 456',
    addressDetail: '2층',
    city: '서귀포',
    countryCode: 'KR',
    zipCode: '63598',
    latitude: 33.2541,
    longitude: 126.5601,
    checkIn: '14:00',
    checkOut: '11:00',
    floorCount: 2,
    roomCount: 12,
    description: '제주 지역 펜션 공급사 시설을 대표숙소로 묶어 관리합니다.',
    mappedSupplierPropertyIds: ['SP-005', 'SP-006'],
    createdById: 'USR-002',
    createdAt: '2026-05-05 11:15',
    updatedById: 'USR-002',
    updatedAt: '2026-05-08 15:40'
  }
]

export function formatAuditDate() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ')
}
