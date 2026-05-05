import { AccommodationFormData, AccommodationImage } from '@/lib/types/accommodation'
import { Image as ImageIcon, Star, X, Plus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface Step3ImagesProps {
  data: AccommodationFormData
  onChange: (data: Partial<AccommodationFormData>) => void
}

export function Step3Images({ data, onChange }: Step3ImagesProps) {
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

    // 빈 URL 체크
    if (!trimmedUrl) {
      setError('이미지 URL을 입력해주세요')
      return
    }

    // URL 형식 체크
    if (!isValidUrl(trimmedUrl)) {
      setError('올바른 URL 형식이 아닙니다 (http:// 또는 https://로 시작해야 합니다)')
      return
    }

    // 최대 개수 체크
    if ((data.images || []).length >= 10) {
      setError('최대 10장까지만 추가할 수 있습니다')
      return
    }

    const newImage: AccommodationImage = {
      id: Date.now().toString(),
      name: '',
      url: trimmedUrl,
      isPrimary: (data.images || []).length === 0, // 첫 이미지는 자동으로 대표
      sortOrder: (data.images || []).length
    }

    onChange({ images: [...(data.images || []), newImage] })
    setImageUrl('')
    setError('')
  }

  const removeImage = (id: string) => {
    const filtered = (data.images || []).filter(img => img.id !== id)
    // 대표 이미지가 삭제되면 첫 번째 이미지를 대표로
    if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
      filtered[0].isPrimary = true
    }
    onChange({ images: filtered })
  }

  const setPrimary = (id: string) => {
    const updated = (data.images || []).map(img => ({
      ...img,
      isPrimary: img.id === id
    }))
    onChange({ images: updated })
  }

  const handleImageError = (imageId: string) => {
    setFailedImages(prev => new Set(prev).add(imageId))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl mb-6" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        숙소 이미지를 추가해주세요
      </h2>

      {/* 이미지 URL 입력 */}
      <div>
        <label className="block mb-2" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
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
            className="flex-1 px-4 py-3 rounded-lg"
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
            className="px-6 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {error ? (
          <p className="text-sm mt-2" style={{ color: 'var(--primary)' }}>
            {error}
          </p>
        ) : (
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            최대 10장까지 추가할 수 있습니다
          </p>
        )}
      </div>

      {/* 이미지 그리드 */}
      {data.images && data.images.length > 0 ? (
        <div>
          <p className="mb-3" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            등록된 이미지 ({data.images.length}/10)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.images.map(img => (
              <div
                key={img.id}
                className="relative group rounded-lg overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  border: img.isPrimary ? '3px solid var(--primary)' : '1px solid var(--border-color)'
                }}
              >
                {/* 이미지 */}
                <div className="relative w-full h-40">
                  {failedImages.has(img.id) ? (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      <ImageIcon className="w-12 h-12 mb-2" style={{ color: 'var(--text-tertiary)' }} />
                      <p className="text-xs text-center px-2" style={{ color: 'var(--text-tertiary)' }}>
                        이미지를 불러올 수 없습니다
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={img.url}
                      alt="숙소 이미지"
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
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-opacity"
                      style={{
                        backgroundColor: img.isPrimary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.9)',
                        color: img.isPrimary ? '#ffffff' : 'var(--text-primary)'
                      }}
                      title={img.isPrimary ? '대표 이미지' : '대표로 설정'}
                    >
                      <Star className="w-5 h-5" fill={img.isPrimary ? '#ffffff' : 'none'} />
                    </button>

                    {/* 삭제 */}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-opacity"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 대표 뱃지 */}
                {img.isPrimary && (
                  <div
                    className="absolute top-2 left-2 px-2 py-1 rounded text-xs"
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
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius)'
          }}
        >
          <ImageIcon className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>
            아직 추가된 이미지가 없습니다
          </p>
        </div>
      )}
    </div>
  )
}
