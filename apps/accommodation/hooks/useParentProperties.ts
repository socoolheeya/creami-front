import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import {
  type ParentPropertyDto,
  type ParentPropertySearchCondition,
  type SaveParentPropertyRequest
} from '@/lib/types/parent-property'

export const parentPropertyKeys = {
  all: ['parentProperties'] as const,
  lists: () => [...parentPropertyKeys.all, 'list'] as const,
  list: (condition?: ParentPropertySearchCondition) =>
    [...parentPropertyKeys.lists(), condition] as const,
  details: () => [...parentPropertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...parentPropertyKeys.details(), id] as const
}

function removeEmptyCondition(condition?: ParentPropertySearchCondition) {
  if (!condition) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(condition).filter(([, value]) => value !== undefined && value !== '')
  )
}

export function useParentProperties(condition?: ParentPropertySearchCondition) {
  return useQuery({
    queryKey: parentPropertyKeys.list(condition),
    queryFn: () =>
      api.get<ParentPropertyDto[]>('/parent-properties/search', {
        params: removeEmptyCondition(condition)
      })
  })
}

export function useParentProperty(id: string) {
  return useQuery({
    queryKey: parentPropertyKeys.detail(id),
    queryFn: () => api.get<ParentPropertyDto>(`/parent-properties/${id}`),
    enabled: id.length > 0
  })
}

export function useSaveParentProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: SaveParentPropertyRequest) =>
      api.post<ParentPropertyDto>('/parent-properties', request),
    onSuccess: (savedProperty) => {
      queryClient.invalidateQueries({ queryKey: parentPropertyKeys.lists() })

      const savedPropertyId = savedProperty.parentPropertyId?.toString()
      if (savedPropertyId) {
        queryClient.setQueryData(parentPropertyKeys.detail(savedPropertyId), savedProperty)
      }
    }
  })
}
