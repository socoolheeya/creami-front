import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import {
  type BedType,
  type Room,
  type RoomStatus,
  type RoomType,
  type ViewType
} from '@/lib/types/room'

export type RoomSearchCondition = {
  roomId?: string
  propertyId?: string
  accommodationId?: string
  name?: string
  search?: string
  enabled?: boolean
  cursorCreatedAt?: string
  cursorId?: string
  size?: number
  type?: string
  status?: string
}

type ApiRoomDto = Partial<Omit<Room, 'createdAt' | 'updatedAt' | 'images'>> & {
  id?: string | number | null
  roomId?: string | number | null
  propertyId?: string | number | null
  accommodationId?: string | number | null
  propertyName?: string | null
  accommodationName?: string | null
  roomSize?: number | null
  roomSizeUnit?: string | null
  baseMinLos?: number | null
  basMinLos?: number | null
  baseMaxLos?: number | null
  type?: string | null
  status?: string | null
  viewType?: string | null
  images?: unknown
  roomImages?: unknown
  createdAt?: string | Date | null
  updatedAt?: string | Date | null
}

type ApiRoomImageDto = Partial<Room['images'][number]> & {
  roomImageId?: string | number | null
  imageId?: string | number | null
  imageUrl?: string | null
  url?: string | null
  primary?: boolean | null
  sortOrder?: number | null
}

type ApiRoomBedDto = Partial<Room['bedConfiguration'][number]> & {
  bedType?: string | null
  count?: number | null
  bedCount?: number | null
}

type ApiRoomOccupancyDto = Partial<Pick<
  Room,
  | 'standardOccupancyAdult'
  | 'standardOccupancyChild'
  | 'useMinOccupancy'
  | 'minOccupancyAdult'
  | 'minOccupancyChild'
  | 'useMaxOccupancy'
  | 'maxOccupancyAdult'
  | 'maxOccupancyChild'
  | 'totalOccupancy'
  | 'maxInfantCount'
  | 'freeChildAge'
  | 'minChildAge'
  | 'maxChildAge'
  | 'extraBedAvailable'
  | 'extraBedCount'
  | 'standardOccupancy'
  | 'maxOccupancy'
>> & {
  baseAdultCount?: number | string | null
  baseChildCount?: number | string | null
  minAdultCount?: number | string | null
  minChildCount?: number | string | null
  maxAdultCount?: number | string | null
  maxChildCount?: number | string | null
  totalGuests?: number | string | null
  maxInfantCount?: number | string | null
  freeChildAge?: number | string | null
}

type ApiRoomDescriptionDto = Partial<Pick<Room, 'description' | 'enDescription' | 'cmsDescription' | 'amenities' | 'accessibilityFeatures'>> & {
  koreanDescription?: string | null
  koDescription?: string | null
  roomDescription?: string | null
  englishDescription?: string | null
  enRoomDescription?: string | null
  cmsRoomDescription?: string | null
  cmsDescriptionText?: string | null
}

type GetRoomsApiResponse = {
  rooms?: ApiRoomDto[]
  content?: ApiRoomDto[]
  data?: ApiRoomDto[]
  items?: ApiRoomDto[]
  results?: ApiRoomDto[]
  nextCursor?: {
    createdAt?: string
    cursorCreatedAt?: string
    roomId?: string | number
    cursorId?: string | number
    id?: string | number
  } | null
  hasNext?: boolean
  hasNextPage?: boolean
  last?: boolean
}

type GetRoomApiResponse = ApiRoomDto | {
  room?: ApiRoomDto
  data?: ApiRoomDto
  item?: ApiRoomDto
}

type RoomPageCursor = {
  cursorCreatedAt: string
  cursorId: string
}

const roomTypes: RoomType[] = ['single', 'double', 'twin', 'suite', 'deluxe', 'family']
const roomStatuses: RoomStatus[] = ['draft', 'active', 'inactive', 'archived']
const bedTypes: BedType[] = ['single', 'double', 'queen', 'king', 'sofa']
const viewTypes: ViewType[] = ['ocean', 'city', 'garden', 'mountain', 'pool', 'none']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getWrappedValue(response: unknown, keys: string[]) {
  if (!isRecord(response)) {
    return response
  }

  for (const key of keys) {
    if (key in response) {
      return response[key]
    }
  }

  return response
}

async function getOptionalApiResponse<T>(endpoint: string) {
  const response = await api.get<T | '' | null>(endpoint)
  return response || undefined
}

function removeEmptyFilters(filters?: RoomSearchCondition) {
  if (!filters) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== '')
  )
}

function normalizeDate(value: string | Date | null | undefined) {
  if (value instanceof Date) {
    return value
  }

  return value ? new Date(value) : new Date()
}

function normalizeOptionalNumber(value: number | string | null | undefined) {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  const numberValue = Number(value)

  return Number.isNaN(numberValue) ? undefined : numberValue
}

function normalizeEnum<T extends string>(value: string | null | undefined, options: T[], fallback: T) {
  const normalizedValue = value?.toLowerCase()
  const matchedValue = options.find((option) => option === normalizedValue)

  return matchedValue ?? fallback
}

function normalizeRoomStatus(status: string | null | undefined): RoomStatus {
  const normalizedStatus = status?.toLowerCase()

  if (normalizedStatus === 'available') {
    return 'active'
  }

  if (
    normalizedStatus === 'unavailable' ||
    normalizedStatus === 'maintenance' ||
    normalizedStatus === 'inactive' ||
    normalizedStatus === 'deactive'
  ) {
    return 'inactive'
  }

  return normalizeEnum(normalizedStatus, roomStatuses, 'draft')
}

function normalizeSizeUnit(value: string | null | undefined) {
  const normalizedValue = value?.toLowerCase()

  return normalizedValue === 'pyeong' ? 'pyeong' : 'sqm'
}

function getRoomsFromResponse(response: ApiRoomDto[] | GetRoomsApiResponse) {
  if (Array.isArray(response)) {
    return response
  }

  return response.rooms ??
    response.content ??
    response.data ??
    response.items ??
    response.results ??
    []
}

function getRoomFromResponse(response: GetRoomApiResponse) {
  if ('room' in response && response.room) {
    return response.room
  }

  if ('data' in response && response.data) {
    return response.data
  }

  if ('item' in response && response.item) {
    return response.item
  }

  return response as ApiRoomDto
}

function normalizeRoomImages(images: unknown): Room['images'] {
  if (!Array.isArray(images)) {
    return []
  }

  return images.map((image, index) => {
    const item = image as ApiRoomImageDto
    const url = item.url ?? item.imageUrl ?? ''

    return {
      id:
        item.id?.toString() ??
        item.roomImageId?.toString() ??
        item.imageId?.toString() ??
        `${index}`,
      url,
      isPrimary: item.isPrimary ?? item.primary ?? index === 0,
      order: item.order ?? item.sortOrder ?? index
    }
  }).filter((image) => image.url.length > 0)
}

function normalizeBedConfiguration(bedConfiguration: unknown) {
  if (!Array.isArray(bedConfiguration)) {
    return []
  }

  return bedConfiguration.map((bed) => {
    const item = bed as ApiRoomBedDto

    return {
      type: normalizeEnum(item.type ?? item.bedType, bedTypes, 'single'),
      count: item.count ?? item.bedCount ?? 0
    }
  })
}

function normalizeRoomOccupancy(occupancy: unknown) {
  if (!isRecord(occupancy)) {
    return undefined
  }

  const item = occupancy as ApiRoomOccupancyDto
  const minOccupancyAdult = normalizeOptionalNumber(item.minOccupancyAdult ?? item.minAdultCount)
  const minOccupancyChild = normalizeOptionalNumber(item.minOccupancyChild ?? item.minChildCount)
  const maxOccupancyAdult = normalizeOptionalNumber(item.maxOccupancyAdult ?? item.maxAdultCount)
  const maxOccupancyChild = normalizeOptionalNumber(item.maxOccupancyChild ?? item.maxChildCount)

  return Object.fromEntries(Object.entries({
    standardOccupancyAdult:
      normalizeOptionalNumber(item.standardOccupancyAdult ?? item.baseAdultCount),
    standardOccupancyChild:
      normalizeOptionalNumber(item.standardOccupancyChild ?? item.baseChildCount),
    useMinOccupancy:
      item.useMinOccupancy ?? (minOccupancyAdult !== undefined || minOccupancyChild !== undefined),
    minOccupancyAdult,
    minOccupancyChild,
    useMaxOccupancy: item.useMaxOccupancy ?? true,
    maxOccupancyAdult,
    maxOccupancyChild,
    totalOccupancy: normalizeOptionalNumber(item.totalOccupancy ?? item.totalGuests),
    maxInfantCount: normalizeOptionalNumber(item.maxInfantCount),
    freeChildAge: normalizeOptionalNumber(item.freeChildAge),
    minChildAge: normalizeOptionalNumber(item.minChildAge),
    maxChildAge: normalizeOptionalNumber(item.maxChildAge),
    extraBedAvailable: item.extraBedAvailable,
    extraBedCount: normalizeOptionalNumber(item.extraBedCount),
    standardOccupancy: normalizeOptionalNumber(item.standardOccupancy),
    maxOccupancy: normalizeOptionalNumber(item.maxOccupancy)
  }).filter(([, value]) => value !== undefined))
}

function normalizeRoomDescription(description: unknown) {
  if (!isRecord(description)) {
    return undefined
  }

  const item = description as ApiRoomDescriptionDto

  return {
    description:
      item.description ??
      item.koreanDescription ??
      item.koDescription ??
      item.roomDescription ??
      undefined,
    enDescription:
      item.enDescription ??
      item.englishDescription ??
      item.enRoomDescription ??
      undefined,
    cmsDescription:
      item.cmsDescription ??
      item.cmsRoomDescription ??
      item.cmsDescriptionText ??
      undefined,
    amenities: item.amenities ?? undefined,
    accessibilityFeatures: item.accessibilityFeatures ?? undefined
  }
}

function normalizeRoomDetail(
  room: ApiRoomDto,
  description: unknown,
  images: unknown,
  occupancy: unknown,
  beds: unknown
) {
  const normalizedDescription = normalizeRoomDescription(description)
  const normalizedOccupancy = normalizeRoomOccupancy(occupancy)

  return normalizeRoom({
    ...room,
    ...normalizedDescription,
    ...normalizedOccupancy,
    baseMinLos: normalizeOptionalNumber(room.baseMinLos ?? room.basMinLos),
    baseMaxLos: normalizeOptionalNumber(room.baseMaxLos),
    images: images ?? room.images,
    roomImages: images ?? room.roomImages,
    bedConfiguration: Array.isArray(beds) ? normalizeBedConfiguration(beds) : room.bedConfiguration
  })
}

function normalizeRoom(room: ApiRoomDto): Room {
  const standardOccupancyAdult = room.standardOccupancyAdult ?? room.standardOccupancy ?? 0
  const standardOccupancyChild = room.standardOccupancyChild ?? 0
  const maxOccupancyAdult = room.maxOccupancyAdult ?? room.maxOccupancy ?? standardOccupancyAdult
  const maxOccupancyChild = room.maxOccupancyChild ?? standardOccupancyChild
  const standardOccupancy = standardOccupancyAdult + standardOccupancyChild
  const maxOccupancy = maxOccupancyAdult + maxOccupancyChild

  return {
    id: room.roomId?.toString() ?? room.id?.toString() ?? '',
    name: room.name ?? '',
    enName: room.enName ?? '',
    type: normalizeEnum(room.type, roomTypes, 'single'),
    accommodationId:
      room.accommodationId?.toString() ??
      room.propertyId?.toString() ??
      '',
    accommodationName: room.accommodationName ?? room.propertyName ?? '',
    size: room.roomSize ?? room.size ?? 0,
    sizeUnit: normalizeSizeUnit(room.roomSizeUnit ?? room.sizeUnit),
    floor: room.floor ?? 0,
    baseMinLos: normalizeOptionalNumber(room.baseMinLos ?? room.basMinLos),
    baseMaxLos: normalizeOptionalNumber(room.baseMaxLos),
    bedConfiguration: normalizeBedConfiguration(room.bedConfiguration),
    standardOccupancyAdult,
    standardOccupancyChild,
    useMinOccupancy: room.useMinOccupancy ?? false,
    minOccupancyAdult: room.minOccupancyAdult,
    minOccupancyChild: room.minOccupancyChild,
    useMaxOccupancy: room.useMaxOccupancy ?? true,
    maxOccupancyAdult,
    maxOccupancyChild,
    totalOccupancy: room.totalOccupancy,
    maxInfantCount: room.maxInfantCount,
    freeChildAge: room.freeChildAge,
    minChildAge: room.minChildAge ?? 0,
    maxChildAge: room.maxChildAge ?? 12,
    extraBedAvailable: room.extraBedAvailable ?? false,
    extraBedCount: room.extraBedCount,
    description: room.description ?? '',
    enDescription: room.enDescription ?? '',
    cmsDescription: room.cmsDescription ?? '',
    viewType: normalizeEnum(room.viewType, viewTypes, 'none'),
    smokingAllowed: room.smokingAllowed ?? false,
    amenities: room.amenities ?? [],
    accessibilityFeatures: room.accessibilityFeatures ?? [],
    images: normalizeRoomImages(room.images ?? room.roomImages),
    status: normalizeRoomStatus(room.status),
    createdAt: normalizeDate(room.createdAt),
    updatedAt: normalizeDate(room.updatedAt),
    createdBy: room.createdBy ?? '',
    updatedBy: room.updatedBy ?? '',
    standardOccupancy,
    maxOccupancy
  }
}

function getCursorKey(cursor?: RoomPageCursor) {
  return cursor ? `${cursor.cursorCreatedAt}:${cursor.cursorId}` : ''
}

function normalizeNextCursor(nextCursor: GetRoomsApiResponse['nextCursor']) {
  const cursorCreatedAt = nextCursor?.cursorCreatedAt ?? nextCursor?.createdAt
  const cursorId = nextCursor?.cursorId ?? nextCursor?.roomId ?? nextCursor?.id

  if (!cursorCreatedAt || cursorId === undefined || cursorId === null || cursorId === '') {
    return undefined
  }

  return {
    cursorCreatedAt,
    cursorId: cursorId.toString()
  }
}

function getHasNextPage(response: GetRoomsApiResponse, nextCursor?: RoomPageCursor) {
  if (typeof response.hasNext === 'boolean') {
    return response.hasNext
  }

  if (typeof response.hasNextPage === 'boolean') {
    return response.hasNextPage
  }

  if (typeof response.last === 'boolean') {
    return !response.last
  }

  return !!nextCursor
}

// Query Keys (캐시 키 관리)
export const roomKeys = {
  all: ['rooms'] as const,
  lists: () => [...roomKeys.all, 'list'] as const,
  list: (filters?: RoomSearchCondition) => [...roomKeys.lists(), filters] as const,
  details: () => [...roomKeys.all, 'detail'] as const,
  detail: (id: string) => [...roomKeys.details(), id] as const,
  byAccommodation: (accommodationId: string) => [...roomKeys.all, 'accommodation', accommodationId] as const,
}

// GET /rooms/search - 객실 목록 조회
export function useRooms(filters?: RoomSearchCondition, enabled = true) {
  return useQuery({
    queryKey: roomKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<ApiRoomDto[] | GetRoomsApiResponse>('/rooms/search', {
        params: removeEmptyFilters(filters)
      })

      return getRoomsFromResponse(response).map(normalizeRoom)
    },
    enabled
  })
}

export function useInfiniteRooms(filters?: RoomSearchCondition, queryEnabled = true) {
  return useInfiniteQuery({
    queryKey: [...roomKeys.list(filters), 'infinite'] as const,
    initialPageParam: undefined as RoomPageCursor | undefined,
    queryFn: async ({ pageParam, signal }) => {
      const response = await api.get<ApiRoomDto[] | GetRoomsApiResponse>('/rooms/search', {
        params: removeEmptyFilters({
          ...filters,
          cursorCreatedAt: pageParam?.cursorCreatedAt,
          cursorId: pageParam?.cursorId
        }),
        signal
      })
      const rooms = getRoomsFromResponse(response).map(normalizeRoom)
      const nextCursor = Array.isArray(response) ? undefined : response.nextCursor
      const normalizedNextCursor = normalizeNextCursor(nextCursor)

      return {
        rooms,
        pageCursor: pageParam,
        itemIds: rooms.map((room) => room.id).filter(Boolean),
        nextCursor: normalizedNextCursor,
        hasNext: Array.isArray(response) ? false : getHasNextPage(response, normalizedNextCursor)
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNext || !lastPage.nextCursor?.cursorId) {
        return undefined
      }

      const nextCursorKey = getCursorKey(lastPage.nextCursor)
      const currentCursorKey = getCursorKey(lastPage.pageCursor)
      const usedCursorKeys = new Set(
        allPages
          .map((page) => getCursorKey(page.pageCursor))
          .filter(Boolean)
      )

      if (nextCursorKey === currentCursorKey || usedCursorKeys.has(nextCursorKey)) {
        return undefined
      }

      const previousItemIds = new Set(
        allPages
          .slice(0, -1)
          .flatMap((page) => page.itemIds)
      )
      const isDuplicatedPage =
        lastPage.itemIds.length > 0 &&
        lastPage.itemIds.every((itemId) => previousItemIds.has(itemId))

      return isDuplicatedPage ? undefined : lastPage.nextCursor
    },
    enabled: queryEnabled,
    staleTime: 30_000
  })
}

// GET /rooms/:id - 특정 객실 상세 조회
export function useRoom(id: string) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: async () => {
      const [
        roomResponse,
        descriptionResponse,
        imagesResponse,
        occupancyResponse,
        bedsResponse
      ] = await Promise.all([
        api.get<GetRoomApiResponse>(`/rooms/${id}`),
        getOptionalApiResponse<unknown>(`/rooms/${id}/description`),
        getOptionalApiResponse<unknown>(`/rooms/${id}/room-images`),
        getOptionalApiResponse<unknown>(`/rooms/${id}/occupancy`),
        getOptionalApiResponse<unknown>(`/rooms/${id}/roomBeds`)
      ])
      const room = getRoomFromResponse(roomResponse)
      const description = getWrappedValue(descriptionResponse, [
        'roomDescription',
        'description'
      ])
      const images = getWrappedValue(imagesResponse, ['roomImages', 'images'])
      const occupancy = getWrappedValue(occupancyResponse, [
        'roomOccupancy',
        'occupancy'
      ])
      const beds = getWrappedValue(bedsResponse, [
        'roomBeds',
        'beds',
        'bedConfiguration'
      ])

      return normalizeRoomDetail(room, description, images, occupancy, beds)
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  })
}

// GET /accommodations/:accommodationId/rooms - 특정 숙소의 객실 목록 조회
export function useRoomsByAccommodation(accommodationId: string) {
  return useQuery({
    queryKey: roomKeys.byAccommodation(accommodationId),
    queryFn: () => api.get<Room[]>(`/accommodations/${accommodationId}/rooms`),
    enabled: !!accommodationId,
  })
}

// POST /rooms - 새 객실 생성
export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Room>) =>
      api.post<Room>('/rooms', data),
    onSuccess: (newRoom) => {
      // 생성 성공 시 목록 캐시 무효화 (자동 재조회)
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
      // 해당 숙소의 객실 목록도 무효화
      if (newRoom.accommodationId) {
        queryClient.invalidateQueries({
          queryKey: roomKeys.byAccommodation(newRoom.accommodationId)
        })
      }
    },
  })
}

// PUT /rooms/:id - 객실 정보 수정
export function useUpdateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Room> }) =>
      api.put<Room>(`/rooms/${id}`, data),
    onSuccess: (updatedRoom, variables) => {
      // 수정 성공 시 해당 객실 상세와 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
      // 해당 숙소의 객실 목록도 무효화
      if (updatedRoom.accommodationId) {
        queryClient.invalidateQueries({
          queryKey: roomKeys.byAccommodation(updatedRoom.accommodationId)
        })
      }
    },
  })
}

// PATCH /rooms/:id - 객실 부분 수정
export function usePatchRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Room> }) =>
      api.patch<Room>(`/rooms/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
    },
  })
}

// DELETE /rooms/:id - 객실 삭제
export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete(`/rooms/${id}`),
    onSuccess: () => {
      // 삭제 성공 시 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
    },
  })
}

// PUT /rooms/:id/status - 객실 상태 변경 (draft, active, inactive, archived)
export function useUpdateRoomStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.put<Room>(`/rooms/${id}/status`, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
    },
  })
}
