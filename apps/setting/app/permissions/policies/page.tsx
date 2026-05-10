'use client'

import { Button } from '@creami/ui'
import { FormEvent, useState } from 'react'
import { FileSliders, Plus, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

type PolicyMenu = 'users' | 'permissions' | 'policies' | 'subscriptions'
type PolicyPermission = 'read' | 'write' | 'all'
type PolicyStatus = 'active' | 'inactive'

interface Policy {
  id: string
  menu: PolicyMenu
  permission: PolicyPermission
  status: PolicyStatus
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

const menuOptions: PolicyMenu[] = ['users', 'permissions', 'policies', 'subscriptions']
const permissionOptions: PolicyPermission[] = ['read', 'write', 'all']
const statusOptions: PolicyStatus[] = ['active', 'inactive']

const initialPolicies: Policy[] = [
  {
    id: 'POL-MENU-001',
    menu: 'users',
    permission: 'all',
    status: 'active',
    createdBy: 'USR-001',
    createdAt: '2026-05-01',
    updatedBy: 'USR-001',
    updatedAt: '2026-05-03'
  },
  {
    id: 'POL-MENU-002',
    menu: 'permissions',
    permission: 'write',
    status: 'active',
    createdBy: 'USR-001',
    createdAt: '2026-05-01',
    updatedBy: 'USR-002',
    updatedAt: '2026-05-04'
  },
  {
    id: 'POL-MENU-003',
    menu: 'subscriptions',
    permission: 'read',
    status: 'inactive',
    createdBy: 'USR-002',
    createdAt: '2026-05-02',
    updatedBy: 'USR-001',
    updatedAt: '2026-05-05'
  },
  {
    id: 'POL-MENU-004',
    menu: 'policies',
    permission: 'all',
    status: 'active',
    createdBy: 'USR-001',
    createdAt: '2026-05-03',
    updatedBy: 'USR-001',
    updatedAt: '2026-05-06'
  }
]

export default function PolicyManagementPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [menu, setMenu] = useState(menuOptions[0])
  const [permission, setPermission] = useState<PolicyPermission>('read')
  const [status, setStatus] = useState<PolicyStatus>('active')
  const [createdBy, setCreatedBy] = useState('USR-001')

  const resetForm = () => {
    setMenu(menuOptions[0])
    setPermission('read')
    setStatus('active')
    setCreatedBy('USR-001')
  }

  const handleCreatePolicy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const now = new Date()
    const createdAt = now.toISOString().split('T')[0]
    const nextNumber = String(policies.length + 1).padStart(3, '0')

    setPolicies((currentPolicies) => [
      {
        id: `POL-MENU-${nextNumber}`,
        menu,
        permission,
        status,
        createdBy,
        createdAt,
        updatedBy: createdBy,
        updatedAt: createdAt
      },
      ...currentPolicies
    ])
    setIsCreateOpen(false)
    resetForm()
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <FileSliders className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.policies.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.policies.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button
          type="button"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.policies.addPolicy')}
        </Button>
      </div>

      {isCreateOpen && (
        <form
          onSubmit={handleCreatePolicy}
          className="mb-lg rounded border border-border bg-bg-primary p-lg shadow"
        >
          <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                {t('setting.policies.createTitle')}
              </h2>
              <p className="mt-xs text-base font-light text-text-secondary">
                {t('setting.policies.createDescription')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCreateOpen(false)
                resetForm()
              }}
              className="inline-flex h-control-md items-center justify-center gap-sm rounded bg-bg-secondary px-control-px-md py-none text-base font-medium leading-none text-text-primary"
            >
              <X className="h-icon-md w-icon-md" />
              {t('common.close')}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-md lg:grid-cols-4">
            <label className="block">
              <span className="mb-xs block text-base font-light text-text-secondary">
                {t('setting.policies.columns.menu')}
              </span>
              <select
                value={menu}
                onChange={(event) => setMenu(event.target.value as PolicyMenu)}
                className="h-control-md w-full rounded border border-border bg-bg-secondary px-control-px-md py-none text-base font-medium text-text-primary"
              >
                {menuOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`setting.policies.menus.${option}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-xs block text-base font-light text-text-secondary">
                {t('setting.policies.columns.permission')}
              </span>
              <select
                value={permission}
                onChange={(event) => setPermission(event.target.value as PolicyPermission)}
                className="h-control-md w-full rounded border border-border bg-bg-secondary px-control-px-md py-none text-base font-medium text-text-primary"
              >
                {permissionOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`setting.policies.permissions.${option}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-xs block text-base font-light text-text-secondary">
                {t('setting.policies.columns.status')}
              </span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as PolicyStatus)}
                className="h-control-md w-full rounded border border-border bg-bg-secondary px-control-px-md py-none text-base font-medium text-text-primary"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`setting.status.${option}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-xs block text-base font-light text-text-secondary">
                {t('setting.policies.columns.createdById')}
              </span>
              <input
                value={createdBy}
                onChange={(event) => setCreatedBy(event.target.value)}
                required
                className="h-control-md w-full rounded border border-border bg-bg-secondary px-control-px-md py-none text-base font-medium text-text-primary"
              />
            </label>
          </div>

          <div className="mt-lg flex justify-end">
            <button
              type="submit"
              className="inline-flex h-control-md items-center justify-center gap-sm rounded bg-primary px-control-px-md py-none text-base font-medium leading-none text-white"
            >
              <Plus className="h-icon-md w-icon-md" />
              {t('setting.policies.create')}
            </button>
          </div>
        </form>
      )}

      <div className="rounded border border-border bg-bg-primary shadow">
        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-md border-b border-border px-lg py-sm text-base font-bold text-text-tertiary">
          <span>{t('setting.policies.columns.menu')}</span>
          <span>{t('setting.policies.columns.permission')}</span>
          <span>{t('setting.policies.columns.status')}</span>
          <span>{t('setting.policies.columns.created')}</span>
          <span>{t('setting.policies.columns.updated')}</span>
          <span>{t('setting.policies.columns.policyId')}</span>
        </div>
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-md border-b border-border px-lg py-md last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-text-primary">
                {t(`setting.policies.menus.${policy.menu}`)}
              </p>
              <p className="text-base font-light text-text-tertiary">
                {t('setting.policies.menuType')}
              </p>
            </div>
            <span className="inline-flex h-control-sm w-fit items-center rounded bg-bg-tertiary px-control-px-sm py-none text-base font-bold text-text-primary">
              {t(`setting.policies.permissions.${policy.permission}`)}
            </span>
            <span className={`inline-flex h-control-sm w-fit items-center rounded px-control-px-sm py-none text-base font-bold ${
              policy.status === 'active'
                ? 'bg-primary-bg text-primary'
                : 'bg-bg-tertiary text-text-tertiary'
            }`}
            >
              {t(`setting.status.${policy.status}`)}
            </span>
            <div>
              <p className="text-base font-medium text-text-primary">
                {policy.createdBy}
              </p>
              <p className="text-base font-light text-text-tertiary">
                {new Date(policy.createdAt).toLocaleDateString(locale)}
              </p>
            </div>
            <div>
              <p className="text-base font-medium text-text-primary">
                {policy.updatedBy}
              </p>
              <p className="text-base font-light text-text-tertiary">
                {new Date(policy.updatedAt).toLocaleDateString(locale)}
              </p>
            </div>
            <span className="text-base font-light text-text-tertiary">
              {policy.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
