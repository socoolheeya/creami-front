'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { CircleDollarSign, FileText, Plus, ReceiptText } from 'lucide-react'
import {
  ErrorTemplate,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@creami/ui'
import { fetchInvoices, formatDate, formatMoney, invoiceStatuses, type Invoice, type InvoiceStatus } from '@/lib/invoices'

type StatusFilter = 'all' | InvoiceStatus

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

export default function InvoicesPage() {
  const t = useTranslations('invoice')
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadInvoices = useCallback(async (isActive: () => boolean = () => true) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const nextInvoices = await fetchInvoices()
      if (isActive()) {
        setInvoiceList(nextInvoices)
      }
    } catch {
      if (isActive()) {
        setErrorMessage(t('errorDescription'))
      }
    } finally {
      if (isActive()) {
        setIsLoading(false)
      }
    }
  }, [t])

  useEffect(() => {
    let active = true

    void Promise.resolve().then(() => loadInvoices(() => active))

    return () => {
      active = false
    }
  }, [loadInvoices])

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return invoiceList.filter((invoice) => {
      const matchesStatus = status === 'all' || invoice.status === status
      const matchesQuery =
        !normalizedQuery ||
        [invoice.id, invoice.propertyName, invoice.recipientName, invoice.recipientEmail]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [invoiceList, query, status])

  const summary = useMemo(() => {
    return invoiceList.reduce(
      (acc, invoice) => {
        acc.total += invoice.totalAmount
        acc.unpaid += invoice.totalAmount - invoice.paidAmount
        acc.issued += invoice.status === 'issued' ? 1 : 0
        acc.overdue += invoice.status === 'overdue' ? 1 : 0

        return acc
      },
      { total: 0, unpaid: 0, issued: 0, overdue: 0 }
    )
  }, [invoiceList])

  const showInitialLoading = isLoading && invoiceList.length === 0 && !errorMessage

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <ReceiptText className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('description')}
          </p>
        </div>
        {!showInitialLoading && !errorMessage && (
          <Link
            href="/invoices/new"
            className="inline-flex h-control-md items-center justify-center gap-sm rounded bg-primary px-control-px-md text-base font-medium leading-none text-white no-underline"
          >
            <Plus className="h-icon-md w-icon-md" />
            {t('actions.create')}
          </Link>
        )}
      </div>

      {showInitialLoading ? (
        <div className="flex items-center justify-center py-2xl">
          <div className="text-text-secondary">{t('loading')}</div>
        </div>
      ) : errorMessage ? (
        <ErrorTemplate
          title={t('errorTitle')}
          description={errorMessage}
          retryLabel={t('retry')}
          onRetry={() => {
            void loadInvoices()
          }}
        />
      ) : (
      <>
      <div className="mb-lg grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-primary text-white">
            <FileText className="h-icon-lg w-icon-lg" />
          </div>
          <p className="mb-xs text-base font-light text-text-secondary">
            {t('summary.totalCount')}
          </p>
          <p className="text-2xl font-bold text-text-primary">{invoiceList.length}</p>
        </div>
        <div className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-primary text-white">
            <CircleDollarSign className="h-icon-lg w-icon-lg" />
          </div>
          <p className="mb-xs text-base font-light text-text-secondary">
            {t('summary.totalAmount')}
          </p>
          <p className="text-2xl font-bold text-text-primary">
            {formatMoney(summary.total, 'KRW', locale)}
          </p>
        </div>
        <div className="rounded border border-border bg-bg-primary p-lg shadow">
          <p className="mb-xs text-base font-light text-text-secondary">
            {t('summary.unpaidAmount')}
          </p>
          <p className="text-2xl font-bold text-text-primary">
            {formatMoney(summary.unpaid, 'KRW', locale)}
          </p>
          <p className="mt-sm text-base font-light text-text-tertiary">
            {t('summary.issuedCount', { count: summary.issued })}
          </p>
        </div>
        <div className="rounded border border-border bg-bg-primary p-lg shadow">
          <p className="mb-xs text-base font-light text-text-secondary">
            {t('summary.overdueCount')}
          </p>
          <p className="text-2xl font-bold text-error">{summary.overdue}</p>
          <p className="mt-sm text-base font-light text-text-tertiary">
            {t('summary.requiresAction')}
          </p>
        </div>
      </div>

      <div className="mb-md flex flex-wrap items-center justify-between gap-md">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-sm">
          <div className="min-w-filter-min flex-1">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('filters.searchPlaceholder')}
              showSearchIcon
            />
          </div>
          <div className="w-filter-select">
            <Select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
              <option value="all">{t('filters.allStatuses')}</option>
              {invoiceStatuses.map((item) => (
                <option key={item} value={item}>
                  {t(`statuses.${item}`)}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <p className="text-base font-light text-text-tertiary">
          {t('results', { count: filteredInvoices.length })}
        </p>
      </div>

      <div className="rounded border border-border bg-bg-primary shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('columns.invoiceId')}</TableHead>
              <TableHead>{t('columns.property')}</TableHead>
              <TableHead>{t('columns.recipient')}</TableHead>
              <TableHead align="right">{t('columns.totalAmount')}</TableHead>
              <TableHead>{t('columns.issueDate')}</TableHead>
              <TableHead>{t('columns.dueDate')}</TableHead>
              <TableHead>{t('columns.status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link href={`/invoices/${invoice.id}`} className="font-bold text-primary no-underline">
                    {invoice.id}
                  </Link>
                </TableCell>
                <TableCell>{invoice.propertyName}</TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text-primary">{invoice.recipientName}</p>
                    <p className="truncate font-light text-text-tertiary">{invoice.recipientEmail}</p>
                  </div>
                </TableCell>
                <TableCell align="right" className="font-bold">
                  {formatMoney(invoice.totalAmount, invoice.currency, locale)}
                </TableCell>
                <TableCell>{formatDate(invoice.issueDate, locale)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate, locale)}</TableCell>
                <TableCell>
                  <span className={`inline-flex h-control-sm items-center rounded px-control-px-sm text-base font-bold ${getStatusClass(invoice.status)}`}>
                    {t(`statuses.${invoice.status}`)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredInvoices.length === 0 && (
          <div className="p-lg text-center text-base font-light text-text-tertiary">
            {t('empty')}
          </div>
        )}
      </div>
      </>
      )}
    </div>
  )
}
