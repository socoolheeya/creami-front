'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { type RatePlanSearchCondition, useInfiniteRatePlans } from '@/hooks/useRatePlans'
import { type RatePlan } from '@/lib/types/rateplan'
import { Receipt, Plus } from 'lucide-react'
import { RatePlanTableView } from './components/RatePlanTableView'
import { RatePlanCardView } from './components/RatePlanCardView'
import { ViewToggle, Button, Card } from '@creami/ui'

type ViewMode = 'grid' | 'table'

export default function RatePlansPage() {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const searchParams = useMemo<RatePlanSearchCondition>(() => ({
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
  } = useInfiniteRatePlans(searchParams, true)
  const ratePlans = useMemo(
    () => {
      const ratePlanMap = new Map<string, RatePlan>()

      data?.pages
        .flatMap((page) => page.ratePlans)
        .forEach((ratePlan, index) => {
          const ratePlanKey = ratePlan.id || `${ratePlan.name}-${index}`

          if (!ratePlanMap.has(ratePlanKey)) {
            ratePlanMap.set(ratePlanKey, ratePlan)
          }
        })

      return Array.from(ratePlanMap.values())
    },
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
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Receipt className="w-lg h-lg text-primary" />
          <h1 className="text-2xl text-text-primary">
            {t('title')}
          </h1>
        </div>
      </div>

      <div className="mb-md flex justify-end gap-sm">
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
        <Link href="/rateplans/new">
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
      ) : ratePlans.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Receipt className="h-2xl w-2xl mb-md text-text-tertiary" />
          <h3 className="text-lg mb-xs font-bold text-text-primary">
            {commonT('noSearchResults')}
          </h3>
          <p className="mb-md text-base font-light text-text-secondary">
            {commonT('tryAnotherSearch')}
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {ratePlans.map((ratePlan) => (
              <RatePlanCardView key={ratePlan.id} ratePlan={ratePlan} />
            ))}
          </div>
          <div ref={loadMoreRef} className="flex justify-center py-lg text-base font-light text-text-tertiary">
            {isFetchingNextPage ? t('loadingMore') : hasNextPage ? ' ' : t('endOfList')}
          </div>
        </>
      ) : (
        <>
          <RatePlanTableView ratePlans={ratePlans} />
          <div ref={loadMoreRef} className="flex justify-center py-lg text-base font-light text-text-tertiary">
            {isFetchingNextPage ? t('loadingMore') : hasNextPage ? ' ' : t('endOfList')}
          </div>
        </>
      )}
    </div>
  )
}
