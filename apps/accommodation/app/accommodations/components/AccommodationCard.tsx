import { Edit, MoreVertical, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Accommodation, ACCOMMODATION_TYPE_LABELS } from '@/lib/types/accommodation'

interface AccommodationCardProps {
  accommodation: Accommodation
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const primaryImage = accommodation.images.find(img => img.isPrimary) || accommodation.images[0]

  return (
    <div
      className="rounded-lg overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)'
      }}
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={accommodation.name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            <span style={{ color: 'var(--text-tertiary)' }}>No Image</span>
          </div>
        )}

        {/* Status Badge */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded text-xs"
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
          {ACCOMMODATION_TYPE_LABELS[accommodation.type]}
        </div>

        {/* Name */}
        <h3
          className="text-lg mb-2 truncate"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          {accommodation.name}
        </h3>

        {/* Address */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
          <p
            className="text-sm truncate"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-light)'
            }}
          >
            {accommodation.address}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span>{accommodation.amenities.length}개 편의시설</span>
          <span>•</span>
          <span>{accommodation.images.length}장 사진</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/accommodations/${accommodation.id}/edit`} className="flex-1">
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <Edit className="w-4 h-4" />
              수정
            </button>
          </Link>
          <button
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
