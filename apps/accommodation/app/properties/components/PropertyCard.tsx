'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ImageIcon, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Card } from '@creami/ui'
import { Property, PROPERTY_TYPE_LABELS } from '@/lib/types/property'

interface AccommodationCardProps {
  accommodation: Property
}

export function PropertyCard({ accommodation }: AccommodationCardProps) {
  const primaryImage = accommodation.images.find(img => img.isPrimary) || accommodation.images[0]
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/properties/${accommodation.id}`} className="block min-w-0 no-underline">
      <Card className="h-full" hover>
        <div className="relative h-modal-action w-full bg-bg-tertiary">
          {primaryImage && !imageError ? (
            <Image
              src={primaryImage.url}
              alt={accommodation.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-xs text-text-tertiary">
              <ImageIcon className="h-icon-lg w-icon-lg" />
              <span className="text-base font-light">
                {imageError ? '이미지를 불러올 수 없습니다' : '이미지 없음'}
              </span>
            </div>
          )}

          <div className="absolute right-sm top-sm rounded bg-primary px-control-px-sm py-xs text-base font-bold text-white">
            {accommodation.status === 'active' ? '운영중' : '중지'}
          </div>
        </div>

        <div className="grid gap-sm p-md">
          <div className="w-fit rounded bg-bg-tertiary px-control-px-sm py-xs text-base font-medium text-text-secondary">
            {PROPERTY_TYPE_LABELS[accommodation.type] ?? accommodation.type}
          </div>

          <h3 className="truncate text-lg font-bold text-text-primary">
            {accommodation.name}
          </h3>

          <div className="flex min-w-0 items-center gap-sm">
            <MapPin className="h-icon-md w-icon-md shrink-0 text-text-tertiary" />
            <p className="truncate text-base font-light text-text-secondary">
              {accommodation.address || '-'}
            </p>
          </div>

          <div className="flex items-center gap-sm text-base font-light text-text-tertiary">
            <span>{accommodation.amenities.length}개 편의시설</span>
            <span>·</span>
            <span>{accommodation.images.length}장 사진</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
