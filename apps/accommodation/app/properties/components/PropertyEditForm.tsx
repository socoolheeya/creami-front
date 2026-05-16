'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import {
  Building2,
  Calendar,
  CreditCard,
  FileText,
  GripVertical,
  ImageIcon,
  MapPin,
  Phone,
  Plus,
  Save,
  Star,
  Trash2,
  Upload,
  User,
  X
} from 'lucide-react'
import {
  Button,
  Card,
  Input,
  Select,
  TimeRangePicker,
  notifySaveError,
  notifySaveSuccess
} from '@creami/ui'
import {
  AMENITY_OPTIONS,
  CURRENCY_OPTIONS,
  PROPERTY_TYPE_LABELS,
  type ChargeType,
  type Property,
  type PropertyImage,
  type PropertyType
} from '@/lib/types/property'
import { useSavePropertyDetail } from '@/hooks/useProperties'

type EditFormData = {
  name: string
  enName: string
  type: PropertyType
  stars: number
  address: string
  addressDetail: string
  city: string
  countryCode: string
  zipCode: string
  phone: string
  email: string
  homepage: string
  faxNumbers: string[]
  checkIn: string
  checkOut: string
  roomCount: number
  floorCount: number
  description: string
  enDescription: string
  amenities: string[]
  images: PropertyImage[]
  currency: string
  paymentMethod: string
  bankName: string
  accountNumber: string
  commissionType: ChargeType
  commissionValue: string
}

type PropertyEditFormProps = {
  accommodation: Property
  propertyId: string
  onCancel: () => void
  onSaved: (property: Property) => void
}

const PAYMENT_METHOD_OPTIONS = [
  { value: 'BANK_TRANSFER', label: '송금' },
  { value: 'VCC', label: 'VCC' },
  { value: 'OTHER', label: '기타' }
] as const

const dateFormatter = new Intl.DateTimeFormat('ko-KR')

function normalizePaymentMethod(paymentMethod: string | undefined): string {
  if (paymentMethod === 'BankTransfer') {
    return 'BANK_TRANSFER'
  }

  if (PAYMENT_METHOD_OPTIONS.some((option) => option.value === paymentMethod)) {
    return paymentMethod ?? 'OTHER'
  }

  return 'OTHER'
}

function parseChargeValue(value: string): number {
  const parsedValue = Number(value)

  return Number.isFinite(parsedValue) ? parsedValue : 0
}

function toFormData(property: Property): EditFormData {
  return {
    name: property.name,
    enName: property.enName ?? '',
    type: property.type,
    stars: property.stars ?? 0,
    address: property.address,
    addressDetail: property.addressDetail ?? '',
    city: property.city ?? '',
    countryCode: property.countryCode ?? '',
    zipCode: property.zipCode ?? '',
    phone: property.phone,
    email: property.email ?? '',
    homepage: property.homepage ?? '',
    faxNumbers: property.faxNumbers ?? [],
    checkIn: property.checkIn,
    checkOut: property.checkOut,
    roomCount: property.roomCount ?? 0,
    floorCount: property.floorCount ?? 0,
    description: property.description,
    enDescription: property.enDescription ?? '',
    amenities: property.amenities,
    images: normalizeImageOrder(property.images ?? []),
    currency: property.billingPolicy.currency,
    paymentMethod: normalizePaymentMethod(property.billingPolicy.paymentMethod),
    bankName: property.billingPolicy.bankName ?? '',
    accountNumber: property.billingPolicy.accountNumber ?? '',
    commissionType: property.billingPolicy.commission.type,
    commissionValue: String(property.billingPolicy.commission.value ?? '')
  }
}

function normalizeImageOrder(images: PropertyImage[], primaryImageId?: string): PropertyImage[] {
  if (images.length === 0) {
    return []
  }

  const activePrimaryImageId =
    primaryImageId ??
    images.find((image) => image.isPrimary)?.id ??
    images[0]?.id

  return images.map((image, index) => ({
    ...image,
    isPrimary: image.id === activePrimaryImageId,
    sortOrder: index
  }))
}

function FormField({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-sm text-base font-medium text-text-primary">
      {label}
      {children}
    </label>
  )
}

function SectionTitle({
  icon: Icon,
  children
}: {
  icon: typeof Building2
  children: React.ReactNode
}) {
  return (
    <h2 className="mb-xl flex items-center gap-sm text-xl font-bold text-text-primary">
      <Icon className="h-icon-md w-icon-md text-primary" />
      {children}
    </h2>
  )
}

export function PropertyEditForm({
  accommodation,
  propertyId,
  onCancel,
  onSaved
}: PropertyEditFormProps) {
  const savePropertyDetail = useSavePropertyDetail()
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<EditFormData>(() => toFormData(accommodation))
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)
  const [isImageDropActive, setIsImageDropActive] = useState(false)

  const handleAmenityToggle = (amenity: string) => {
    setFormData((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity]
    }))
  }

  const handleAddImageFiles = (files: FileList | File[]) => {
    const currentImages = formData.images
    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .map((file, index) => ({
        id: `local-${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
        isPrimary: currentImages.length === 0 && index === 0,
        sortOrder: currentImages.length + index,
        altText: file.name
      }))

    if (newImages.length === 0) {
      return
    }

    setFormData({
      ...formData,
      images: normalizeImageOrder([...currentImages, ...newImages])
    })
  }

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsImageDropActive(false)
    handleAddImageFiles(event.dataTransfer.files)
  }

  const handleImageDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsImageDropActive(true)
  }

  const handleImageReorder = (targetIndex: number) => {
    if (draggedImageIndex === null || draggedImageIndex === targetIndex) {
      return
    }

    const nextImages = [...formData.images]
    const [draggedImage] = nextImages.splice(draggedImageIndex, 1)
    nextImages.splice(targetIndex, 0, draggedImage)
    setDraggedImageIndex(targetIndex)
    setFormData({
      ...formData,
      images: normalizeImageOrder(nextImages)
    })
  }

  const handleSetPrimaryImage = (imageId: string) => {
    const targetImage = formData.images.find((image) => image.id === imageId)

    if (!targetImage) {
      return
    }

    const nextImages = [
      targetImage,
      ...formData.images.filter((image) => image.id !== imageId)
    ]

    setFormData({
      ...formData,
      images: normalizeImageOrder(nextImages, imageId)
    })
  }

  const handleRemoveImage = (imageId: string) => {
    const nextImages = formData.images.filter((image) => image.id !== imageId)

    setFormData({
      ...formData,
      images: normalizeImageOrder(nextImages)
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (savePropertyDetail.isPending) {
      return
    }

    const nextProperty: Property = {
      ...accommodation,
      name: formData.name,
      enName: formData.enName,
      type: formData.type,
      stars: formData.stars,
      address: formData.address,
      addressDetail: formData.addressDetail,
      city: formData.city,
      countryCode: formData.countryCode,
      zipCode: formData.zipCode,
      phone: formData.phone,
      email: formData.email,
      homepage: formData.homepage,
      faxNumbers: formData.faxNumbers.map((faxNumber) => faxNumber.trim()).filter(Boolean),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      roomCount: formData.roomCount,
      floorCount: formData.floorCount,
      description: formData.description,
      enDescription: formData.enDescription,
      amenities: formData.amenities,
      images: formData.images,
      billingPolicy: {
        ...accommodation.billingPolicy,
        currency: formData.currency,
        paymentMethod: formData.paymentMethod,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        commission: {
          type: formData.commissionType,
          value: parseChargeValue(formData.commissionValue)
        }
      },
      updatedAt: new Date()
    }

    try {
      await savePropertyDetail.mutateAsync({
        id: propertyId,
        data: nextProperty
      })

      notifySaveSuccess('수정이 완료되었습니다.')
      onSaved(nextProperty)
    } catch {
      notifySaveError('수정에 실패했습니다.')
    }
  }

  return (
    <div>
      <div className="mb-lg flex items-center justify-between gap-lg">
        <h1 className="text-2xl font-bold text-text-primary">숙소 정보 수정</h1>
        <div className="flex items-center gap-sm">
          <Button
            type="button"
            variant="secondary"
            size="medium"
            disabled={savePropertyDetail.isPending}
            onClick={onCancel}
          >
            <X className="h-icon-md w-icon-md" />
            취소
          </Button>
          <Button
            type="submit"
            form="property-edit-form"
            size="medium"
            disabled={savePropertyDetail.isPending}
          >
            <Save className="h-icon-md w-icon-md" />
            저장
          </Button>
        </div>
      </div>

      <form id="property-edit-form" onSubmit={handleSubmit} className="grid gap-lg">
        <Card className="p-lg" hover={false}>
          <SectionTitle icon={Building2}>기본 정보</SectionTitle>
          <div className="grid gap-md md:grid-cols-2">
            <FormField label="숙소명">
              <Input
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                required
              />
            </FormField>
            <FormField label="영문명">
              <Input
                value={formData.enName}
                onChange={(event) => setFormData({ ...formData, enName: event.target.value })}
              />
            </FormField>
            <FormField label="숙소 유형">
              <Select
                value={formData.type}
                onChange={(event) =>
                  setFormData({ ...formData, type: event.target.value as PropertyType })
                }
                required
              >
                {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="별점">
              <div className="flex h-control-md items-center gap-xs rounded border border-border bg-bg-secondary px-control-px-md">
                {[1, 2, 3, 4, 5].map((star) => {
                  const selected = star <= formData.stars

                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`${star}성`}
                      onClick={() => setFormData({ ...formData, stars: star })}
                      className="flex h-control-sm w-control-sm cursor-pointer items-center justify-center rounded border-none bg-transparent p-none text-text-tertiary transition-colors hover:bg-primary-bg hover:text-primary"
                    >
                      <Star
                        className={`h-icon-md w-icon-md ${selected ? 'fill-primary text-primary' : ''}`}
                      />
                    </button>
                  )
                })}
              </div>
            </FormField>
          </div>
        </Card>

        <Card className="p-lg" hover={false}>
          <SectionTitle icon={MapPin}>주소 정보</SectionTitle>
          <div className="grid gap-md md:grid-cols-2">
            <FormField label="주소">
              <Input
                value={formData.address}
                onChange={(event) => setFormData({ ...formData, address: event.target.value })}
                required
              />
            </FormField>
            <FormField label="상세 주소">
              <Input
                value={formData.addressDetail}
                onChange={(event) =>
                  setFormData({ ...formData, addressDetail: event.target.value })
                }
              />
            </FormField>
            <FormField label="도시">
              <Input
                value={formData.city}
                onChange={(event) => setFormData({ ...formData, city: event.target.value })}
              />
            </FormField>
            <FormField label="국가 코드">
              <Input
                value={formData.countryCode}
                onChange={(event) =>
                  setFormData({ ...formData, countryCode: event.target.value })
                }
              />
            </FormField>
            <FormField label="우편번호">
              <Input
                value={formData.zipCode}
                onChange={(event) => setFormData({ ...formData, zipCode: event.target.value })}
              />
            </FormField>
          </div>
        </Card>

        <Card className="p-lg" hover={false}>
          <SectionTitle icon={ImageIcon}>이미지 관리</SectionTitle>
          <div className="grid gap-lg">
            <div
              className={`flex min-h-2xl cursor-pointer flex-col items-center justify-center gap-sm rounded border border-border bg-bg-secondary p-lg text-center transition-colors ${
                isImageDropActive ? 'border-primary bg-primary-bg' : ''
              }`}
              onClick={() => imageInputRef.current?.click()}
              onDrop={handleImageDrop}
              onDragOver={handleImageDragOver}
              onDragLeave={() => setIsImageDropActive(false)}
            >
              <Upload className="h-icon-lg w-icon-lg text-primary" />
              <div>
                <div className="text-base font-bold text-text-primary">
                  이미지를 드래그하거나 클릭해서 등록
                </div>
                <div className="text-base font-light text-text-tertiary">
                  등록 후 카드를 드래그하면 노출 순서를 빠르게 변경할 수 있습니다.
                </div>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    handleAddImageFiles(event.target.files)
                  }
                  event.target.value = ''
                }}
              />
            </div>

            {formData.images.length > 0 ? (
              <div className="grid gap-md md:grid-cols-4">
                {formData.images.map((image, index) => (
                  <div
                    key={image.id}
                    draggable
                    onDragStart={() => setDraggedImageIndex(index)}
                    onDragOver={(event) => {
                      event.preventDefault()
                      handleImageReorder(index)
                    }}
                    onDragEnd={() => setDraggedImageIndex(null)}
                    className="group overflow-hidden rounded border border-border bg-bg-secondary"
                  >
                    <div className="relative h-modal-action w-full bg-bg-tertiary">
                      <Image
                        src={image.url}
                        alt={image.altText || image.name}
                        fill
                        className="object-cover"
                        unoptimized={image.url.startsWith('blob:')}
                      />
                      <div className="absolute left-sm top-sm inline-flex h-control-sm items-center gap-xs rounded bg-bg-primary px-control-px-sm text-base font-bold text-text-primary shadow">
                        <GripVertical className="h-icon-md w-icon-md text-text-tertiary" />
                        {index + 1}
                      </div>
                      {image.isPrimary && (
                        <div className="absolute right-sm top-sm inline-flex h-control-sm items-center rounded bg-primary px-control-px-sm text-base font-bold text-white shadow">
                          대표
                        </div>
                      )}
                    </div>
                    <div className="grid gap-sm p-sm">
                      <div className="truncate text-base font-medium text-text-primary">
                        {image.name}
                      </div>
                      <div className="flex items-center gap-sm">
                        <Button
                          type="button"
                          variant={image.isPrimary ? 'primary' : 'secondary'}
                          size="small"
                          fullWidth
                          onClick={() => handleSetPrimaryImage(image.id)}
                        >
                          <Star className="h-icon-md w-icon-md" />
                          대표
                        </Button>
                        <Button
                          type="button"
                          variant="tertiary"
                          size="small"
                          iconOnly
                          aria-label="이미지 삭제"
                          onClick={() => handleRemoveImage(image.id)}
                        >
                          <Trash2 className="h-icon-md w-icon-md" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded border border-border bg-bg-secondary p-md text-base font-light text-text-tertiary">
                등록된 이미지가 없습니다.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-lg" hover={false}>
          <SectionTitle icon={Phone}>연락처 / 시설 정보</SectionTitle>
          <div className="grid gap-md md:grid-cols-2">
            <FormField label="전화번호">
              <Input
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                required
              />
            </FormField>
            <FormField label="이메일">
              <Input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
            </FormField>
            <FormField label="홈페이지">
              <Input
                value={formData.homepage}
                onChange={(event) => setFormData({ ...formData, homepage: event.target.value })}
              />
            </FormField>
            <div className="grid gap-sm md:col-span-2">
              <div className="flex items-center justify-between gap-md">
                <div className="text-base font-medium text-text-primary">팩스번호</div>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      faxNumbers: [...formData.faxNumbers, '']
                    })
                  }
                >
                  <Plus className="h-icon-md w-icon-md" />
                  추가
                </Button>
              </div>
              <div className="grid gap-sm">
                {formData.faxNumbers.length > 0 ? (
                  formData.faxNumbers.map((faxNumber, index) => (
                    <div key={`${index}`} className="flex items-center gap-sm">
                      <Input
                        value={faxNumber}
                        placeholder="팩스번호"
                        onChange={(event) => {
                          const nextFaxNumbers = [...formData.faxNumbers]
                          nextFaxNumbers[index] = event.target.value
                          setFormData({ ...formData, faxNumbers: nextFaxNumbers })
                        }}
                      />
                      <Button
                        type="button"
                        variant="tertiary"
                        iconOnly
                        aria-label="팩스번호 삭제"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            faxNumbers: formData.faxNumbers.filter((_, itemIndex) => itemIndex !== index)
                          })
                        }
                      >
                        <Trash2 className="h-icon-md w-icon-md" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="rounded border border-border bg-bg-secondary p-md text-base font-light text-text-tertiary">
                    등록된 팩스번호가 없습니다.
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <TimeRangePicker
                startValue={formData.checkIn}
                endValue={formData.checkOut}
                onStartChange={(value) => setFormData({ ...formData, checkIn: value })}
                onEndChange={(value) => setFormData({ ...formData, checkOut: value })}
                label="체크인 / 체크아웃"
                startPlaceholder="체크인"
                endPlaceholder="체크아웃"
                separator="/"
                includeSeconds={false}
                minuteStep={5}
              />
            </div>
            <FormField label="객실 수">
              <Input
                type="number"
                min={0}
                value={formData.roomCount}
                onChange={(event) =>
                  setFormData({ ...formData, roomCount: Number(event.target.value) })
                }
              />
            </FormField>
            <FormField label="층수">
              <Input
                type="number"
                min={0}
                value={formData.floorCount}
                onChange={(event) =>
                  setFormData({ ...formData, floorCount: Number(event.target.value) })
                }
              />
            </FormField>
          </div>
        </Card>

        <Card className="p-lg" hover={false}>
          <SectionTitle icon={FileText}>설명 / 편의시설</SectionTitle>
          <div className="grid gap-md">
            <FormField label="숙소 설명">
              <textarea
                value={formData.description}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
                className="min-h-2xl resize-none rounded border border-border bg-bg-primary px-control-px-md py-sm text-base font-medium text-text-primary"
                required
              />
            </FormField>
            <FormField label="영문 설명">
              <textarea
                value={formData.enDescription}
                onChange={(event) =>
                  setFormData({ ...formData, enDescription: event.target.value })
                }
                className="min-h-2xl resize-none rounded border border-border bg-bg-primary px-control-px-md py-sm text-base font-medium text-text-primary"
              />
            </FormField>
            <div className="grid gap-sm">
              <div className="text-base font-medium text-text-primary">편의시설</div>
              <div className="flex flex-wrap gap-sm">
                {AMENITY_OPTIONS.map((amenity) => {
                  const selected = formData.amenities.includes(amenity)

                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`h-control-md rounded border border-border px-control-px-md text-base font-medium transition-colors ${
                        selected
                          ? 'bg-primary text-white'
                          : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                      }`}
                    >
                      {amenity}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-lg" hover={false}>
          <SectionTitle icon={CreditCard}>요금 정책</SectionTitle>
          <div className="grid gap-md md:grid-cols-2">
            <FormField label="통화">
              <Select
                value={formData.currency}
                onChange={(event) => setFormData({ ...formData, currency: event.target.value })}
                required
              >
                {CURRENCY_OPTIONS.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="결제 방법">
              <Select
                value={formData.paymentMethod}
                onChange={(event) =>
                  setFormData({ ...formData, paymentMethod: event.target.value })
                }
                required
              >
                {PAYMENT_METHOD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="은행명">
              <Input
                value={formData.bankName}
                onChange={(event) => setFormData({ ...formData, bankName: event.target.value })}
              />
            </FormField>
            <FormField label="계좌번호">
              <Input
                value={formData.accountNumber}
                onChange={(event) =>
                  setFormData({ ...formData, accountNumber: event.target.value })
                }
              />
            </FormField>
            <FormField label="수수료 타입">
              <Select
                value={formData.commissionType}
                onChange={(event) =>
                  setFormData({ ...formData, commissionType: event.target.value as ChargeType })
                }
                required
              >
                <option value="percentage">percentage</option>
                <option value="fixed">fixed</option>
              </Select>
            </FormField>
            <FormField label="수수료 값">
              <Input
                type="text"
                inputMode="decimal"
                value={formData.commissionValue}
                onChange={(event) =>
                  setFormData({ ...formData, commissionValue: event.target.value })
                }
                required
              />
            </FormField>
          </div>
        </Card>

        <div className="border-t border-border pt-md">
          <div className="grid gap-sm text-base font-light text-text-tertiary md:grid-cols-4">
            <span className="flex items-center gap-sm">
              <User className="h-icon-md w-icon-md" />
              생성자: {accommodation.createdBy || '-'}
            </span>
            <span className="flex items-center gap-sm">
              <Calendar className="h-icon-md w-icon-md" />
              생성일: {dateFormatter.format(accommodation.createdAt)}
            </span>
            <span className="flex items-center gap-sm">
              <User className="h-icon-md w-icon-md" />
              수정자: {accommodation.updatedBy || '-'}
            </span>
            <span className="flex items-center gap-sm">
              <Calendar className="h-icon-md w-icon-md" />
              수정일: {dateFormatter.format(accommodation.updatedAt)}
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}
