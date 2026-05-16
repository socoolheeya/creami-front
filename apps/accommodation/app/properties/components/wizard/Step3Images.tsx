import { PropertyFormData, PropertyImage } from '../../../../lib/types/property'
import { Image as ImageIcon, Star, X, Plus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface Step3ImagesProps {
  data: PropertyFormData
  onChange: (data: Partial<PropertyFormData>) => void
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

    const newImage: PropertyImage = {
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
    <div className="space-y-md">
      <h2 className="text-xl mb-xs" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        숙소 이미지를 추가해주세요
      </h2>

      {/* 이미지 URL 입력 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          이미지 URL 추가
        </label>
        <div className="flex gap-md">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value)
              if (error) setError('')
            }}
            onKeyPress={(e) => e.key === 'Enter' && addImage()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-md py-sm text-base rounded max-w-modal-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: error ? 'var(--border-primary)' : 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <button
            type="button"
            onClick={addImage}
            className="px-md py-sm rounded transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text-on-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Plus className="w-md h-md" />
          </button>
        </div>
        {error ? (
          <p className="text-xs mt-sm" style={{ color: 'var(--primary)' }}>
            {error}
          </p>
        ) : (
          <p className="text-xs mt-sm" style={{ color: 'var(--text-secondary)' }}>
            최대 10장까지 추가할 수 있습니다
          </p>
        )}
      </div>

      {/* 이미지 그리드 */}
      {data.images && data.images.length > 0 ? (
        <div>
          <p className="mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            등록된 이미지 ({data.images.length}/10)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
            {data.images.map(img => (
              <div
                key={img.id}
                className="relative group rounded overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  border: img.isPrimary ? 'var(--border-primary-strong)' : 'var(--border)'
                }}
              >
                {/* 이미지 */}
                <div className="relative w-full h-32">
                  {failedImages.has(img.id) ? (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      <ImageIcon className="w-2xl h-2xl mb-sm" style={{ color: 'var(--text-tertiary)' }} />
                      <p className="text-xs text-center px-sm" style={{ color: 'var(--text-tertiary)' }}>
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
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-sm">
                    {/* 대표 이미지 설정 */}
                    <button
                      type="button"
                      onClick={() => setPrimary(img.id)}
                      className="opacity-0 group-hover:opacity-100 p-xs rounded transition-opacity"
                      style={{
                        backgroundColor: img.isPrimary ? 'var(--primary)' : 'var(--bg-primary)',
                        color: img.isPrimary ? 'var(--text-on-primary)' : 'var(--text-primary)'
                      }}
                      title={img.isPrimary ? '대표 이미지' : '대표로 설정'}
                    >
                      <Star className="w-md h-md" fill={img.isPrimary ? 'var(--text-on-primary)' : 'none'} />
                    </button>

                    {/* 삭제 */}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="opacity-0 group-hover:opacity-100 p-xs rounded transition-opacity"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <X className="w-md h-md" />
                    </button>
                  </div>
                </div>

                {/* 대표 뱃지 */}
                {img.isPrimary && (
                  <div
                    className="absolute top-2 left-2 px-xs py-xs rounded text-xs"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--text-on-primary)',
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
          className="flex flex-col items-center justify-center py-3xl rounded"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border-dashed-strong)',
            borderRadius: 'var(--radius)'
          }}
        >
          <ImageIcon className="w-3xl h-3xl mb-sm" style={{ color: 'var(--text-tertiary)' }} />
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            아직 추가된 이미지가 없습니다
          </p>
        </div>
      )}
    </div>
  )
}
