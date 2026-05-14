'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Input, Select, notification } from '@creami/ui'
import {
  ArrowLeft,
  Building2,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  UserCog
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  changeMemberStatus,
  formatMemberDate,
  getMember,
  getMemberRoleSummary,
  toMemberApiStatus,
  toMemberUiStatus,
  updateMember,
  type Member,
  type MemberUiStatus
} from '@/lib/api/members'
import {
  accommodationAccessOptions
} from '@/lib/data/members'

type MemberForm = {
  name: string
  email: string
  phone: string
  role: string
  team: string
  status: MemberUiStatus
}

function createForm(member: Member): MemberForm {
  return {
    name: member.name,
    email: member.email,
    phone: member.phoneNumber ?? '',
    role: getMemberRoleSummary(member),
    team: '-',
    status: toMemberUiStatus(member.status)
  }
}

export default function UserDetailPage() {
  const params = useParams<{ id: string }>()
  const t = useTranslations()
  const [member, setMember] = useState<Member | null>(null)
  const [form, setForm] = useState<MemberForm>({
    name: '',
    email: '',
    phone: '',
    role: '-',
    team: '-',
    status: 'active'
  })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [accessibleAccommodationIds, setAccessibleAccommodationIds] = useState<string[]>(
    []
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    let isMounted = true

    setIsLoading(true)
    getMember(params.id)
      .then((response) => {
        if (!isMounted) return
        setMember(response)
        setForm(createForm(response))
        setErrorMessage(null)
      })
      .catch((error: unknown) => {
        if (!isMounted) return
        setErrorMessage(error instanceof Error ? error.message : 'Member not found.')
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [params.id])

  const accessibleAccommodations = useMemo(
    () =>
      accommodationAccessOptions.filter((accommodation) =>
        accessibleAccommodationIds.includes(accommodation.id)
      ),
    [accessibleAccommodationIds]
  )

  const filteredAccommodations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return []
    }

    return accommodationAccessOptions.filter(
      (accommodation) =>
        !accessibleAccommodationIds.includes(accommodation.id) &&
        (accommodation.id.toLowerCase() === normalizedQuery ||
          accommodation.name.toLowerCase().includes(normalizedQuery))
    )
  }, [accessibleAccommodationIds, query])

  const canSave = form.name.trim().length > 0

  const handleSelectAccommodation = (accommodationId: string) => {
    setAccessibleAccommodationIds((currentIds) =>
      currentIds.includes(accommodationId)
        ? currentIds
        : [...currentIds, accommodationId]
    )
    setQuery('')
  }

  const handleRemoveAccommodation = (accommodationId: string) => {
    setAccessibleAccommodationIds((currentIds) =>
      currentIds.filter((id) => id !== accommodationId)
    )
  }

  const handleSave = async () => {
    if (!member) return

    setIsSaving(true)

    try {
      const updatedMember = await updateMember(member.id, {
        name: form.name.trim(),
        phoneNumber: form.phone.trim() || null
      })
      const nextStatus = toMemberApiStatus(form.status)
      const statusSyncedMember =
        nextStatus === updatedMember.status
          ? updatedMember
          : await changeMemberStatus(updatedMember.id, nextStatus)

      setMember(statusSyncedMember)
      setForm(createForm(statusSyncedMember))
      notification.success({
        message: '수정이 완료되었습니다.',
        placement: 'top-right',
        direction: 'right'
      })
    } catch (error) {
      notification.error({
        message: error instanceof Error ? error.message : '저장에 실패했습니다.',
        placement: 'top-right',
        direction: 'right'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <Link
          href="/users"
          className="mb-lg inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          {t('setting.users.detail.backToList')}
        </Link>
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h1 className="text-xl font-bold text-text-primary">
            Loading member...
          </h1>
        </section>
      </div>
    )
  }

  if (!member) {
    return (
      <div>
        <Link
          href="/users"
          className="mb-lg inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          {t('setting.users.detail.backToList')}
        </Link>
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h1 className="text-xl font-bold text-text-primary">
            {errorMessage ?? t('setting.users.detail.notFound')}
          </h1>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <Link
            href="/users"
            className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
          >
            <ArrowLeft className="h-icon-md w-icon-md" />
            {t('setting.users.detail.backToList')}
          </Link>
          <div className="mb-sm flex items-center gap-md">
            <UserCog className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.users.detail.title', { userName: form.name })}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.users.detail.description')}
          </p>
        </div>

        <Button type="button" disabled={!canSave || isSaving} onClick={handleSave}>
          <Save className="h-icon-md w-icon-md" />
          {t('common.save')}
        </Button>
      </div>

      <div className="grid gap-lg xl:grid-cols-2">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <ShieldCheck className="h-icon-md w-icon-md text-primary" />
              {t('setting.users.detail.accountInfo')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.users.detail.accountDescription')}
            </p>
          </div>

          <form className="grid gap-md" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.users.columns.userId')}
                <Input value={member.id} readOnly />
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.users.detail.name')}
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>
            </div>

            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.users.columns.email')}
                <Input
                  type="email"
                  value={form.email}
                  readOnly
                />
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.users.detail.phone')}
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </label>
            </div>

            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.users.columns.role')}
                <Select
                  value={form.role}
                  disabled
                >
                  <option value={form.role}>{form.role}</option>
                </Select>
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.users.columns.status')}
                <Select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as MemberUiStatus
                    }))
                  }
                >
                  <option value="active">{t('setting.status.active')}</option>
                  <option value="inactive">{t('setting.status.inactive')}</option>
                  {member.status === 'PENDING' && (
                    <option value="invited">{t('setting.status.invited')}</option>
                  )}
                </Select>
              </label>
            </div>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.users.columns.team')}
              <Input
                value={form.team}
                readOnly
              />
            </label>
          </form>

          <dl className="mt-lg grid gap-sm rounded border border-border bg-bg-secondary p-md text-base">
            <div className="grid gap-sm md:grid-cols-2">
              <div className="flex gap-md">
                <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                  {t('setting.users.detail.createdById')}
                </dt>
                <dd className="font-medium text-text-primary">-</dd>
              </div>
              <div className="flex gap-md">
                <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                  {t('setting.users.detail.createdAt')}
                </dt>
                <dd className="font-medium text-text-primary">
                  {formatMemberDate(member.createdAt)}
                </dd>
              </div>
            </div>
            <div className="grid gap-sm md:grid-cols-2">
              <div className="flex gap-md">
                <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                  {t('setting.users.detail.updatedById')}
                </dt>
                <dd className="font-medium text-text-primary">-</dd>
              </div>
              <div className="flex gap-md">
                <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                  {t('setting.users.detail.updatedAt')}
                </dt>
                <dd className="font-medium text-text-primary">
                  {formatMemberDate(member.updatedAt)}
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <div>
              <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
                <Building2 className="h-icon-md w-icon-md text-primary" />
                {t('setting.users.detail.accessibleAccommodations')}
              </h2>
              <p className="mt-xs text-base font-light text-text-tertiary">
                {t('setting.users.detail.accessDescription')}
              </p>
            </div>
          </div>

          <div className="mb-lg rounded border border-border bg-bg-secondary p-md">
            <div className="mb-md flex items-center gap-sm text-base font-bold text-text-primary">
              <Search className="h-icon-md w-icon-md text-primary" />
              {t('setting.users.detail.searchTitle')}
            </div>
            <div className="flex flex-col gap-sm md:flex-row">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('setting.users.detail.searchPlaceholder')}
                showSearchIcon
              />
            </div>

            {query.trim().length > 0 && (
              <div
                className="mt-md grid gap-xs overflow-y-auto"
                style={{
                  maxHeight:
                    'calc((var(--control-height-md) * 8) + (var(--spacing-xs) * 7))'
                }}
              >
                {filteredAccommodations.map((accommodation) => {
                  return (
                    <button
                      key={accommodation.id}
                      type="button"
                      onClick={() => handleSelectAccommodation(accommodation.id)}
                      className="flex h-control-md w-full cursor-pointer items-center gap-md rounded border border-border bg-bg-primary px-control-px-md py-none text-left transition-colors hover:bg-bg-tertiary"
                    >
                      <span
                        className="shrink-0 truncate text-base font-light text-text-tertiary"
                        style={{ width: 'var(--modal-action-width)' }}
                      >
                        {accommodation.id}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-base font-bold text-text-primary">
                        {accommodation.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="grid gap-sm">
            {accessibleAccommodations.map((accommodation) => (
              <div
                key={accommodation.id}
                className="flex h-control-md items-center gap-md rounded border border-border bg-bg-secondary px-control-px-md py-none"
              >
                <span
                  className="shrink-0 truncate text-base font-light text-text-tertiary"
                  style={{ width: 'var(--modal-action-width)' }}
                >
                  {accommodation.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-base font-bold text-text-primary">
                  {accommodation.name}
                </span>
                <Button
                  type="button"
                  variant="tertiary"
                  size="small"
                  iconOnly
                  aria-label={t('setting.users.detail.removeAccommodation', {
                    accommodationName: accommodation.name
                  })}
                  onClick={() => handleRemoveAccommodation(accommodation.id)}
                >
                  <Trash2 className="h-icon-md w-icon-md" />
                </Button>
              </div>
            ))}

            {accessibleAccommodations.length === 0 && (
              <div className="rounded border border-border bg-bg-secondary p-md text-center text-base font-light text-text-tertiary">
                {t('setting.users.detail.emptyAccess')}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
