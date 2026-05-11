'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type RoomImage } from '@/lib/types/room'
import { Button, Card } from '@creami/ui'

interface ImageGalleryProps {
  images: RoomImage[]
  roomName: string
}

export function ImageGallery({ images, roomName }: ImageGalleryProps) {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  if (images.length === 0) {
    return (
      <Card hover={false} className="flex aspect-[8/1] flex-col items-center justify-center bg-bg-tertiary">
        <ImageIcon className="mb-sm h-3xl w-3xl text-text-tertiary" />
        <span className="text-base font-light text-text-tertiary">
          {t('empty.images')}
        </span>
      </Card>
    )
  }

  const currentImage = images[activeIndex] ?? images[0]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setImageError(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setImageError(false)
  }

  return (
    <Card hover={false}>
      <div className="relative aspect-[8/1] w-full bg-bg-tertiary">
        {!imageError ? (
          <Image
            src={currentImage.url}
            alt={commonT('imageAlt', { name: roomName, index: activeIndex + 1 })}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-bg-tertiary">
            <ImageIcon className="mb-sm h-3xl w-3xl text-text-tertiary" />
            <span className="text-base font-light text-text-tertiary">
              {t('image.loadFailed')}
            </span>
          </div>
        )}

        {currentImage.isPrimary && (
          <div className="absolute left-sm top-sm inline-flex h-control-sm items-center rounded bg-primary px-control-px-sm text-base font-bold text-white">
            {t('image.main')}
          </div>
        )}

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="small"
              iconOnly
              onClick={handlePrevious}
              className="absolute left-sm top-1/2 -translate-y-1/2"
              aria-label={t('image.previous')}
            >
              <ChevronLeft className="h-icon-md w-icon-md" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              iconOnly
              onClick={handleNext}
              className="absolute right-sm top-1/2 -translate-y-1/2"
              aria-label={t('image.next')}
            >
              <ChevronRight className="h-icon-md w-icon-md" />
            </Button>
          </>
        )}

        <div className="absolute bottom-sm right-sm inline-flex h-control-sm items-center rounded bg-bg-primary px-control-px-sm text-base font-medium text-text-primary shadow">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </Card>
  )
}
