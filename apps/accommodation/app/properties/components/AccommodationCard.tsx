'use client'

import { Edit, MoreVertical, MapPin, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Accommodation, ACCOMMODATION_TYPE_LABELS } from '@/lib/types/accommodation'

interface AccommodationCardProps {
  accommodation: Accommodation
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const primaryImage = accommodation.images.find(img => img.isPrimary) || accommodation.images[0]
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/properties/${accommodation.id}`}>
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
      <div className="relative w-full h-28 bg-gray-200">
        {primaryImage && !imageError ? (
          <Image
            src={primaryImage.url}
            alt={accommodation.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            <ImageIcon className="w-6 h-6 mb-1" style={{ color: 'var(--text-tertiary)' }} />
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {imageError ? '이미지를 불러올 수 없습니다' : '이미지 없음'}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div
          className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-xs"
          style={{
            backgroundColor: accommodation.status === 'active' ? 'var(--primary)' : 'var(--text-tertiary)',
            color: '#ffffff',
            fontWeight: 'var(--font-medium)'
          }}
        >
          {accommodation.status === 'active' ? '운영중' : '중지'}
        </div>
      </div>

      {/* Content */}
      <div className="p-2">
        {/* Type Badge */}
        <div
          className="inline-block px-1.5 py-0.5 rounded text-xs mb-1"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          {ACCOMMODATION_TYPE_LABELS[accommodation.type]}
        </div>

        {/* Name */}
        <h3
          className="text-sm mb-1 truncate"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          {accommodation.name}
        </h3>

        {/* Address */}
        <div className="flex items-center gap-2 mb-1.5">
          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
          <p
            className="text-xs truncate"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {accommodation.address}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span>{accommodation.amenities.length}개 편의시설</span>
          <span>•</span>
          <span>{accommodation.images.length}장 사진</span>
        </div>
      </div>
    </div>
    </Link>
  )
}
