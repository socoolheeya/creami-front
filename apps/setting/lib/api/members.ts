const IAM_API_BASE_URL =
  process.env.NEXT_PUBLIC_IAM_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8080'

export type MemberStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED'
export type MemberUiStatus = 'active' | 'inactive' | 'invited'

export type MemberRole = {
  id: string
  name: string
  description?: string | null
}

export type Member = {
  id: string
  email: string
  name: string
  phoneNumber?: string | null
  status: MemberStatus
  roles: MemberRole[]
  lastLoginAt?: string | null
  isLocked: boolean
  createdAt?: string | null
  updatedAt?: string | null
}

export type MemberListResponse = {
  content: Member[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
  hasNext: boolean
  hasPrevious: boolean
}

export type MemberUpdateRequest = {
  name?: string
  phoneNumber?: string | null
  roleIds?: string[]
}

type RawMemberRole = Omit<MemberRole, 'id'> & {
  id: number | string
}

type RawMember = Omit<Member, 'id' | 'roles'> & {
  id: number | string
  roles: RawMemberRole[]
}

type RawMemberListResponse = Omit<MemberListResponse, 'content'> & {
  content: RawMember[]
}

function normalizeMember(rawMember: RawMember): Member {
  return {
    ...rawMember,
    id: String(rawMember.id),
    roles: rawMember.roles.map((role) => ({
      ...role,
      id: String(role.id)
    }))
  }
}

async function request<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${IAM_API_BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Member API request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function toMemberUiStatus(status: MemberStatus): MemberUiStatus {
  if (status === 'PENDING') return 'invited'
  if (status === 'ACTIVE') return 'active'
  return 'inactive'
}

export function toMemberApiStatus(status: MemberUiStatus): MemberStatus {
  if (status === 'invited') return 'PENDING'
  if (status === 'active') return 'ACTIVE'
  return 'INACTIVE'
}

export function getMemberRoleSummary(member: Member) {
  return member.roles[0]?.name ?? '-'
}

export function formatMemberDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

export async function getMembers(): Promise<MemberListResponse> {
  const response = await request<RawMemberListResponse>('/api/v1/members')

  return {
    ...response,
    content: response.content.map(normalizeMember)
  }
}

export async function getMember(memberId: string): Promise<Member> {
  const response = await request<RawMember>(`/api/v1/members/${memberId}`)
  return normalizeMember(response)
}

export async function updateMember(
  memberId: string,
  requestBody: MemberUpdateRequest
): Promise<Member> {
  const response = await request<RawMember>(`/api/v1/members/${memberId}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody)
  })
  return normalizeMember(response)
}

export async function changeMemberStatus(
  memberId: string,
  nextStatus: MemberStatus
): Promise<Member> {
  const actionByStatus: Partial<Record<MemberStatus, string>> = {
    ACTIVE: 'activate',
    INACTIVE: 'deactivate',
    SUSPENDED: 'suspend'
  }
  const action = actionByStatus[nextStatus]

  if (!action) {
    return getMember(memberId)
  }

  const response = await request<RawMember>(`/api/v1/members/${memberId}/${action}`, {
    method: 'POST'
  })
  return normalizeMember(response)
}
