'use client'

import { use, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  Ban,
  Bed,
  Building2,
  Calendar,
  Check,
  Cigarette,
  DoorOpen,
  Edit,
  FileText,
  Layers,
  Maximize2,
  Trash2,
  User,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useDeleteRoom, useRoom } from '@/hooks/useRooms'
import {
  type BedConfig
} from '@/lib/types/room'
import { ImageGallery } from './components/ImageGallery'
import { Button, Card } from '@creami/ui'

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

function DetailRow({
  label,
  children,
  className = ''
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between gap-md text-base ${className}`}>
      <span className="font-light text-text-secondary">{label}</span>
      <span className="text-right font-medium text-text-primary">{children}</span>
    </div>
  )
}

function StatusBadge({
  children,
  tone = 'neutral'
}: {
  children: ReactNode
  tone?: 'primary' | 'neutral'
}) {
  const toneClass =
    tone === 'primary'
      ? 'bg-primary text-white'
      : 'bg-bg-tertiary text-text-secondary'

  return (
    <span className={`inline-flex h-control-sm items-center rounded px-control-px-sm text-base font-medium ${toneClass}`}>
      {children}
    </span>
  )
}

function FeatureList({
  items,
  emptyText
}: {
  items: string[]
  emptyText: string
}) {
  if (items.length === 0) {
    return <p className="text-base font-light text-text-tertiary">{emptyText}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-sm text-base">
          <Check className="h-icon-md w-icon-md text-primary" />
          <span className="font-light text-text-primary">{item}</span>
        </div>
      ))}
    </div>
  )
}

function BedList({ beds }: { beds: BedConfig[] }) {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')

  if (beds.length === 0) {
    return <p className="text-base font-light text-text-tertiary">{t('empty.beds')}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
      {beds.map((bed) => (
        <div key={`${bed.type}-${bed.count}`} className="flex items-center gap-sm text-base">
          <Bed className="h-icon-md w-icon-md text-primary" />
          <span className="font-light text-text-primary">
            {t(`beds.${bed.type}`)} {commonT('countItems', { count: bed.count })}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: room, isLoading, error } = useRoom(id)
  const deleteRoomMutation = useDeleteRoom()

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
        <DoorOpen className="mb-md h-3xl w-3xl text-text-tertiary" />
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
        <DoorOpen className="mb-md h-3xl w-3xl text-text-tertiary" />
        <h3 className="mb-md text-lg font-bold text-text-primary">
          {t('notFound')}
        </h3>
        <Link href="/rooms">
          <Button>{commonT('backToList')}</Button>
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    try {
      await deleteRoomMutation.mutateAsync(id)
      setShowDeleteModal(false)
      router.push('/rooms')
    } catch (error) {
      console.error('Failed to delete room:', error)
      alert(t('deleteFailed'))
    }
  }

  const standardOccupancy =
    room.standardOccupancy ?? room.standardOccupancyAdult + room.standardOccupancyChild
  const maxOccupancy =
    room.maxOccupancy ?? (room.maxOccupancyAdult ?? 0) + (room.maxOccupancyChild ?? 0)

  return (
    <div>
      <div className="mb-lg flex flex-col gap-md lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-md md:flex-row md:items-center">
          <Link href="/rooms">
            <Button variant="secondary">
              <ArrowLeft className="h-icon-md w-icon-md" />
              {commonT('back')}
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-sm">
            <h1 className="text-2xl font-bold text-text-primary">
              {room.name}
            </h1>
            <StatusBadge>{t(`types.${room.type}`)}</StatusBadge>
            <StatusBadge tone="primary">{t(`statuses.${room.status}`)}</StatusBadge>
          </div>
        </div>

        <div className="flex justify-end gap-sm">
          <Link href={`/rooms/${room.id}/edit`}>
            <Button>
              <Edit className="h-icon-md w-icon-md" />
              {commonT('edit')}
            </Button>
          </Link>
          <Button variant="secondary" onClick={() => setShowDeleteModal(true)}>
            <Trash2 className="h-icon-md w-icon-md" />
            {commonT('delete')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        <DetailCard
          title={t('sections.basic')}
          icon={<Building2 className="h-icon-md w-icon-md" />}
        >
          <div className="space-y-sm">
            <DetailRow label={t('fields.roomId')}>{room.id}</DetailRow>
            <DetailRow label={t('fields.propertyName')}>{room.accommodationName || commonT('notProvided')}</DetailRow>
            <DetailRow label={t('fields.roomType')}>{t(`types.${room.type}`)}</DetailRow>
            <DetailRow label={t('fields.roomSize')}>
              <span className="inline-flex items-center gap-xs">
                <Maximize2 className="h-icon-md w-icon-md text-primary" />
                {room.size}{t(`units.${room.sizeUnit}`)}
              </span>
            </DetailRow>
            <DetailRow label={t('fields.baseMinLos')}>
              {room.baseMinLos == null ? commonT('notProvided') : commonT('night', { count: room.baseMinLos })}
            </DetailRow>
            <DetailRow label={t('fields.baseMaxLos')}>
              {room.baseMaxLos == null ? commonT('notProvided') : commonT('night', { count: room.baseMaxLos })}
            </DetailRow>
            <DetailRow label={t('fields.viewType')}>{t(`views.${room.viewType}`)}</DetailRow>
            <DetailRow label={t('fields.smoking')}>
              <span className="inline-flex items-center gap-xs">
                {room.smokingAllowed ? (
                  <>
                    <Cigarette className="h-icon-md w-icon-md text-primary" />
                    {t('values.yes')}
                  </>
                ) : (
                  <>
                    <Ban className="h-icon-md w-icon-md text-text-tertiary" />
                    {t('values.no')}
                  </>
                )}
              </span>
            </DetailRow>
          </div>
        </DetailCard>

        <DetailCard
          title={t('sections.occupancyAndBeds')}
          icon={<Users className="h-icon-md w-icon-md" />}
        >
          <div className="space-y-sm">
            <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
              <DetailRow label={t('fields.standardOccupancy')}>{commonT('guest', { count: standardOccupancy })}</DetailRow>
              <div className="hidden md:block" />
              <DetailRow label={t('fields.standardAdult')}>{commonT('guest', { count: room.standardOccupancyAdult })}</DetailRow>
              <DetailRow label={t('fields.standardChild')}>{commonT('guest', { count: room.standardOccupancyChild })}</DetailRow>
              <DetailRow label={t('fields.minAdult')}>{commonT('guest', { count: room.minOccupancyAdult ?? 0 })}</DetailRow>
              <DetailRow label={t('fields.minChild')}>{commonT('guest', { count: room.minOccupancyChild ?? 0 })}</DetailRow>
              <DetailRow label={t('fields.maxOccupancy')}>{commonT('guest', { count: maxOccupancy })}</DetailRow>
              <div className="hidden md:block" />
              <DetailRow label={t('fields.maxAdult')}>{commonT('guest', { count: room.maxOccupancyAdult ?? 0 })}</DetailRow>
              <DetailRow label={t('fields.maxChild')}>{commonT('guest', { count: room.maxOccupancyChild ?? 0 })}</DetailRow>
              <DetailRow label={t('fields.totalGuests')}>
                {room.totalOccupancy === undefined ? commonT('notProvided') : commonT('guest', { count: room.totalOccupancy })}
              </DetailRow>
              <DetailRow label={t('fields.maxInfant')}>
                {room.maxInfantCount === undefined ? commonT('notProvided') : commonT('guest', { count: room.maxInfantCount })}
              </DetailRow>
              <DetailRow label={t('fields.freeChildAge')}>
                {room.freeChildAge === undefined ? commonT('notProvided') : t('values.ageUnder', { count: room.freeChildAge })}
              </DetailRow>
              <DetailRow label={t('fields.extraBed')}>
                {room.extraBedAvailable ? t('values.extraBedAvailable', { count: room.extraBedCount ?? 0 }) : t('values.no')}
              </DetailRow>
            </div>
            <div className="border-t border-border pt-md">
              <p className="mb-sm text-base font-medium text-text-secondary">
                {t('sections.beds')}
              </p>
              <BedList beds={room.bedConfiguration} />
            </div>
          </div>
        </DetailCard>
      </div>

      <div className="mt-lg">
        <ImageGallery images={room.images} roomName={room.name} />
      </div>

      <div className="mt-lg">
        <DetailCard
          title={t('sections.description')}
          icon={<FileText className="h-icon-md w-icon-md" />}
        >
          <div className="space-y-md">
            <div>
              <p className="mb-xs text-base font-medium text-text-secondary">
                {t('fields.descriptionKo')}
              </p>
              <p className="whitespace-pre-line text-base font-light text-text-primary">
                {room.description || t('empty.descriptionKo')}
              </p>
            </div>
            <div>
              <p className="mb-xs text-base font-medium text-text-secondary">
                {t('fields.descriptionEn')}
              </p>
              <p className="whitespace-pre-line text-base font-light text-text-primary">
                {room.enDescription || t('empty.descriptionEn')}
              </p>
            </div>
            <div>
              <p className="mb-xs text-base font-medium text-text-secondary">
                {t('fields.cmsDescription')}
              </p>
              <p className="whitespace-pre-line text-base font-light text-text-primary">
                {room.cmsDescription || t('empty.cmsDescription')}
              </p>
            </div>
          </div>
        </DetailCard>
      </div>

      <div className="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-2">
        <DetailCard
          title={t('sections.roomAmenities')}
          icon={<Layers className="h-icon-md w-icon-md" />}
        >
          <FeatureList items={room.amenities} emptyText={t('empty.amenities')} />
        </DetailCard>

        <DetailCard
          title={t('sections.accessibility')}
          icon={<DoorOpen className="h-icon-md w-icon-md" />}
        >
          <FeatureList items={room.accessibilityFeatures} emptyText={commonT('none')} />
        </DetailCard>
      </div>

      <div className="mt-lg border-t border-border pt-md">
        <div className="grid grid-cols-1 gap-md text-base font-light text-text-tertiary md:grid-cols-2 lg:grid-cols-4">
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
      </div>

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-md"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="w-full max-w-modal-sm rounded border border-border bg-bg-primary p-lg shadow"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="mb-md text-lg font-bold text-text-primary">
              {t('deleteTitle')}
            </h3>
            <p className="mb-lg text-base font-light text-text-secondary">
              {t('deleteConfirm', { name: room.name })}
              <br />
              {t('deleteWarning')}
            </p>
            <div className="flex justify-end gap-sm">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                {commonT('cancel')}
              </Button>
              <Button onClick={handleDelete} disabled={deleteRoomMutation.isPending}>
                {commonT('delete')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
