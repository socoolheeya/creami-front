'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowLeft, Plus, ReceiptText } from 'lucide-react'
import { Button, Input, Select } from '@creami/ui'

export default function NewInvoicePage() {
  const t = useTranslations('invoice')

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <Link href="/invoices" className="mb-sm inline-flex items-center gap-xs text-base font-light text-text-tertiary no-underline">
            <ArrowLeft className="h-icon-md w-icon-md" />
            {t('actions.backToList')}
          </Link>
          <div className="flex items-center gap-md">
            <ReceiptText className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('create.title')}
            </h1>
          </div>
          <p className="mt-sm text-base font-light text-text-secondary">
            {t('create.description')}
          </p>
        </div>
      </div>

      <form className="grid gap-lg">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h2 className="mb-md text-xl font-bold text-text-primary">{t('sections.basic')}</h2>
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('fields.property')}
              <Input placeholder={t('placeholders.property')} />
            </label>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('fields.status')}
              <Select defaultValue="draft">
                <option value="draft">{t('statuses.draft')}</option>
                <option value="issued">{t('statuses.issued')}</option>
              </Select>
            </label>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('fields.issueDate')}
              <Input type="date" />
            </label>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('fields.dueDate')}
              <Input type="date" />
            </label>
          </div>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h2 className="mb-md text-xl font-bold text-text-primary">{t('sections.recipient')}</h2>
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('fields.recipientName')}
              <Input placeholder={t('placeholders.recipientName')} />
            </label>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('fields.recipientEmail')}
              <Input type="email" placeholder={t('placeholders.recipientEmail')} />
            </label>
          </div>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h2 className="mb-md text-xl font-bold text-text-primary">{t('sections.items')}</h2>
          <div className="grid grid-cols-1 gap-md md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('columns.description')}
              <Input placeholder={t('placeholders.description')} />
            </label>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('columns.quantity')}
              <Input type="number" min="1" placeholder="1" />
            </label>
            <label className="grid gap-sm text-base font-medium text-text-primary">
              {t('columns.unitPrice')}
              <Input type="number" min="0" placeholder="0" />
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-sm">
          <Link href="/invoices" className="inline-flex h-control-md items-center justify-center rounded bg-bg-secondary px-control-px-md text-base font-medium text-text-primary no-underline">
            {t('actions.cancel')}
          </Link>
          <Button type="button">
            <Plus className="h-icon-md w-icon-md" />
            {t('actions.create')}
          </Button>
        </div>
      </form>
    </div>
  )
}
