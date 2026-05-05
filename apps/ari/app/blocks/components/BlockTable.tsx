'use client'

import Link from 'next/link'
import { Block, BLOCK_TYPE_LABELS, BLOCK_STATUS_LABELS } from '@/lib/types/block'
import { Edit } from 'lucide-react'

interface BlockTableProps {
  blocks: Block[]
}

export function BlockTable({ blocks }: BlockTableProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
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
        return '#60a5fa'
      case 'cancelled':
        return '#ef4444'
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
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)'
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                상태
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                블럭 코드
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                블럭명
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                타입
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                단체명
              </th>
              <th
                className="px-4 py-3 text-center text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                객실 현황
              </th>
              <th
                className="px-4 py-3 text-center text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                사용률
              </th>
              <th
                className="px-4 py-3 text-left text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                기간
              </th>
              <th
                className="px-4 py-3 text-center text-sm"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                관리
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
                    borderBottom: '1px solid var(--border-color)'
                  }}
                >
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: getStatusColor(block.status),
                        color: '#ffffff',
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      {BLOCK_STATUS_LABELS[block.status]}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {block.code}
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {block.name}
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {BLOCK_TYPE_LABELS[block.type]}
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {block.organization || '-'}
                  </td>
                  <td
                    className="px-4 py-3 text-sm text-center"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {block.bookedRooms} / {block.totalRooms}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="w-20 h-2 rounded-full overflow-hidden"
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
                          minWidth: '35px'
                        }}
                      >
                        {utilizationPercentage}%
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)'
                    }}
                  >
                    {formatDate(block.startDate)} ~ {formatDate(block.endDate)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/blocks/${block.id}`}>
                      <button
                        className="inline-flex items-center justify-center p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)'
                        }}
                        title="편집"
                      >
                        <Edit className="w-4 h-4" />
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