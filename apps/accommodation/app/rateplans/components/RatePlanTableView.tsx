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
  type MealPlan,
  type PriceType,
  type RatePlan,
  type RatePlanStatus,
  type RatePlanType
} from '@/lib/types/rateplan'

interface RatePlanTableViewProps {
  ratePlans: RatePlan[]
  className?: string
}

type SortField = 'name' | 'status' | 'benefitName' | 'ratePlanType' | 'priceType' | 'mealPlan'
type SortOrder = 'asc' | 'desc'

const statusTone: Record<RatePlanStatus, { backgroundColor: string; color: string }> = {
  active: {
    backgroundColor: 'var(--primary-bg)',
    color: 'var(--primary)'
  },
  draft: {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)'
  },
  inactive: {
    backgroundColor: 'var(--warning-bg)',
    color: 'var(--warning)'
  },
  archived: {
    backgroundColor: 'var(--error-bg)',
    color: 'var(--error)'
  }
}

export function RatePlanTableView({ ratePlans, className }: RatePlanTableViewProps) {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [idSearch, setIdSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RatePlanStatus | 'all'>('all')
  const [benefitSearch, setBenefitSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<RatePlanType | 'all'>('all')
  const [priceTypeFilter, setPriceTypeFilter] = useState<PriceType | 'all'>('all')
  const [mealPlanFilter, setMealPlanFilter] = useState<MealPlan | 'all'>('all')

  const filteredAndSortedData = useMemo(() => {
    const normalizedId = idSearch.trim().toLowerCase()
    const normalizedName = nameSearch.trim().toLowerCase()
    const normalizedBenefit = benefitSearch.trim().toLowerCase()

    const result = ratePlans.filter((ratePlan) => {
      const matchesId = !normalizedId || ratePlan.id.toLowerCase().includes(normalizedId)
      const matchesName = !normalizedName || ratePlan.name.toLowerCase().includes(normalizedName)
      const matchesStatus = statusFilter === 'all' || ratePlan.status === statusFilter
      const matchesBenefit =
        !normalizedBenefit || ratePlan.benefitName.toLowerCase().includes(normalizedBenefit)
      const matchesType = typeFilter === 'all' || ratePlan.ratePlanType === typeFilter
      const matchesPriceType =
        priceTypeFilter === 'all' || ratePlan.priceType === priceTypeFilter
      const matchesMealPlan = mealPlanFilter === 'all' || ratePlan.mealPlan === mealPlanFilter

      return (
        matchesId &&
        matchesName &&
        matchesStatus &&
        matchesBenefit &&
        matchesType &&
        matchesPriceType &&
        matchesMealPlan
      )
    })

    result.sort((firstRatePlan, secondRatePlan) => {
      const compareValue = String(firstRatePlan[sortField] ?? '').localeCompare(
        String(secondRatePlan[sortField] ?? '')
      )

      return sortOrder === 'asc' ? compareValue : -compareValue
    })

    return result
  }, [
    benefitSearch,
    idSearch,
    mealPlanFilter,
    nameSearch,
    priceTypeFilter,
    ratePlans,
    sortField,
    sortOrder,
    statusFilter,
    typeFilter
  ])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortField(field)
    setSortOrder('asc')
  }

  const renderSortableHead = (field: SortField, label: ReactNode) => (
    <TableHead>
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
            <TableHead>{commonT('id')}</TableHead>
            {renderSortableHead('name', t('fields.name'))}
            {renderSortableHead('status', t('fields.status'))}
            {renderSortableHead('benefitName', t('fields.benefitName'))}
            {renderSortableHead('ratePlanType', t('fields.type'))}
            {renderSortableHead('priceType', t('fields.priceType'))}
            {renderSortableHead('mealPlan', t('fields.mealPlan'))}
          </tr>
          <tr className="bg-bg-primary">
            <TableHead>
              <Input
                value={idSearch}
                onChange={(event) => setIdSearch(event.target.value)}
                placeholder="ID"
                size="small"
              />
            </TableHead>
            <TableHead>
              <Input
                value={nameSearch}
                onChange={(event) => setNameSearch(event.target.value)}
                placeholder={t('fields.name')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as RatePlanStatus | 'all')
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
                value={benefitSearch}
                onChange={(event) => setBenefitSearch(event.target.value)}
                placeholder={t('fields.benefitName')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value as RatePlanType | 'all')
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
              <Select
                value={priceTypeFilter}
                onChange={(event) =>
                  setPriceTypeFilter(event.target.value as PriceType | 'all')
                }
                size="small"
              >
                <option value="all">{commonT('all')}</option>
                {(['net_rate', 'sell_rate_no_commission', 'commission_included', 'net_and_sell'] as PriceType[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`priceTypes.${value}`)}
                  </option>
                ))}
              </Select>
            </TableHead>
            <TableHead>
              <Select
                value={mealPlanFilter}
                onChange={(event) =>
                  setMealPlanFilter(event.target.value as MealPlan | 'all')
                }
                size="small"
              >
                <option value="all">{commonT('all')}</option>
                {(['none', 'breakfast', 'lunch', 'dinner', 'all_inclusive', 'breakfast_and_lunch', 'lunch_and_dinner', 'bed_and_breakfast', 'buffet_breakfast'] as MealPlan[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`mealPlans.${value}`)}
                  </option>
                ))}
              </Select>
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filteredAndSortedData.map((ratePlan) => (
            <TableRow key={ratePlan.id}>
              <TableCell className="font-light text-text-tertiary">
                {ratePlan.id}
              </TableCell>
              <TableCell>
                <Link href={`/rateplans/${ratePlan.id}`} className="no-underline">
                  <span className="block font-bold text-text-primary hover:text-primary">
                    {ratePlan.name}
                  </span>
                  {ratePlan.enName && (
                    <span className="block text-base font-light text-text-tertiary">
                      {ratePlan.enName}
                    </span>
                  )}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className="inline-flex h-control-sm items-center rounded px-control-px-sm py-none text-base font-bold"
                  style={statusTone[ratePlan.status]}
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
              <TableCell className="font-medium text-text-secondary">
                {t(`priceTypes.${ratePlan.priceType}`)}
              </TableCell>
              <TableCell className="font-medium text-text-secondary">
                {t(`mealPlans.${ratePlan.mealPlan}`)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
