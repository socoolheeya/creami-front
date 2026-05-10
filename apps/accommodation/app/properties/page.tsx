'use client'

import { Building2, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { type PropertySearchCondition, useInfiniteProperties } from '@/hooks/useProperties'
import { PropertyCard } from './components/PropertyCard'
import { PropertyTable } from './components/PropertyTable'
import { ViewToggle, Button, Card } from '@creami/ui'

type ViewMode = 'grid' | 'table'

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const searchParams = useMemo<PropertySearchCondition>(() => ({
    size: 10
  }), [])

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteProperties(
    searchParams,
    true
  )
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const properties = useMemo(
    () => data?.pages.flatMap((page) => page.properties) ?? [],
    [data]
  )

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
      <div className="mb-lg flex items-center justify-between">
        <div className="flex items-center gap-md">
          <Building2 className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            숙소 관리
          </h1>
        </div>

        <Link href="/properties/new">
          <Button>
            <Plus className="h-icon-md w-icon-md" />
            신규 등록
          </Button>
        </Link>
      </div>

      <div className="mb-md flex justify-end">
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-2xl">
          <div className="text-text-secondary">로딩 중...</div>
        </div>
      ) : error ? (
        <Card className="flex flex-col items-center justify-center border-error py-2xl text-center" hover={false}>
          <p className="text-error">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-base text-text-secondary">{error.message}</p>
        </Card>
      ) : properties.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Building2 className="h-2xl w-2xl mb-md text-text-tertiary" />
          <h3 className="text-lg mb-xs font-bold text-text-primary">
            검색 결과가 없습니다
          </h3>
          <p className="mb-md text-base font-light text-text-secondary">
            다른 검색어로 다시 시도해보세요
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {properties.map((accommodation) => (
              <PropertyCard key={accommodation.id} accommodation={accommodation} />
            ))}
          </div>
          <div ref={loadMoreRef} className="flex justify-center py-lg text-base font-light text-text-tertiary">
            {isFetchingNextPage ? '추가 숙소를 불러오는 중입니다.' : hasNextPage ? ' ' : '마지막 숙소입니다.'}
          </div>
        </>
      ) : (
        <>
          <PropertyTable properties={properties} />
          <div ref={loadMoreRef} className="flex justify-center py-lg text-base font-light text-text-tertiary">
            {isFetchingNextPage ? '추가 숙소를 불러오는 중입니다.' : hasNextPage ? ' ' : '마지막 숙소입니다.'}
          </div>
        </>
      )}
    </div>
  )
}
