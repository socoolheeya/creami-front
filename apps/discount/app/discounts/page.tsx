'use client'

import { Tag, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input, ViewToggle } from '@creami/ui'
import { fetchDiscounts } from '@/lib/api/discount'
import { Discount } from '@/lib/types/discount'
import { DiscountCard } from './components/DiscountCard'
import { DiscountTable } from './components/DiscountTable'

type ViewMode = 'grid' | 'table'

export default function DiscountsPage() {
  const t = useTranslations()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let ignore = false

    const loadDiscounts = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await fetchDiscounts({ search: searchQuery })
        if (!ignore) {
          setDiscounts(response)
        }
      } catch {
        if (!ignore) {
          setDiscounts([])
          setErrorMessage(t('discount.discounts.loadError'))
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadDiscounts()

    return () => {
      ignore = true
    }
  }, [searchQuery, t])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Tag className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            {t('discount.discounts.title')}
          </h1>
        </div>

        <Link href="/discounts/new">
          <Button type="button" variant="primary" size="medium">
            <Plus className="h-icon-md w-icon-md" />
            {t('discount.common.new')}
          </Button>
        </Link>
      </div>

      {/* Search and View Toggle */}
      <div className="mb-lg flex gap-md">
        <Input
          type="text"
          placeholder={t('discount.discounts.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />

        {/* View Toggle */}
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {isLoading ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {t('discount.discounts.loading')}
          </h3>
        </div>
      ) : errorMessage ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {errorMessage}
          </h3>
        </div>
      ) : discounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Tag className="h-3xl w-3xl mb-md text-text-tertiary" />
          <h3 className="text-xl mb-sm font-bold text-text-primary">
            {searchQuery ? t('discount.discounts.emptySearch') : t('discount.discounts.empty')}
          </h3>
          {!searchQuery && (
            <>
              <p className="mb-lg font-light text-text-secondary">
                {t('discount.discounts.emptyHelp')}
              </p>
              <Link href="/discounts/new">
                <Button type="button" variant="primary" size="medium">
                  <Plus className="h-icon-md w-icon-md" />
                  {t('discount.discounts.create')}
                </Button>
              </Link>
            </>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
          {discounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))}
        </div>
      ) : (
        <DiscountTable discounts={discounts} />
      )}
    </div>
  )
}
