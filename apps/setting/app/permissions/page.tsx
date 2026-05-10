'use client'

import { Button } from '@creami/ui'
import { Plus, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

const roles = [
  {
    id: 'ROLE-OWNER',
    name: 'Owner',
    descriptionKey: 'setting.permissions.roles.owner.description',
    users: 1,
    scopes: ['users', 'permissions', 'subscriptions', 'bookings', 'settlements']
  },
  {
    id: 'ROLE-ADMIN',
    name: 'Admin',
    descriptionKey: 'setting.permissions.roles.admin.description',
    users: 4,
    scopes: ['users', 'bookings', 'properties', 'discounts']
  },
  {
    id: 'ROLE-OPERATOR',
    name: 'Operator',
    descriptionKey: 'setting.permissions.roles.operator.description',
    users: 7,
    scopes: ['bookings', 'properties', 'ari']
  }
]

export default function PermissionsPage() {
  const t = useTranslations()

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <ShieldCheck className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.permissions.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.permissions.description')}
          </p>
        </div>
      </div>

      <div className="mb-sm flex justify-end">
        <Button
          type="button"
        >
          <Plus className="h-icon-md w-icon-md" />
          {t('setting.permissions.addRole')}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="rounded border border-border bg-bg-primary p-lg shadow">
            <div className="mb-md flex items-start justify-between gap-md">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {role.name}
                </h2>
                <p className="mt-xs text-base font-light text-text-tertiary">
                  {role.id}
                </p>
              </div>
              <span className="rounded bg-bg-tertiary px-control-px-sm py-xs text-base font-bold text-text-secondary">
                {t('setting.permissions.userCount', { count: role.users })}
              </span>
            </div>
            <p className="mb-md text-base font-light text-text-secondary">
              {t(role.descriptionKey)}
            </p>
            <div className="flex flex-wrap gap-sm">
              {role.scopes.map((scope) => (
                <span
                  key={scope}
                  className="rounded bg-primary-bg px-control-px-sm py-xs text-base font-bold text-primary"
                >
                  {t(`setting.permissions.scopes.${scope}`)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
