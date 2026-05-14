'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Card,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@creami/ui'
import {
  type RatePlan,
  type RatePlanStatus,
  type RatePlanType
} from '@/lib/types/rateplan'

interface RatePlanTableViewProps {
  ratePlans: RatePlan[]
  filters: RatePlanTableFilters
  onFiltersChange: (filters: RatePlanTableFilters) => void
  isFetching?: boolean
  className?: string
}

export type RatePlanTableFilters = {
  ratePlanId: string
  name: string
  enName: string
  status: RatePlanStatus | 'all'
  benefitName: string
  ratePlanType: RatePlanType | 'all'
}

type SortField = 'name' | 'enName' | 'status' | 'benefitName' | 'ratePlanType' | 'priceType'
type SortOrder = 'asc' | 'desc'

const statusToneClass: Record<RatePlanStatus, string> = {
  active: 'bg-primary-bg text-primary',
  draft: 'bg-bg-tertiary text-text-secondary',
  inactive: 'bg-warning-bg text-warning',
  archived: 'bg-error-bg text-error'
}

export function RatePlanTableView({
  ratePlans,
  filters,
  onFiltersChange,
  isFetching = false,
  className
}: RatePlanTableViewProps) {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const sortedData = useMemo(() => {
    const result = [...ratePlans]

    result.sort((firstRatePlan, secondRatePlan) => {
      const compareValue = String(firstRatePlan[sortField] ?? '').localeCompare(
        String(secondRatePlan[sortField] ?? '')
      )

      return sortOrder === 'asc' ? compareValue : -compareValue
    })

    return result
  }, [ratePlans, sortField, sortOrder])

  const updateFilter = <Key extends keyof RatePlanTableFilters>(
    key: Key,
    value: RatePlanTableFilters[Key]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortField(field)
    setSortOrder('asc')
  }

  const renderSortableHead = (
    field: SortField,
    label: ReactNode,
    className?: string
  ) => (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => handleSort(field)}
        className="flex cursor-pointer items-center gap-xs border-none bg-transparent p-none text-base font-bold text-text-primary"
      >
        {label}
        <ArrowUpDown
          className={`h-icon-md w-icon-md ${
            sortField === field ? 'text-primary' : 'text-text-tertiary'
          }`}
        />
      </button>
    </TableHead>
  )

  return (
    <Card hover={false} className={className}>
      <Table>
        <TableHeader>
          <tr>
            <TableHead className="w-rateplan-col-id min-w-rateplan-col-id">
              {commonT('id')}
            </TableHead>
            {renderSortableHead('name', t('fields.name'))}
            {renderSortableHead('enName', t('fields.enName'))}
            {renderSortableHead('status', t('fields.status'))}
            {renderSortableHead('benefitName', t('fields.benefitName'))}
            {renderSortableHead(
              'ratePlanType',
              t('fields.type'),
              'w-rateplan-col-type min-w-rateplan-col-type max-w-rateplan-col-type'
            )}
            {renderSortableHead('priceType', t('fields.priceType'))}
          </tr>
          <tr className="bg-bg-primary">
            <TableHead className="w-rateplan-col-id min-w-rateplan-col-id">
              <Input
                value={filters.ratePlanId}
                onChange={(event) => updateFilter('ratePlanId', event.target.value)}
                placeholder="ID"
                size="small"
              />
            </TableHead>
            <TableHead>
              <Input
                value={filters.name}
                onChange={(event) => updateFilter('name', event.target.value)}
                placeholder={t('fields.name')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Input
                value={filters.enName}
                onChange={(event) => updateFilter('enName', event.target.value)}
                placeholder={t('fields.enName')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Select
                value={filters.status}
                onChange={(event) =>
                  updateFilter('status', event.target.value as RatePlanStatus | 'all')
                }
                size="small"
              >
                <option value="all">{commonT('all')}</option>
                {(['draft', 'active', 'inactive', 'archived'] as RatePlanStatus[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`statuses.${value}`)}
                  </option>
                ))}
              </Select>
            </TableHead>
            <TableHead>
              <Input
                value={filters.benefitName}
                onChange={(event) => updateFilter('benefitName', event.target.value)}
                placeholder={t('fields.benefitName')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Select
                value={filters.ratePlanType}
                onChange={(event) =>
                  updateFilter('ratePlanType', event.target.value as RatePlanType | 'all')
                }
                size="small"
              >
                <option value="all">{commonT('all')}</option>
                {(['standalone', 'package', 'business', 'opaque', 'b2b'] as RatePlanType[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`types.${value}`)}
                  </option>
                ))}
              </Select>
            </TableHead>
            <TableHead>
              {''}
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((ratePlan) => (
              <TableRow key={ratePlan.id}>
                <TableCell className="w-rateplan-col-id min-w-rateplan-col-id max-w-rateplan-col-id font-light text-text-tertiary">
                  {ratePlan.id}
                </TableCell>
                <TableCell>
                  <Link href={`/rateplans/${ratePlan.id}`} className="no-underline">
                    <span className="block font-bold text-text-primary hover:text-primary">
                      {ratePlan.name}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{ratePlan.enName || '-'}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex h-control-sm items-center rounded px-control-px-sm py-none text-base font-bold ${statusToneClass[ratePlan.status]}`}
                  >
                    {t(`statuses.${ratePlan.status}`)}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-primary">
                  {ratePlan.benefitName || '-'}
                </TableCell>
                <TableCell className="font-medium text-text-secondary">
                  {t(`types.${ratePlan.ratePlanType}`)}
                </TableCell>
                <TableCell className="w-rateplan-col-price-type min-w-rateplan-col-price-type max-w-rateplan-col-price-type font-medium text-text-secondary">
                  {t(`priceTypes.${ratePlan.priceType}`)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="py-xl text-center text-base font-light text-text-secondary">
                {isFetching ? commonT('loading') : commonT('noSearchResults')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
