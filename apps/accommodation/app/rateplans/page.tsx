'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { type RatePlanPageSearchCondition, useRatePlansPaginated } from '@/hooks/useRatePlans'
import { type RatePlan } from '@/lib/types/rateplan'
import { Receipt, Plus } from 'lucide-react'
import { RatePlanTableView } from './components/RatePlanTableView'
import { RatePlanCardView } from './components/RatePlanCardView'
import { ViewToggle, Button, Card, Pagination } from '@creami/ui'

type ViewMode = 'grid' | 'table'

export default function RatePlansPage() {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page')
    return page ? parseInt(page) : 1
  })
  const [pageSize, setPageSize] = useState(() => {
    const size = searchParams.get('size')
    return size ? parseInt(size) : 10
  })

  const filters = useMemo<RatePlanPageSearchCondition>(() => ({
    page: currentPage,
    size: pageSize
  }), [currentPage, pageSize])

  const {
    data,
    isLoading,
    error
  } = useRatePlansPaginated(filters, true)

  const ratePlans = data?.ratePlans || []
  const pagination = data?.pagination

  // URL 파라미터 업데이트
  const updateURL = useCallback((page: number, size: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    params.set('size', size.toString())
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    updateURL(page, pageSize)
  }, [pageSize, updateURL])

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size)
    setCurrentPage(1) // 페이지 크기 변경 시 첫 페이지로 이동
    updateURL(1, size)
  }, [updateURL])

  // URL 파라미터와 상태 동기화
  useEffect(() => {
    const page = searchParams.get('page')
    const size = searchParams.get('size')

    if (page && parseInt(page) !== currentPage) {
      setCurrentPage(parseInt(page))
    }
    if (size && parseInt(size) !== pageSize) {
      setPageSize(parseInt(size))
    }
  }, [searchParams])

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
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-lg">
              {ratePlans.map((ratePlan) => (
                <RatePlanCardView key={ratePlan.id} ratePlan={ratePlan} />
              ))}
            </div>
          ) : (
            <RatePlanTableView ratePlans={ratePlans} className="mb-lg" />
          )}

          {/* Pagination */}
          {pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}
    </div>
  )
}