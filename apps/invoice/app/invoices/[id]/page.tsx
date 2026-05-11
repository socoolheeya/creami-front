'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowLeft, CalendarDays, Mail, ReceiptText, UserRound } from 'lucide-react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@creami/ui'
import { formatDate, formatMoney, invoices, type InvoiceStatus } from '@/lib/invoices'

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function getStatusClass(status: InvoiceStatus) {
  if (status === 'paid') {
    return 'bg-success-bg text-success'
  }

  if (status === 'overdue' || status === 'cancelled') {
    return 'bg-error-bg text-error'
  }

  if (status === 'issued') {
    return 'bg-primary-bg text-primary'
  }

  return 'bg-bg-tertiary text-text-secondary'
}

export default function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const { id } = use(params)
  const t = useTranslations('invoice')
  const locale = useLocale()
  const invoice = invoices.find((item) => item.id === id)

  if (!invoice) {
    notFound()
  }

  const balance = invoice.totalAmount - invoice.paidAmount

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <ReceiptText className="h-icon-lg w-icon-lg text-primary" />
            <div>
              <Link href="/invoices" className="mb-xs inline-flex items-center gap-xs text-base font-light text-text-tertiary no-underline">
                <ArrowLeft className="h-icon-md w-icon-md" />
                {t('actions.backToList')}
              </Link>
              <h1 className="text-2xl font-bold text-text-primary">{invoice.id}</h1>
            </div>
          </div>
          <p className="text-base font-light text-text-secondary">{invoice.memo}</p>
        </div>
        <span className={`inline-flex h-control-md items-center rounded px-control-px-md text-base font-bold ${getStatusClass(invoice.status)}`}>
          {t(`statuses.${invoice.status}`)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h2 className="mb-md text-xl font-bold text-text-primary">{t('sections.basic')}</h2>
          <dl className="grid grid-cols-1 gap-md md:grid-cols-2">
            <div>
              <dt className="mb-xs text-base font-light text-text-tertiary">{t('fields.invoiceId')}</dt>
              <dd className="text-base font-bold text-text-primary">{invoice.id}</dd>
            </div>
            <div>
              <dt className="mb-xs text-base font-light text-text-tertiary">{t('fields.property')}</dt>
              <dd className="text-base font-medium text-text-primary">{invoice.propertyName}</dd>
            </div>
            <div>
              <dt className="mb-xs flex items-center gap-xs text-base font-light text-text-tertiary">
                <CalendarDays className="h-icon-md w-icon-md" />
                {t('fields.issueDate')}
              </dt>
              <dd className="text-base font-medium text-text-primary">{formatDate(invoice.issueDate, locale)}</dd>
            </div>
            <div>
              <dt className="mb-xs flex items-center gap-xs text-base font-light text-text-tertiary">
                <CalendarDays className="h-icon-md w-icon-md" />
                {t('fields.dueDate')}
              </dt>
              <dd className="text-base font-medium text-text-primary">{formatDate(invoice.dueDate, locale)}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <h2 className="mb-md text-xl font-bold text-text-primary">{t('sections.recipient')}</h2>
          <div className="grid gap-md">
            <div className="flex items-center gap-sm">
              <UserRound className="h-icon-md w-icon-md text-primary" />
              <span className="text-base font-bold text-text-primary">{invoice.recipientName}</span>
            </div>
            <div className="flex items-center gap-sm">
              <Mail className="h-icon-md w-icon-md text-text-tertiary" />
              <span className="text-base font-light text-text-secondary">{invoice.recipientEmail}</span>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-lg rounded border border-border bg-bg-primary p-lg shadow">
        <h2 className="mb-md text-xl font-bold text-text-primary">{t('sections.amount')}</h2>
        <div className="grid grid-cols-1 gap-md md:grid-cols-4">
          <div>
            <p className="mb-xs text-base font-light text-text-tertiary">{t('fields.subtotal')}</p>
            <p className="text-xl font-bold text-text-primary">{formatMoney(invoice.subtotal, invoice.currency, locale)}</p>
          </div>
          <div>
            <p className="mb-xs text-base font-light text-text-tertiary">{t('fields.taxAmount')}</p>
            <p className="text-xl font-bold text-text-primary">{formatMoney(invoice.taxAmount, invoice.currency, locale)}</p>
          </div>
          <div>
            <p className="mb-xs text-base font-light text-text-tertiary">{t('fields.paidAmount')}</p>
            <p className="text-xl font-bold text-success">{formatMoney(invoice.paidAmount, invoice.currency, locale)}</p>
          </div>
          <div>
            <p className="mb-xs text-base font-light text-text-tertiary">{t('fields.balance')}</p>
            <p className="text-xl font-bold text-primary">{formatMoney(balance, invoice.currency, locale)}</p>
          </div>
        </div>
      </section>

      <section className="mt-lg rounded border border-border bg-bg-primary shadow">
        <div className="border-b border-border p-lg">
          <h2 className="text-xl font-bold text-text-primary">{t('sections.items')}</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('columns.description')}</TableHead>
              <TableHead align="right">{t('columns.quantity')}</TableHead>
              <TableHead align="right">{t('columns.unitPrice')}</TableHead>
              <TableHead align="right">{t('columns.amount')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.lineItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{formatMoney(item.unitPrice, invoice.currency, locale)}</TableCell>
                <TableCell align="right" className="font-bold">
                  {formatMoney(item.amount, invoice.currency, locale)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <div className="mt-lg flex justify-end">
        <Button type="button">
          {t('actions.issue')}
        </Button>
      </div>
    </div>
  )
}
