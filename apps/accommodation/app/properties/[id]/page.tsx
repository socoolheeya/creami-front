'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { type ReactNode, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Edit,
  Globe,
  Home,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
  Star,
  Tag,
  User,
  Wifi
} from 'lucide-react'
import { Button, Card } from '@creami/ui'
import { useProperty } from '@/hooks/useProperties'
import { ErrorTemplate } from '@/components/common/ErrorTemplate'
import {
  CURRENCY_OPTIONS,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type Property,
  type PropertyStatus
} from '@/lib/types/property'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import { PRICE_TYPE_LABELS } from '@/lib/types/rateplan'
import { PropertyEditForm } from '../components/PropertyEditForm'

function InfoItem({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Phone
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-sm">
      <Icon className="h-icon-md w-icon-md shrink-0 text-text-tertiary" />
      <div className="min-w-0">
        <div className="text-base font-light text-text-tertiary">{label}</div>
        <div className="truncate text-base font-medium text-text-primary">{value || '-'}</div>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-md flex items-center gap-sm border-b border-border pb-sm">
      <span aria-hidden="true" className="h-xs w-xs shrink-0 rounded bg-primary" />
      <h2 className="text-xl font-bold text-text-primary">{children}</h2>
    </div>
  )
}

function getPropertyStatusLabel(status: PropertyStatus) {
  return PROPERTY_STATUS_LABELS[status] ?? status
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(value)
}

export default function AccommodationDetailPage() {
  const params = useParams<{ id: string }>()
  const propertyId = params.id ?? ''
  const { data: propertyData, isLoading } = useProperty(propertyId)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [propertyOverride, setPropertyOverride] = useState<Property | null>(null)
  const accommodation = propertyOverride ?? propertyData

  const accommodationRatePlans = useMemo(
    () => mockRatePlans.filter((ratePlan) => ratePlan.accommodationId === propertyId),
    [propertyId]
  )
  const currencyInfo = CURRENCY_OPTIONS.find(
    (currency) => currency.code === accommodation?.billingPolicy.currency
  )
  const displayImages = useMemo(() => {
    const images = accommodation?.images ?? []
    return [...images].sort((leftImage, rightImage) => {
      if (leftImage.isPrimary) {
        return -1
      }
      if (rightImage.isPrimary) {
        return 1
      }
      return leftImage.sortOrder - rightImage.sortOrder
    })
  }, [accommodation?.images])
  const selectedImage = displayImages[selectedImageIndex] ?? displayImages[0]
  const faxNumbers = accommodation?.faxNumbers ?? []

  if (isLoading) {
    return (
      <Card className="p-lg" hover={false}>
        <p className="text-base font-medium text-text-secondary">숙소를 조회하는 중입니다.</p>
      </Card>
    )
  }

  if (!accommodation) {
    return (
      <ErrorTemplate
        title="숙소를 찾을 수 없습니다"
        backHref="/properties"
        backLabel="숙소 목록으로"
      />
    )
  }

  if (isEditing) {
    return (
      <div>
        <Link
          href="/properties"
          className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          숙소 목록으로
        </Link>
        <PropertyEditForm
          key={accommodation.id}
          accommodation={accommodation}
          propertyId={propertyId}
          onCancel={() => setIsEditing(false)}
          onSaved={(property) => {
            setPropertyOverride(property)
            setSelectedImageIndex(0)
            setIsEditing(false)
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-lg">
        <Link
          href="/properties"
          className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          숙소 목록으로
        </Link>

        <div className="min-w-0">
          <div className="mb-sm flex flex-wrap items-center gap-md">
            <h1 className="text-2xl font-bold text-text-primary">{accommodation.name}</h1>
            {accommodation.stars ? (
              <div className="flex items-center gap-xs">
                {Array.from({ length: accommodation.stars }).map((_, index) => (
                  <Star
                    key={`${accommodation.id}-star-${index}`}
                    className="h-icon-md w-icon-md fill-primary text-primary"
                  />
                ))}
              </div>
            ) : null}
          </div>

          {accommodation.enName && (
            <p className="mb-sm text-base font-medium text-text-secondary">
              {accommodation.enName}
            </p>
          )}
          <div className="flex min-w-0 items-center gap-sm text-base font-light text-text-secondary">
            <MapPin className="h-icon-md w-icon-md shrink-0 text-text-tertiary" />
            <span className="truncate">
              {accommodation.address}
              {accommodation.addressDetail ? ` ${accommodation.addressDetail}` : ''}
              {accommodation.city && accommodation.zipCode
                ? ` (${accommodation.city}, ${accommodation.zipCode})`
                : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-md flex justify-end">
        <Button type="button" onClick={() => setIsEditing(true)}>
          <Edit className="h-icon-md w-icon-md" />
          수정
        </Button>
      </div>

      <div className="grid gap-lg lg:grid-cols-3">
        <div className="grid gap-lg lg:col-span-2">
          <Card className="w-full p-lg" hover={false}>
            <SectionTitle>이미지</SectionTitle>
            <div className="flex w-full justify-center">
              <div className="relative h-datepicker w-datepicker max-w-full overflow-hidden rounded bg-bg-tertiary">
                {selectedImage ? (
                <Image
                  src={selectedImage.url}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-sm text-center text-base font-light text-text-tertiary">
                    <ImageIcon className="h-2xl w-2xl text-text-tertiary" />
                    <span>이미지 없음</span>
                  </div>
                )}
              </div>
            </div>

            {displayImages.length > 1 && (
              <div className="mt-sm flex w-full gap-xs overflow-x-auto">
                {displayImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-control-md w-control-md shrink-0 cursor-pointer overflow-hidden rounded border bg-bg-tertiary ${
                      selectedImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
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
          </Card>

          <Card className="p-lg" hover={false}>
            <SectionTitle>숙소 설명</SectionTitle>
            <div className="grid gap-md">
              <div>
                <h3 className="mb-xs text-base font-medium text-text-primary">한글</h3>
                <p className="whitespace-pre-wrap text-base font-light text-text-secondary">
                  {accommodation.description || '-'}
                </p>
              </div>
              {accommodation.enDescription && (
                <div>
                  <h3 className="mb-xs text-base font-medium text-text-primary">English</h3>
                  <p className="whitespace-pre-wrap text-base font-light text-text-secondary">
                    {accommodation.enDescription}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-lg" hover={false}>
            <SectionTitle>편의시설</SectionTitle>
            <div className="grid gap-sm md:grid-cols-3">
              {accommodation.amenities.length > 0 ? (
                accommodation.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex h-control-md items-center gap-sm rounded bg-bg-tertiary px-control-px-md text-base font-medium text-text-secondary"
                  >
                    <Wifi className="h-icon-md w-icon-md" />
                    {amenity}
                  </div>
                ))
              ) : (
                <p className="text-base font-light text-text-tertiary">등록된 편의시설이 없습니다.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-lg">
          <Card className="p-lg" hover={false}>
            <SectionTitle>연락처</SectionTitle>
            <div className="grid gap-md md:grid-cols-2">
              <InfoItem icon={Phone} label="전화번호" value={accommodation.phone} />
              <InfoItem icon={Mail} label="이메일" value={accommodation.email ?? ''} />
              <div className="md:col-span-2">
                <InfoItem icon={Globe} label="홈페이지" value={accommodation.homepage ?? ''} />
              </div>
              {faxNumbers.length > 0 ? (
                faxNumbers.map((faxNumber, index) => (
                  <InfoItem
                    key={`${faxNumber}-${index}`}
                    icon={Phone}
                    label={`팩스번호 ${index + 1}`}
                    value={faxNumber}
                  />
                ))
              ) : (
                <div className="md:col-span-2">
                  <InfoItem icon={Phone} label="팩스번호" value="" />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-lg" hover={false}>
            <SectionTitle>운영 정보</SectionTitle>
            <div className="grid gap-md md:grid-cols-2">
              <InfoItem
                icon={Tag}
                label="유형"
                value={PROPERTY_TYPE_LABELS[accommodation.type] ?? accommodation.type}
              />
              <InfoItem icon={Tag} label="상태" value={getPropertyStatusLabel(accommodation.status)} />
              <div className="md:col-span-2">
                <InfoItem icon={Globe} label="언어" value={accommodation.language ?? ''} />
              </div>
              <InfoItem icon={Building2} label="층수" value={`${accommodation.floorCount ?? 0}층`} />
              <InfoItem icon={Home} label="객실 수" value={`${accommodation.roomCount ?? 0}개`} />
              <InfoItem icon={Calendar} label="체크인" value={accommodation.checkIn} />
              <InfoItem icon={Calendar} label="체크아웃" value={accommodation.checkOut} />
            </div>
          </Card>

          <Card className="p-lg" hover={false}>
            <SectionTitle>요금 정책</SectionTitle>
            <div className="grid gap-md">
              <InfoItem
                icon={DollarSign}
                label="통화"
                value={currencyInfo?.name ?? accommodation.billingPolicy.currency}
              />
              <InfoItem
                icon={DollarSign}
                label="결제 방법"
                value={accommodation.billingPolicy.paymentMethod ?? ''}
              />
              <InfoItem
                icon={DollarSign}
                label="수수료"
                value={
                  accommodation.billingPolicy.commission.type === 'percentage'
                    ? `${accommodation.billingPolicy.commission.value}%`
                    : `${currencyInfo?.symbol ?? ''}${accommodation.billingPolicy.commission.value}`
                }
              />
            </div>
          </Card>
        </div>
      </div>

      {accommodationRatePlans.length > 0 && (
        <Card className="mt-lg p-lg" hover={false}>
          <div className="mb-md flex items-center justify-between gap-md border-b border-border pb-sm">
            <div className="flex items-center gap-sm">
              <span aria-hidden="true" className="h-xs w-xs shrink-0 rounded bg-primary" />
              <h2 className="text-xl font-bold text-text-primary">
                요금정책 ({accommodationRatePlans.length}개)
              </h2>
            </div>
            <Link href="/rateplans">
              <Button type="button" variant="secondary">
                전체 보기
              </Button>
            </Link>
          </div>

          <div className="grid gap-sm">
            {accommodationRatePlans.map((ratePlan) => (
              <div
                key={ratePlan.id}
                className="grid gap-sm rounded border border-border bg-bg-secondary p-md md:grid-cols-4"
              >
                <div className="md:col-span-2">
                  <p className="font-bold text-text-primary">{ratePlan.name}</p>
                  <p className="text-base font-light text-primary">{ratePlan.benefitName}</p>
                </div>
                <InfoItem icon={Tag} label="요금 타입" value={PRICE_TYPE_LABELS[ratePlan.priceType]} />
                <InfoItem
                  icon={Calendar}
                  label="숙박"
                  value={`${ratePlan.setting?.minLos || '-'}박 - ${ratePlan.setting?.maxLos || '-'}박`}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="mt-lg border-t border-border pt-md">
        <div className="grid gap-sm text-base font-light text-text-tertiary md:grid-cols-4">
          <span className="flex items-center gap-sm">
            <User className="h-icon-md w-icon-md" />
            생성자: {accommodation.createdBy || '-'}
          </span>
          <span className="flex items-center gap-sm">
            <Calendar className="h-icon-md w-icon-md" />
            생성일: {formatDateTime(accommodation.createdAt)}
          </span>
          <span className="flex items-center gap-sm">
            <User className="h-icon-md w-icon-md" />
            수정자: {accommodation.updatedBy || '-'}
          </span>
          <span className="flex items-center gap-sm">
            <Calendar className="h-icon-md w-icon-md" />
            수정일: {formatDateTime(accommodation.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
