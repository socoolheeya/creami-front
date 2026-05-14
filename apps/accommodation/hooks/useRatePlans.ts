import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import {
  type MealPlan,
  type PriceType,
  type RatePlan,
  type RatePlanStatus,
  type RatePlanType
} from '@/lib/types/rateplan'

export type RatePlanSearchCondition = {
  ratePlanId?: string
  accommodationId?: string
  roomId?: string
  name?: string
  enName?: string
  benefitName?: string
  search?: string
  enabled?: boolean
  cursorCreatedAt?: string
  cursorId?: string
  size?: number
  status?: string
  ratePlanType?: string
  priceType?: string
  mealPlan?: string
}

export type RatePlanPageSearchCondition = {
  ratePlanId?: string
  accommodationId?: string
  roomId?: string
  name?: string
  enName?: string
  benefitName?: string
  search?: string
  page?: number
  size?: number
  status?: string
  ratePlanType?: string
  priceType?: string
  mealPlan?: string
}

type ApiRatePlanDto = Partial<Omit<RatePlan, 'createdAt' | 'updatedAt'>> & {
  id?: string | number | null
  ratePlanId?: string | number | null
  propertyId?: string | number | null
  accommodationId?: string | number | null
  roomId?: string | number | null
  type?: string | null
  ratePlanType?: string | null
  priceType?: string | null
  status?: string | null
  mealPlan?: string | null
  enabled?: boolean | null
  createdAt?: string | Date | null
  updatedAt?: string | Date | null
}

type GetRatePlansApiResponse = {
  ratePlans?: ApiRatePlanDto[]
  content?: ApiRatePlanDto[]
  data?: ApiRatePlanDto[]
  items?: ApiRatePlanDto[]
  results?: ApiRatePlanDto[]
  nextCursor?: {
    createdAt?: string
    cursorCreatedAt?: string
    ratePlanId?: string | number
    cursorId?: string | number
    id?: string | number
  } | null
  hasNext?: boolean
  hasNextPage?: boolean
  last?: boolean
}

type GetRatePlansPaginatedApiResponse = {
  ratePlans?: ApiRatePlanDto[]
  content?: ApiRatePlanDto[]
  data?: ApiRatePlanDto[]
  items?: ApiRatePlanDto[]
  results?: ApiRatePlanDto[]
  totalElements?: number
  totalPages?: number
  total?: number
  page?: number
  currentPage?: number
  size?: number
  pageSize?: number
  first?: boolean
  last?: boolean
  isFirst?: boolean
  isLast?: boolean
  hasNext?: boolean
  hasPrevious?: boolean
  number?: number
  numberOfElements?: number
}

type RatePlanPageCursor = {
  cursorCreatedAt: string
  cursorId: string
}

const ratePlanTypes: RatePlanType[] = ['standalone', 'package', 'business', 'opaque', 'b2b']
const priceTypes: PriceType[] = [
  'net_rate',
  'sell_rate_no_commission',
  'commission_included',
  'net_and_sell'
]
const mealPlans: MealPlan[] = [
  'none',
  'breakfast',
  'lunch',
  'dinner',
  'all_inclusive',
  'breakfast_and_lunch',
  'lunch_and_dinner',
  'bed_and_breakfast',
  'buffet_breakfast'
]
const ratePlanStatuses: RatePlanStatus[] = ['draft', 'active', 'inactive', 'archived']

function removeEmptyFilters(filters?: RatePlanSearchCondition | RatePlanPageSearchCondition) {
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

function normalizeEnum<T extends string>(value: string | null | undefined, options: T[], fallback: T) {
  if (!value) return fallback

  const normalizedValue = value.toLowerCase()
  const matchedValue = options.find((option) => option.toLowerCase() === normalizedValue)

  return matchedValue ?? fallback
}

function getRatePlansFromResponse(response: ApiRatePlanDto[] | GetRatePlansApiResponse) {
  if (Array.isArray(response)) {
    return response
  }

  return response.ratePlans ??
    response.content ??
    response.data ??
    response.items ??
    response.results ??
    []
}

function getRatePlansFromPaginatedResponse(
  response: GetRatePlansPaginatedApiResponse
): ApiRatePlanDto[] {
  return response.ratePlans ??
    response.content ??
    response.data ??
    response.items ??
    response.results ??
    []
}

function getPaginationInfo(response: GetRatePlansPaginatedApiResponse) {
  return {
    totalElements: response.totalElements ?? response.total ?? 0,
    totalPages: response.totalPages ?? 0,
    currentPage: response.currentPage ?? response.page ?? response.number ?? 0,
    pageSize: response.pageSize ?? response.size ?? 10,
    isFirst: response.isFirst ?? response.first ?? false,
    isLast: response.isLast ?? response.last ?? false,
    hasNext: response.hasNext ?? false,
    hasPrevious: response.hasPrevious ?? false,
    numberOfElements: response.numberOfElements ?? 0
  }
}

function normalizeRatePlan(ratePlan: ApiRatePlanDto): RatePlan {
  const ratePlanId = ratePlan.ratePlanId?.toString() ?? ratePlan.id?.toString() ?? ''

  return {
    id: ratePlanId,
    accommodationId:
      ratePlan.accommodationId?.toString() ??
      ratePlan.propertyId?.toString(),
    roomId: ratePlan.roomId?.toString(),
    name: ratePlan.name ?? '',
    enName: ratePlan.enName ?? '',
    benefitName: ratePlan.benefitName ?? ratePlan.description?.benefitName ?? '',
    ratePlanType: normalizeEnum(
      ratePlan.ratePlanType ?? ratePlan.type,
      ratePlanTypes,
      'standalone'
    ),
    priceType: normalizeEnum(ratePlan.priceType, priceTypes, 'net_rate'),
    status: normalizeEnum(ratePlan.status, ratePlanStatuses, 'draft'),
    mealPlan: normalizeEnum(ratePlan.mealPlan, mealPlans, 'none'),
    enabled: ratePlan.enabled ?? true,
    description: ratePlan.description,
    setting: ratePlan.setting,
    salePeriod: ratePlan.salePeriod,
    cancellationPolicies: ratePlan.cancellationPolicies ?? [],
    createdAt: normalizeDate(ratePlan.createdAt),
    updatedAt: normalizeDate(ratePlan.updatedAt),
    createdBy: ratePlan.createdBy ?? '',
    updatedBy: ratePlan.updatedBy ?? ''
  }
}

function getCursorKey(cursor?: RatePlanPageCursor) {
  return cursor ? `${cursor.cursorCreatedAt}:${cursor.cursorId}` : ''
}

function normalizeNextCursor(nextCursor: GetRatePlansApiResponse['nextCursor']) {
  const cursorCreatedAt = nextCursor?.cursorCreatedAt ?? nextCursor?.createdAt
  const cursorId = nextCursor?.cursorId ?? nextCursor?.ratePlanId ?? nextCursor?.id

  if (!cursorCreatedAt || cursorId === undefined || cursorId === null || cursorId === '') {
    return undefined
  }

  return {
    cursorCreatedAt,
    cursorId: cursorId.toString()
  }
}

function getHasNextPage(response: GetRatePlansApiResponse, nextCursor?: RatePlanPageCursor) {
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
export const ratePlanKeys = {
  all: ['ratePlans'] as const,
  lists: () => [...ratePlanKeys.all, 'list'] as const,
  list: (filters?: RatePlanSearchCondition) => [...ratePlanKeys.lists(), filters] as const,
  details: () => [...ratePlanKeys.all, 'detail'] as const,
  detail: (id: string) => [...ratePlanKeys.details(), id] as const,
  byAccommodation: (accommodationId: string) => [...ratePlanKeys.all, 'accommodation', accommodationId] as const,
  byRoom: (roomId: string) => [...ratePlanKeys.all, 'room', roomId] as const,
}

// GET /rate-plans/search - 요금제 목록 조회
export function useRatePlans(filters?: RatePlanSearchCondition, enabled = true) {
  return useQuery({
    queryKey: ratePlanKeys.list(filters),
    queryFn: async ({ signal }) => {
      const response = await api.get<ApiRatePlanDto[] | GetRatePlansApiResponse>(
        '/rate-plans/search',
        {
          params: removeEmptyFilters(filters),
          signal
        }
      )

      return getRatePlansFromResponse(response).map(normalizeRatePlan)
    },
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000
  })
}

export function useInfiniteRatePlans(filters?: RatePlanSearchCondition, queryEnabled = true) {
  return useInfiniteQuery({
    queryKey: [...ratePlanKeys.list(filters), 'infinite'] as const,
    initialPageParam: undefined as RatePlanPageCursor | undefined,
    queryFn: async ({ pageParam, signal }) => {
      const response = await api.get<ApiRatePlanDto[] | GetRatePlansApiResponse>(
        '/rate-plans/search',
        {
          params: removeEmptyFilters({
            ...filters,
            cursorCreatedAt: pageParam?.cursorCreatedAt,
            cursorId: pageParam?.cursorId
          }),
          signal
        }
      )
      const ratePlans = getRatePlansFromResponse(response).map(normalizeRatePlan)
      const nextCursor = Array.isArray(response) ? undefined : response.nextCursor
      const normalizedNextCursor = normalizeNextCursor(nextCursor)

      return {
        ratePlans,
        pageCursor: pageParam,
        itemIds: ratePlans.map((ratePlan) => ratePlan.id).filter(Boolean),
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

// GET /rate-plans/search (Paginated) - 페이지네이션 방식 요금제 목록 조회
export function useRatePlansPaginated(filters?: RatePlanPageSearchCondition, enabled = true) {
  const page = filters?.page ?? 1
  const size = filters?.size ?? 10

  return useQuery({
    queryKey: [...ratePlanKeys.list(filters), 'paginated', page, size] as const,
    queryFn: async ({ signal }) => {
      const response = await api.get<GetRatePlansPaginatedApiResponse>(
        '/rate-plans/search',
        {
          params: removeEmptyFilters({
            ...filters,
            page: page - 1, // 백엔드는 0부터 시작
            size
          }),
          signal
        }
      )

      const ratePlans = getRatePlansFromPaginatedResponse(response).map(normalizeRatePlan)
      const paginationInfo = getPaginationInfo(response)

      return {
        ratePlans,
        pagination: {
          ...paginationInfo,
          currentPage: paginationInfo.currentPage + 1, // 프론트엔드는 1부터 시작
        }
      }
    },
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000
  })
}

// GET /rateplans/:id - 특정 요금제 상세 조회
export function useRatePlan(id: string) {
  return useQuery({
    queryKey: ratePlanKeys.detail(id),
    queryFn: () => api.get<RatePlan>(`/rateplans/${id}`),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  })
}

// GET /accommodations/:accommodationId/rateplans - 특정 숙소의 요금제 목록 조회
export function useRatePlansByAccommodation(accommodationId: string) {
  return useQuery({
    queryKey: ratePlanKeys.byAccommodation(accommodationId),
    queryFn: () => api.get<RatePlan[]>(`/accommodations/${accommodationId}/rateplans`),
    enabled: !!accommodationId,
  })
}

// GET /rooms/:roomId/rateplans - 특정 객실의 요금제 목록 조회
export function useRatePlansByRoom(roomId: string) {
  return useQuery({
    queryKey: ratePlanKeys.byRoom(roomId),
    queryFn: () => api.get<RatePlan[]>(`/rooms/${roomId}/rateplans`),
    enabled: !!roomId,
  })
}

// POST /rateplans - 새 요금제 생성
export function useCreateRatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<RatePlan>) =>
      api.post<RatePlan>('/rateplans', data),
    onSuccess: (newRatePlan) => {
      // 생성 성공 시 목록 캐시 무효화 (자동 재조회)
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
      // 관련된 숙소/객실의 요금제 목록도 무효화
      if (newRatePlan.accommodationId) {
        queryClient.invalidateQueries({
          queryKey: ratePlanKeys.byAccommodation(newRatePlan.accommodationId)
        })
      }
    },
  })
}

// PUT /rateplans/:id - 요금제 정보 수정
export function useUpdateRatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RatePlan> }) =>
      api.put<RatePlan>(`/rateplans/${id}`, data),
    onSuccess: (updatedRatePlan, variables) => {
      // 수정 성공 시 해당 요금제 상세와 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
      // 관련된 숙소의 요금제 목록도 무효화
      if (updatedRatePlan.accommodationId) {
        queryClient.invalidateQueries({
          queryKey: ratePlanKeys.byAccommodation(updatedRatePlan.accommodationId)
        })
      }
    },
  })
}

// PATCH /rateplans/:id - 요금제 부분 수정
export function usePatchRatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RatePlan> }) =>
      api.patch<RatePlan>(`/rateplans/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
    },
  })
}

// DELETE /rateplans/:id - 요금제 삭제
export function useDeleteRatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete(`/rateplans/${id}`),
    onSuccess: () => {
      // 삭제 성공 시 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
    },
  })
}

// PUT /rateplans/:id/status - 요금제 상태 변경 (active, draft, inactive)
export function useUpdateRatePlanStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.put<RatePlan>(`/rateplans/${id}/status`, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
    },
  })
}

// PUT /rateplans/:id/pricing - 요금제 가격 업데이트
export function useUpdateRatePlanPricing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, pricing }: { id: string; pricing: unknown }) =>
      api.put<RatePlan>(`/rateplans/${id}/pricing`, pricing),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
    },
  })
}

// POST /rateplans/:id/clone - 요금제 복제
export function useCloneRatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name?: string }) =>
      api.post<RatePlan>(`/rateplans/${id}/clone`, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratePlanKeys.lists() })
    },
  })
}
