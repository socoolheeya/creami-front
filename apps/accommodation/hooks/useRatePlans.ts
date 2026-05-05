import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import { RatePlan } from '@/lib/types/rateplan'

// Query Keys (캐시 키 관리)
export const ratePlanKeys = {
  all: ['ratePlans'] as const,
  lists: () => [...ratePlanKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...ratePlanKeys.lists(), filters] as const,
  details: () => [...ratePlanKeys.all, 'detail'] as const,
  detail: (id: string) => [...ratePlanKeys.details(), id] as const,
  byAccommodation: (accommodationId: string) => [...ratePlanKeys.all, 'accommodation', accommodationId] as const,
  byRoom: (roomId: string) => [...ratePlanKeys.all, 'room', roomId] as const,
}

// GET /rateplans - 전체 요금제 목록 조회
export function useRatePlans(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: ratePlanKeys.list(filters),
    queryFn: () => api.get<RatePlan[]>('/rateplans'),
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