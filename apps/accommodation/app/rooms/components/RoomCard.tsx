'use client'

import { Room, ROOM_TYPE_LABELS, ROOM_STATUS_LABELS } from '@/lib/types/room'
import { Users, Maximize2, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  const primaryImage = room.images.find(img => img.isPrimary) || room.images[0]
  const [imageError, setImageError] = useState(false)
  const statusColor =
    room.status === 'available' ? 'var(--primary)' :
    room.status === 'maintenance' ? 'var(--text-tertiary)' :
    'var(--text-tertiary)'

  return (
    <Link href={`/rooms/${room.id}`}>
      <div
        className="rounded-lg overflow-hidden transition-all hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Image */}
        <div className="relative w-full h-48 bg-gray-200">
          {primaryImage && !imageError ? (
            <Image
              src={primaryImage.url}
              alt={room.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <ImageIcon className="w-12 h-12 mb-2" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {imageError ? '이미지를 불러올 수 없습니다' : '이미지 없음'}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded text-xs"
            style={{
              backgroundColor: statusColor,
              color: '#ffffff',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {ROOM_STATUS_LABELS[room.status]}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Type Badge */}
          <div
            className="inline-block px-2 py-0.5 rounded text-xs mb-2"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {ROOM_TYPE_LABELS[room.type]}
          </div>

          {/* Name */}
          <h3
            className="text-lg mb-2 truncate"
            style={{
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)'
            }}
          >
            {room.name}
          </h3>

          {/* Accommodation Name */}
          <p
            className="text-sm mb-3 truncate"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {room.accommodationName}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center gap-1">
              <Maximize2 className="w-4 h-4" />
              <span>{room.size}{room.sizeUnit === 'sqm' ? '㎡' : '평'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{room.standardOccupancy}-{room.maxOccupancy}명</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}