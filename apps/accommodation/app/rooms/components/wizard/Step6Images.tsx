import { type RoomFormData, type RoomImage } from '@/lib/types/room'
import { Image as ImageIcon, Plus, Star, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button, Card, Input } from '@creami/ui'

interface Step6ImagesProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step6Images({ formData, onChange }: Step6ImagesProps) {
  const t = useTranslations('accommodation.rooms')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const images = formData.images || []

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObject = new URL(url)
      return urlObject.protocol === 'http:' || urlObject.protocol === 'https:'
    } catch {
      return false
    }
  }

  const addImage = () => {
    const trimmedUrl = imageUrl.trim()

    if (!trimmedUrl) {
      setError(t('image.urlRequired'))
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      setError(t('image.invalidUrl'))
      return
    }

    if (images.length >= 10) {
      setError(t('image.maxError'))
      return
    }

    const newImage: RoomImage = {
      id: Date.now().toString(),
      url: trimmedUrl,
      isPrimary: images.length === 0,
      order: images.length
    }

    onChange({ images: [...images, newImage] })
    setImageUrl('')
    setError('')
  }

  const removeImage = (id: string) => {
    const filtered = images.filter((image) => image.id !== id)

    if (filtered.length > 0 && !filtered.some((image) => image.isPrimary)) {
      filtered[0] = { ...filtered[0], isPrimary: true }
    }

    onChange({ images: filtered })
  }

  const setPrimary = (id: string) => {
    onChange({
      images: images.map((image) => ({
        ...image,
        isPrimary: image.id === id
      }))
    })
  }

  const handleImageError = (imageId: string) => {
    setFailedImages((prev) => new Set(prev).add(imageId))
  }

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="mb-xs text-xl font-bold text-text-primary">
          {t('sections.images')}
        </h2>
        <p className="text-base font-light text-text-secondary">
          {t('descriptions.images')}
        </p>
      </div>

      <div>
        <p className="mb-xs text-base font-medium text-text-primary">
          {t('fields.imageUrl')}
        </p>
        <div className="flex gap-sm">
          <Input
            type="url"
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value)
              if (error) {
                setError('')
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addImage()
              }
            }}
            placeholder="https://example.com/image.jpg"
          />
          <Button type="button" iconOnly onClick={addImage} aria-label={t('actions.addImage')}>
            <Plus className="h-icon-md w-icon-md" />
          </Button>
        </div>
        <p className={`mt-xs text-base font-light ${error ? 'text-primary' : 'text-text-secondary'}`}>
          {error || t('image.maxHelp')}
        </p>
      </div>

      {images.length > 0 ? (
        <div>
          <p className="mb-sm text-base font-medium text-text-primary">
            {t('image.registered', { count: images.length })}
          </p>
          <div className="grid grid-cols-1 gap-md md:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <Card
                key={image.id}
                hover={false}
                className={`relative ${image.isPrimary ? 'border-primary' : ''}`}
              >
                <div className="relative aspect-video bg-bg-tertiary">
                  {failedImages.has(image.id) ? (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <ImageIcon className="mb-xs h-2xl w-2xl text-text-tertiary" />
                      <p className="px-sm text-center text-base font-light text-text-tertiary">
                        {t('image.loadFailed')}
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={image.url}
                      alt={t('image.alt')}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(image.id)}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between gap-sm p-sm">
                  <Button
                    type="button"
                    variant={image.isPrimary ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => setPrimary(image.id)}
                  >
                    <Star className="h-icon-md w-icon-md" />
                    {image.isPrimary ? t('actions.primary') : t('actions.setPrimary')}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    iconOnly
                    onClick={() => removeImage(image.id)}
                    aria-label={t('actions.deleteImage')}
                  >
                    <X className="h-icon-md w-icon-md" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card hover={false} className="flex flex-col items-center justify-center border-dashed py-2xl">
          <ImageIcon className="mb-md h-3xl w-3xl text-text-tertiary" />
          <p className="text-base font-light text-text-secondary">
            {t('empty.imagesYet')}
          </p>
        </Card>
      )}
    </div>
  )
}
