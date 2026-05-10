export type SupplierStatus = 'active' | 'inactive'

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

export const currentUserId = 'USR-001'

export const initialSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    code: 'CREAMI-PARTNER',
    name: 'Creami Partner',
    status: 'active',
    blockStartDate: '2026-05-10',
    blockStartTime: '02:00',
    blockEndDate: '2026-05-10',
    blockEndTime: '03:00',
    tpsLimit: 30,
    createdById: 'USR-001',
    createdAt: '2026-05-10 09:00',
    updatedById: 'USR-001',
    updatedAt: '2026-05-10 09:00'
  },
  {
    id: 'SUP-002',
    code: 'STAY-API-HUB',
    name: 'Stay API Hub',
    status: 'inactive',
    blockStartDate: '2026-05-11',
    blockStartTime: '00:00',
    blockEndDate: '2026-05-11',
    blockEndTime: '01:00',
    tpsLimit: 15,
    createdById: 'USR-002',
    createdAt: '2026-05-10 10:30',
    updatedById: 'USR-002',
    updatedAt: '2026-05-10 10:30'
  }
]

export const initialSupplierForm: SupplierForm = {
  code: '',
  name: '',
  status: 'active',
  blockStartDate: '2026-05-10',
  blockStartTime: '00:00',
  blockEndDate: '2026-05-10',
  blockEndTime: '01:00',
  tpsLimit: '10'
}

export function createSupplierId(count: number) {
  return `SUP-${String(count + 1).padStart(3, '0')}`
}

export function formatAuditDate() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ')
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

