'use client'

import { ArrowLeft, MapPin, Phone, Mail, Calendar, Edit, Wifi, Car, Coffee, DollarSign, Star, Building2, Globe, Home, Tag, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, use } from 'react'
import { mockAccommodations } from '@/lib/data/mock-accommodations'
import { PROPERTY_TYPE_LABELS, CURRENCY_OPTIONS } from '../../../lib/types/property'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import { PRICE_TYPE_LABELS } from '@/lib/types/rateplan'

export default function AccommodationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const accommodation = mockAccommodations.find(acc => acc.id === id)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const accommodationRatePlans = mockRatePlans.filter(rp => rp.accommodationId === id)

  if (!accommodation) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl mb-3 text-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          숙소를 찾을 수 없습니다
        </h2>
        <Link href="/properties">
          <button
            className="px-3 py-1.5 rounded-lg text-sm"
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
      <div className="mb-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 mb-3 transition-colors text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>숙소 목록으로</span>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {PROPERTY_TYPE_LABELS[accommodation.type]}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: accommodation.status === 'active' ? '#d1fae5' : '#fee2e2',
                  color: accommodation.status === 'active' ? '#065f46' : '#991b1b',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                {accommodation.status === 'active' ? '운영중' : '중지'}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {accommodation.name}
              </h1>
              {accommodation.stars && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: accommodation.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
            {accommodation.enName && (
              <div className="text-base mb-1.5" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                {accommodation.enName}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Images and Description */}
        <div className="lg:col-span-2 space-y-4">
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
            <div className="relative w-full h-72 bg-gray-200">
              {accommodation.images.length > 0 ? (
                <Image
                  src={accommodation.images[selectedImageIndex].url}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>이미지 없음</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {accommodation.images.length > 1 && (
              <div className="p-3 flex gap-2 overflow-x-auto">
                {accommodation.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className="relative flex-shrink-0 w-16 h-16 rounded overflow-hidden"
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
            className="rounded-lg p-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-lg mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              숙소 설명
            </h2>

            {/* 한글 설명 */}
            {accommodation.description && (
              <div className="mb-3">
                <h3 className="text-sm mb-1.5" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                  한글
                </h3>
                <p className="whitespace-pre-wrap text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {accommodation.description}
                </p>
              </div>
            )}

            {/* 영문 설명 */}
            {accommodation.enDescription && (
              <div>
                <h3 className="text-sm mb-1.5" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                  English
                </h3>
                <p className="whitespace-pre-wrap text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {accommodation.enDescription}
                </p>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-lg mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              편의시설
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {accommodation.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 px-2 py-1.5 rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Wifi className="w-4 h-4" />
                  <span className="text-xs">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Info Cards */}
        <div className="space-y-4">
          {/* Contact Info */}
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h3 className="text-base mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              연락처
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>전화번호</div>
                  <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.phone}
                  </div>
                </div>
              </div>
              {accommodation.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>이메일</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.email}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.homepage && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>홈페이지</div>
                    <a
                      href={accommodation.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm"
                      style={{ color: 'var(--primary)', fontWeight: 'var(--font-medium)' }}
                    >
                      {accommodation.homepage}
                    </a>
                  </div>
                </div>
              )}
              {accommodation.faxNumbers && accommodation.faxNumbers.length > 0 && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>팩스</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
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
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <h3 className="text-base mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                시설 정보
              </h3>
              <div className="space-y-2">
                {accommodation.roomCount && (
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>객실 수</div>
                      <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {accommodation.roomCount}개
                      </div>
                    </div>
                  </div>
                )}
                {accommodation.floorCount && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>층수</div>
                      <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
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
            className="rounded-lg p-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h3 className="text-base mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              체크인/아웃
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>체크인</div>
                  <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.checkIn}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>체크아웃</div>
                  <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.checkOut}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Policy */}
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h3 className="text-base mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              요금 정책
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>통화</div>
                  <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {currencyInfo?.name || accommodation.billingPolicy.currency}
                  </div>
                </div>
              </div>
              {accommodation.billingPolicy.paymentMethod && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>결제 방법</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.paymentMethod}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.billingPolicy.bankName && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>은행</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.bankName}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.billingPolicy.accountNumber && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>계좌번호</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.accountNumber}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>수수료</div>
                  <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {accommodation.billingPolicy.commission.type === 'percentage'
                      ? `${accommodation.billingPolicy.commission.value}%`
                      : `${currencyInfo?.symbol || ''}${accommodation.billingPolicy.commission.value}`}
                  </div>
                </div>
              </div>
              {accommodation.billingPolicy.surcharge && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>할증료</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                      {accommodation.billingPolicy.surcharge.type === 'percentage'
                        ? `${accommodation.billingPolicy.surcharge.value}%`
                        : `${currencyInfo?.symbol || ''}${accommodation.billingPolicy.surcharge.value}`}
                    </div>
                  </div>
                </div>
              )}
              {accommodation.billingPolicy.tax && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>세금</div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
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

      {/* Rate Plans Section */}
      {accommodationRatePlans.length > 0 && (
        <div className="mt-4">
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                요금정책 ({accommodationRatePlans.length}개)
              </h2>
              <Link href="/rateplans">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-xs"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-medium)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  전체 보기
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {accommodationRatePlans.map((ratePlan) => (
                <div
                  key={ratePlan.id}
                  className="p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                          {ratePlan.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: ratePlan.status === 'active' ? 'var(--primary)' + '20' : 'var(--text-tertiary)' + '20',
                            color: ratePlan.status === 'active' ? 'var(--primary)' : 'var(--text-tertiary)',
                            fontWeight: 'var(--font-medium)'
                          }}
                        >
                          {ratePlan.status === 'active' ? '활성' : '비활성'}
                        </span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: 'var(--primary)', fontWeight: 'var(--font-medium)' }}>
                        {ratePlan.benefitName}
                      </p>
                    </div>
                    <Link href={`/rateplans/${ratePlan.id}`}>
                      <button
                        className="px-2 py-1 rounded text-xs transition-colors"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: '#ffffff',
                          fontWeight: 'var(--font-medium)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        상세
                      </button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <Tag className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>요금 타입</span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {PRICE_TYPE_LABELS[ratePlan.priceType]}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--text-tertiary)' }}>식사</div>
                      <p className="text-xs" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {ratePlan.mealPlan === 'none' ? '미포함' : '포함'}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--text-tertiary)' }}>최소 숙박</div>
                      <p className="text-xs" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {ratePlan.setting?.minLos || '-'}박
                      </p>
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--text-tertiary)' }}>최대 숙박</div>
                      <p className="text-xs" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                        {ratePlan.setting?.maxLos || '-'}박
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>생성일: {accommodation.createdAt.toLocaleDateString('ko-KR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>수정일: {accommodation.updatedAt.toLocaleDateString('ko-KR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>생성자: {accommodation.createdBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>수정자: {accommodation.updatedBy}</span>
          </div>
        </div>
      </div>
    </div>
  )
}