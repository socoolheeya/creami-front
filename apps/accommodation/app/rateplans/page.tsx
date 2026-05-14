'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { type RatePlanPageSearchCondition, useRatePlansPaginated } from '@/hooks/useRatePlans'
import { Receipt, Plus } from 'lucide-react'
import { RatePlanTableView, type RatePlanTableFilters } from './components/RatePlanTableView'
import { RatePlanCardView } from './components/RatePlanCardView'
import { ViewToggle, Button, Card, Pagination } from '@creami/ui'

type ViewMode = 'grid' | 'table'

const defaultTableFilters: RatePlanTableFilters = {
  ratePlanId: '',
  name: '',
  enName: '',
  status: 'all',
  benefitName: '',
  ratePlanType: 'all'
}

function getTableFilters(params: URLSearchParams): RatePlanTableFilters {
  return {
    ratePlanId: params.get('ratePlanId') ?? '',
    name: params.get('name') ?? '',
    enName: params.get('enName') ?? '',
    status: (params.get('status') as RatePlanTableFilters['status']) ?? defaultTableFilters.status,
    benefitName: params.get('benefitName') ?? '',
    ratePlanType: (params.get('ratePlanType') as RatePlanTableFilters['ratePlanType']) ??
      defaultTableFilters.ratePlanType
  }
}

function setOptionalParam(params: URLSearchParams, key: string, value: string) {
  const normalizedValue = value.trim()

  if (normalizedValue && normalizedValue !== 'all') {
    params.set(key, normalizedValue)
    return
  }

  params.delete(key)
}

function toApiFilters(filters: RatePlanTableFilters) {
  const ratePlanId = filters.ratePlanId.trim()

  return {
    ratePlanId: /^\d+$/.test(ratePlanId) ? ratePlanId : undefined,
    name: filters.name.trim() || undefined,
    enName: filters.enName.trim() || undefined,
    status: filters.status === 'all' ? undefined : filters.status,
    benefitName: filters.benefitName.trim() || undefined,
    ratePlanType: filters.ratePlanType === 'all' ? undefined : filters.ratePlanType
  }
}

export default function RatePlansPage() {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
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
  const [tableFilters, setTableFilters] = useState<RatePlanTableFilters>(() =>
    getTableFilters(new URLSearchParams(searchParams.toString()))
  )

  const filters = useMemo<RatePlanPageSearchCondition>(() => ({
    page: currentPage,
    size: pageSize,
    ...toApiFilters(tableFilters)
  }), [currentPage, pageSize, tableFilters])

  const {
    data,
    isLoading,
    isFetching,
    error
  } = useRatePlansPaginated(filters, true)

  const ratePlans = data?.ratePlans || []
  const pagination = data?.pagination

  // URL 파라미터 업데이트
  const updateURL = useCallback((
    page: number,
    size: number,
    nextFilters: RatePlanTableFilters
  ) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', page.toString())
    params.set('size', size.toString())
    setOptionalParam(params, 'ratePlanId', nextFilters.ratePlanId)
    setOptionalParam(params, 'name', nextFilters.name)
    setOptionalParam(params, 'enName', nextFilters.enName)
    setOptionalParam(params, 'status', nextFilters.status)
    setOptionalParam(params, 'benefitName', nextFilters.benefitName)
    setOptionalParam(params, 'ratePlanType', nextFilters.ratePlanType)
    window.history.pushState(null, '', `${pathname}?${params.toString()}`)
  }, [pathname])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    updateURL(page, pageSize, tableFilters)
  }, [pageSize, tableFilters, updateURL])

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size)
    setCurrentPage(1) // 페이지 크기 변경 시 첫 페이지로 이동
    updateURL(1, size, tableFilters)
  }, [tableFilters, updateURL])

  const handleTableFiltersChange = useCallback((nextFilters: RatePlanTableFilters) => {
    setTableFilters(nextFilters)
    setCurrentPage(1)
    updateURL(1, pageSize, nextFilters)
  }, [pageSize, updateURL])

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

    setTableFilters(getTableFilters(new URLSearchParams(searchParams.toString())))
  }, [searchParams])

  useEffect(() => {
    const syncStateFromURL = () => {
      const params = new URLSearchParams(window.location.search)
      const page = Number(params.get('page') ?? 1)
      const size = Number(params.get('size') ?? 10)

      setCurrentPage(Number.isFinite(page) && page > 0 ? page : 1)
      setPageSize(Number.isFinite(size) && size > 0 ? size : 10)
      setTableFilters(getTableFilters(params))
    }

    window.addEventListener('popstate', syncStateFromURL)
    return () => window.removeEventListener('popstate', syncStateFromURL)
  }, [])

  const showInitialLoading = isLoading && !data

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
      {error ? (
        <Card className="flex flex-col items-center justify-center border-error py-2xl text-center" hover={false}>
          <p className="text-error">{commonT('loadFailed')}</p>
          <p className="text-base text-text-secondary">{error.message}</p>
        </Card>
      ) : viewMode === 'table' ? (
        <>
          <RatePlanTableView
            ratePlans={ratePlans}
            filters={tableFilters}
            onFiltersChange={handleTableFiltersChange}
            isFetching={isFetching || showInitialLoading}
            className={`mb-lg transition-opacity ${isFetching ? 'opacity-70' : 'opacity-100'}`}
          />

          {pagination && (
            <Pagination
              variant="simple"
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              className="mt-md"
            />
          )}
        </>
      ) : showInitialLoading ? (
        <div className="flex items-center justify-center py-2xl">
          <div className="text-text-secondary">{commonT('loading')}</div>
        </div>
      ) : ratePlans.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Receipt className="h-2xl w-2xl mb-md text-text-tertiary" />
          <h3 className="text-lg mb-xs font-bold text-text-primary">
            {isFetching ? commonT('loading') : commonT('noSearchResults')}
          </h3>
          {!isFetching && (
            <p className="mb-md text-base font-light text-text-secondary">
              {commonT('tryAnotherSearch')}
            </p>
          )}
        </Card>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div
              className={`grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-lg transition-opacity ${
                isFetching ? 'opacity-70' : 'opacity-100'
              }`}
            >
              {ratePlans.map((ratePlan) => (
                <RatePlanCardView key={ratePlan.id} ratePlan={ratePlan} />
              ))}
            </div>
          ) : null}

          {/* Pagination */}
          {pagination && (
            <Pagination
              variant="simple"
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              className="mt-md"
            />
          )}
        </>
      )}
    </div>
  )
}
