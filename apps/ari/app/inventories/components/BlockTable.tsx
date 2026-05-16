'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Block } from '@/lib/types/block'
import { Edit } from 'lucide-react'

interface BlockTableProps {
  blocks: Block[]
}

export function BlockTable({ blocks }: BlockTableProps) {
  const t = useTranslations()
  const locale = useLocale()
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--primary)'
      case 'released':
        return 'var(--info)'
      case 'cancelled':
        return 'var(--error)'
      case 'expired':
        return 'var(--text-tertiary)'
      default:
        return 'var(--text-tertiary)'
    }
  }

  const getUtilizationPercentage = (block: Block) => {
    if (block.totalRooms === 0) return 0
    return Math.round((block.bookedRooms / block.totalRooms) * 100)
  }

  return (
    <div
      className="rounded overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: 'var(--border)'
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <th
                className="px-md py-md text-left text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.status')}
              </th>
              <th
                className="px-md py-md text-left text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.code')}
              </th>
              <th
                className="px-md py-md text-left text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.name')}
              </th>
              <th
                className="px-md py-md text-left text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.type')}
              </th>
              <th
                className="px-md py-md text-left text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.organization')}
              </th>
              <th
                className="px-md py-md text-center text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.roomStatus')}
              </th>
              <th
                className="px-md py-md text-center text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.utilization')}
              </th>
              <th
                className="px-md py-md text-left text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.period')}
              </th>
              <th
                className="px-md py-md text-center text-base"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: 'var(--border)'
                }}
              >
                {t('ari.inventories.table.manage')}
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => {
              const utilizationPercentage = getUtilizationPercentage(block)

              return (
                <tr
                  key={block.id}
                  className="hover:bg-opacity-50"
                  style={{
                    borderBottom: 'var(--border)'
                  }}
                >
                  <td className="px-md py-md">
                    <span
                      className="inline-block px-sm py-xs rounded text-xs"
                      style={{
                        backgroundColor: getStatusColor(block.status),
                        color: 'var(--text-on-primary)',
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      {t(`ari.inventories.block.status.${block.status}`)}
                    </span>
                  </td>
                  <td
                    className="px-md py-md text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {block.code}
                  </td>
                  <td
                    className="px-md py-md text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {block.name}
                  </td>
                  <td
                    className="px-md py-md text-base"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {t(`ari.inventories.block.types.${block.type}`)}
                  </td>
                  <td
                    className="px-md py-md text-base"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {block.organization || '-'}
                  </td>
                  <td
                    className="px-md py-md text-base text-center"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {block.bookedRooms} / {block.totalRooms}
                  </td>
                  <td className="px-md py-md">
                    <div className="flex items-center justify-center gap-sm">
                      <div
                        className="w-3xl h-xs rounded overflow-hidden"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)'
                        }}
                      >
                        <div
                          className="h-full"
                          style={{
                            width: `${utilizationPercentage}%`,
                            backgroundColor: 'var(--primary)'
                          }}
                        />
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          color: 'var(--text-secondary)',
                          fontWeight: 'var(--font-medium)',
                          minWidth: 'var(--touch-target-min-width)'
                        }}
                      >
                        {utilizationPercentage}%
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-md py-md text-base"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {formatDate(block.startDate)} ~ {formatDate(block.endDate)}
                  </td>
                  <td className="px-md py-md text-center">
                    <Link href={`/inventories/${block.id}`}>
                      <button
                        className="inline-flex items-center justify-center p-sm rounded transition-colors"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)'
                        }}
                        title={t('ari.common.edit')}
                      >
                        <Edit className="w-md h-md" />
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
