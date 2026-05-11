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
  type Room,
  type RoomStatus,
  type RoomType,
} from '@/lib/types/room'

interface RoomTableProps {
  rooms: Room[]
}

type SortField = 'name' | 'type' | 'status'
type SortOrder = 'asc' | 'desc'

const statusTone: Record<RoomStatus, { backgroundColor: string; color: string }> = {
  draft: {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)'
  },
  active: {
    backgroundColor: 'var(--primary-bg)',
    color: 'var(--primary)'
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

export function RoomTable({ rooms }: RoomTableProps) {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [typeFilter, setTypeFilter] = useState<RoomType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'all'>('all')
  const [idSearch, setIdSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [accommodationSearch, setAccommodationSearch] = useState('')

  const filteredAndSortedData = useMemo(() => {
    const normalizedId = idSearch.trim().toLowerCase()
    const normalizedName = nameSearch.trim().toLowerCase()
    const normalizedAccommodation = accommodationSearch.trim().toLowerCase()

    const result = rooms.filter((room) => {
      const matchesId = !normalizedId || room.id.toLowerCase().includes(normalizedId)
      const matchesName = !normalizedName || room.name.toLowerCase().includes(normalizedName)
      const matchesAccommodation =
        !normalizedAccommodation ||
        room.accommodationName?.toLowerCase().includes(normalizedAccommodation)
      const matchesType = typeFilter === 'all' || room.type === typeFilter
      const matchesStatus = statusFilter === 'all' || room.status === statusFilter

      return matchesId && matchesName && matchesAccommodation && matchesType && matchesStatus
    })

    result.sort((firstRoom, secondRoom) => {
      const compareValue = String(firstRoom[sortField] ?? '').localeCompare(
        String(secondRoom[sortField] ?? '')
      )

      return sortOrder === 'asc' ? compareValue : -compareValue
    })

    return result
  }, [
    accommodationSearch,
    idSearch,
    nameSearch,
    rooms,
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
    <Card hover={false}>
      <Table>
        <TableHeader>
          <tr>
            <TableHead>{commonT('id')}</TableHead>
            {renderSortableHead('name', t('fields.roomName'))}
            <TableHead>{t('fields.propertyName')}</TableHead>
            {renderSortableHead('type', t('fields.type'))}
            {renderSortableHead('status', t('fields.status'))}
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
                placeholder={t('fields.roomName')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Input
                value={accommodationSearch}
                onChange={(event) => setAccommodationSearch(event.target.value)}
                placeholder={t('fields.propertyName')}
                size="small"
              />
            </TableHead>
            <TableHead>
              <Select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as RoomType | 'all')}
                size="small"
              >
                <option value="all">{commonT('all')}</option>
                {(['single', 'double', 'twin', 'suite', 'deluxe', 'family'] as RoomType[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`types.${value}`)}
                  </option>
                ))}
              </Select>
            </TableHead>
            <TableHead>
              <Select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as RoomStatus | 'all')
                }
                size="small"
              >
                <option value="all">{commonT('all')}</option>
                {(['draft', 'active', 'inactive', 'archived'] as RoomStatus[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`statuses.${value}`)}
                  </option>
                ))}
              </Select>
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filteredAndSortedData.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-light text-text-tertiary">
                {room.id}
              </TableCell>
              <TableCell>
                <Link href={`/rooms/${room.id}`} className="no-underline">
                  <span className="block font-bold text-text-primary hover:text-primary">
                    {room.name}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="font-medium text-text-secondary">
                {room.accommodationName || '-'}
              </TableCell>
              <TableCell>
                <span className="inline-flex h-control-sm items-center rounded bg-bg-tertiary px-control-px-sm py-none text-base font-medium text-text-secondary">
                  {t(`types.${room.type}`)}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className="inline-flex h-control-sm items-center rounded px-control-px-sm py-none text-base font-bold"
                  style={statusTone[room.status]}
                >
                  {t(`statuses.${room.status}`)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
