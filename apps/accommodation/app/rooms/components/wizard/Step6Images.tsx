import { RoomFormData, RoomImage } from '@/lib/types/room'
import { Image as ImageIcon, Star, X, Plus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface Step6ImagesProps {
  formData: RoomFormData
  onChange: (data: Partial<RoomFormData>) => void
}

export function Step6Images({ formData, onChange }: Step6ImagesProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const addImage = () => {
    const trimmedUrl = imageUrl.trim()

    if (!trimmedUrl) {
      setError('이미지 URL을 입력해주세요')
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('올바른 URL 형식이 아닙니다 (http:// 또는 https://로 시작해야 합니다)')
      return
    }

    if ((formData.images || []).length >= 10) {
      setError('최대 10장까지만 추가할 수 있습니다')
      return
    }

    const newImage: RoomImage = {
      id: Date.now().toString(),
      url: trimmedUrl,
      isPrimary: (formData.images || []).length === 0,
      order: (formData.images || []).length
    }

    onChange({ images: [...(formData.images || []), newImage] })
    setImageUrl('')
    setError('')
  }

  const removeImage = (id: string) => {
    const filtered = (formData.images || []).filter(img => img.id !== id)
    if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
      filtered[0].isPrimary = true
    }
    onChange({ images: filtered })
  }

  const setPrimary = (id: string) => {
    const updated = (formData.images || []).map(img => ({
      ...img,
      isPrimary: img.id === id
    }))
    onChange({ images: updated })
  }

  const handleImageError = (imageId: string) => {
    setFailedImages(prev => new Set(prev).add(imageId))
  }

  return (
    <div className="space-y-4">
      <div>
        <h2
          className="text-xl mb-1"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          객실 이미지
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          객실 이미지를 추가해주세요
        </p>
      </div>

      {/* 이미지 URL 입력 */}
      <div>
        <label
          className="block mb-1.5 text-sm"
          style={{
            fontWeight: 'var(--font-medium)',
            color: 'var(--text-primary)'
          }}
        >
          이미지 URL 추가
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value)
              if (error) setError('')
            }}
            onKeyPress={(e) => e.key === 'Enter' && addImage()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: error ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <button
            type="button"
            onClick={addImage}
            className="px-3 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {error ? (
          <p className="text-xs mt-1.5" style={{ color: 'var(--primary)' }}>
            {error}
          </p>
        ) : (
          <p className="text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>
            최대 10장까지 추가할 수 있습니다
          </p>
        )}
      </div>

      {/* 이미지 그리드 */}
      {formData.images && formData.images.length > 0 ? (
        <div>
          <p
            className="text-sm mb-2"
            style={{
              fontWeight: 'var(--font-medium)',
              color: 'var(--text-primary)'
            }}
          >
            등록된 이미지 ({formData.images.length}/10)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {formData.images.map(img => (
              <div
                key={img.id}
                className="relative group rounded-lg overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  border: img.isPrimary ? '2px solid var(--primary)' : '1px solid var(--border-color)'
                }}
              >
                {/* 이미지 */}
                <div className="relative w-full h-32">
                  {failedImages.has(img.id) ? (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      <ImageIcon className="w-10 h-10 mb-1.5" style={{ color: 'var(--text-tertiary)' }} />
                      <p className="text-xs text-center px-2" style={{ color: 'var(--text-tertiary)' }}>
                        이미지를 불러올 수 없습니다
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={img.url}
                      alt="객실 이미지"
                      fill
                      className="object-cover"
                      onError={() => handleImageError(img.id)}
                    />
                  )}

                  {/* 오버레이 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2">
                    {/* 대표 이미지 설정 */}
                    <button
                      type="button"
                      onClick={() => setPrimary(img.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-opacity"
                      style={{
                        backgroundColor: img.isPrimary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.9)',
                        color: img.isPrimary ? '#ffffff' : 'var(--text-primary)'
                      }}
                      title={img.isPrimary ? '대표 이미지' : '대표로 설정'}
                    >
                      <Star className="w-4 h-4" fill={img.isPrimary ? '#ffffff' : 'none'} />
                    </button>

                    {/* 삭제 */}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-opacity"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 대표 뱃지 */}
                {img.isPrimary && (
                  <div
                    className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      fontWeight: 'var(--font-bold)'
                    }}
                  >
                    대표
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius)'
          }}
        >
          <ImageIcon className="w-12 h-12 mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            아직 추가된 이미지가 없습니다
          </p>
        </div>
      )}
    </div>
  )
}