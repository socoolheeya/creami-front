export type ParentPropertyStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | string

export type ParentPropertyType =
  | 'HOTEL'
  | 'RESORT'
  | 'MOTEL'
  | 'PENSION'
  | 'GUESTHOUSE'
  | 'VILLA'
  | 'OTHER'
  | string

export type AddressDto = {
  address?: string | null
  addressDetail?: string | null
  city?: string | null
  countryCode?: string | null
  zipCode?: string | null
}

export type PositionDto = {
  latitude?: number | null
  longitude?: number | null
  lat?: number | null
  lng?: number | null
}

export type ParentPropertyDto = {
  parentPropertyId: string | number | null
  name: string
  enName: string
  type: ParentPropertyType
  stars: number
  status: ParentPropertyStatus
  checkIn: string
  checkOut: string
  address: AddressDto
  position: PositionDto
  language?: string | null
  roomCount: number
  floorCount: number
}

export type ParentPropertySearchCondition = {
  parentPropertyId?: string
  name?: string
  type?: ParentPropertyType
  stars?: number
  status?: ParentPropertyStatus
  city?: string
  countryCode?: string
  minRoomCount?: number
  maxRoomCount?: number
}

export type SaveParentPropertyRequest = {
  parentProperty: ParentPropertyDto
}

export const parentPropertyTypeLabels: Record<string, string> = {
  HOTEL: '호텔',
  RESORT: '리조트',
  MOTEL: '모텔',
  PENSION: '펜션',
  GUESTHOUSE: '게스트하우스',
  VILLA: '빌라',
  OTHER: '기타'
}

export const parentPropertyStatusLabels: Record<string, string> = {
  DRAFT: '초안',
  ACTIVE: '활성',
  INACTIVE: '비활성',
  ARCHIVED: '보관'
}

export const parentPropertyTypeOptions: ParentPropertyType[] = [
  'HOTEL',
  'RESORT',
  'MOTEL',
  'PENSION',
  'GUESTHOUSE',
  'VILLA',
  'OTHER'
]

export const parentPropertyStatusOptions: ParentPropertyStatus[] = [
  'DRAFT',
  'ACTIVE',
  'INACTIVE',
  'ARCHIVED'
]

export function getParentPropertyId(property: ParentPropertyDto) {
  return property.parentPropertyId?.toString() ?? ''
}

export function getAddressText(address: AddressDto) {
  return address.address ?? ''
}

export function getAddressDetail(address: AddressDto) {
  return address.addressDetail ?? ''
}

export function getCity(address: AddressDto) {
  return address.city ?? ''
}

export function getCountryCode(address: AddressDto) {
  return address.countryCode ?? 'KR'
}

export function getZipCode(address: AddressDto) {
  return address.zipCode ?? ''
}

export function getLatitude(position: PositionDto) {
  return position.latitude ?? position.lat ?? 37.5665
}

export function getLongitude(position: PositionDto) {
  return position.longitude ?? position.lng ?? 126.978
}

export function getTypeLabel(type: ParentPropertyType) {
  return parentPropertyTypeLabels[type] ?? type
}

export function getStatusLabel(status: ParentPropertyStatus) {
  return parentPropertyStatusLabels[status] ?? status
}
