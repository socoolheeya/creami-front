'use client'

import { DoorOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { type RoomSearchCondition, useInfiniteRooms } from '@/hooks/useRooms'
import { type Room } from '@/lib/types/room'
import { RoomCard } from './components/RoomCard'
import { RoomTable } from './components/RoomTable'
import { ViewToggle, Button, Card } from '@creami/ui'

type ViewMode = 'grid' | 'table'

export default function RoomsPage() {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const searchParams = useMemo<RoomSearchCondition>(() => ({
    size: 10
  }), [])
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteRooms(searchParams, true)
  const rooms = useMemo(() => {
    const roomMap = new Map<string, Room>()

    data?.pages
      .flatMap((page) => page.rooms)
      .forEach((room, index) => {
        const roomKey = room.id || `${room.name}-${room.accommodationId}-${index}`

        if (!roomMap.has(roomKey)) {
          roomMap.set(roomKey, room)
        }
      })

    return Array.from(roomMap.values())
  }, [data])

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return
    }

    const target = loadMoreRef.current

    if (!target) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      { rootMargin: '320px' }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <DoorOpen className="w-lg h-lg text-primary" />
          <h1 className="text-2xl text-text-primary">
            {t('title')}
          </h1>
        </div>

      </div>

      <div className="mb-md flex justify-end gap-sm">
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
        <Link href="/rooms/new">
          <Button>
            <Plus className="w-lg h-lg" />
            {t('new')}
          </Button>
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-2xl">
          <div className="text-text-secondary">{commonT('loading')}</div>
        </div>
      ) : error ? (
        <Card className="flex flex-col items-center justify-center border-error py-2xl text-center" hover={false}>
          <p className="text-error">{commonT('loadFailed')}</p>
          <p className="text-base text-text-secondary">{error.message}</p>
        </Card>
      ) : rooms.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-3xl text-center" hover={false}>
          <DoorOpen className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-lg mb-xs font-bold text-text-primary">
            {commonT('noSearchResults')}
          </h3>
          <p className="text-base mb-md font-light text-text-secondary">
            {commonT('tryAnotherSearch')}
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          <div ref={loadMoreRef} className="flex justify-center py-lg text-base font-light text-text-tertiary">
            {isFetchingNextPage ? t('loadingMore') : hasNextPage ? ' ' : t('endOfList')}
          </div>
        </>
      ) : (
        <>
          <RoomTable rooms={rooms} />
          <div ref={loadMoreRef} className="flex justify-center py-lg text-base font-light text-text-tertiary">
            {isFetchingNextPage ? t('loadingMore') : hasNextPage ? ' ' : t('endOfList')}
          </div>
        </>
      )}
    </div>
  )
}
