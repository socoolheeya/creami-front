'use client'

import {
  Alert,
  Button,
  Input,
  Pagination,
  notification
} from '@creami/ui'
import { Plus, UserMinus, UserPlus, UsersRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { startTransition, useCallback, useEffect, useMemo, useState } from 'react'
import {
  addIamGroupMember,
  createIamGroup,
  getIamGroupMemberCandidates,
  getIamGroupMembers,
  getIamGroups,
  removeIamGroupMember,
  type IamGroup,
  type IamGroupMember
} from '@/lib/api/iam'
import { toMemberUiStatus } from '@/lib/api/members'

const GROUP_PAGE_SIZE = 20
const MEMBER_FETCH_SIZE = 200

type GroupForm = {
  name: string
  description: string
}

const defaultGroupForm: GroupForm = {
  name: '',
  description: ''
}

function getMemberLabel(member: Pick<IamGroupMember, 'name' | 'email'>) {
  return member.name.toLowerCase()
}

export default function UserGroupsPage() {
  const t = useTranslations()
  const [groups, setGroups] = useState<IamGroup[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [registeredMembers, setRegisteredMembers] = useState<IamGroupMember[]>([])
  const [candidateMembers, setCandidateMembers] = useState<IamGroupMember[]>([])
  const [groupPage, setGroupPage] = useState(0)
  const [groupTotalPages, setGroupTotalPages] = useState(1)
  const [groupTotalElements, setGroupTotalElements] = useState(0)
  const [form, setForm] = useState<GroupForm>(defaultGroupForm)
  const [availableSearch, setAvailableSearch] = useState('')
  const [registeredSearch, setRegisteredSearch] = useState('')
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)
  const [isSavingGroup, setIsSavingGroup] = useState(false)
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const selectedGroup = groups.find((group) => group.groupId === selectedGroupId) ?? null

  const loadGroups = useCallback((nextPage = groupPage) => {
    setIsLoadingGroups(true)
    setErrorMessage(null)
    return getIamGroups(nextPage, GROUP_PAGE_SIZE)
      .then((response) => {
        setGroups(response.content)
        setGroupTotalPages(Math.max(response.totalPages, 1))
        setGroupTotalElements(response.totalElements)
        setSelectedGroupId((currentGroupId) => {
          if (currentGroupId && response.content.some((group) => group.groupId === currentGroupId)) {
            return currentGroupId
          }
          return response.content[0]?.groupId ?? null
        })
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : t('setting.userGroups.loadFailed'))
      })
      .finally(() => setIsLoadingGroups(false))
  }, [groupPage, t])

  const loadRegisteredMembers = useCallback((groupId: string | null = selectedGroupId) => {
    if (!groupId) {
      setRegisteredMembers([])
      return Promise.resolve()
    }

    setIsLoadingMembers(true)
    return getIamGroupMembers(groupId, 0, MEMBER_FETCH_SIZE)
      .then((response) => setRegisteredMembers(response.content))
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : t('setting.userGroups.memberLoadFailed'))
      })
      .finally(() => setIsLoadingMembers(false))
  }, [selectedGroupId, t])

  const loadCandidateMembers = useCallback((groupId: string | null = selectedGroupId) => {
    if (!groupId) {
      setCandidateMembers([])
      return Promise.resolve()
    }

    setIsLoadingMembers(true)
    return getIamGroupMemberCandidates(
        groupId,
        {
          name: availableSearch,
          page: 0,
          size: MEMBER_FETCH_SIZE,
          sort: 'name,asc'
      }
    )
      .then((response) => setCandidateMembers(response.content))
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : t('setting.userGroups.memberLoadFailed'))
      })
      .finally(() => setIsLoadingMembers(false))
  }, [availableSearch, selectedGroupId, t])

  useEffect(() => {
    startTransition(() => {
      void loadGroups(groupPage)
    })
  }, [groupPage, loadGroups])

  useEffect(() => {
    startTransition(() => {
      void loadCandidateMembers(selectedGroupId)
    })
  }, [loadCandidateMembers, selectedGroupId])

  useEffect(() => {
    startTransition(() => {
      void loadRegisteredMembers(selectedGroupId)
    })
  }, [selectedGroupId, loadRegisteredMembers])

  const registeredMemberIdSet = useMemo(
    () => new Set(registeredMembers.map((member) => member.memberId)),
    [registeredMembers]
  )

  const availableMembers = useMemo(() => {
    const query = availableSearch.trim().toLowerCase()
    return candidateMembers
      .filter((member) => !registeredMemberIdSet.has(member.memberId))
      .filter((member) => !query || getMemberLabel(member).includes(query))
  }, [availableSearch, candidateMembers, registeredMemberIdSet])

  const visibleRegisteredMembers = useMemo(() => {
    const query = registeredSearch.trim().toLowerCase()
    return registeredMembers.filter((member) => {
      if (!query) return true
      return `${member.name} ${member.email}`.toLowerCase().includes(query)
    })
  }, [registeredMembers, registeredSearch])

  const handleCreateGroup = async () => {
    const name = form.name.trim()
    if (!name) {
      notification.warning({ message: t('setting.userGroups.nameRequired') })
      return
    }

    setIsSavingGroup(true)
    try {
      const group = await createIamGroup({
        name,
        description: form.description.trim() || null
      })
      setForm(defaultGroupForm)
      notification.success({ message: t('setting.userGroups.created') })
      await loadGroups(0)
      setGroupPage(0)
      setSelectedGroupId(group.groupId)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('setting.userGroups.createFailed'))
      notification.error({ message: t('setting.userGroups.createFailed') })
    } finally {
      setIsSavingGroup(false)
    }
  }

  const handleAddMember = async (memberId: string) => {
    if (!selectedGroupId) return
    setActiveMemberId(memberId)
    try {
      await addIamGroupMember(selectedGroupId, memberId)
      await Promise.all([
        loadRegisteredMembers(selectedGroupId),
        loadCandidateMembers(selectedGroupId),
        loadGroups(groupPage)
      ])
      notification.success({ message: t('setting.userGroups.memberAdded') })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('setting.userGroups.memberAddFailed'))
      notification.error({ message: t('setting.userGroups.memberAddFailed') })
    } finally {
      setActiveMemberId(null)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    if (!selectedGroupId) return
    setActiveMemberId(memberId)
    try {
      await removeIamGroupMember(selectedGroupId, memberId)
      await Promise.all([
        loadRegisteredMembers(selectedGroupId),
        loadCandidateMembers(selectedGroupId),
        loadGroups(groupPage)
      ])
      notification.success({ message: t('setting.userGroups.memberRemoved') })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('setting.userGroups.memberRemoveFailed'))
      notification.error({ message: t('setting.userGroups.memberRemoveFailed') })
    } finally {
      setActiveMemberId(null)
    }
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <UsersRound className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.userGroups.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.userGroups.description')}
          </p>
        </div>
      </div>

      {errorMessage && (
        <Alert className="mb-md" variant="error">
          {errorMessage}
        </Alert>
      )}

      <div className="user-groups-layout">
        <section className="rounded border border-border bg-bg-primary shadow">
          <div className="border-b border-border p-lg">
            <h2 className="mb-md text-xl font-bold text-text-primary">
              {t('setting.userGroups.groupCreateTitle')}
            </h2>
            <div className="flex flex-col gap-sm">
              <Input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder={t('setting.userGroups.groupNamePlaceholder')}
              />
              <Input
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                placeholder={t('setting.userGroups.groupDescriptionPlaceholder')}
              />
              <Button type="button" onClick={handleCreateGroup} disabled={isSavingGroup}>
                <Plus className="h-icon-md w-icon-md" />
                {isSavingGroup ? t('setting.userGroups.creating') : t('setting.userGroups.createGroup')}
              </Button>
            </div>
          </div>

          <div className="p-lg">
            <div className="mb-md flex items-center justify-between gap-md">
              <h2 className="text-xl font-bold text-text-primary">
                {t('setting.userGroups.groupListTitle')}
              </h2>
              <span className="text-base text-text-secondary">
                {t('setting.userGroups.totalGroups', { count: groupTotalElements })}
              </span>
            </div>

            <div className="user-group-list-scroll flex flex-col gap-sm overflow-y-auto">
              {isLoadingGroups && groups.length === 0 && (
                <div className="rounded bg-bg-secondary p-md text-base text-text-secondary">
                  {t('setting.userGroups.loading')}
                </div>
              )}
              {!isLoadingGroups && groups.length === 0 && (
                <div className="rounded bg-bg-secondary p-md text-base text-text-secondary">
                  {t('setting.userGroups.emptyGroups')}
                </div>
              )}
              {groups.map((group) => {
                const isSelected = selectedGroupId === group.groupId
                return (
                  <button
                    key={group.groupId}
                    type="button"
                    onClick={() => setSelectedGroupId(group.groupId)}
                    className={`min-w-0 rounded border p-md text-left transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary-bg'
                        : 'border-border bg-bg-secondary hover:bg-bg-tertiary'
                    }`}
                  >
                    <span className="block truncate text-base font-bold text-text-primary" title={group.name}>
                      {group.name}
                    </span>
                    <span className="mt-xs block truncate text-base text-text-secondary" title={group.description ?? '-'}>
                      {group.description ?? '-'}
                    </span>
                    <span className="mt-sm block text-base font-bold text-primary">
                      {t('setting.userGroups.memberCount', { count: group.memberCount })}
                    </span>
                  </button>
                )
              })}
            </div>

            <Pagination
              className="mt-md"
              variant="simple"
              currentPage={groupPage + 1}
              totalPages={groupTotalPages}
              totalElements={groupTotalElements}
              pageSize={GROUP_PAGE_SIZE}
              onPageChange={(nextPage) => setGroupPage(nextPage - 1)}
              onPageSizeChange={() => undefined}
            />
          </div>
        </section>

        <section className="rounded border border-border bg-bg-primary shadow">
          <div className="border-b border-border p-lg">
            <h2 className="text-xl font-bold text-text-primary">
              {selectedGroup ? selectedGroup.name : t('setting.userGroups.noGroupSelected')}
            </h2>
            <p className="mt-xs text-base text-text-secondary">
              {selectedGroup?.description || t('setting.userGroups.selectGroupDescription')}
            </p>
          </div>

          <div className="grid gap-lg p-lg lg:grid-cols-2">
            <UserTransferList
              title={t('setting.userGroups.availableTitle')}
              description={t('setting.userGroups.availableDescription')}
              searchValue={availableSearch}
              onSearchChange={setAvailableSearch}
              searchPlaceholder={t('setting.userGroups.searchAvailable')}
              isLoading={isLoadingMembers}
              emptyText={t('setting.userGroups.emptyAvailable')}
              members={availableMembers}
              actionLabel={t('setting.userGroups.add')}
              actionIcon="add"
              disabled={!selectedGroupId}
              activeMemberId={activeMemberId}
              onAction={handleAddMember}
            />
            <UserTransferList
              title={t('setting.userGroups.registeredTitle')}
              description={t('setting.userGroups.registeredDescription')}
              searchValue={registeredSearch}
              onSearchChange={setRegisteredSearch}
              searchPlaceholder={t('setting.userGroups.searchRegistered')}
              isLoading={isLoadingMembers}
              emptyText={t('setting.userGroups.emptyRegistered')}
              members={visibleRegisteredMembers}
              actionLabel={t('setting.userGroups.remove')}
              actionIcon="remove"
              disabled={!selectedGroupId}
              activeMemberId={activeMemberId}
              onAction={handleRemoveMember}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

type TransferMember = IamGroupMember

type UserTransferListProps = {
  title: string
  description: string
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder: string
  isLoading: boolean
  emptyText: string
  members: TransferMember[]
  actionLabel: string
  actionIcon: 'add' | 'remove'
  disabled: boolean
  activeMemberId: string | null
  onAction: (memberId: string) => void
}

function getTransferMemberId(member: TransferMember) {
  return member.memberId
}

function UserTransferList({
  title,
  description,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  isLoading,
  emptyText,
  members,
  actionLabel,
  actionIcon,
  disabled,
  activeMemberId,
  onAction
}: UserTransferListProps) {
  const t = useTranslations()
  const ActionIcon = actionIcon === 'add' ? UserPlus : UserMinus

  return (
    <div className="min-w-0 rounded border border-border bg-bg-secondary">
      <div className="border-b border-border p-md">
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
        <p className="mt-xs text-base text-text-secondary">{description}</p>
        <div className="mt-md">
          <Input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            showSearchIcon
            disabled={disabled}
          />
        </div>
      </div>

      <div className="user-group-panel-scroll flex flex-col gap-sm overflow-y-auto p-md">
        {disabled && (
          <div className="rounded bg-bg-primary p-md text-base text-text-secondary">
            {t('setting.userGroups.selectGroupFirst')}
          </div>
        )}
        {!disabled && isLoading && members.length === 0 && (
          <div className="rounded bg-bg-primary p-md text-base text-text-secondary">
            {t('setting.userGroups.memberLoading')}
          </div>
        )}
        {!disabled && !isLoading && members.length === 0 && (
          <div className="rounded bg-bg-primary p-md text-base text-text-secondary">
            {emptyText}
          </div>
        )}
        {!disabled && members.map((member) => {
          const memberId = getTransferMemberId(member)
          return (
            <div
              key={memberId}
              className="flex min-w-0 items-center justify-between gap-md rounded border border-border bg-bg-primary p-md"
            >
              <div className="min-w-0">
                <div className="truncate text-base font-bold text-text-primary" title={member.name}>
                  {member.name}
                </div>
                <div className="truncate text-base text-text-secondary" title={member.email}>
                  {member.email}
                </div>
                <div className="mt-xs text-base text-text-tertiary">
                  {member.phoneNumber ?? '-'} · {t(`setting.status.${toMemberUiStatus(
                    member.status === 'DELETED' ? 'INACTIVE' : member.status
                  )}`)}
                </div>
              </div>
              <Button
                type="button"
                variant={actionIcon === 'add' ? 'primary' : 'secondary'}
                size="small"
                disabled={activeMemberId === memberId}
                onClick={() => onAction(memberId)}
              >
                <ActionIcon className="h-icon-md w-icon-md" />
                {actionLabel}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
