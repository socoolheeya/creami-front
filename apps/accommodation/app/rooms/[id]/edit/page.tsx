'use client'

import { use } from 'react'
import { ArrowLeft, Edit } from 'lucide-react'
import Link from 'next/link'
import { mockRooms } from '@/lib/data/mock-rooms'

export default function RoomEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const room = mockRooms.find(r => r.id === id)

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          객실을 찾을 수 없습니다
        </h3>
        <Link href="/rooms">
          <button
            className="mt-4 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            목록으로 돌아가기
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href={`/rooms/${id}`}>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <Edit className="w-8 h-8" style={{ color: 'var(--primary)' }} />
            <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              객실 수정: {room.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Coming Soon Placeholder */}
      <div
        className="flex flex-col items-center justify-center py-16 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          border: '2px dashed var(--border-color)'
        }}
      >
        <Edit className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
        <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          객실 수정 기능 준비 중
        </h3>
        <p className="mb-6" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
          이 기능은 곧 구현될 예정입니다
        </p>
        <Link href={`/rooms/${id}`}>
          <button
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            상세 화면으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  )
}