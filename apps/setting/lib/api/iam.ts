import { API_UNAVAILABLE_ERROR } from './errors'
import { readAuthToken, redirectToLoginOnUnauthorized } from './authToken'

const IAM_API_BASE_URL =
  process.env.NEXT_PUBLIC_IAM_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:9010'

export type PolicyStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'
export type PrincipalType = 'MEMBER' | 'GROUP' | 'ROLE'
export type PolicyDecision = 'ALLOW' | 'DENY'
export type IamGroupStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'
export type PolicyMenuKey = string
export type PolicyPermissionKey = 'read' | 'write' | 'all'

export type AuthMember = {
  memberId: string
  email: string
  name: string
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED' | 'DELETED'
}

export type LoginResponse = {
  accessToken: string
  tokenType: 'Bearer'
  expiresAt: string
  member: AuthMember
}

export type PageResponse<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
  hasNext: boolean
  hasPrevious: boolean
}

export type Policy = {
  policyId: string
  name: string
  description?: string | null
  status: PolicyStatus
  defaultVersionNumber?: number | null
  documentJson?: string | null
  versionCount: number
  attachmentCount: number
  createdAt?: string | null
  updatedAt?: string | null
}

export type PolicyAttachment = {
  policyAttachmentId: string
  policyId: string
  principalType: PrincipalType
  principalId: string
  principalName?: string | null
  detachedAt?: string | null
  createdAt?: string | null
}

export type Role = {
  roleId: string
  name: string
  description?: string | null
  memberCount: number
  createdAt?: string | null
  updatedAt?: string | null
}

export type RoleScope =
  | 'users'
  | 'permissions'
  | 'subscriptions'
  | 'bookings'
  | 'settlements'
  | 'properties'
  | 'discounts'
  | 'ari'

export type IamGroup = {
  groupId: string
  name: string
  description?: string | null
  status: IamGroupStatus
  memberCount: number
  createdAt?: string | null
  updatedAt?: string | null
}

export type IamGroupMember = {
  memberId: string
  email: string
  name: string
  phoneNumber?: string | null
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED' | 'DELETED'
  joinedAt?: string | null
}

export type PermissionAuditLog = {
  permissionAuditLogId: string
  memberId: string
  action: string
  resource: string
  decision: PolicyDecision
  reason: string
  contextJson: string
  matchedStatementsJson: string
  createdAt?: string | null
}

export type PolicySearchCondition = {
  name?: string
  status?: PolicyStatus
  page?: number
  size?: number
  sort?: string
}

export type PolicyCreateRequest = {
  name: string
  description?: string | null
  documentJson: string
  attachments?: PolicyAttachRequest[]
}

export type PolicyUpdateRequest = {
  name?: string
  description?: string | null
  documentJson?: string | null
}

export type PolicyAttachRequest = {
  principalType: PrincipalType
  principalId: string
}

export type PolicyStatement = {
  sid: string
  effect: 'ALLOW'
  actions: string[]
  resources: string[]
}

export type PolicyStatementPreset = {
  menu: PolicyMenuKey
  permission: PolicyPermissionKey
  menuId?: string
}

export type PolicyDocument = {
  menuIds?: string[]
  statements: PolicyStatement[]
}

export type PolicyMenuOption = {
  menuId: string
  code: string
  name: string
  path: string
  parentMenuId?: string | null
}

export type RoleSearchCondition = {
  name?: string
  description?: string
  page?: number
  size?: number
  sort?: string
}

export type CreateRoleInput = {
  name: string
  description?: string | null
  scopes?: RoleScope[]
}

type RawPolicy = Omit<Policy, 'policyId'> & { policyId: number | string }
type RawPolicyAttachment = Omit<PolicyAttachment, 'policyAttachmentId' | 'policyId' | 'principalId'> & {
  policyAttachmentId: number | string
  policyId: number | string
  principalId: number | string
}
type RawRole = Omit<Role, 'roleId'> & { roleId: number | string }
type RawAuthMember = Omit<AuthMember, 'memberId'> & { memberId: number | string }
type RawLoginResponse = Omit<LoginResponse, 'member'> & { member: RawAuthMember }
type RawIamGroup = Omit<IamGroup, 'groupId'> & { groupId: number | string }
type RawIamGroupMember = Omit<IamGroupMember, 'memberId'> & { memberId: number | string }
type RawPermissionAuditLog = Omit<PermissionAuditLog, 'permissionAuditLogId' | 'memberId'> & {
  permissionAuditLogId: number | string
  memberId: number | string
}

type RawPageResponse<T> = Omit<PageResponse<T>, 'content'> & { content: T[] }

function appendSearchParam(searchParams: URLSearchParams, name: string, value: unknown) {
  if (value === undefined || value === null || value === '') return
  searchParams.set(name, String(value))
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
    const errorText = await response.text()
    throw new Error(errorText || `IAM API request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function normalizePolicy(policy: RawPolicy): Policy {
  return {
    ...policy,
    policyId: policy.policyId === undefined || policy.policyId === null ? '' : String(policy.policyId),
    description: policy.description ?? null,
    defaultVersionNumber: policy.defaultVersionNumber ?? null,
    documentJson: policy.documentJson ?? null,
    versionCount: policy.versionCount ?? 0,
    attachmentCount: policy.attachmentCount ?? 0,
    createdAt: policy.createdAt ?? null,
    updatedAt: policy.updatedAt ?? null
  }
}

function normalizePolicyAttachment(attachment: RawPolicyAttachment): PolicyAttachment {
  return {
    ...attachment,
    policyAttachmentId: String(attachment.policyAttachmentId),
    policyId: String(attachment.policyId),
    principalId: String(attachment.principalId),
    principalName: attachment.principalName ?? null,
    detachedAt: attachment.detachedAt ?? null,
    createdAt: attachment.createdAt ?? null
  }
}

function normalizeRole(role: RawRole): Role {
  return { ...role, roleId: String(role.roleId) }
}

function normalizeAuthMember(member: RawAuthMember): AuthMember {
  return { ...member, memberId: String(member.memberId) }
}

function normalizeGroup(group: RawIamGroup): IamGroup {
  return { ...group, groupId: String(group.groupId) }
}

function normalizeGroupMember(groupMember: RawIamGroupMember): IamGroupMember {
  return { ...groupMember, memberId: String(groupMember.memberId) }
}

function normalizeAuditLog(auditLog: RawPermissionAuditLog): PermissionAuditLog {
  return {
    ...auditLog,
    permissionAuditLogId: String(auditLog.permissionAuditLogId),
    memberId: String(auditLog.memberId)
  }
}

const POLICY_MENU_RESOURCE_MAP: Record<string, string> = {
  users: 'member:*',
  permissions: 'role:*',
  policies: 'policy:*',
  subscriptions: 'subscription:*'
}

const POLICY_MENU_ACTION_PREFIX_MAP: Record<string, string> = {
  users: 'member',
  permissions: 'role',
  policies: 'policy',
  subscriptions: 'subscription'
}

const POLICY_PERMISSION_ACTION_SUFFIX_MAP: Record<PolicyPermissionKey, string> = {
  read: 'read',
  write: 'write',
  all: '*'
}

export async function login(
  email: string,
  password: string,
  init?: RequestInit
): Promise<LoginResponse> {
  const response = await request<RawLoginResponse>('/api/v1/iam/auth/login', {
    ...init,
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

  return {
    ...response,
    member: normalizeAuthMember(response.member)
  }
}

export async function logout(init?: RequestInit): Promise<void> {
  await request<void>('/api/v1/iam/auth/logout', {
    ...init,
    method: 'POST'
  })
}

export async function getCurrentAuthMember(init?: RequestInit): Promise<AuthMember> {
  const response = await request<RawAuthMember>('/api/v1/iam/auth/me', init)
  return normalizeAuthMember(response)
}

function createPolicyStatementSid(
  menu: PolicyMenuKey,
  permission: PolicyPermissionKey,
  sequence?: number
) {
  const sid = `${menu}-${permission}`.replace(/(^\w|-\w)/g, (segment) =>
    segment.replace('-', '').toUpperCase()
  )
  return sequence === undefined ? sid : `${sid}${sequence}`
}

function createPolicyStatement(
  statement: PolicyStatementPreset,
  sequence?: number
): PolicyStatement {
  const actionPrefix = POLICY_MENU_ACTION_PREFIX_MAP[statement.menu] ?? statement.menu
  const resource = POLICY_MENU_RESOURCE_MAP[statement.menu] ?? `${statement.menu}:*`

  return {
    sid: createPolicyStatementSid(statement.menu, statement.permission, sequence),
    effect: 'ALLOW',
    actions: [
      `${actionPrefix}:${POLICY_PERMISSION_ACTION_SUFFIX_MAP[statement.permission]}`
    ],
    resources: [resource]
  }
}

export async function getPolicies(
  condition: PolicySearchCondition = {},
  init?: RequestInit
): Promise<PageResponse<Policy>> {
  const searchParams = new URLSearchParams()
  appendSearchParam(searchParams, 'name', condition.name?.trim())
  appendSearchParam(searchParams, 'status', condition.status)
  appendSearchParam(searchParams, 'page', condition.page ?? 0)
  appendSearchParam(searchParams, 'size', condition.size ?? 20)
  appendSearchParam(searchParams, 'sort', condition.sort ?? 'createdAt,desc')

  const queryString = searchParams.toString()
  const response = await request<RawPageResponse<RawPolicy>>(
    `/api/v1/iam/policies${queryString ? `?${queryString}` : ''}`,
    init
  )

  return {
    ...response,
    content: response.content.map(normalizePolicy)
  }
}

export async function createPolicy(
  requestBody: PolicyCreateRequest,
  init?: RequestInit
): Promise<Policy> {
  const response = await request<RawPolicy>('/api/v1/iam/policies', {
    ...init,
    method: 'POST',
    body: JSON.stringify(requestBody)
  })

  return normalizePolicy(response)
}

export async function getPolicy(policyId: string, init?: RequestInit): Promise<Policy> {
  const response = await request<RawPolicy>(`/api/v1/iam/policies/${policyId}`, init)
  return normalizePolicy(response)
}

export async function updatePolicy(
  policyId: string,
  requestBody: PolicyUpdateRequest,
  init?: RequestInit
): Promise<Policy> {
  const response = await request<RawPolicy>(`/api/v1/iam/policies/${policyId}`, {
    ...init,
    method: 'PUT',
    body: JSON.stringify(requestBody)
  })

  return normalizePolicy(response)
}

export async function getPolicyAttachments(
  policyId: string,
  init?: RequestInit
): Promise<PolicyAttachment[]> {
  const response = await request<RawPolicyAttachment[]>(
    `/api/v1/iam/policies/${policyId}/attachments`,
    init
  )
  return response.map(normalizePolicyAttachment)
}

export async function attachPolicy(
  policyId: string,
  requestBody: PolicyAttachRequest,
  init?: RequestInit
): Promise<PolicyAttachment> {
  const response = await request<RawPolicyAttachment>(`/api/v1/iam/policies/${policyId}/attachments`, {
    ...init,
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
  return normalizePolicyAttachment(response)
}

export async function detachPolicy(
  policyId: string,
  requestBody: PolicyAttachRequest,
  init?: RequestInit
): Promise<PolicyAttachment> {
  const response = await request<RawPolicyAttachment>(`/api/v1/iam/policies/${policyId}/detach`, {
    ...init,
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
  return normalizePolicyAttachment(response)
}

export async function deactivatePolicy(
  policyId: string,
  init?: RequestInit
): Promise<Policy> {
  const response = await request<RawPolicy>(`/api/v1/iam/policies/${policyId}/deactivate`, {
    ...init,
    method: 'POST'
  })

  return normalizePolicy(response)
}

export function createPolicyDocument(menu: PolicyMenuKey, permission: PolicyPermissionKey): PolicyDocument
export function createPolicyDocument(statements: PolicyStatementPreset[]): PolicyDocument
export function createPolicyDocument(
  menuOrStatements: PolicyMenuKey | PolicyStatementPreset[],
  permission?: PolicyPermissionKey
): PolicyDocument {
  if (Array.isArray(menuOrStatements)) {
    const menuIds = menuOrStatements
      .map((statement) => statement.menuId)
      .filter((menuId): menuId is string => Boolean(menuId))

    return {
      menuIds: menuIds.length > 0 ? menuIds : undefined,
      statements: menuOrStatements.map((statement, index) =>
        createPolicyStatement(statement, menuOrStatements.length > 1 ? index + 1 : undefined)
      )
    }
  }

  if (!permission) {
    return { statements: [] }
  }

  return {
    statements: [createPolicyStatement({ menu: menuOrStatements, permission })]
  }
}

export async function activatePolicy(policyId: string): Promise<Policy> {
  const response = await request<RawPolicy>(`/api/v1/iam/policies/${policyId}/activate`, {
    method: 'POST'
  })

  return normalizePolicy(response)
}

type RawPolicyMenuOption = Omit<PolicyMenuOption, 'menuId' | 'parentMenuId'> & {
  menuId: number | string
  parentMenuId?: number | string | null
}

export async function getPolicyMenuOptions(init?: RequestInit): Promise<PolicyMenuOption[]> {
  const response = await request<RawPolicyMenuOption[]>('/api/v1/iam/menus/select-options', init)
  return response.map((option) => ({
    ...option,
    menuId: String(option.menuId),
    parentMenuId:
      option.parentMenuId === undefined || option.parentMenuId === null
        ? null
        : String(option.parentMenuId)
  }))
}

export async function getRoles(
  condition: RoleSearchCondition = {},
  init?: RequestInit
): Promise<PageResponse<Role>> {
  const searchParams = new URLSearchParams()
  appendSearchParam(searchParams, 'name', condition.name?.trim())
  appendSearchParam(searchParams, 'description', condition.description?.trim())
  appendSearchParam(searchParams, 'page', condition.page ?? 0)
  appendSearchParam(searchParams, 'size', condition.size ?? 20)
  appendSearchParam(searchParams, 'sort', condition.sort ?? 'createdAt,desc')

  const response = await request<RawPageResponse<RawRole>>(
    `/api/v1/iam/roles?${searchParams.toString()}`,
    init
  )
  return { ...response, content: response.content.map(normalizeRole) }
}

export async function createRole(input: CreateRoleInput): Promise<Role> {
  const response = await request<RawRole>('/api/v1/iam/roles', {
    method: 'POST',
    body: JSON.stringify(input)
  })

  return normalizeRole(response)
}

export async function getRole(roleId: string, init?: RequestInit): Promise<Role> {
  const response = await request<RawRole>(`/api/v1/iam/roles/${roleId}`, init)
  return normalizeRole(response)
}

export async function getIamGroups(
  page = 0,
  size = 20,
  init?: RequestInit
): Promise<PageResponse<IamGroup>> {
  const response = await request<RawPageResponse<RawIamGroup>>(
    `/api/v1/iam/groups?page=${page}&size=${size}&sort=createdAt,desc`,
    init
  )
  return { ...response, content: response.content.map(normalizeGroup) }
}

export async function createIamGroup(requestBody: {
  name: string
  description?: string | null
}): Promise<IamGroup> {
  const response = await request<RawIamGroup>('/api/v1/iam/groups', {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
  return normalizeGroup(response)
}

export async function getIamGroupMembers(
  groupId: string,
  page = 0,
  size = 200
): Promise<PageResponse<IamGroupMember>> {
  const response = await request<RawPageResponse<RawIamGroupMember>>(
    `/api/v1/iam/groups/${groupId}/members?page=${page}&size=${size}&sort=name,asc`
  )
  return { ...response, content: response.content.map(normalizeGroupMember) }
}

export async function getIamGroupMemberCandidates(
  groupId: string,
  condition: {
    email?: string
    name?: string
    page?: number
    size?: number
    sort?: string
  } = {},
  init?: RequestInit
): Promise<PageResponse<IamGroupMember>> {
  const searchParams = new URLSearchParams()
  appendSearchParam(searchParams, 'email', condition.email?.trim())
  appendSearchParam(searchParams, 'name', condition.name?.trim())
  appendSearchParam(searchParams, 'page', condition.page ?? 0)
  appendSearchParam(searchParams, 'size', condition.size ?? 200)
  appendSearchParam(searchParams, 'sort', condition.sort ?? 'name,asc')

  const response = await request<RawPageResponse<RawIamGroupMember>>(
    `/api/v1/iam/groups/${groupId}/member-candidates?${searchParams.toString()}`,
    init
  )
  return { ...response, content: response.content.map(normalizeGroupMember) }
}

export async function addIamGroupMember(
  groupId: string,
  memberId: string
): Promise<void> {
  await request(`/api/v1/iam/groups/${groupId}/members`, {
    method: 'POST',
    body: JSON.stringify({ memberId })
  })
}

export async function removeIamGroupMember(
  groupId: string,
  memberId: string
): Promise<void> {
  await request(`/api/v1/iam/groups/${groupId}/members/${memberId}`, {
    method: 'DELETE'
  })
}

export async function getPermissionAuditLogs(
  page = 0,
  size = 20,
  decision?: PolicyDecision
): Promise<PageResponse<PermissionAuditLog>> {
  const searchParams = new URLSearchParams()
  appendSearchParam(searchParams, 'page', page)
  appendSearchParam(searchParams, 'size', size)
  appendSearchParam(searchParams, 'sort', 'createdAt,desc')
  appendSearchParam(searchParams, 'decision', decision)

  const response = await request<RawPageResponse<RawPermissionAuditLog>>(
    `/api/v1/iam/audit-logs?${searchParams.toString()}`
  )
  return { ...response, content: response.content.map(normalizeAuditLog) }
}
