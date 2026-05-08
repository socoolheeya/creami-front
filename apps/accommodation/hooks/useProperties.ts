import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import { Property } from '../lib/types/property'

// Query Keys (캐시 키 관리)
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
}

// GET /properties - 전체 숙소 목록 조회
export function useProperties(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: () => api.get<Property[]>('/properties'),
  })
}

// GET /properties/:id - 특정 숙소 상세 조회
export function useProperty(id: string) {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => api.get<Property>(`/properties/${id}`),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  })
}

// POST /properties - 새 숙소 생성
export function useCreateProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Property>) =>
      api.post<Property>('/properties', data),
    onSuccess: () => {
      // 생성 성공 시 목록 캐시 무효화 (자동 재조회)
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() })
    },
  })
}

// PUT /properties/:id - 숙소 정보 수정
export function useUpdateProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Property> }) =>
      api.put<Property>(`/properties/${id}`, data),
    onSuccess: (_, variables) => {
      // 수정 성공 시 해당 숙소 상세와 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() })
    },
  })
}

// DELETE /properties/:id - 숙소 삭제
export function useDeleteProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete(`/properties/${id}`),
    onSuccess: () => {
      // 삭제 성공 시 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() })
    },
  })
}
