'use client'

import {
  Button,
  Input,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFilterCell,
  TableFilterRow,
  TableHead,
  TableHeader,
  TableRow,
  TableStateRow
} from '@creami/ui'
import { Mail, Plus, UserCheck, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  getMemberRoleSummary,
  getMembers,
  toMemberUiStatus,
  type MemberListResponse,
  type MemberSearchCondition,
  type MemberStatus,
  type Member
} from '@/lib/api/members'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'

type MemberFilters = {
  memberId: string
  name: string
  email: string
  phoneNumber: string
  roleName: string
  status: 'all' | MemberStatus
}

const defaultPage: MemberListResponse = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 20,
  isFirst: true,
  isLast: true,
  hasNext: false,
  hasPrevious: false
}

const defaultFilters: MemberFilters = {
  memberId: '',
  name: '',
  email: '',
  phoneNumber: '',
  roleName: '',
  status: 'all'
}

export default function UsersPage() {
  const t = useTranslations()
  const [members, setMembers] = useState<Member[]>([])
  const [pageInfo, setPageInfo] = useState<MemberListResponse>(defaultPage)
  const [filters, setFilters] = useState<MemberFilters>(defaultFilters)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    const condition: MemberSearchCondition = {
      memberId: filters.memberId,
      name: filters.name,
      email: filters.email,
      phoneNumber: filters.phoneNumber,
      roleName: filters.roleName,
      status: filters.status === 'all' ? undefined : filters.status,
      page: pageNumber,
      size: pageSize,
      sort: 'createdAt,desc'
    }

    setIsLoading(true)
    getMembers(condition, { signal: abortController.signal })
      .then((response) => {
        if (!isMounted) return
        setMembers(response.content)
        setPageInfo(response)
        setErrorMessage(null)
      })
      .catch((error: unknown) => {
        if (!isMounted) return
        if (error instanceof DOMException && error.name === 'AbortError') return
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.users.loadFailed')))
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [filters, pageNumber, pageSize])

  const handleFilterChange = <K extends keyof MemberFilters>(
    field: K,
    value: MemberFilters[K]
  ) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value
    }))
    setPageNumber(0)
  }

  const handlePageChange = (nextPage: number) => {
    setPageNumber(nextPage - 1)
  }

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize)
    setPageNumber(0)
  }

  const showInitialLoading = isLoading && members.length === 0 && !errorMessage
  const showRows = members.length > 0 && !errorMessage

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <Users className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.users.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.users.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button
          type="button"
        >
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.users.invite')}
        </Button>
      </div>

      <div className="rounded border border-border bg-bg-primary shadow">
        <Table className="table-fixed">
          <TableHeader
            filterRow={
              <TableFilterRow>
                <TableFilterCell className="w-table-col-id-9">
                  <Input
                    size="small"
                    value={filters.memberId}
                    onChange={(event) => handleFilterChange('memberId', event.target.value)}
                    placeholder={t('setting.users.columns.userId')}
                    showSearchIcon
                  />
                </TableFilterCell>
                <TableFilterCell className="w-member-col-name">
                  <Input
                    size="small"
                    value={filters.name}
                    onChange={(event) => handleFilterChange('name', event.target.value)}
                    placeholder={t('setting.users.detail.name')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-member-col-email">
                  <Input
                    size="small"
                    value={filters.email}
                    onChange={(event) => handleFilterChange('email', event.target.value)}
                    placeholder={t('setting.users.columns.email')}
                    showSearchIcon
                  />
                </TableFilterCell>
                <TableFilterCell className="w-member-col-phone">
                  <Input
                    size="small"
                    value={filters.phoneNumber}
                    onChange={(event) => handleFilterChange('phoneNumber', event.target.value)}
                    placeholder={t('setting.users.detail.phone')}
                  />
                </TableFilterCell>
                <TableFilterCell className="w-member-col-role">
                  <Input
                    size="small"
                    value={filters.roleName}
                    onChange={(event) => handleFilterChange('roleName', event.target.value)}
                    placeholder={t('setting.users.columns.role')}
                    showSearchIcon
                  />
                </TableFilterCell>
                <TableFilterCell className="w-member-col-status">
                  <Select
                    size="small"
                    value={filters.status}
                    onChange={(event) =>
                      handleFilterChange('status', event.target.value as MemberFilters['status'])
                    }
                    aria-label={t('setting.users.columns.status')}
                  >
                    <option value="all">전체</option>
                    <option value="ACTIVE">{t('setting.status.active')}</option>
                    <option value="PENDING">{t('setting.status.invited')}</option>
                    <option value="INACTIVE">{t('setting.status.inactive')}</option>
                    <option value="SUSPENDED">정지</option>
                  </Select>
                </TableFilterCell>
              </TableFilterRow>
            }
          >
            <TableRow>
              <TableHead className="w-table-col-id-9" truncate>
                {t('setting.users.columns.userId')}
              </TableHead>
              <TableHead className="w-member-col-name" truncate>
                {t('setting.users.columns.user')}
              </TableHead>
              <TableHead className="w-member-col-email" truncate>
                {t('setting.users.columns.email')}
              </TableHead>
              <TableHead className="w-member-col-phone" truncate>
                {t('setting.users.detail.phone')}
              </TableHead>
              <TableHead className="w-member-col-role" truncate>
                {t('setting.users.columns.role')}
              </TableHead>
              <TableHead className="w-member-col-status" truncate>
                {t('setting.users.columns.status')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showInitialLoading && (
              <TableStateRow colSpan={6} variant="loading">
                {t('setting.users.loading')}
              </TableStateRow>
            )}
            {!isLoading && errorMessage && (
              <TableStateRow colSpan={6} variant="error" title={errorMessage}>
                {errorMessage}
              </TableStateRow>
            )}
            {!isLoading && !errorMessage && members.length === 0 && (
              <TableStateRow colSpan={6}>{t('setting.users.empty')}</TableStateRow>
            )}
            {showRows && members.map((member) => {
              const roleSummary = getMemberRoleSummary(member)

              return (
                <TableRow key={member.id}>
                  <TableCell className="w-table-col-id-9 text-text-tertiary" truncate>
                    {member.id}
                  </TableCell>
                  <TableCell className="w-member-col-name" truncate titleText={member.name}>
                    <Link
                      href={`/users/${member.id}`}
                      className="font-bold text-text-primary no-underline hover:text-primary"
                    >
                      {member.name}
                    </Link>
                  </TableCell>
                  <TableCell className="w-member-col-email" truncate titleText={member.email}>
                    <span className="flex min-w-0 items-center gap-sm">
                      <Mail className="h-icon-md w-icon-md shrink-0 text-text-tertiary" />
                      <span className="truncate">{member.email}</span>
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-member-col-phone"
                    truncate
                    titleText={member.phoneNumber ?? '-'}
                  >
                    {member.phoneNumber ?? '-'}
                  </TableCell>
                  <TableCell className="w-member-col-role" truncate titleText={roleSummary}>
                    {roleSummary}
                  </TableCell>
                  <TableCell className="w-member-col-status">
                    <span className="inline-flex h-control-sm w-fit items-center gap-xs rounded bg-primary-bg px-control-px-sm py-none text-base font-bold text-primary">
                      <UserCheck className="h-md w-md" />
                      {t(`setting.status.${toMemberUiStatus(member.status)}`)}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="border-t border-border px-lg py-md">
          <Pagination
            variant="simple"
            currentPage={pageNumber + 1}
            totalPages={pageInfo.totalPages}
            totalElements={pageInfo.totalElements}
            pageSize={pageInfo.pageSize || pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  )
}
