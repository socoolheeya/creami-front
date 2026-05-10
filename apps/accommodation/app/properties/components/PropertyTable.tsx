'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpDown } from 'lucide-react'
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
  Property,
  PROPERTY_TYPE_LABELS,
  type PropertyStatus,
  type PropertyType
} from '@/lib/types/property'

interface PropertyTableProps {
  properties: Property[]
}

type SortField = 'name' | 'type' | 'status' | 'countryCode' | 'city' | 'createdAt'
type SortOrder = 'asc' | 'desc'

const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  draft: 'DRAFT',
  active: 'ACTIVE',
  inactive: 'INACTIVE',
  archived: 'ARCHIVED'
}

const createdDateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

export function PropertyTable({ properties }: PropertyTableProps) {
  const router = useRouter()
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [idSearch, setIdSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<PropertyType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all')
  const [countrySearch, setCountrySearch] = useState('')
  const [citySearch, setCitySearch] = useState('')

  const filteredAndSortedData = useMemo(() => {
    const normalizedId = idSearch.trim().toLowerCase()
    const normalizedName = nameSearch.trim().toLowerCase()
    const normalizedCountry = countrySearch.trim().toLowerCase()
    const normalizedCity = citySearch.trim().toLowerCase()

    const result = properties.filter((property) => {
      const matchesId = !normalizedId || property.id.toLowerCase().includes(normalizedId)
      const matchesName = !normalizedName || property.name.toLowerCase().includes(normalizedName)
      const matchesType = typeFilter === 'all' || property.type === typeFilter
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter
      const matchesCountry =
        !normalizedCountry || property.countryCode?.toLowerCase().includes(normalizedCountry)
      const matchesCity = !normalizedCity || property.city?.toLowerCase().includes(normalizedCity)

      return matchesId && matchesName && matchesType && matchesStatus && matchesCountry && matchesCity
    })

    result.sort((firstProperty, secondProperty) => {
      const compareValue =
        sortField === 'createdAt'
          ? firstProperty.createdAt.getTime() - secondProperty.createdAt.getTime()
          : String(firstProperty[sortField] ?? '').localeCompare(
              String(secondProperty[sortField] ?? '')
            )
      return sortOrder === 'asc' ? compareValue : -compareValue
    })

    return result
  }, [
    citySearch,
    countrySearch,
    idSearch,
    nameSearch,
    properties,
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

  const renderSortableHead = (field: SortField, label: string) => (
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
    <Card hover={false}>
      <Table>
        <TableHeader>
          <tr>
            <TableHead>ID</TableHead>
            {renderSortableHead('name', '숙소명')}
            {renderSortableHead('type', '유형')}
            {renderSortableHead('status', '상태')}
            {renderSortableHead('countryCode', '국가')}
            {renderSortableHead('city', '도시')}
            {renderSortableHead('createdAt', '생성일')}
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
                placeholder="숙소명"
                size="small"
              />
            </TableHead>
            <TableHead>
              <Select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as PropertyType | 'all')}
                size="small"
              >
                <option value="all">전체</option>
                {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </TableHead>
            <TableHead>
              <Select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as PropertyStatus | 'all')
                }
                size="small"
              >
                <option value="all">전체</option>
                {Object.entries(PROPERTY_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </TableHead>
            <TableHead>
              <Input
                value={countrySearch}
                onChange={(event) => setCountrySearch(event.target.value)}
                placeholder="국가"
                size="small"
              />
            </TableHead>
            <TableHead>
              <Input
                value={citySearch}
                onChange={(event) => setCitySearch(event.target.value)}
                placeholder="도시"
                size="small"
              />
            </TableHead>
            <TableHead>{''}</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filteredAndSortedData.map((property) => (
            <TableRow
              key={property.id}
              onClick={() => router.push(`/properties/${property.id}`)}
            >
              <TableCell className="font-light text-text-tertiary">
                {property.id}
              </TableCell>
              <TableCell>
                <span className="font-bold text-text-primary">
                  {property.name}
                </span>
              </TableCell>
              <TableCell className="font-medium text-text-secondary">
                {PROPERTY_TYPE_LABELS[property.type] ?? property.type}
              </TableCell>
              <TableCell>
                <span className="inline-flex h-control-sm items-center rounded bg-primary-bg px-control-px-sm py-none text-base font-bold text-primary">
                  {PROPERTY_STATUS_LABELS[property.status] ?? property.status}
                </span>
              </TableCell>
              <TableCell className="font-medium text-text-secondary">
                {property.countryCode || '-'}
              </TableCell>
              <TableCell className="font-medium text-text-secondary">
                {property.city || '-'}
              </TableCell>
              <TableCell className="font-light text-text-secondary">
                {createdDateFormatter.format(property.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
