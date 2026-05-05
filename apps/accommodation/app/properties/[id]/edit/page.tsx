'use client'

import { ArrowLeft, Save, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { ACCOMMODATION_TYPE_LABELS, CURRENCY_OPTIONS, AMENITY_OPTIONS, AccommodationType } from '@/lib/types/accommodation'

export default function EditAccommodationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const accommodation = mockAccommodations.find(acc => acc.id === id)

  const [formData, setFormData] = useState({
    name: accommodation?.name || '',
    enName: accommodation?.enName || '',
    type: accommodation?.type || 'hotel',
    stars: accommodation?.stars || 0,
    address: accommodation?.address || '',
    addressDetail: accommodation?.addressDetail || '',
    city: accommodation?.city || '',
    zipCode: accommodation?.zipCode || '',
    phone: accommodation?.phone || '',
    email: accommodation?.email || '',
    homepage: accommodation?.homepage || '',
    checkIn: accommodation?.checkIn || '',
    checkOut: accommodation?.checkOut || '',
    roomCount: accommodation?.roomCount || 0,
    floorCount: accommodation?.floorCount || 0,
    description: accommodation?.description || '',
    enDescription: accommodation?.enDescription || '',
    amenities: accommodation?.amenities || [],
    currency: accommodation?.billingPolicy.currency || 'KRW',
    paymentMethod: accommodation?.billingPolicy.paymentMethod || '',
    bankName: accommodation?.billingPolicy.bankName || '',
    accountNumber: accommodation?.billingPolicy.accountNumber || '',
    commissionType: accommodation?.billingPolicy.commission.type || 'percentage',
    commissionValue: accommodation?.billingPolicy.commission.value || 0,
  })

  if (!accommodation) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          숙소를 찾을 수 없습니다
        </h2>
        <Link href="/properties">
          <button
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              fontWeight: 'var(--font-medium)'
            }}
          >
            목록으로 돌아가기
          </button>
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would be an API call
    console.log('Saving accommodation:', formData)

    // Navigate back to detail page
    router.push(`/properties/${id}`)
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/properties/${id}`}
          className="inline-flex items-center gap-2 mb-4 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>상세 페이지로</span>
        </Link>

        <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          숙소 정보 수정
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              기본 정보
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  숙소명
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  영문명
                </label>
                <input
                  type="text"
                  value={formData.enName}
                  onChange={(e) => setFormData({ ...formData, enName: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  숙소 유형
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as AccommodationType })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                >
                  {Object.entries(ACCOMMODATION_TYPE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  별점
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, stars: star })}
                      className="transition-all hover:scale-110"
                    >
                      <Star
                        className="w-8 h-8"
                        style={{
                          fill: star <= (formData.stars || 0) ? '#fbbf24' : 'transparent',
                          stroke: star <= (formData.stars || 0) ? '#fbbf24' : 'var(--text-tertiary)',
                          strokeWidth: 2
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              주소 정보
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  주소
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  상세 주소
                </label>
                <input
                  type="text"
                  value={formData.addressDetail}
                  onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  도시
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  우편번호
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              연락처 정보
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  전화번호
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  이메일
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  홈페이지
                </label>
                <input
                  type="url"
                  value={formData.homepage}
                  onChange={(e) => setFormData({ ...formData, homepage: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              시설 정보
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  객실 수
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.roomCount}
                  onChange={(e) => setFormData({ ...formData, roomCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  층수
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.floorCount}
                  onChange={(e) => setFormData({ ...formData, floorCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  체크인 시간
                </label>
                <input
                  type="time"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  체크아웃 시간
                </label>
                <input
                  type="time"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              설명
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  숙소 설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  영문 설명
                </label>
                <textarea
                  value={formData.enDescription}
                  onChange={(e) => setFormData({ ...formData, enDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              편의시설
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMENITY_OPTIONS.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors"
                  style={{
                    backgroundColor: formData.amenities.includes(amenity) ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: formData.amenities.includes(amenity) ? '#ffffff' : 'var(--text-secondary)'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Billing Policy */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              요금 정책
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  통화
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                >
                  {CURRENCY_OPTIONS.map((currency) => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  결제 방법
                </label>
                <input
                  type="text"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  은행명
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  계좌번호
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  수수료 타입
                </label>
                <select
                  value={formData.commissionType}
                  onChange={(e) => setFormData({ ...formData, commissionType: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                >
                  <option value="percentage">퍼센트</option>
                  <option value="fixed">고정금액</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                  수수료 값
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.commissionValue}
                  onChange={(e) => setFormData({ ...formData, commissionValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <Save className="w-5 h-5" />
              저장
            </button>

            <Link href={`/properties/${id}`}>
              <button
                type="button"
                className="px-6 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                취소
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
