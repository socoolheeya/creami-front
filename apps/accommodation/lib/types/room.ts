export type RoomType = 'single' | 'double' | 'twin' | 'suite' | 'deluxe' | 'family'

export type RoomStatus = 'available' | 'unavailable' | 'maintenance'

export type BedType = 'single' | 'double' | 'queen' | 'king' | 'sofa'

export type ViewType = 'ocean' | 'city' | 'garden' | 'mountain' | 'pool' | 'none'

export interface BedConfig {
  type: BedType
  count: number
}

export interface RoomImage {
  id: string
  url: string
  isPrimary: boolean
  order: number
}

export interface Room {
  id: string

  // Step 1: Basic Info
  name: string                    // 예: "101호", "디럭스 더블"
  type: RoomType
  accommodationId: string         // 소속 숙소 ID
  accommodationName?: string      // 표시용 (조인 데이터)

  // Step 2: Room Details
  size: number                    // 평수 또는 sqm
  sizeUnit: 'sqm' | 'pyeong'     // 단위
  floor: number                   // 층수
  bedConfiguration: BedConfig[]   // 침대 구성
  standardOccupancy: number       // 기준 인원
  maxOccupancy: number           // 최대 인원
  extraBedAvailable: boolean      // 엑스트라 베드 가능 여부
  extraBedCount?: number         // 가능한 엑스트라 베드 수

  // Step 3: Features & Amenities
  viewType: ViewType
  smokingAllowed: boolean
  amenities: string[]            // 객실별 편의시설
  accessibilityFeatures: string[] // 장애인 편의시설

  // Step 4: Images
  images: RoomImage[]

  status: RoomStatus
  createdAt: Date
  updatedAt: Date
}

// Wizard 폼 데이터 (각 단계별)
export interface RoomFormData {
  // Step 1
  name?: string
  type?: RoomType
  accommodationId?: string
  accommodationName?: string

  // Step 2
  size?: number
  sizeUnit?: 'sqm' | 'pyeong'
  floor?: number
  bedConfiguration?: BedConfig[]
  standardOccupancy?: number
  maxOccupancy?: number
  extraBedAvailable?: boolean
  extraBedCount?: number

  // Step 3
  viewType?: ViewType
  smokingAllowed?: boolean
  amenities?: string[]
  accessibilityFeatures?: string[]

  // Step 4
  images?: RoomImage[]
}

// 객실 타입 라벨
export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  single: '싱글',
  double: '더블',
  twin: '트윈',
  suite: '스위트',
  deluxe: '디럭스',
  family: '패밀리'
}

// 상태 라벨
export const ROOM_STATUS_LABELS: Record<RoomStatus, string> = {
  available: '이용가능',
  unavailable: '이용불가',
  maintenance: '점검중'
}

// 침대 타입 라벨
export const BED_TYPE_LABELS: Record<BedType, string> = {
  single: '싱글 베드',
  double: '더블 베드',
  queen: '퀸 베드',
  king: '킹 베드',
  sofa: '소파 베드'
}

// 뷰 타입 라벨
export const VIEW_TYPE_LABELS: Record<ViewType, string> = {
  ocean: '오션뷰',
  city: '시티뷰',
  garden: '가든뷰',
  mountain: '마운틴뷰',
  pool: '풀뷰',
  none: '뷰 없음'
}

// 객실 편의시설 옵션
export const ROOM_AMENITY_OPTIONS = [
  'TV',
  '에어컨',
  '냉장고',
  '미니바',
  '커피머신',
  '전자레인지',
  '전기포트',
  '헤어드라이어',
  '욕조',
  '샤워부스',
  '비데',
  '발코니',
  '업무용 책상',
  '금고',
  '다리미',
  '슬리퍼',
  '가운'
] as const

// 장애인 편의시설 옵션
export const ACCESSIBILITY_OPTIONS = [
  '휠체어 접근 가능',
  '넓은 출입구',
  '욕실 손잡이',
  '낮은 세면대',
  '시각장애인 안내',
  '청각장애인 알람'
] as const
