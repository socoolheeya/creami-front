'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
  variant?: 'default' | 'simple'
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  variant = 'default',
  className = ''
}: PaginationProps) {
  const startItem = totalElements === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalElements)
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 7
    const halfRange = Math.floor(maxPagesToShow / 2)

    if (totalPages <= maxPagesToShow) {
      // 전체 페이지가 maxPagesToShow 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 현재 페이지를 중심으로 페이지 번호 표시
      if (currentPage <= halfRange + 1) {
        // 시작 부분
        for (let i = 1; i <= maxPagesToShow - 2; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - halfRange) {
        // 끝 부분
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - (maxPagesToShow - 3); i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 중간 부분
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (variant === 'simple') {
    return (
      <nav
        className={`flex w-full justify-center ${className}`}
        aria-label="페이지 이동"
      >
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-xs rounded border border-border bg-bg-primary p-sm shadow-sm">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
            aria-label="이전 페이지"
            className="border border-border bg-bg-primary px-control-px-sm hover:border-primary hover:text-primary disabled:hover:border-border disabled:hover:text-text-tertiary"
          >
            <ChevronLeft className="h-icon-md w-icon-md" />
            이전
          </Button>

          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-control-sm min-w-control-sm items-center justify-center px-xs text-base text-text-tertiary"
                  aria-hidden="true"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                variant={isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-w-control-sm border border-border px-control-px-sm ${
                  isActive
                    ? 'border-primary bg-primary text-white hover:bg-primary-hover'
                    : 'bg-bg-primary hover:border-primary hover:text-primary'
                }`}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            aria-label="다음 페이지"
            className="border border-border bg-bg-primary px-control-px-sm hover:border-primary hover:text-primary disabled:hover:border-border disabled:hover:text-text-tertiary"
          >
            다음
            <ChevronRight className="h-icon-md w-icon-md" />
          </Button>
        </div>
      </nav>
    )
  }

  return (
    <div className={`flex items-center justify-between gap-spacing-md ${className}`}>
      <div className="flex items-center gap-spacing-sm text-text-size-sm">
        <span className="text-var-text-secondary">
          {totalElements.toLocaleString()}개 중 {startItem.toLocaleString()}-{endItem.toLocaleString()}번째 표시 중
        </span>
        <div className="flex items-center gap-spacing-xs">
          <label htmlFor="page-size" className="text-var-text-secondary">
            페이지당:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-var-background border border-var-border rounded-var-radius-md px-spacing-sm py-spacing-xs text-text-size-sm focus:outline-none focus:ring-2 focus:ring-var-primary"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}개
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-spacing-xs">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          aria-label="이전 페이지"
          className="px-spacing-xs"
        >
          <ChevronLeft className="h-icon-md w-icon-md" />
          이전
        </Button>

        <div className="flex items-center gap-spacing-xs">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-spacing-xs text-var-text-secondary"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                variant={isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-control-sm ${
                  isActive
                    ? 'bg-var-primary text-white hover:bg-var-primary-hover'
                    : ''
                }`}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          aria-label="다음 페이지"
          className="px-spacing-xs"
        >
          다음
          <ChevronRight className="h-icon-md w-icon-md" />
        </Button>
      </div>
    </div>
  )
}
