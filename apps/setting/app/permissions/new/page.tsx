'use client'

import { type FormEvent } from 'react'
import { Alert, Button, Input, notifySaveError } from '@creami/ui'
import { ArrowLeft, Check, Plus, Save, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { createRole, type CreateRoleInput, type RoleScope } from '../../../lib/api/iam'
import { getDisplayApiErrorMessage } from '../../../lib/api/errors'

const ROLE_SCOPE_KEYS: RoleScope[] = [
  'users',
  'permissions',
  'subscriptions',
  'bookings',
  'settlements',
  'properties',
  'discounts',
  'ari'
]

type RoleCreateFormErrors = {
  name?: string
  scopes?: string
}

export default function PermissionRoleCreatePage() {
  const router = useRouter()
  const t = useTranslations()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedScopes, setSelectedScopes] = useState<RoleScope[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<RoleCreateFormErrors>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const canSave = name.trim().length > 0 && selectedScopes.length > 0

  const selectedScopeSummary = useMemo(
    () =>
      selectedScopes
        .map((scope) => t(`setting.permissions.scopes.${scope}`))
        .join(', '),
    [selectedScopes, t]
  )

  const toggleScope = (scope: RoleScope) => {
    setSelectedScopes((currentScopes) =>
      currentScopes.includes(scope)
        ? currentScopes.filter((currentScope) => currentScope !== scope)
        : [...currentScopes, scope]
    )

    if (errors.scopes) {
      setErrors((current) => ({ ...current, scopes: undefined }))
    }
  }

  const validateForm = () => {
    const nextErrors: RoleCreateFormErrors = {}

    if (!name.trim()) {
      nextErrors.name = t('setting.permissions.form.nameRequired')
    }

    if (selectedScopes.length === 0) {
      nextErrors.scopes = t('setting.permissions.form.scopeRequired')
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSave = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (!validateForm()) return

    setIsSaving(true)
    setErrorMessage(null)

    const input: CreateRoleInput = {
      name: name.trim(),
      description: description.trim() || null,
      scopes: selectedScopes
    }

    try {
      await createRole(input)
      router.push('/permissions?page=1&saved=role')
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(
        error,
        t('setting.permissions.saveFailed')
      )
      setErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <Link
            href="/permissions"
            className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
          >
            <ArrowLeft className="h-icon-md w-icon-md" />
            {t('setting.permissions.backToList')}
          </Link>
          <div className="mb-sm flex items-center gap-md">
            <ShieldCheck className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.permissions.createTitle')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.permissions.createDescription')}
          </p>
        </div>

        <Button type="submit" form="permission-role-create-form" disabled={!canSave || isSaving}>
          <Save className="h-icon-md w-icon-md" />
          {isSaving ? t('setting.permissions.saving') : t('setting.permissions.create')}
        </Button>
      </div>

      {errorMessage && (
        <Alert className="mb-md" variant="error">
          {errorMessage}
        </Alert>
      )}

      <div className="grid gap-lg xl:grid-cols-2">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="text-xl font-bold text-text-primary">
              {t('setting.permissions.form.basicInfo')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.permissions.form.basicInfoDescription')}
            </p>
          </div>

          <form
            id="permission-role-create-form"
            className="grid gap-md"
            onSubmit={handleSave}
          >
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.permissions.form.name')}
              <Input
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (errors.name) {
                    setErrors((current) => ({ ...current, name: undefined }))
                  }
                }}
                placeholder={t('setting.permissions.form.namePlaceholder')}
                maxLength={50}
                disabled={isSaving}
                aria-invalid={Boolean(errors.name)}
                required
              />
              {errors.name && <p className="text-base font-light text-error">{errors.name}</p>}
            </label>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('setting.permissions.form.description')}
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={t('setting.permissions.form.descriptionPlaceholder')}
                maxLength={200}
                className="min-h-2xl w-full resize-y rounded border border-border bg-bg-secondary px-control-px-md py-sm text-base font-medium text-text-primary"
                disabled={isSaving}
              />
            </label>
          </form>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg flex flex-wrap items-start justify-between gap-sm">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                {t('setting.permissions.form.scopeTitle')}
              </h2>
              <p className="mt-xs text-base font-light text-text-tertiary">
                {t('setting.permissions.form.scopeDescription')}
              </p>
            </div>
            <span className="rounded bg-primary-bg px-control-px-md py-xs text-base font-bold text-primary">
              {t('setting.permissions.form.selectedScopes', { count: selectedScopes.length })}
            </span>
          </div>

          <div className="grid gap-md md:grid-cols-2">
            {ROLE_SCOPE_KEYS.map((scope) => {
              const isSelected = selectedScopes.includes(scope)

              return (
                <button
                  key={scope}
                  type="button"
                  onClick={() => toggleScope(scope)}
                  disabled={isSaving}
                  className={`grid gap-sm rounded border p-md text-left transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary-bg'
                      : 'border-border bg-bg-secondary hover:bg-bg-tertiary'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center justify-between gap-sm">
                    <span className="text-base font-bold text-text-primary">
                      {t(`setting.permissions.scopes.${scope}`)}
                    </span>
                    <span
                      className={`flex h-icon-lg w-icon-lg items-center justify-center rounded ${
                        isSelected ? 'bg-primary text-white' : 'bg-bg-primary text-text-tertiary'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-icon-md w-icon-md" />
                      ) : (
                        <Plus className="h-icon-md w-icon-md" />
                      )}
                    </span>
                  </span>
                  <span className="text-base font-light text-text-secondary">
                    {t('setting.permissions.form.scopeHelper')}
                  </span>
                </button>
              )
            })}
          </div>
          {errors.scopes && <p className="text-base font-light text-error">{errors.scopes}</p>}

          <div className="mt-lg rounded border border-border bg-bg-secondary p-md">
            <p className="text-base font-bold text-text-primary">
              {t('setting.permissions.form.selectionPreview')}
            </p>
            <p className="mt-xs text-base font-light text-text-secondary">
              {selectedScopes.length > 0
                ? selectedScopeSummary
                : t('setting.permissions.form.scopeRequired')}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
