export type UserStatus = 'active' | 'inactive' | 'invited'

export type SettingUser = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  team: string
  status: UserStatus
  accessibleAccommodationIds: string[]
  createdById: string
  createdAt: string
  updatedById: string
  updatedAt: string
}

export type AccommodationAccessOption = {
  id: string
  name: string
  address: string
  status: 'active' | 'inactive'
}

export const initialUsers: SettingUser[] = [
  {
    id: 'USR-001',
    name: '이원희',
    email: 'wonhee.lee@creami.io',
    phone: '010-1234-5678',
    role: 'Owner',
    team: 'Platform',
    status: 'active',
    accessibleAccommodationIds: ['ACC-001', 'ACC-002', 'ACC-003'],
    createdById: 'USR-001',
    createdAt: '2026-05-01 09:00',
    updatedById: 'USR-001',
    updatedAt: '2026-05-10 14:30'
  },
  {
    id: 'USR-002',
    name: '김민지',
    email: 'minji.kim@creami.io',
    phone: '010-2345-6789',
    role: 'Admin',
    team: 'Accommodation',
    status: 'active',
    accessibleAccommodationIds: ['ACC-001', 'ACC-002'],
    createdById: 'USR-001',
    createdAt: '2026-05-03 11:20',
    updatedById: 'USR-002',
    updatedAt: '2026-05-08 16:15'
  },
  {
    id: 'USR-003',
    name: '박준호',
    email: 'junho.park@creami.io',
    phone: '010-3456-7890',
    role: 'Operator',
    team: 'Booking',
    status: 'invited',
    accessibleAccommodationIds: ['ACC-003'],
    createdById: 'USR-001',
    createdAt: '2026-05-07 10:10',
    updatedById: 'USR-001',
    updatedAt: '2026-05-07 10:10'
  }
]

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
