'use client'

import { type FormEvent, startTransition, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Input, Select, notifySaveError, notifySaveSuccess } from '@creami/ui'
import { ArrowLeft, FilePlus2, Plus, Save, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  createPolicy,
  createPolicyDocument,
  deactivatePolicy,
  getIamGroups,
  getPolicyMenuOptions,
  type IamGroup,
  type PolicyMenuKey,
  type PolicyMenuOption,
  type PolicyPermissionKey,
  type PolicyStatementPreset,
  type PolicyStatus
} from '@/lib/api/iam'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'

type PolicyCreateForm = {
  name: string
  description: string
  status: Extract<PolicyStatus, 'ACTIVE' | 'INACTIVE'> | ''
}

type PolicyCreateFormErrors = Partial<Record<keyof PolicyCreateForm, string>>
type PolicyStatementRow = {
  id: string
  menu: PolicyMenuKey | ''
  permission: PolicyPermissionKey | ''
}

const INITIAL_FORM: PolicyCreateForm = {
  name: '',
  description: '',
  status: 'ACTIVE'
}
const INITIAL_STATEMENTS: PolicyStatementRow[] = [
  { id: 'statement-1', menu: '', permission: '' }
]

const PERMISSION_OPTIONS: PolicyPermissionKey[] = ['read', 'write', 'all']
const STATUS_OPTIONS: Array<Extract<PolicyStatus, 'ACTIVE' | 'INACTIVE'>> = ['ACTIVE', 'INACTIVE']

export default function CreatePolicyPage() {
  const t = useTranslations()
  const router = useRouter()
  const [form, setForm] = useState<PolicyCreateForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<PolicyCreateFormErrors>({})
  const [statementError, setStatementError] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [groups, setGroups] = useState<IamGroup[]>([])
  const [menuOptions, setMenuOptions] = useState<PolicyMenuOption[]>([])
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([])
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [isLoadingMenuOptions, setIsLoadingMenuOptions] = useState(true)
  const [statements, setStatements] = useState<PolicyStatementRow[]>(INITIAL_STATEMENTS)

  const documentPreview = useMemo(() => {
    const completeStatements = statements.filter(
      (statement): statement is PolicyStatementRow & PolicyStatementPreset =>
        Boolean(statement.menu && statement.permission)
    )

    if (completeStatements.length === 0) return ''

    return JSON.stringify(createPolicyDocument(completeStatements), null, 2)
  }, [statements])

  useEffect(() => {
    const abortController = new AbortController()

    startTransition(() => {
      setIsLoadingGroups(true)
      setIsLoadingMenuOptions(true)
    })
    Promise.all([
      getIamGroups(0, 200, { signal: abortController.signal }),
      getPolicyMenuOptions({ signal: abortController.signal })
    ])
      .then(([groupResponse, menuResponse]) => {
        setGroups(groupResponse.content)
        setMenuOptions(menuResponse)
      })
      .catch((error) => {
        if (abortController.signal.aborted) return
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.policies.groupsLoadFailed')))
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoadingGroups(false)
          setIsLoadingMenuOptions(false)
        }
      })

    return () => abortController.abort()
  }, [t])

  const validateForm = () => {
    const nextErrors: PolicyCreateFormErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = t('setting.policies.validation.nameRequired')
    }

    if (!form.status) {
      nextErrors.status = t('setting.policies.validation.statusRequired')
    }

    const hasInvalidStatement = statements.length === 0 || statements.some(
      (statement) => !statement.menu || !statement.permission
    )
    setStatementError(
      hasInvalidStatement ? t('setting.policies.validation.statementRequired') : null
    )

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0 && !hasInvalidStatement
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

  const addStatement = () => {
    setStatements((current) => [
      ...current,
      { id: `statement-${Date.now()}`, menu: '', permission: '' }
    ])
    setStatementError(null)
  }

  const removeStatement = (statementId: string) => {
    setStatements((current) =>
      current.length === 1
        ? current
        : current.filter((statement) => statement.id !== statementId)
    )
  }

  const updateStatement = <K extends keyof Omit<PolicyStatementRow, 'id'>>(
    statementId: string,
    field: K,
    value: PolicyStatementRow[K]
  ) => {
    setStatements((current) =>
      current.map((statement) =>
        statement.id === statementId ? { ...statement, [field]: value } : statement
      )
    )
    setStatementError(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setErrorMessage(null)

    try {
      const selectedStatements = statements.map((statement) => ({
        menu: statement.menu as PolicyMenuKey,
        permission: statement.permission as PolicyPermissionKey,
        menuId: menuOptions.find((option) => option.code === statement.menu)?.menuId
      }))

      const createdPolicy = await createPolicy({
        name: form.name.trim(),
        description: form.description.trim() || null,
        documentJson: JSON.stringify(createPolicyDocument(selectedStatements)),
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

          </div>

          <div className="flex flex-col gap-sm">
            <div className="flex flex-wrap items-center justify-between gap-sm">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  {t('setting.policies.form.statements')}
                </h2>
                <p className="mt-xs text-base font-light text-text-secondary">
                  {t('setting.policies.form.statementsDescription')}
                </p>
              </div>
              <Button type="button" size="small" onClick={addStatement} disabled={isSaving}>
                <Plus className="h-icon-md w-icon-md" />
                {t('setting.policies.form.addStatement')}
              </Button>
            </div>

            <div className="flex flex-col gap-sm">
              {statements.map((statement, index) => (
                <div
                  key={statement.id}
                  className="grid gap-sm rounded border border-border bg-bg-secondary p-md lg:grid-cols-[1fr_1fr_auto]"
                >
                  <div className="flex flex-col gap-sm">
                    <label className="text-base font-medium text-text-primary" htmlFor={`policy-menu-${statement.id}`}>
                      {t('setting.policies.form.menu')}
                    </label>
                    <Select
                      id={`policy-menu-${statement.id}`}
                      value={statement.menu}
                      onChange={(event) =>
                        updateStatement(statement.id, 'menu', event.target.value as PolicyStatementRow['menu'])
                      }
                      aria-invalid={Boolean(statementError && !statement.menu)}
                      required
                      disabled={isSaving}
                    >
                      <option value="">{t('setting.policies.form.menuPlaceholder')}</option>
                      {menuOptions.map((menu) => (
                        <option key={menu.menuId} value={menu.code}>
                          {menu.name}
                        </option>
                      ))}
                    </Select>
                    {isLoadingMenuOptions && (
                      <p className="text-base font-light text-text-tertiary">
                        {t('setting.policies.form.menuOptionsLoading')}
                      </p>
                    )}
                    {!isLoadingMenuOptions && menuOptions.length === 0 && (
                      <p className="text-base font-light text-text-tertiary">
                        {t('setting.policies.form.menuOptionsEmpty')}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-sm">
                    <label
                      className="text-base font-medium text-text-primary"
                      htmlFor={`policy-permission-${statement.id}`}
                    >
                      {t('setting.policies.form.permission')}
                    </label>
                    <Select
                      id={`policy-permission-${statement.id}`}
                      value={statement.permission}
                      onChange={(event) =>
                        updateStatement(
                          statement.id,
                          'permission',
                          event.target.value as PolicyStatementRow['permission']
                        )
                      }
                      aria-invalid={Boolean(statementError && !statement.permission)}
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
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="tertiary"
                      iconOnly
                      onClick={() => removeStatement(statement.id)}
                      disabled={isSaving || statements.length === 1}
                      aria-label={t('setting.policies.form.removeStatement', { number: index + 1 })}
                    >
                      <Trash2 className="h-icon-md w-icon-md" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {statementError && (
              <p className="text-base font-light text-error">
                {statementError}
              </p>
            )}
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

            <div className="grid max-h-policy-list gap-sm overflow-y-auto rounded border border-border bg-bg-secondary p-md md:grid-cols-2">
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
