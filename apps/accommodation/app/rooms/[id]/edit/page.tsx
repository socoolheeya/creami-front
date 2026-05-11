'use client'

import { use, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  DoorOpen,
  Edit,
  FileText,
  Image as ImageIcon,
  Layers,
  Plus,
  Trash2,
  User,
  Users,
  X
} from 'lucide-react'
import { useRoom } from '@/hooks/useRooms'
import {
  ACCESSIBILITY_OPTIONS,
  ROOM_AMENITY_OPTIONS,
  type BedConfig,
  type BedType,
  type Room,
  type RoomFormData,
  type RoomImage,
  type RoomStatus,
  type RoomType,
  type ViewType
} from '@/lib/types/room'
import { Button, Card, Input, Select, notification } from '@creami/ui'

type RoomEditFormData = RoomFormData & {
  baseMinLos?: number
  baseMaxLos?: number
  cmsDescription?: string
  maxInfantCount?: number
  freeChildAge?: number
}

function getDefaultFormData(room: Room): RoomEditFormData {
  return {
    accommodationId: room.accommodationId,
    accommodationName: room.accommodationName,
    name: room.name,
    enName: room.enName,
    type: room.type,
    status: room.status,
    viewType: room.viewType,
    smokingAllowed: room.smokingAllowed,
    floor: room.floor,
    size: room.size,
    sizeUnit: room.sizeUnit,
    baseMinLos: room.baseMinLos,
    baseMaxLos: room.baseMaxLos,
    standardOccupancyAdult: room.standardOccupancyAdult,
    standardOccupancyChild: room.standardOccupancyChild,
    useMinOccupancy: room.useMinOccupancy,
    minOccupancyAdult: room.minOccupancyAdult,
    minOccupancyChild: room.minOccupancyChild,
    useMaxOccupancy: room.useMaxOccupancy,
    maxOccupancyAdult: room.maxOccupancyAdult,
    maxOccupancyChild: room.maxOccupancyChild,
    totalOccupancy: room.totalOccupancy,
    maxInfantCount: room.maxInfantCount,
    freeChildAge: room.freeChildAge,
    minChildAge: room.minChildAge,
    maxChildAge: room.maxChildAge,
    extraBedAvailable: room.extraBedAvailable,
    extraBedCount: room.extraBedCount,
    bedConfiguration: room.bedConfiguration,
    description: room.description,
    enDescription: room.enDescription,
    cmsDescription: room.cmsDescription,
    amenities: room.amenities,
    accessibilityFeatures: room.accessibilityFeatures,
    images: room.images
  }
}

function DetailCard({
  title,
  icon,
  children
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <Card hover={false} className="p-lg">
      <h2 className="mb-md flex items-center gap-sm text-lg font-bold text-text-primary">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      {children}
    </Card>
  )
}

function Field({
  label,
  children
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-xs block text-base font-medium text-text-secondary">
        {label}
      </span>
      {children}
    </label>
  )
}

function DescriptionField({
  label,
  value,
  onChange
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Field label={label}>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full rounded border border-border bg-bg-primary px-control-px-md py-sm text-base font-medium text-text-primary"
      />
    </Field>
  )
}

function ToggleOption({
  label,
  checked,
  onChange
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  const stateClass = checked
    ? 'border-primary bg-primary text-white'
    : 'border-border bg-bg-secondary text-text-primary'

  return (
    <label className={`flex cursor-pointer items-center gap-sm rounded border p-sm ${stateClass}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-icon-md w-icon-md accent-primary"
      />
      <span className="text-base font-medium">{label}</span>
    </label>
  )
}

export default function RoomEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const { data: room, isLoading, error } = useRoom(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-2xl">
        <div className="text-base font-light text-text-secondary">{commonT('loading')}</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl text-center">
        <h3 className="mb-xs text-lg font-bold text-text-primary">
          {commonT('loadFailedNoPeriod')}
        </h3>
        <p className="mb-md text-base font-light text-text-secondary">
          {error.message}
        </p>
        <Link href="/rooms">
          <Button>{commonT('backToList')}</Button>
        </Link>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl text-center">
        <h3 className="mb-md text-lg font-bold text-text-primary">
          {t('notFound')}
        </h3>
        <Link href="/rooms">
          <Button>{commonT('backToList')}</Button>
        </Link>
      </div>
    )
  }

  return <RoomEditForm id={id} room={room} />
}

function RoomEditForm({ id, room }: { id: string; room: Room }) {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const router = useRouter()
  const [formData, setFormData] = useState<RoomEditFormData>(() => getDefaultFormData(room))
  const [imageUrl, setImageUrl] = useState('')

  const updateForm = (data: Partial<RoomEditFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const addBed = () => {
    updateForm({
      bedConfiguration: [
        ...(formData.bedConfiguration || []),
        { type: 'single', count: 1 }
      ]
    })
  }

  const updateBed = (index: number, field: keyof BedConfig, value: BedType | number) => {
    const nextBeds = [...(formData.bedConfiguration || [])]
    nextBeds[index] = { ...nextBeds[index], [field]: value }
    updateForm({ bedConfiguration: nextBeds })
  }

  const removeBed = (index: number) => {
    updateForm({
      bedConfiguration: (formData.bedConfiguration || []).filter((_, itemIndex) => itemIndex !== index)
    })
  }

  const toggleAmenity = (amenity: string) => {
    const amenities = formData.amenities || []
    updateForm({
      amenities: amenities.includes(amenity)
        ? amenities.filter((item) => item !== amenity)
        : [...amenities, amenity]
    })
  }

  const toggleAccessibility = (feature: string) => {
    const accessibilityFeatures = formData.accessibilityFeatures || []
    updateForm({
      accessibilityFeatures: accessibilityFeatures.includes(feature)
        ? accessibilityFeatures.filter((item) => item !== feature)
        : [...accessibilityFeatures, feature]
    })
  }

  const addImage = () => {
    const trimmedUrl = imageUrl.trim()
    const images = formData.images || []

    if (!trimmedUrl || images.length >= 10) {
      return
    }

    const nextImage: RoomImage = {
      id: Date.now().toString(),
      url: trimmedUrl,
      isPrimary: images.length === 0,
      order: images.length
    }

    updateForm({ images: [...images, nextImage] })
    setImageUrl('')
  }

  const removeImage = (imageId: string) => {
    updateForm({
      images: (formData.images || []).filter((image) => image.id !== imageId)
    })
  }

  const setPrimaryImage = (imageId: string) => {
    updateForm({
      images: (formData.images || []).map((image) => ({
        ...image,
        isPrimary: image.id === imageId
      }))
    })
  }

  const handleSubmit = () => {
    console.log(t('messages.editLog'), formData)

    notification.success({
      message: commonT('successUpdated'),
      placement: 'top-right',
      direction: 'right'
    })
    router.push(`/rooms/${id}`)
  }

  return (
    <div>
      <div className="mb-lg flex flex-col gap-md lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-md">
          <Link href={`/rooms/${id}`}>
            <Button variant="secondary">
              <ArrowLeft className="h-icon-md w-icon-md" />
              {commonT('back')}
            </Button>
          </Link>

          <div className="flex items-center gap-md">
            <Edit className="h-lg w-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('editTitle', { name: room.name })}
            </h1>
          </div>
        </div>

        <div className="flex justify-end gap-sm">
          <Link href={`/rooms/${id}`}>
            <Button variant="secondary">{commonT('cancel')}</Button>
          </Link>
          <Button onClick={handleSubmit}>
            <Check className="h-icon-md w-icon-md" />
            {commonT('save')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        <DetailCard
          title={t('sections.basic')}
          icon={<Building2 className="h-icon-md w-icon-md" />}
        >
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <Field label={t('fields.roomId')}>
              <Input value={room.id} disabled />
            </Field>
            <Field label={t('fields.propertyName')}>
              <Input value={formData.accommodationName || ''} disabled />
            </Field>
            <Field label={t('fields.roomName')}>
              <Input
                value={formData.name || ''}
                onChange={(event) => updateForm({ name: event.target.value })}
              />
            </Field>
            <Field label={t('fields.roomNameEn')}>
              <Input
                value={formData.enName || ''}
                onChange={(event) => updateForm({ enName: event.target.value })}
              />
            </Field>
            <Field label={t('fields.roomType')}>
              <Select
                value={formData.type || ''}
                onChange={(event) => updateForm({ type: event.target.value as RoomType })}
              >
                {(['single', 'double', 'twin', 'suite', 'deluxe', 'family'] as RoomType[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`types.${value}`)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t('fields.status')}>
              <Select
                value={formData.status || ''}
                onChange={(event) => updateForm({ status: event.target.value as RoomStatus })}
              >
                {(['draft', 'active', 'inactive', 'archived'] as RoomStatus[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`statuses.${value}`)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t('fields.roomSize')}>
              <Input
                type="number"
                value={formData.size || ''}
                onChange={(event) => updateForm({ size: Number(event.target.value) })}
              />
            </Field>
            <Field label={t('fields.sizeUnit')}>
              <Select
                value={formData.sizeUnit || 'sqm'}
                onChange={(event) => updateForm({ sizeUnit: event.target.value as 'sqm' | 'pyeong' })}
              >
                <option value="sqm">{t('units.sqm')}</option>
                <option value="pyeong">{t('units.pyeong')}</option>
              </Select>
            </Field>
            <Field label={t('fields.baseMinLos')}>
              <Input
                type="number"
                value={formData.baseMinLos || ''}
                onChange={(event) => updateForm({ baseMinLos: Number(event.target.value) })}
              />
            </Field>
            <Field label={t('fields.baseMaxLos')}>
              <Input
                type="number"
                value={formData.baseMaxLos || ''}
                onChange={(event) => updateForm({ baseMaxLos: Number(event.target.value) })}
              />
            </Field>
            <Field label={t('fields.viewType')}>
              <Select
                value={formData.viewType || ''}
                onChange={(event) => updateForm({ viewType: event.target.value as ViewType })}
              >
                {(['ocean', 'city', 'garden', 'mountain', 'pool', 'none'] as ViewType[]).map((value) => (
                  <option key={value} value={value}>
                    {t(`views.${value}`)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t('fields.smoking')}>
              <Select
                value={formData.smokingAllowed ? 'smoking' : 'no-smoking'}
                onChange={(event) => updateForm({ smokingAllowed: event.target.value === 'smoking' })}
              >
                <option value="no-smoking">{t('fields.nonSmoking')}</option>
                <option value="smoking">{t('fields.smokingAllowed')}</option>
              </Select>
            </Field>
          </div>
        </DetailCard>

        <DetailCard
          title={t('sections.occupancyAndBeds')}
          icon={<Users className="h-icon-md w-icon-md" />}
        >
          <div className="space-y-md">
            <div className="grid grid-cols-1 gap-md md:grid-cols-2">
              <Field label={t('fields.standardAdult')}>
                <Input
                  type="number"
                  value={formData.standardOccupancyAdult ?? ''}
                  onChange={(event) => updateForm({ standardOccupancyAdult: Number(event.target.value) })}
                />
              </Field>
              <Field label={t('fields.standardChild')}>
                <Input
                  type="number"
                  value={formData.standardOccupancyChild ?? ''}
                  onChange={(event) => updateForm({ standardOccupancyChild: Number(event.target.value) })}
                />
              </Field>
              <Field label={t('fields.minAdult')}>
                <Input
                  type="number"
                  value={formData.minOccupancyAdult ?? ''}
                  onChange={(event) => updateForm({ minOccupancyAdult: Number(event.target.value), useMinOccupancy: true })}
                />
              </Field>
              <Field label={t('fields.minChild')}>
                <Input
                  type="number"
                  value={formData.minOccupancyChild ?? ''}
                  onChange={(event) => updateForm({ minOccupancyChild: Number(event.target.value), useMinOccupancy: true })}
                />
              </Field>
              <Field label={t('fields.maxAdult')}>
                <Input
                  type="number"
                  value={formData.maxOccupancyAdult ?? ''}
                  onChange={(event) => updateForm({ maxOccupancyAdult: Number(event.target.value), useMaxOccupancy: true })}
                />
              </Field>
              <Field label={t('fields.maxChild')}>
                <Input
                  type="number"
                  value={formData.maxOccupancyChild ?? ''}
                  onChange={(event) => updateForm({ maxOccupancyChild: Number(event.target.value), useMaxOccupancy: true })}
                />
              </Field>
              <Field label={t('fields.totalGuests')}>
                <Input
                  type="number"
                  value={formData.totalOccupancy ?? ''}
                  onChange={(event) => updateForm({ totalOccupancy: Number(event.target.value) })}
                />
              </Field>
              <Field label={t('fields.maxInfant')}>
                <Input
                  type="number"
                  value={formData.maxInfantCount ?? ''}
                  onChange={(event) => updateForm({ maxInfantCount: Number(event.target.value) })}
                />
              </Field>
              <Field label={t('fields.freeChildAge')}>
                <Input
                  type="number"
                  value={formData.freeChildAge ?? ''}
                  onChange={(event) => updateForm({ freeChildAge: Number(event.target.value) })}
                />
              </Field>
              <Field label={t('fields.extraBedCount')}>
                <Input
                  type="number"
                  value={formData.extraBedCount ?? ''}
                  onChange={(event) => updateForm({ extraBedCount: Number(event.target.value), extraBedAvailable: true })}
                />
              </Field>
            </div>

            <div className="border-t border-border pt-md">
              <div className="mb-sm flex items-center justify-between">
                <p className="text-base font-medium text-text-secondary">{t('sections.beds')}</p>
                <Button type="button" variant="secondary" size="small" onClick={addBed}>
                  <Plus className="h-icon-md w-icon-md" />
                  {t('actions.addBed')}
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
                {(formData.bedConfiguration || []).map((bed, index) => (
                  <div key={`${bed.type}-${index}`} className="grid grid-cols-[1fr_auto_auto] gap-sm">
                    <Select
                      value={bed.type}
                      onChange={(event) => updateBed(index, 'type', event.target.value as BedType)}
                    >
                      {(['single', 'double', 'queen', 'king', 'sofa'] as BedType[]).map((value) => (
                        <option key={value} value={value}>
                          {t(`beds.${value}`)}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="number"
                      value={bed.count}
                      onChange={(event) => updateBed(index, 'count', Number(event.target.value))}
                      className="w-control-lg"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      iconOnly
                      onClick={() => removeBed(index)}
                      aria-label={t('actions.deleteBed')}
                    >
                      <Trash2 className="h-icon-md w-icon-md" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DetailCard>
      </div>

      <div className="mt-lg">
        <DetailCard
          title={t('sections.images')}
          icon={<ImageIcon className="h-icon-md w-icon-md" />}
        >
          <div className="space-y-md">
            <div className="flex gap-sm">
              <Input
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" iconOnly onClick={addImage} aria-label={t('actions.addImage')}>
                <Plus className="h-icon-md w-icon-md" />
              </Button>
            </div>

            {(formData.images || []).length > 0 ? (
              <div className="grid grid-cols-1 gap-md md:grid-cols-3 lg:grid-cols-4">
                {(formData.images || []).map((image) => (
                  <Card key={image.id} hover={false} className={image.isPrimary ? 'border-primary' : ''}>
                    <div className="relative aspect-video bg-bg-tertiary">
                      <Image src={image.url} alt={t('image.alt')} fill className="object-cover" />
                    </div>
                    <div className="flex items-center justify-between gap-sm p-sm">
                      <Button
                        type="button"
                        variant={image.isPrimary ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => setPrimaryImage(image.id)}
                      >
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
            ) : (
              <p className="text-base font-light text-text-tertiary">
                {t('empty.images')}
              </p>
            )}
          </div>
        </DetailCard>
      </div>

      <div className="mt-lg">
        <DetailCard
          title={t('sections.description')}
          icon={<FileText className="h-icon-md w-icon-md" />}
        >
          <div className="space-y-md">
            <DescriptionField
              label={t('fields.descriptionKo')}
              value={formData.description || ''}
              onChange={(value) => updateForm({ description: value })}
            />
            <DescriptionField
              label={t('fields.descriptionEn')}
              value={formData.enDescription || ''}
              onChange={(value) => updateForm({ enDescription: value })}
            />
            <DescriptionField
              label={t('fields.cmsDescription')}
              value={formData.cmsDescription || ''}
              onChange={(value) => updateForm({ cmsDescription: value })}
            />
          </div>
        </DetailCard>
      </div>

      <div className="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-2">
        <DetailCard
          title={t('sections.roomAmenities')}
          icon={<Layers className="h-icon-md w-icon-md" />}
        >
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
            {ROOM_AMENITY_OPTIONS.map((amenity) => (
              <ToggleOption
                key={amenity}
                label={amenity}
                checked={(formData.amenities || []).includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
            ))}
          </div>
        </DetailCard>

        <DetailCard
          title={t('sections.accessibility')}
          icon={<DoorOpen className="h-icon-md w-icon-md" />}
        >
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
            {ACCESSIBILITY_OPTIONS.map((feature) => (
              <ToggleOption
                key={feature}
                label={feature}
                checked={(formData.accessibilityFeatures || []).includes(feature)}
                onChange={() => toggleAccessibility(feature)}
              />
            ))}
          </div>
        </DetailCard>
      </div>

      <div className="mt-lg border-t border-border pt-md">
        <div className="mb-md grid grid-cols-1 gap-md text-base font-light text-text-tertiary md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-sm">
            <Calendar className="h-icon-md w-icon-md" />
            <span>{commonT('createdAt')}: {room.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-sm">
            <Calendar className="h-icon-md w-icon-md" />
            <span>{commonT('updatedAt')}: {room.updatedAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-sm">
            <User className="h-icon-md w-icon-md" />
            <span>{commonT('createdBy')}: {room.createdBy || commonT('notProvided')}</span>
          </div>
          <div className="flex items-center gap-sm">
            <User className="h-icon-md w-icon-md" />
            <span>{commonT('updatedBy')}: {room.updatedBy || commonT('notProvided')}</span>
          </div>
        </div>
        <div className="flex justify-end gap-sm">
          <Link href={`/rooms/${id}`}>
            <Button variant="secondary">{commonT('cancel')}</Button>
          </Link>
          <Button onClick={handleSubmit}>
            <Check className="h-icon-md w-icon-md" />
            {commonT('save')}
          </Button>
        </div>
      </div>
    </div>
  )
}
