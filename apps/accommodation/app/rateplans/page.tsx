'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRatePlans } from '@/hooks/useRatePlans'
import { Receipt, Plus, Search } from 'lucide-react'
import { RatePlanTableView } from './components/RatePlanTableView'
import { RatePlanCardView } from './components/RatePlanCardView'
import { ViewToggle, Button, Input, Card } from '@creami/ui'

type ViewMode = 'grid' | 'table'

export default function RatePlansPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useState<Record<string, unknown> | undefined>(undefined)

  const { data: ratePlans = [], isLoading, error } = useRatePlans(searchParams)
  const searchedRatePlans = useMemo(() => {
    const query = searchParams?.search

    if (typeof query !== 'string' || query.trim().length === 0) {
      return ratePlans
    }

    const normalizedQuery = query.trim().toLowerCase()

    return ratePlans.filter((ratePlan) =>
      ratePlan.id.toLowerCase() === normalizedQuery ||
      ratePlan.name.toLowerCase().includes(normalizedQuery)
    )
  }, [ratePlans, searchParams])

  const handleSearch = () => {
    setSearchParams(searchQuery.trim() ? { search: searchQuery.trim() } : {})
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-md">
          <Receipt className="w-lg h-lg text-primary" />
          <h1 className="text-2xl text-text-primary">
            요금제 관리
          </h1>
        </div>

        <Link href="/rateplans/new">
          <Button>
            <Plus className="w-lg h-lg" />
            신규 등록
          </Button>
        </Link>
      </div>

      {/* Search and View Toggle */}
      <div className="mb-md flex items-center gap-md">
        <div className="flex-1 relative flex items-center gap-sm">
          <Input
            type="text"
            placeholder="요금제 ID 또는 요금제명으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="w-lg h-lg" />
            검색
          </Button>
        </div>

        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Content */}
      {!searchParams ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Search className="h-2xl w-2xl mb-md text-text-tertiary" />
          <h3 className="text-lg mb-xs font-bold text-text-primary">
            검색어를 입력하세요
          </h3>
          <p className="text-base font-light text-text-secondary">
            요금제 ID 또는 요금제명으로 검색할 수 있습니다
          </p>
        </Card>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-2xl">
          <div className="text-text-secondary">로딩 중...</div>
        </div>
      ) : error ? (
        <Card className="flex flex-col items-center justify-center border-error py-2xl text-center" hover={false}>
          <p className="text-error">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-base text-text-secondary">{error.message}</p>
        </Card>
      ) : searchedRatePlans.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Receipt className="h-2xl w-2xl mb-md text-text-tertiary" />
          <h3 className="text-lg mb-xs font-bold text-text-primary">
            검색 결과가 없습니다
          </h3>
          <p className="mb-md text-base font-light text-text-secondary">
            다른 검색어로 다시 시도해보세요
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {searchedRatePlans.map((ratePlan) => (
            <RatePlanCardView key={ratePlan.id} ratePlan={ratePlan} />
          ))}
        </div>
      ) : (
        <RatePlanTableView ratePlans={searchedRatePlans} />
      )}
    </div>
  )
}
