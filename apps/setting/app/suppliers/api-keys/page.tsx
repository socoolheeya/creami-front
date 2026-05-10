'use client'

import { useMemo, useState } from 'react'
import { Button, Input } from '@creami/ui'
import { Copy, KeyRound, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

type SupplierApiKey = {
  id: string
  supplierName: string
  apiKey: string
  createdAt: string
}

const initialApiKeys: SupplierApiKey[] = [
  {
    id: 'KEY-001',
    supplierName: 'Creami Partner',
    apiKey: 'crmi_live_8Jf3Kp2Lq9Rt6Vz1Mx4N',
    createdAt: '2026-05-10'
  },
  {
    id: 'KEY-002',
    supplierName: 'Stay API Hub',
    apiKey: 'crmi_live_B7nQp5Xz2Lm8Va4Tc9Rk',
    createdAt: '2026-05-10'
  }
]

function createAuthorizationKey() {
  const bytes = new Uint8Array(18)
  crypto.getRandomValues(bytes)

  return `crmi_live_${Array.from(bytes, (byte) => byte.toString(36).padStart(2, '0')).join('')}`
}

function createApiKeyId(count: number) {
  return `KEY-${String(count + 1).padStart(3, '0')}`
}

export default function ApiKeysPage() {
  const t = useTranslations()
  const [apiKeys, setApiKeys] = useState<SupplierApiKey[]>(initialApiKeys)
  const [supplierName, setSupplierName] = useState('')
  const [apiKey, setApiKey] = useState(createAuthorizationKey)
  const [copiedApiKeyId, setCopiedApiKeyId] = useState<string | null>(null)

  const canAdd = supplierName.trim().length > 0 && apiKey.trim().length > 0
  const createdAt = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const handleGenerateKey = () => {
    setApiKey(createAuthorizationKey())
  }

  const handleAddApiKey = () => {
    const trimmedName = supplierName.trim()

    if (!trimmedName) {
      return
    }

    setApiKeys((currentApiKeys) => [
      {
        id: createApiKeyId(currentApiKeys.length),
        supplierName: trimmedName,
        apiKey,
        createdAt
      },
      ...currentApiKeys
    ])
    setSupplierName('')
    setApiKey(createAuthorizationKey())
  }

  const handleRegenerateKey = (apiKeyId: string) => {
    setApiKeys((currentApiKeys) =>
      currentApiKeys.map((supplierApiKey) =>
        supplierApiKey.id === apiKeyId
          ? { ...supplierApiKey, apiKey: createAuthorizationKey() }
          : supplierApiKey
      )
    )
    setCopiedApiKeyId(null)
  }

  const handleDeleteApiKey = (apiKeyId: string) => {
    setApiKeys((currentApiKeys) =>
      currentApiKeys.filter((supplierApiKey) => supplierApiKey.id !== apiKeyId)
    )
  }

  const handleCopyKey = async (supplierApiKey: SupplierApiKey) => {
    await navigator.clipboard.writeText(`Authorization: Bearer ${supplierApiKey.apiKey}`)
    setCopiedApiKeyId(supplierApiKey.id)
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <KeyRound className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.apiKeys.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.apiKeys.description')}
          </p>
        </div>
      </div>

      <section className="mb-lg rounded border border-border bg-bg-primary p-lg shadow">
        <div className="mb-md">
          <h2 className="text-xl font-bold text-text-primary">
            {t('setting.apiKeys.createTitle')}
          </h2>
          <p className="mt-xs text-base font-light text-text-tertiary">
            {t('setting.apiKeys.createDescription')}
          </p>
        </div>

        <div className="grid gap-md xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_auto]">
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.apiKeys.supplierName')}
            <Input
              value={supplierName}
              onChange={(event) => setSupplierName(event.target.value)}
              placeholder={t('setting.apiKeys.supplierNamePlaceholder')}
            />
          </label>

          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.apiKeys.apiKey')}
            <div className="flex min-w-0 gap-sm">
              <Input
                value={apiKey}
                readOnly
                aria-label={t('setting.apiKeys.apiKey')}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleGenerateKey}
              >
                <KeyRound className="h-icon-md w-icon-md" />
                {t('setting.apiKeys.generateKey')}
              </Button>
            </div>
          </label>

          <div className="flex items-end">
            <Button
              type="button"
              disabled={!canAdd}
              onClick={handleAddApiKey}
            >
              <Plus className="h-icon-md w-icon-md" />
              {t('setting.apiKeys.addApiKey')}
            </Button>
          </div>
        </div>
      </section>

      <div className="rounded border border-border bg-bg-primary shadow">
        <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] gap-md border-b border-border px-lg py-sm text-base font-bold text-text-tertiary">
          <span>{t('setting.apiKeys.columns.id')}</span>
          <span>{t('setting.apiKeys.columns.supplierName')}</span>
          <span>{t('setting.apiKeys.columns.apiKey')}</span>
          <span>{t('setting.apiKeys.columns.createdAt')}</span>
          <span>{t('setting.apiKeys.columns.actions')}</span>
        </div>

        {apiKeys.map((supplierApiKey) => (
          <div
            key={supplierApiKey.id}
            className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] gap-md border-b border-border px-lg py-md last:border-b-0"
          >
            <span className="text-base font-light text-text-tertiary">
              {supplierApiKey.id}
            </span>
            <span className="truncate text-base font-bold text-text-primary">
              {supplierApiKey.supplierName}
            </span>
            <code className="truncate rounded bg-bg-secondary px-control-px-sm py-xs text-base font-medium text-text-secondary">
              Bearer {supplierApiKey.apiKey}
            </code>
            <span className="text-base font-light text-text-secondary">
              {supplierApiKey.createdAt}
            </span>
            <div className="flex flex-wrap gap-sm">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleCopyKey(supplierApiKey)}
              >
                <Copy className="h-icon-md w-icon-md" />
                {copiedApiKeyId === supplierApiKey.id
                  ? t('setting.apiKeys.copied')
                  : t('setting.apiKeys.copy')}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleRegenerateKey(supplierApiKey.id)}
              >
                <RefreshCw className="h-icon-md w-icon-md" />
                {t('setting.apiKeys.regenerate')}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleDeleteApiKey(supplierApiKey.id)}
              >
                <Trash2 className="h-icon-md w-icon-md" />
                {t('common.delete')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
