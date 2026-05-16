import { API_UNAVAILABLE_ERROR } from './errors'
import { readAuthToken, redirectToLoginOnUnauthorized } from './authToken'

const IAM_API_BASE_URL =
  process.env.NEXT_PUBLIC_IAM_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:9010'

export type SupplierApiKey = {
  id: string
  supplierId?: string | null
  supplierName: string
  apiKey?: string | null
  maskedApiKey: string
  createdAt?: string | null
  lastUsedAt?: string | null
}

export type CreateSupplierApiKeyRequest = {
  supplierId: string
}

type RawSupplierApiKey = {
  id?: number | string
  apiKeyId?: number | string
  supplierId?: number | string | null
  supplierName: string
  apiKey?: string | null
  plainTextKey?: string | null
  secret?: string | null
  maskedApiKey?: string | null
  keyPreview?: string | null
  createdAt?: string | null
  lastUsedAt?: string | null
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
    throw new Error(errorText || `Supplier API key request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
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

function maskApiKey(value?: string | null) {
  if (!value) return '-'
  if (value.length <= 12) return value

  return `${value.slice(0, 8)}...${value.slice(-4)}`
}

function normalizeSupplierApiKey(rawApiKey: RawSupplierApiKey): SupplierApiKey {
  const apiKey = rawApiKey.apiKey ?? rawApiKey.plainTextKey ?? rawApiKey.secret ?? null

  return {
    id: String(rawApiKey.id ?? rawApiKey.apiKeyId),
    supplierId: rawApiKey.supplierId ? String(rawApiKey.supplierId) : null,
    supplierName: rawApiKey.supplierName,
    apiKey,
    maskedApiKey: rawApiKey.maskedApiKey ?? rawApiKey.keyPreview ?? maskApiKey(apiKey),
    createdAt: rawApiKey.createdAt ?? null,
    lastUsedAt: rawApiKey.lastUsedAt ?? null
  }
}

export async function getSupplierApiKeys(init?: RequestInit): Promise<SupplierApiKey[]> {
  const response = await request<RawSupplierApiKey[]>('/api/v1/suppliers/api-keys', init)
  return response.map(normalizeSupplierApiKey)
}

export async function createSupplierApiKey(
  requestBody: CreateSupplierApiKeyRequest
): Promise<SupplierApiKey> {
  const response = await request<RawSupplierApiKey>('/api/v1/suppliers/api-keys', {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
  return normalizeSupplierApiKey(response)
}

export async function rotateSupplierApiKey(apiKeyId: string): Promise<SupplierApiKey> {
  const response = await request<RawSupplierApiKey>(
    `/api/v1/suppliers/api-keys/${apiKeyId}/rotate`,
    { method: 'POST' }
  )
  return normalizeSupplierApiKey(response)
}

export async function deleteSupplierApiKey(apiKeyId: string): Promise<void> {
  await request<void>(`/api/v1/suppliers/api-keys/${apiKeyId}`, {
    method: 'DELETE'
  })
}
