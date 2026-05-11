import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import {
  type BillingPolicy,
  type ChargeType,
  type Property,
  type PropertyStatus,
  type PropertyType
} from '../lib/types/property'
import {
  type AddressDto,
  getAddressDetail,
  getAddressText,
  getCity,
  getCountryCode,
  getLatitude,
  getLongitude,
  getZipCode,
  type PositionDto
} from '@/lib/types/parent-property'

export type PropertySearchCondition = {
  propertyId?: string
  parentPropertyId?: string
  name?: string
  enabled?: boolean
  cursorCreatedAt?: string
  cursorId?: string
  size?: number
  type?: string
  status?: string
  city?: string
  countryCode?: string
}

type ApiPropertyDto = Partial<Omit<Property, 'address' | 'createdAt' | 'updatedAt' | 'type' | 'status'>> & {
  id?: string | number | null
  propertyId?: string | number | null
  parentPropertyId?: string | number | null
  parentPropertyName?: string | null
  parentProperty?: {
    parentPropertyId?: string | number | null
    name?: string | null
  } | null
  type?: string
  status?: string
  address?: string | AddressDto | null
  addressDetail?: string | null
  city?: string | null
  countryCode?: string | null
  zipCode?: string | null
  position?: PositionDto | null
  latitude?: number | null
  longitude?: number | null
  createdAt?: string | Date | null
  updatedAt?: string | Date | null
}

type GetPropertiesApiResponse = {
  properties: ApiPropertyDto[]
  nextCursor?: {
    createdAt: string
    propertyId: string | number
  } | null
  hasNext: boolean
}

type SavePropertyMappingsRequest = {
  parentPropertyId: string
  propertyIds: string[]
}

type SavePropertyDetailRequest = {
  id: string
  data: Partial<Property>
}

type ApiPropertyContactDto = Partial<Pick<Property, 'phone' | 'email' | 'homepage' | 'faxNumbers'>>

type ApiPropertyDescriptionDto = Partial<Pick<Property, 'description' | 'enDescription' | 'amenities'>>

type ApiPropertyImageDto = Partial<Property['images'][number]> & {
  propertyImageId?: string | number | null
  imageId?: string | number | null
  imageUrl?: string | null
  url?: string | null
  primary?: boolean | null
}

type ApiPropertyBillingPolicyDto = Omit<Partial<BillingPolicy>, 'commission'> & {
  currencyUnit?: string | null
  commission?: number | string | BillingPolicy['commission'] | null
  commissionUnit?: string | null
}

const defaultBillingPolicy: BillingPolicy = {
  currency: 'KRW',
  commission: {
    type: 'percentage',
    value: 0
  }
}

function removeEmptyFilters(filters?: PropertySearchCondition) {
  if (!filters) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== '')
  )
}

function normalizePropertyType(type?: string) {
  return (type ?? 'other').toLowerCase() as PropertyType
}

function normalizePropertyStatus(status?: string) {
  const normalizedStatus = (status ?? 'draft').toLowerCase()

  if (normalizedStatus === 'deactive') {
    return 'inactive'
  }

  return ['draft', 'active', 'inactive', 'archived'].includes(normalizedStatus)
    ? normalizedStatus as PropertyStatus
    : 'draft'
}

function normalizeDate(value: string | Date | null | undefined) {
  if (value instanceof Date) {
    return value
  }

  return value ? new Date(value) : new Date()
}

function isAddressDto(address: ApiPropertyDto['address']): address is AddressDto {
  return typeof address === 'object' && address !== null
}

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

function normalizePropertyImages(images: unknown): Property['images'] {
  if (!Array.isArray(images)) {
    return []
  }

  return images.map((image, index) => {
    const item = image as ApiPropertyImageDto
    const url = item.url ?? item.imageUrl ?? ''

    return {
      id:
        item.id?.toString() ??
        item.propertyImageId?.toString() ??
        item.imageId?.toString() ??
        `${index}`,
      name: item.name ?? `image-${index + 1}`,
      url,
      isPrimary: item.isPrimary ?? item.primary ?? index === 0,
      sortOrder: item.sortOrder ?? index,
      altText: item.altText
    }
  }).filter((image) => image.url.length > 0)
}

function normalizeBillingPolicy(billingPolicy: unknown) {
  if (!isRecord(billingPolicy)) {
    return defaultBillingPolicy
  }

  const partial = billingPolicy as ApiPropertyBillingPolicyDto
  const commissionConfig =
    isRecord(partial.commission) ? partial.commission as Partial<BillingPolicy['commission']> : undefined
  const commissionType = normalizeCommissionType(
    commissionConfig?.type ?? partial.commissionUnit
  )
  const commissionValue = Number(
    commissionConfig?.value ?? partial.commission ?? defaultBillingPolicy.commission.value
  )

  return {
    ...defaultBillingPolicy,
    ...partial,
    currency: partial.currency ?? partial.currencyUnit ?? defaultBillingPolicy.currency,
    paymentMethod: partial.paymentMethod,
    commission: {
      ...defaultBillingPolicy.commission,
      ...commissionConfig,
      type: commissionType ?? defaultBillingPolicy.commission.type,
      value: commissionValue
    }
  }
}

function normalizeCommissionType(value: string | undefined | null): ChargeType | undefined {
  const normalizedValue = value?.toLowerCase()

  if (!normalizedValue) {
    return undefined
  }

  return normalizedValue.includes('percent') ? 'percentage' : 'fixed'
}

function toBackendEnum(value: string | undefined) {
  return value?.toUpperCase()
}

function toBackendCommissionUnit(value: ChargeType | undefined) {
  return value === 'percentage' ? 'PERCENTAGE' : 'FIXED'
}

function toPropertySavePayload(propertyId: string, property: Partial<Property>) {
  return {
    propertyId,
    name: property.name ?? '',
    enName: property.enName ?? '',
    type: toBackendEnum(property.type),
    stars: property.stars ?? 0,
    status: toBackendEnum(property.status),
    checkIn: property.checkIn ?? '',
    checkOut: property.checkOut ?? '',
    address: {
      address: property.address ?? '',
      addressDetail: property.addressDetail ?? '',
      city: property.city ?? '',
      countryCode: property.countryCode ?? '',
      zipCode: property.zipCode ?? ''
    },
    position: {
      latitude: property.latitude,
      longitude: property.longitude
    },
    language: property.language || null,
    roomCount: property.roomCount ?? 0,
    floorCount: property.floorCount ?? 0,
    phone: property.phone || null,
    email: property.email || null,
    homepage: property.homepage || null
  }
}

function toPropertyDescriptionSavePayload(propertyId: string, property: Partial<Property>) {
  return {
    propertyId,
    description: property.description ?? '',
    enDescription: property.enDescription ?? '',
    amenities: property.amenities ?? []
  }
}

function toPropertyBillingPolicySavePayload(propertyId: string, property: Partial<Property>) {
  const billingPolicy = property.billingPolicy ?? defaultBillingPolicy

  return {
    propertyId,
    currencyUnit: billingPolicy.currency,
    paymentMethod: billingPolicy.paymentMethod ?? 'OTHER',
    bankName: billingPolicy.bankName || null,
    accountNumber: billingPolicy.accountNumber || null,
    commission: billingPolicy.commission.value,
    commissionUnit: toBackendCommissionUnit(billingPolicy.commission.type)
  }
}

function toPropertyContactSavePayload(propertyId: string, property: Partial<Property>) {
  return {
    propertyId,
    phone: property.phone || null,
    email: property.email || null,
    homepage: property.homepage || null,
    faxNumbers: property.faxNumbers ?? []
  }
}

function normalizeProperty(property: ApiPropertyDto): Property {
  const addressDto = isAddressDto(property.address) ? property.address : undefined
  const position = property.position ?? {
    latitude: property.latitude,
    longitude: property.longitude
  }

  return {
    id: property.propertyId?.toString() ?? property.id?.toString() ?? '',
    name: property.name ?? '',
    enName: property.enName ?? '',
    type: normalizePropertyType(property.type),
    stars: property.stars ?? 0,
    address: addressDto ? getAddressText(addressDto) : property.address?.toString() ?? '',
    addressDetail: addressDto ? getAddressDetail(addressDto) : property.addressDetail ?? '',
    city: addressDto ? getCity(addressDto) : property.city ?? '',
    countryCode: addressDto ? getCountryCode(addressDto) : property.countryCode ?? 'KR',
    zipCode: addressDto ? getZipCode(addressDto) : property.zipCode ?? '',
    latitude: getLatitude(position),
    longitude: getLongitude(position),
    phone: property.phone ?? '',
    email: property.email ?? '',
    homepage: property.homepage ?? '',
    faxNumbers: property.faxNumbers ?? [],
    checkIn: property.checkIn ?? '15:00',
    checkOut: property.checkOut ?? '11:00',
    language: property.language ?? '',
    roomCount: property.roomCount ?? 0,
    floorCount: property.floorCount ?? 0,
    parentPropertyId:
      property.parentPropertyId?.toString() ??
      property.parentProperty?.parentPropertyId?.toString(),
    parentPropertyName: property.parentPropertyName ?? property.parentProperty?.name ?? '',
    description: property.description ?? '',
    enDescription: property.enDescription ?? '',
    amenities: property.amenities ?? [],
    images: property.images ?? [],
    billingPolicy: property.billingPolicy ?? defaultBillingPolicy,
    status: normalizePropertyStatus(property.status),
    createdAt: normalizeDate(property.createdAt),
    updatedAt: normalizeDate(property.updatedAt),
    createdBy: property.createdBy ?? '',
    updatedBy: property.updatedBy ?? ''
  }
}

function normalizePropertyDetail(
  property: ApiPropertyDto,
  contact: unknown,
  description: unknown,
  images: unknown,
  billingPolicy: unknown
): Property {
  const normalizedProperty = normalizeProperty(property)
  const normalizedContact = isRecord(contact)
    ? contact as ApiPropertyContactDto
    : undefined
  const normalizedDescription = isRecord(description)
    ? description as ApiPropertyDescriptionDto
    : undefined

  return {
    ...normalizedProperty,
    phone: normalizedContact?.phone ?? normalizedProperty.phone,
    email: normalizedContact?.email ?? normalizedProperty.email,
    homepage: normalizedContact?.homepage ?? normalizedProperty.homepage,
    faxNumbers: normalizedContact?.faxNumbers ?? normalizedProperty.faxNumbers,
    description: normalizedDescription?.description ?? normalizedProperty.description,
    enDescription: normalizedDescription?.enDescription ?? normalizedProperty.enDescription,
    amenities: normalizedDescription?.amenities ?? normalizedProperty.amenities,
    images: normalizePropertyImages(images),
    billingPolicy: normalizeBillingPolicy(billingPolicy)
  }
}

// Query Keys (캐시 키 관리)
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters?: PropertySearchCondition) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
  mappings: (parentPropertyId: string) =>
    [...propertyKeys.all, 'mappings', parentPropertyId] as const,
}

// GET /properties/search - 숙소 목록 조회
export function useProperties(filters?: PropertySearchCondition, enabled = true) {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<GetPropertiesApiResponse>('/properties/search', {
        params: removeEmptyFilters(filters)
      })

      return response.properties.map(normalizeProperty)
    },
    enabled,
  })
}

export function useInfiniteProperties(filters?: PropertySearchCondition, queryEnabled = true) {
  return useInfiniteQuery({
    queryKey: [...propertyKeys.list(filters), 'infinite'] as const,
    initialPageParam: undefined as { cursorCreatedAt: string; cursorId: string } | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await api.get<GetPropertiesApiResponse>('/properties/search', {
        params: removeEmptyFilters({
          ...filters,
          cursorCreatedAt: pageParam?.cursorCreatedAt,
          cursorId: pageParam?.cursorId
        })
      })

      return {
        properties: response.properties.map(normalizeProperty),
        nextCursor: response.nextCursor
          ? {
              cursorCreatedAt: response.nextCursor.createdAt,
              cursorId: response.nextCursor.propertyId.toString()
            }
          : undefined,
        hasNext: response.hasNext
      }
    },
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: queryEnabled
  })
}

// GET /properties/:id - 특정 숙소 상세 조회
export function useProperty(id: string) {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: async () => {
      const [
        propertyResponse,
        contactResponse,
        descriptionResponse,
        imagesResponse,
        billingPolicyResponse
      ] = await Promise.all([
        api.get<unknown>(`/properties/${id}`),
        getOptionalApiResponse<unknown>(`/properties/${id}/contacts`),
        getOptionalApiResponse<unknown>(`/properties/${id}/description`),
        getOptionalApiResponse<unknown>(`/properties/${id}/property-images`),
        getOptionalApiResponse<unknown>(`/properties/${id}/billing-policy`)
      ])
      const property = getWrappedValue(propertyResponse, ['property']) as ApiPropertyDto
      const contact = getWrappedValue(contactResponse, [
        'propertyContact',
        'contact'
      ])
      const description = getWrappedValue(descriptionResponse, [
        'propertyDescription',
        'description'
      ])
      const images = getWrappedValue(imagesResponse, ['propertyImages', 'images'])
      const billingPolicy = getWrappedValue(billingPolicyResponse, [
        'propertyBillingPolicy',
        'billingPolicy'
      ])

      return normalizePropertyDetail(property, contact, description, images, billingPolicy)
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  })
}

export function usePropertyMappings(parentPropertyId: string) {
  return useQuery({
    queryKey: propertyKeys.mappings(parentPropertyId),
    queryFn: async () => {
      const properties = await api.get<ApiPropertyDto[]>(
        `/parent-properties/${parentPropertyId}/mappings`
      )

      return properties.map(normalizeProperty)
    },
    enabled: parentPropertyId.length > 0
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

export function useSavePropertyMappings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: SavePropertyMappingsRequest) => {
      const response = await api.post<GetPropertiesApiResponse>('/properties/mappings', request)

      return response.properties.map(normalizeProperty)
    },
    onSuccess: (mappedProperties, request) => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() })

      mappedProperties.forEach((property) => {
        queryClient.setQueryData(propertyKeys.detail(property.id), property)
      })

      queryClient.setQueryData(propertyKeys.mappings(request.parentPropertyId), mappedProperties)
    }
  })
}

export function useSavePropertyDetail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: SavePropertyDetailRequest) => {
      const [propertyResponse] = await Promise.all([
        api.post<unknown>('/properties', {
          property: toPropertySavePayload(id, data)
        }),
        api.post<unknown>(`/properties/${id}/description`, {
          propertyDescription: toPropertyDescriptionSavePayload(id, data)
        }),
        api.post<unknown>(`/properties/${id}/billing-policy`, {
          propertyBillingPolicy: toPropertyBillingPolicySavePayload(id, data)
        }),
        api.post<unknown>(`/properties/${id}/contacts`, {
          propertyContact: toPropertyContactSavePayload(id, data)
        })
      ])
      const savedProperty = getWrappedValue(propertyResponse, ['property']) as ApiPropertyDto
      const savedPropertyId =
        savedProperty.propertyId?.toString() ??
        savedProperty.id?.toString() ??
        id

      return savedPropertyId
    },
    onSuccess: (savedPropertyId, variables) => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(savedPropertyId) })
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() })
    }
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
