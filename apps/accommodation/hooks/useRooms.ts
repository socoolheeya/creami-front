import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import { Room } from '@/lib/types/room'

// Query Keys (캐시 키 관리)
export const roomKeys = {
  all: ['rooms'] as const,
  lists: () => [...roomKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...roomKeys.lists(), filters] as const,
  details: () => [...roomKeys.all, 'detail'] as const,
  detail: (id: string) => [...roomKeys.details(), id] as const,
  byAccommodation: (accommodationId: string) => [...roomKeys.all, 'accommodation', accommodationId] as const,
}

// GET /rooms - 전체 객실 목록 조회
export function useRooms(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: roomKeys.list(filters),
    queryFn: () => api.get<Room[]>('/rooms'),
  })
}

// GET /rooms/:id - 특정 객실 상세 조회
export function useRoom(id: string) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => api.get<Room>(`/rooms/${id}`),
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

// PUT /rooms/:id/status - 객실 상태 변경 (available, maintenance, occupied)
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