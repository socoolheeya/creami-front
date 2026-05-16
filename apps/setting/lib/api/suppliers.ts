import { API_UNAVAILABLE_ERROR } from './errors'
import { readAuthToken, redirectToLoginOnUnauthorized } from './authToken'

const IAM_API_BASE_URL =
  process.env.NEXT_PUBLIC_IAM_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:9010'

export type SupplierStatus = 'active' | 'inactive'
export type SupplierApiStatus = 'ACTIVE' | 'INACTIVE'

export type Supplier = {
  id: string
  code: string
  name: string
  status: SupplierStatus
  blockStartDate: string | null
  blockStartTime: string | null
  blockEndDate: string | null
  blockEndTime: string | null
  tpsLimit: number
  createdById: string
  createdAt: string
  updatedById: string
  updatedAt: string
}

export type SupplierForm = {
  code: string
  name: string
  status: SupplierStatus
  blockStartDate: string
  blockStartTime: string
  blockEndDate: string
  blockEndTime: string
  tpsLimit: string
}

export type SupplierRequest = {
  code: string
  name: string
  status: SupplierApiStatus
  blockStartDate: string | null
  blockStartTime: string | null
  blockEndDate: string | null
  blockEndTime: string | null
  tpsLimit: number
}

type RawSupplier = {
  id: number | string
  code: string
  name: string
  status: SupplierApiStatus
  blockStartDate?: string | null
  blockStartTime?: string | null
  blockEndDate?: string | null
  blockEndTime?: string | null
  tpsLimit: number
  createdById?: string | null
  createdAt?: string | null
  updatedById?: string | null
  updatedAt?: string | null
}

export const initialSupplierForm: SupplierForm = {
  code: '',
  name: '',
  status: 'active',
  blockStartDate: '',
  blockStartTime: '',
  blockEndDate: '',
  blockEndTime: '',
  tpsLimit: '10'
}

async function request<T>(endpoint: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    const token = readAuthToken()

    response = await fetch(`${IAM_API_BASE_URL}${endpoint}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers
      }
    })
  } catch {
    throw new Error(API_UNAVAILABLE_ERROR)
  }

  if (response.status === 401) {
    redirectToLoginOnUnauthorized()
  }

  if (!response.ok) {
    const errorText = await readApiError(response)
    throw new Error(errorText || `Supplier API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

async function readApiError(response: Response) {
  const errorText = await response.text()

  try {
    const parsed = JSON.parse(errorText) as { error?: string; message?: string }
    return parsed.error ?? parsed.message ?? errorText
  } catch {
    return errorText
  }
}

function toSupplierStatus(status: SupplierApiStatus): SupplierStatus {
  return status === 'ACTIVE' ? 'active' : 'inactive'
}

export function toSupplierApiStatus(status: SupplierStatus): SupplierApiStatus {
  return status === 'active' ? 'ACTIVE' : 'INACTIVE'
}

function formatDateTime(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

function normalizeOptionalDate(value?: string | null) {
  if (!value) return null
  return value.slice(0, 10)
}

function normalizeOptionalTime(value?: string | null) {
  if (!value) return null
  return value.slice(0, 5)
}

function normalizeSupplier(rawSupplier: RawSupplier): Supplier {
  return {
    id: String(rawSupplier.id),
    code: rawSupplier.code,
    name: rawSupplier.name,
    status: toSupplierStatus(rawSupplier.status),
    blockStartDate: normalizeOptionalDate(rawSupplier.blockStartDate),
    blockStartTime: normalizeOptionalTime(rawSupplier.blockStartTime),
    blockEndDate: normalizeOptionalDate(rawSupplier.blockEndDate),
    blockEndTime: normalizeOptionalTime(rawSupplier.blockEndTime),
    tpsLimit: rawSupplier.tpsLimit,
    createdById: rawSupplier.createdById ?? '-',
    createdAt: formatDateTime(rawSupplier.createdAt),
    updatedById: rawSupplier.updatedById ?? '-',
    updatedAt: formatDateTime(rawSupplier.updatedAt)
  }
}

export function normalizeOptionalValue(value: string) {
  const trimmedValue = value.trim()
  return trimmedValue.length > 0 ? trimmedValue : null
}

export function formatOptionalDateTime(date: string | null, time: string | null) {
  if (!date || !time) {
    return '-'
  }

  return `${date} ${time}`
}

export function formatBlockDateTimeRange(supplier: Supplier) {
  const startDateTime = formatOptionalDateTime(
    supplier.blockStartDate,
    supplier.blockStartTime
  )
  const endDateTime = formatOptionalDateTime(
    supplier.blockEndDate,
    supplier.blockEndTime
  )

  if (startDateTime === '-' && endDateTime === '-') {
    return '-'
  }

  return `${startDateTime} ~ ${endDateTime}`
}

export function createSupplierForm(supplier: Supplier): SupplierForm {
  return {
    code: supplier.code,
    name: supplier.name,
    status: supplier.status,
    blockStartDate: supplier.blockStartDate ?? '',
    blockStartTime: supplier.blockStartTime ?? '',
    blockEndDate: supplier.blockEndDate ?? '',
    blockEndTime: supplier.blockEndTime ?? '',
    tpsLimit: String(supplier.tpsLimit)
  }
}

export function createSupplierRequest(form: SupplierForm): SupplierRequest {
  return {
    code: form.code.trim(),
    name: form.name.trim(),
    status: toSupplierApiStatus(form.status),
    blockStartDate: normalizeOptionalValue(form.blockStartDate),
    blockStartTime: normalizeOptionalValue(form.blockStartTime),
    blockEndDate: normalizeOptionalValue(form.blockEndDate),
    blockEndTime: normalizeOptionalValue(form.blockEndTime),
    tpsLimit: Number(form.tpsLimit)
  }
}

export async function getSuppliers(init?: RequestInit): Promise<Supplier[]> {
  const response = await request<RawSupplier[]>('/api/v1/suppliers', init)
  return response.map(normalizeSupplier)
}

export async function getSupplier(supplierId: string, init?: RequestInit): Promise<Supplier> {
  const response = await request<RawSupplier>(`/api/v1/suppliers/${supplierId}`, init)
  return normalizeSupplier(response)
}

export async function createSupplier(requestBody: SupplierRequest): Promise<Supplier> {
  const response = await request<RawSupplier>('/api/v1/suppliers', {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
  return normalizeSupplier(response)
}

export async function updateSupplier(
  supplierId: string,
  requestBody: SupplierRequest
): Promise<Supplier> {
  const response = await request<RawSupplier>(`/api/v1/suppliers/${supplierId}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody)
  })
  return normalizeSupplier(response)
}
