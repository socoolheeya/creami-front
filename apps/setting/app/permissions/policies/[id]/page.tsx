'use client'

import { useEffect, useState } from 'react'
import { Alert, Button, Input, Select, notifySaveError, notifySaveSuccess } from '@creami/ui'
import { ArrowLeft, FileSliders, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  attachPolicy,
  activatePolicy,
  createPolicyDocument,
  deactivatePolicy,
  detachPolicy,
  getIamGroups,
  getPolicy,
  getPolicyAttachments,
  type IamGroup,
  type PolicyMenuKey,
  type PolicyPermissionKey,
  updatePolicy,
  type Policy,
  type PolicyAttachment,
  type PolicyStatus
} from '@/lib/api/iam'
import { getDisplayApiErrorMessage } from '@/lib/api/errors'

type PolicyForm = {
  name: string
  description: string
  status: PolicyStatus
}

type PolicyStatementRow = {
  id: string
  menu: PolicyMenuKey | ''
  permission: PolicyPermissionKey | ''
}

const MENU_OPTIONS: PolicyMenuKey[] = ['users', 'permissions', 'policies', 'subscriptions']
const PERMISSION_OPTIONS: PolicyPermissionKey[] = ['read', 'write', 'all']
const ACTION_PREFIX_TO_MENU: Record<string, PolicyMenuKey> = {
  member: 'users',
  role: 'permissions',
  policy: 'policies',
  subscription: 'subscriptions'
}

function createPolicyForm(policy: Policy): PolicyForm {
  return {
    name: policy.name,
    description: policy.description ?? '',
    status: policy.status
  }
}

function formatDate(value?: string | null) {
  if (!value) return '-'
  return value.slice(0, 16).replace('T', ' ')
}

function createEmptyStatementRow(index = Date.now()): PolicyStatementRow {
  return { id: `statement-${index}`, menu: '', permission: '' }
}

function parsePolicyStatements(documentJson?: string | null): PolicyStatementRow[] {
  if (!documentJson) return [createEmptyStatementRow(1)]

  try {
    const parsed = JSON.parse(documentJson) as {
      statements?: Array<{ actions?: string[] }>
    }
    const rows = parsed.statements?.reduce<PolicyStatementRow[]>((result, statement, index) => {
        const firstAction = statement.actions?.[0]
        if (!firstAction) return result
        const [prefix, action] = firstAction.split(':')
        const menu = ACTION_PREFIX_TO_MENU[prefix]
        const permission =
          action === '*' ? 'all' :
          action === 'read' ? 'read' :
          action === 'write' || action === 'create' ? 'write' :
          ''

        if (!menu || !permission) return result
        result.push({ id: `statement-${index + 1}`, menu, permission })
        return result
      }, [])

    return rows && rows.length > 0 ? rows : [createEmptyStatementRow(1)]
  } catch {
    return [createEmptyStatementRow(1)]
  }
}

export default function PolicyDetailPage() {
  const params = useParams<{ id: string }>()
  const t = useTranslations()
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [form, setForm] = useState<PolicyForm>({
    name: '',
    description: '',
    status: 'ACTIVE'
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingAttachment, setIsSavingAttachment] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [groups, setGroups] = useState<IamGroup[]>([])
  const [attachments, setAttachments] = useState<PolicyAttachment[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [statements, setStatements] = useState<PolicyStatementRow[]>([createEmptyStatementRow(1)])
  const [statementError, setStatementError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    async function loadPolicy() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const nextPolicy = await getPolicy(params.id, { signal: abortController.signal })
        setPolicy(nextPolicy)
        setForm(createPolicyForm(nextPolicy))
        setStatements(parsePolicyStatements(nextPolicy.documentJson))
      } catch (error) {
        if (abortController.signal.aborted) return
        setPolicy(null)
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.policies.detail.notFound')))
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadPolicy()

    return () => abortController.abort()
  }, [params.id, t])

  useEffect(() => {
    const abortController = new AbortController()

    async function loadPolicyAttachments() {
      try {
        const [nextGroups, nextAttachments] = await Promise.all([
          getIamGroups(0, 200, { signal: abortController.signal }),
          getPolicyAttachments(params.id, { signal: abortController.signal })
        ])
        setGroups(nextGroups.content)
        setAttachments(nextAttachments)
      } catch (error) {
        if (abortController.signal.aborted) return
        setErrorMessage(getDisplayApiErrorMessage(error, t('setting.policies.detail.attachmentsLoadFailed')))
      }
    }

    loadPolicyAttachments()

    return () => abortController.abort()
  }, [params.id, t])

  const canSave = form.name.trim().length > 0 && Boolean(policy) && form.status !== 'DELETED'
  const attachedGroupIds = new Set(
    attachments
      .filter((attachment) => attachment.principalType === 'GROUP')
      .map((attachment) => attachment.principalId)
  )
  const attachableGroups = groups.filter((group) => !attachedGroupIds.has(group.groupId))

  const handleSave = async () => {
    if (!policy) return

    const hasInvalidStatement = statements.length === 0 || statements.some(
      (statement) => !statement.menu || !statement.permission
    )
    if (hasInvalidStatement) {
      const nextErrorMessage = t('setting.policies.validation.statementRequired')
      setStatementError(nextErrorMessage)
      notifySaveError(nextErrorMessage)
      return
    }

    setIsSaving(true)
    setErrorMessage(null)
    setStatementError(null)

    try {
      const selectedStatements = statements.map((statement) => ({
        menu: statement.menu as PolicyMenuKey,
        permission: statement.permission as PolicyPermissionKey
      }))
      const updatedPolicy = await updatePolicy(policy.policyId, {
        name: form.name.trim(),
        description: form.description.trim() || null,
        documentJson: JSON.stringify(createPolicyDocument(selectedStatements))
      })

      const statusSyncedPolicy =
        form.status === updatedPolicy.status
          ? updatedPolicy
          : form.status === 'ACTIVE'
            ? await activatePolicy(updatedPolicy.policyId)
            : await deactivatePolicy(updatedPolicy.policyId)

      setPolicy(statusSyncedPolicy)
      setForm(createPolicyForm(statusSyncedPolicy))
      setStatements(parsePolicyStatements(statusSyncedPolicy.documentJson))
      notifySaveSuccess(t('setting.policies.updated'))
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(error, t('setting.policies.updateFailed'))
      setErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const addStatement = () => {
    setStatements((current) => [...current, createEmptyStatementRow(Date.now())])
    setStatementError(null)
  }

  const removeStatement = (statementId: string) => {
    setStatements((current) =>
      current.length === 1
        ? current
        : current.filter((statement) => statement.id !== statementId)
    )
    setStatementError(null)
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

  const reloadAttachments = async () => {
    const nextAttachments = await getPolicyAttachments(params.id)
    setAttachments(nextAttachments)
  }

  const handleAttachGroup = async () => {
    if (!policy || !selectedGroupId) return

    setIsSavingAttachment(true)
    setErrorMessage(null)

    try {
      await attachPolicy(policy.policyId, {
        principalType: 'GROUP',
        principalId: selectedGroupId
      })
      setSelectedGroupId('')
      await Promise.all([reloadAttachments(), getPolicy(policy.policyId).then(setPolicy)])
      notifySaveSuccess(t('setting.policies.detail.groupAttached'))
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(error, t('setting.policies.detail.groupAttachFailed'))
      setErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSavingAttachment(false)
    }
  }

  const handleDetachGroup = async (groupId: string) => {
    if (!policy) return

    setIsSavingAttachment(true)
    setErrorMessage(null)

    try {
      await detachPolicy(policy.policyId, {
        principalType: 'GROUP',
        principalId: groupId
      })
      await Promise.all([reloadAttachments(), getPolicy(policy.policyId).then(setPolicy)])
      notifySaveSuccess(t('setting.policies.detail.groupDetached'))
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(error, t('setting.policies.detail.groupDetachFailed'))
      setErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSavingAttachment(false)
    }
  }

  if (!isLoading && !policy) {
    return (
      <div>
        <Link
          href="/permissions/policies?page=1"
          className="mb-lg inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          {t('setting.policies.backToList')}
        </Link>
        {errorMessage && (
          <Alert variant="error" className="mb-md">
            {errorMessage}
          </Alert>
        )}
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h1 className="text-xl font-bold text-text-primary">
            {t('setting.policies.detail.notFound')}
          </h1>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-lg">
        <Link
          href="/permissions/policies?page=1"
          className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          {t('setting.policies.backToList')}
        </Link>
        <div className="mb-sm flex items-center gap-md">
          <FileSliders className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            {t('setting.policies.detail.title', { policyName: form.name || '-' })}
          </h1>
        </div>
        <p className="text-base font-light text-text-secondary">
          {t('setting.policies.detail.description')}
        </p>
      </div>

      <div className="mb-sm flex justify-end">
        <Button type="button" disabled={!canSave || isSaving} onClick={handleSave}>
          <Save className="h-icon-md w-icon-md" />
          {isSaving ? t('setting.policies.updating') : t('common.save')}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="error" className="mb-md">
          {errorMessage}
        </Alert>
      )}

      <div className="grid gap-lg xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <ShieldCheck className="h-icon-md w-icon-md text-primary" />
              {t('setting.policies.detail.basicInfo')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.policies.detail.basicDescription')}
            </p>
          </div>

          <form className="grid gap-md" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.policies.columns.policyId')}
              <Input value={policy?.policyId ?? params.id} readOnly disabled={isLoading} />
            </label>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.policies.form.name')}
              <Input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder={t('setting.policies.form.namePlaceholder')}
                disabled={isLoading || isSaving || form.status === 'DELETED'}
              />
            </label>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.policies.form.description')}
              <Input
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                placeholder={t('setting.policies.form.descriptionPlaceholder')}
                disabled={isLoading || isSaving || form.status === 'DELETED'}
              />
            </label>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.policies.form.status')}
              <Select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as PolicyStatus
                  }))
                }
                disabled={isLoading || isSaving || form.status === 'DELETED'}
              >
                <option value="ACTIVE">{t('setting.status.active')}</option>
                <option value="INACTIVE">{t('setting.status.inactive')}</option>
                {form.status === 'DELETED' && (
                  <option value="DELETED">{t('setting.policies.statuses.deleted')}</option>
                )}
              </Select>
            </label>
          </form>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <FileSliders className="h-icon-md w-icon-md text-primary" />
              {t('setting.policies.detail.summaryInfo')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.policies.detail.summaryDescription')}
            </p>
          </div>

          <dl className="grid gap-sm rounded border border-border bg-bg-secondary p-md text-base">
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.policies.columns.status')}
              </dt>
              <dd className="font-medium text-text-primary">
                {policy?.status === 'ACTIVE'
                  ? t('setting.status.active')
                  : policy?.status === 'INACTIVE'
                    ? t('setting.status.inactive')
                    : t('setting.policies.statuses.deleted')}
              </dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.policies.columns.defaultVersion')}
              </dt>
              <dd className="font-medium text-text-primary">
                {policy?.defaultVersionNumber ?? '-'}
              </dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.policies.columns.versionCount')}
              </dt>
              <dd className="font-medium text-text-primary">{policy?.versionCount ?? '-'}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.policies.columns.attachmentCount')}
              </dt>
              <dd className="font-medium text-text-primary">{policy?.attachmentCount ?? '-'}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.policies.columns.created')}
              </dt>
              <dd className="font-medium text-text-primary">{formatDate(policy?.createdAt)}</dd>
            </div>
            <div className="flex gap-md">
              <dt className="w-modal-action shrink-0 font-light text-text-tertiary">
                {t('setting.policies.columns.updated')}
              </dt>
              <dd className="font-medium text-text-primary">{formatDate(policy?.updatedAt)}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-lg rounded border border-border bg-bg-primary p-lg shadow">
        <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
          <div>
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <FileSliders className="h-icon-md w-icon-md text-primary" />
              {t('setting.policies.detail.permissionStatements')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.policies.detail.permissionStatementsDescription')}
            </p>
          </div>
          <Button
            type="button"
            size="small"
            onClick={addStatement}
            disabled={isLoading || isSaving || form.status === 'DELETED'}
          >
            <Plus className="h-icon-md w-icon-md" />
            {t('setting.policies.form.addStatement')}
          </Button>
        </div>

        <div className="grid gap-sm">
          {statements.map((statement, index) => (
            <div
              key={statement.id}
              className="grid gap-sm rounded border border-border bg-bg-secondary p-md lg:grid-cols-[1fr_1fr_auto]"
            >
              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.policies.form.menu')}
                <Select
                  value={statement.menu}
                  onChange={(event) =>
                    updateStatement(statement.id, 'menu', event.target.value as PolicyStatementRow['menu'])
                  }
                  aria-invalid={Boolean(statementError && !statement.menu)}
                  disabled={isLoading || isSaving || form.status === 'DELETED'}
                >
                  <option value="">{t('setting.policies.form.menuPlaceholder')}</option>
                  {MENU_OPTIONS.map((menu) => (
                    <option key={menu} value={menu}>
                      {t(`setting.policies.menus.${menu}`)}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="grid gap-sm text-base font-medium text-text-primary">
                {t('setting.policies.form.permission')}
                <Select
                  value={statement.permission}
                  onChange={(event) =>
                    updateStatement(statement.id, 'permission', event.target.value as PolicyStatementRow['permission'])
                  }
                  aria-invalid={Boolean(statementError && !statement.permission)}
                  disabled={isLoading || isSaving || form.status === 'DELETED'}
                >
                  <option value="">{t('setting.policies.form.permissionPlaceholder')}</option>
                  {PERMISSION_OPTIONS.map((permission) => (
                    <option key={permission} value={permission}>
                      {t(`setting.policies.permissions.${permission}`)}
                    </option>
                  ))}
                </Select>
              </label>

              <div className="flex items-end">
                <Button
                  type="button"
                  variant="tertiary"
                  iconOnly
                  onClick={() => removeStatement(statement.id)}
                  disabled={isSaving || form.status === 'DELETED' || statements.length === 1}
                  aria-label={t('setting.policies.form.removeStatement', { number: index + 1 })}
                >
                  <Trash2 className="h-icon-md w-icon-md" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {statementError && (
          <p className="mt-sm text-base font-light text-error">
            {statementError}
          </p>
        )}
      </section>

      <section className="mt-lg rounded border border-border bg-bg-primary p-lg shadow">
        <div className="mb-lg">
          <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
            <ShieldCheck className="h-icon-md w-icon-md text-primary" />
            {t('setting.policies.detail.groupAttachments')}
          </h2>
          <p className="mt-xs text-base font-light text-text-tertiary">
            {t('setting.policies.detail.groupAttachmentsDescription')}
          </p>
        </div>

        <div className="mb-md flex flex-wrap gap-sm">
          <Select
            className="min-w-[16rem]"
            value={selectedGroupId}
            onChange={(event) => setSelectedGroupId(event.target.value)}
            disabled={isSavingAttachment || form.status === 'DELETED'}
          >
            <option value="">{t('setting.policies.detail.selectGroup')}</option>
            {attachableGroups.map((group) => (
              <option key={group.groupId} value={group.groupId}>
                {group.name}
              </option>
            ))}
          </Select>
          <Button
            type="button"
            disabled={!selectedGroupId || isSavingAttachment || form.status === 'DELETED'}
            onClick={handleAttachGroup}
          >
            {t('setting.policies.detail.attachGroup')}
          </Button>
        </div>

        <div className="grid gap-sm md:grid-cols-2">
          {attachments.filter((attachment) => attachment.principalType === 'GROUP').length === 0 && (
            <div className="rounded border border-border bg-bg-secondary p-md text-base text-text-secondary">
              {t('setting.policies.detail.noGroupAttachments')}
            </div>
          )}
          {attachments
            .filter((attachment) => attachment.principalType === 'GROUP')
            .map((attachment) => (
              <div
                key={attachment.policyAttachmentId}
                className="flex min-w-0 items-center justify-between gap-md rounded border border-border bg-bg-secondary p-md"
              >
                <div className="min-w-0">
                  <div className="truncate text-base font-bold text-text-primary" title={attachment.principalName ?? attachment.principalId}>
                    {attachment.principalName ?? attachment.principalId}
                  </div>
                  <div className="truncate text-base text-text-secondary">
                    GROUP #{attachment.principalId}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  disabled={isSavingAttachment || form.status === 'DELETED'}
                  onClick={() => handleDetachGroup(attachment.principalId)}
                >
                  {t('setting.policies.detail.detachGroup')}
                </Button>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
