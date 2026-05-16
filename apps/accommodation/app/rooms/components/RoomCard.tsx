'use client'

import { Room } from '@/lib/types/room'
import { Users, Maximize2, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const primaryImage = room.images.find(img => img.isPrimary) || room.images[0]
  const [imageError, setImageError] = useState(false)
  const standardOccupancy =
    room.standardOccupancy ?? room.standardOccupancyAdult + room.standardOccupancyChild
  const maxOccupancy =
    room.maxOccupancy ?? (room.maxOccupancyAdult ?? 0) + (room.maxOccupancyChild ?? 0)
  const statusColor =
    room.status === 'active'
      ? 'var(--primary)'
      : 'var(--text-tertiary)'

  return (
    <Link href={`/rooms/${room.id}`}>
      <div
        className="rounded overflow-hidden transition-all hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: 'var(--border)'
        }}
      >
        {/* Image */}
        <div className="relative w-full h-32 bg-gray-200">
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
              <ImageIcon className="w-lg h-lg mb-xs" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {imageError ? t('image.loadFailed') : t('image.none')}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div
            className="absolute top-2 right-2 px-xs py-xs rounded text-xs"
            style={{
              backgroundColor: statusColor,
              color: 'var(--text-on-primary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`statuses.${room.status}`)}
          </div>
        </div>

        {/* Content */}
        <div className="p-sm">
          {/* Type Badge */}
          <div
            className="inline-block px-xs py-xs rounded text-xs mb-xs"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {t(`types.${room.type}`)}
          </div>

          {/* Name */}
          <h3
            className="text-base mb-xs truncate"
            style={{
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)'
            }}
          >
            {room.name}
          </h3>

          {/* Accommodation Name */}
          <p
            className="text-xs mb-xs truncate"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {room.accommodationName}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-sm text-xs" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center gap-xs">
              <Maximize2 className="w-md h-md" />
              <span>{room.size}{t(`units.${room.sizeUnit}`)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-xs">
              <Users className="w-md h-md" />
              <span>
                {commonT('guest', { count: standardOccupancy })}-
                {commonT('guest', { count: maxOccupancy })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
