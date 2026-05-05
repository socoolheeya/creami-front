'use client'

import { ArrowLeft, MapPin, Phone, Mail, Calendar, Edit, Wifi, Car, Coffee, DollarSign, Star, Building2, Globe, Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, use } from 'react'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { ACCOMMODATION_TYPE_LABELS, CURRENCY_OPTIONS } from '@/lib/types/accommodation'

export default function AccommodationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const accommodation = mockAccommodations.find(acc => acc.id === id)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

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

  const currencyInfo = CURRENCY_OPTIONS.find(c => c.code === accommodation.billingPolicy.currency)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 mb-4 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>숙소 목록으로</span>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="px-3 py-1 rounded text-sm"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {ACCOMMODATION_TYPE_LABELS[accommodation.type]}
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: accommodation.status === 'active' ? '#d1fae5' : '#fee2e2',
                  color: accommodation.status === 'active' ? '#065f46' : '#991b1b',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {accommodation.status === 'active' ? '운영중' : '중지'}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {accommodation.name}
              </h1>
              {accommodation.stars && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: accommodation.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
            {accommodation.enName && (
              <div className="text-lg mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                {accommodation.enName}
              </div>
            )}
            <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <MapPin className="w-4 h-4" />
              <span>
                {accommodation.address}
                {accommodation.addressDetail && ` ${accommodation.addressDetail}`}
                {accommodation.city && accommodation.zipCode && ` (${accommodation.city}, ${accommodation.zipCode})`}
              </span>
            </div>
          </div>

          <Link href={`/properties/${accommodation.id}/edit`}>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
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
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            {/* Main Image */}
            <div className="relative w-full h-96 bg-gray-200">
              {accommodation.images.length > 0 ? (
                <Image
                  src={accommodation.images[selectedImageIndex].url}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>이미지 없음</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {accommodation.images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {accommodation.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className="relative flex-shrink-0 w-20 h-20 rounded overflow-hidden"
                    style={{
                      border: selectedImageIndex === index ? '2px solid var(--primary)' : '2px solid transparent'
                    }}
                  >
                    <Image
                      src={image.url}
                      alt={`${accommodation.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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
              숙소 설명
            </h2>
            <p className="whitespace-pre-wrap" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {accommodation.description}
            </p>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {accommodation.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Info Cards */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h3 className="text-lg mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              연락처
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>전화번호</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.phone}
                  </div>
                </div>
              </div>
              {accommodation.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>이메일</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.email}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.homepage && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>홈페이지</div>
                    <a
                      href={accommodation.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: 'var(--primary)', fontWeight: 'var(--font-medium)' }}
                    >
                      {accommodation.homepage}
                    </a>
                  </div>
                </div>
              )}
              {accommodation.faxNumbers && accommodation.faxNumbers.length > 0 && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>팩스</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.faxNumbers.join(', ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Property Info */}
          {(accommodation.roomCount || accommodation.floorCount) && (
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <h3 className="text-lg mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                시설 정보
              </h3>
              <div className="space-y-3">
                {accommodation.roomCount && (
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>객실 수</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {accommodation.roomCount}개
                      </div>
                    </div>
                  </div>
                )}
                {accommodation.floorCount && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>층수</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {accommodation.floorCount}층
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Check-in/out Times */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h3 className="text-lg mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              체크인/아웃
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>체크인</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.checkIn}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>체크아웃</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.checkOut}
                  </div>
                </div>
              </div>
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
            <h3 className="text-lg mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              요금 정책
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>통화</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {currencyInfo?.name || accommodation.billingPolicy.currency}
                  </div>
                </div>
              </div>
              {accommodation.billingPolicy.paymentMethod && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>결제 방법</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.paymentMethod}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.billingPolicy.bankName && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>은행</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.bankName}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.billingPolicy.accountNumber && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>계좌번호</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.accountNumber}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>수수료</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.billingPolicy.commission.type === 'percentage'
                      ? `${accommodation.billingPolicy.commission.value}%`
                      : `${currencyInfo?.symbol || ''}${accommodation.billingPolicy.commission.value}`}
                  </div>
                </div>
              </div>
              {accommodation.billingPolicy.surcharge && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>할증료</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.surcharge.type === 'percentage'
                        ? `${accommodation.billingPolicy.surcharge.value}%`
                        : `${currencyInfo?.symbol || ''}${accommodation.billingPolicy.surcharge.value}`}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.billingPolicy.tax && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>세금</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.tax.type === 'percentage'
                        ? `${accommodation.billingPolicy.tax.value}%`
                        : `${currencyInfo?.symbol || ''}${accommodation.billingPolicy.tax.value}`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}