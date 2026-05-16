'use client'

import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Input, Select, notifySaveError, notifySaveSuccess } from '@creami/ui'
import { ArrowLeft, FilePlus2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  createPolicy,
  createPolicyDocument,
  deactivatePolicy,
  getIamGroups,
  type IamGroup,
  type PolicyMenuKey,
  type PolicyPermissionKey,
  type PolicyStatus
} from '@/lib/api/iam'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'

type PolicyCreateForm = {
  name: string
  description: string
  menu: PolicyMenuKey | ''
  permission: PolicyPermissionKey | ''
  status: Extract<PolicyStatus, 'ACTIVE' | 'INACTIVE'> | ''
}

type PolicyCreateFormErrors = Partial<Record<keyof PolicyCreateForm, string>>

const INITIAL_FORM: PolicyCreateForm = {
  name: '',
  description: '',
  menu: '',
  permission: '',
  status: 'ACTIVE'
}

const MENU_OPTIONS: PolicyMenuKey[] = ['users', 'permissions', 'policies', 'subscriptions']
const PERMISSION_OPTIONS: PolicyPermissionKey[] = ['read', 'write', 'all']
const STATUS_OPTIONS: Array<Extract<PolicyStatus, 'ACTIVE' | 'INACTIVE'>> = ['ACTIVE', 'INACTIVE']

export default function CreatePolicyPage() {
  const t = useTranslations()
  const router = useRouter()
  const [form, setForm] = useState<PolicyCreateForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<PolicyCreateFormErrors>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [groups, setGroups] = useState<IamGroup[]>([])
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([])
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)

  const documentPreview = useMemo(() => {
    if (!form.menu || !form.permission) return ''

    const selectedMenu = form.menu as PolicyMenuKey
    const selectedPermission = form.permission as PolicyPermissionKey

    return JSON.stringify(createPolicyDocument(selectedMenu, selectedPermission), null, 2)
  }, [form.menu, form.permission])

  useEffect(() => {
    const abortController = new AbortController()

    setIsLoadingGroups(true)
    getIamGroups(0, 200, { signal: abortController.signal })
      .then((response) => setGroups(response.content))
      .catch((error) => {
        if (abortController.signal.aborted) return
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.policies.groupsLoadFailed')))
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoadingGroups(false)
        }
      })

    return () => abortController.abort()
  }, [t])

  const validateForm = () => {
    const nextErrors: PolicyCreateFormErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = t('setting.policies.validation.nameRequired')
    }

    if (!form.menu) {
      nextErrors.menu = t('setting.policies.validation.menuRequired')
    }

    if (!form.permission) {
      nextErrors.permission = t('setting.policies.validation.permissionRequired')
    }

    if (!form.status) {
      nextErrors.status = t('setting.policies.validation.statusRequired')
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const updateField = <K extends keyof PolicyCreateForm>(field: K, value: PolicyCreateForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }))

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const toggleGroup = (groupId: string) => {
    setSelectedGroupIds((current) =>
      current.includes(groupId)
        ? current.filter((selectedGroupId) => selectedGroupId !== groupId)
        : [...current, groupId]
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setErrorMessage(null)

    try {
      const selectedMenu = form.menu as PolicyMenuKey
      const selectedPermission = form.permission as PolicyPermissionKey

      const createdPolicy = await createPolicy({
        name: form.name.trim(),
        description: form.description.trim() || null,
        documentJson: JSON.stringify(createPolicyDocument(selectedMenu, selectedPermission)),
        attachments: selectedGroupIds.map((groupId) => ({
          principalType: 'GROUP',
          principalId: groupId
        }))
      })

      if (form.status === 'INACTIVE') {
        await deactivatePolicy(createdPolicy.policyId)
      }

      notifySaveSuccess(t('setting.policies.created'))
      router.push('/permissions/policies?page=1')
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(error, t('setting.policies.createFailed'))
      setErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-modal-md flex-col gap-lg">
      <div className="flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <FilePlus2 className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.policies.createTitle')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.policies.createDescription')}
          </p>
        </div>

        <Button type="button" variant="ghost" onClick={() => router.push('/permissions/policies?page=1')}>
          <ArrowLeft className="h-icon-md w-icon-md" />
          {t('setting.policies.backToList')}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="error">
          {errorMessage}
        </Alert>
      )}

      <div className="rounded border border-border bg-bg-primary shadow">
        <form className="flex flex-col gap-lg p-lg" onSubmit={handleSubmit}>
          <div className="grid gap-lg lg:grid-cols-2">
            <div className="flex flex-col gap-sm">
              <label className="text-base font-medium text-text-primary" htmlFor="policy-name">
                {t('setting.policies.form.name')}
              </label>
              <Input
                id="policy-name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder={t('setting.policies.form.namePlaceholder')}
                aria-invalid={Boolean(errors.name)}
                required
                disabled={isSaving}
              />
              {errors.name && (
                <p className="text-base font-light text-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-sm">
              <label className="text-base font-medium text-text-primary" htmlFor="policy-status">
                {t('setting.policies.form.status')}
              </label>
              <Select
                id="policy-status"
                value={form.status}
                onChange={(event) => updateField('status', event.target.value as PolicyCreateForm['status'])}
                aria-invalid={Boolean(errors.status)}
                required
                disabled={isSaving}
              >
                <option value="">{t('setting.policies.form.statusPlaceholder')}</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status === 'ACTIVE' ? t('setting.status.active') : t('setting.status.inactive')}
                  </option>
                ))}
              </Select>
              {errors.status && (
                <p className="text-base font-light text-error">
                  {errors.status}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-sm">
              <label className="text-base font-medium text-text-primary" htmlFor="policy-menu">
                {t('setting.policies.form.menu')}
              </label>
              <Select
                id="policy-menu"
                value={form.menu}
                onChange={(event) => updateField('menu', event.target.value as PolicyCreateForm['menu'])}
                aria-invalid={Boolean(errors.menu)}
                required
                disabled={isSaving}
              >
                <option value="">{t('setting.policies.form.menuPlaceholder')}</option>
                {MENU_OPTIONS.map((menu) => (
                  <option key={menu} value={menu}>
                    {t(`setting.policies.menus.${menu}`)}
                  </option>
                ))}
              </Select>
              {errors.menu && (
                <p className="text-base font-light text-error">
                  {errors.menu}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-sm">
              <label className="text-base font-medium text-text-primary" htmlFor="policy-permission">
                {t('setting.policies.form.permission')}
              </label>
              <Select
                id="policy-permission"
                value={form.permission}
                onChange={(event) => updateField('permission', event.target.value as PolicyCreateForm['permission'])}
                aria-invalid={Boolean(errors.permission)}
                required
                disabled={isSaving}
              >
                <option value="">{t('setting.policies.form.permissionPlaceholder')}</option>
                {PERMISSION_OPTIONS.map((permission) => (
                  <option key={permission} value={permission}>
                    {t(`setting.policies.permissions.${permission}`)}
                  </option>
                ))}
              </Select>
              {errors.permission && (
                <p className="text-base font-light text-error">
                  {errors.permission}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-sm">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                {t('setting.policies.form.applyGroups')}
              </h2>
              <p className="mt-xs text-base font-light text-text-secondary">
                {t('setting.policies.form.applyGroupsDescription')}
              </p>
            </div>

            <div className="grid max-h-[20rem] gap-sm overflow-y-auto rounded border border-border bg-bg-secondary p-md md:grid-cols-2">
              {isLoadingGroups && (
                <div className="text-base text-text-secondary">
                  {t('setting.policies.form.groupsLoading')}
                </div>
              )}
              {!isLoadingGroups && groups.length === 0 && (
                <div className="text-base text-text-secondary">
                  {t('setting.policies.form.groupsEmpty')}
                </div>
              )}
              {!isLoadingGroups && groups.map((group) => (
                <label
                  key={group.groupId}
                  className="flex min-w-0 items-start gap-sm rounded border border-border bg-bg-primary p-sm text-base text-text-primary"
                >
                  <input
                    type="checkbox"
                    className="mt-xs"
                    checked={selectedGroupIds.includes(group.groupId)}
                    onChange={() => toggleGroup(group.groupId)}
                    disabled={isSaving}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-medium" title={group.name}>
                      {group.name}
                    </span>
                    <span className="block truncate text-text-secondary" title={group.description ?? '-'}>
                      {group.description ?? '-'}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-base font-medium text-text-primary" htmlFor="policy-description">
              {t('setting.policies.form.description')}
            </label>
            <Input
              id="policy-description"
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder={t('setting.policies.form.descriptionPlaceholder')}
              disabled={isSaving}
            />
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-base font-medium text-text-primary" htmlFor="policy-document-preview">
              {t('setting.policies.form.documentPreview')}
            </label>
            <textarea
              id="policy-document-preview"
              value={documentPreview}
              readOnly
              rows={8}
              className="w-full rounded border border-border bg-bg-secondary p-md text-base font-light text-text-secondary"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-sm">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/permissions/policies?page=1')}
              disabled={isSaving}
            >
              {t('setting.policies.actions.cancel')}
            </Button>
            <Button type="submit" disabled={isSaving}>
              <Save className="h-icon-md w-icon-md" />
              {isSaving ? t('setting.policies.creating') : t('setting.policies.create')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
