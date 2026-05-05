'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { RoomImage } from '@/lib/types/room'

interface ImageGalleryProps {
  images: RoomImage[]
  roomName: string
}

export function ImageGallery({ images, roomName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  if (images.length === 0) {
    return (
      <div
        className="w-full flex flex-col items-center justify-center rounded-lg"
        style={{
          height: '250px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-color)'
        }}
      >
        <ImageIcon className="w-12 h-12 mb-2" style={{ color: 'var(--text-tertiary)' }} />
        <span className="text-sm" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
          등록된 이미지가 없습니다
        </span>
      </div>
    )
  }

  const currentImage = images[activeIndex]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setImageError(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setImageError(false)
  }

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow)'
      }}
    >
      {/* Main Image Display */}
      <div className="relative w-full" style={{ height: '250px', backgroundColor: 'var(--bg-tertiary)' }}>
        {!imageError ? (
          <Image
            src={currentImage.url}
            alt={`${roomName} - 이미지 ${activeIndex + 1}`}
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
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              이미지를 불러올 수 없습니다
            </span>
          </div>
        )}

        {/* Image Type Badge - Top Left */}
        {currentImage.isPrimary && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              fontWeight: 'var(--font-bold)'
            }}
          >
            메인
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-opacity hover:opacity-100"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                opacity: 0.7
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-opacity hover:opacity-100"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                opacity: 0.7
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#ffffff',
            fontWeight: 'var(--font-medium)'
          }}
        >
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div
          className="p-2 overflow-x-auto"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          <div className="flex gap-1.5">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  setActiveIndex(index)
                  setImageError(false)
                }}
                className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all"
                style={{
                  width: '60px',
                  height: '40px',
                  border: activeIndex === index ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  opacity: activeIndex === index ? 1 : 0.6
                }}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {/* 메인 이미지 표시 */}
                {image.isPrimary && (
                  <div
                    className="absolute top-0 left-0 px-1 text-xs"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      fontWeight: 'var(--font-bold)',
                      fontSize: '9px',
                      borderBottomRightRadius: 'var(--radius-sm)'
                    }}
                  >
                    메인
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
