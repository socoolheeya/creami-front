import { api } from './client'
import { Property } from '../types/property'

export const propertiesApi = {
  // 모든 숙소 조회
  getAll: () => api.get<Property[]>('/api/accommodations'),

  // 특정 숙소 조회
  getById: (id: string) => api.get<Property>(`/api/accommodations/${id}`),

  // 숙소 생성
  create: (data: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) =>
    api.post<Property>('/api/accommodations', data),

  // 숙소 수정
  update: (id: string, data: Partial<Property>) =>
    api.put<Property>(`/api/accommodations/${id}`, data),

  // 숙소 삭제
  delete: (id: string) => api.delete(`/api/accommodations/${id}`),
}
