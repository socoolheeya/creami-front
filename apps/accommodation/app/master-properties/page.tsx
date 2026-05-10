'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Hotel, Search } from 'lucide-react'
import {
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@creami/ui'
import { useParentProperties } from '@/hooks/useParentProperties'
import {
  getCity,
  getParentPropertyId,
  getStatusLabel,
  getTypeLabel,
  type ParentPropertySearchCondition
} from '@/lib/types/parent-property'

export default function MasterPropertiesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  const searchCondition = useMemo<ParentPropertySearchCondition>(() => {
    const normalizedQuery = submittedQuery.trim()

    if (!normalizedQuery) {
      return {}
    }

    return /^\d+$/.test(normalizedQuery)
      ? { parentPropertyId: normalizedQuery }
      : { name: normalizedQuery }
  }, [submittedQuery])
  const {
    data: parentProperties = [],
    isLoading,
    isError
  } = useParentProperties(searchCondition)

  const handleSearch = () => {
    setSubmittedQuery(searchQuery)
  }

  return (
    <div>
      <div className="mb-lg flex items-center justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <Hotel className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              대표숙소 관리
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            공급사별 중복 숙소를 하나의 대표 시설로 묶어 관리합니다.
          </p>
        </div>
      </div>

      <div className="mb-md flex items-center gap-sm">
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch()
            }
          }}
          placeholder="대표숙소 ID 또는 대표숙소명으로 검색"
          showSearchIcon
        />
        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex h-control-md shrink-0 cursor-pointer items-center justify-center gap-sm rounded border-none bg-primary px-control-px-md py-none text-base font-medium leading-none text-white"
        >
          <Search className="h-icon-md w-icon-md" />
          검색
        </button>
      </div>

      {isLoading ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Building2 className="mb-md h-2xl w-2xl text-text-tertiary" />
          <h2 className="mb-xs text-lg font-bold text-text-primary">
            대표숙소를 조회하는 중입니다
          </h2>
        </Card>
      ) : isError ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Building2 className="mb-md h-2xl w-2xl text-text-tertiary" />
          <h2 className="mb-xs text-lg font-bold text-text-primary">
            대표숙소 조회에 실패했습니다
          </h2>
          <p className="text-base font-light text-text-secondary">
            백엔드 서버와 API 응답을 확인하세요.
          </p>
        </Card>
      ) : parentProperties.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed py-2xl text-center" hover={false}>
          <Building2 className="mb-md h-2xl w-2xl text-text-tertiary" />
          <h2 className="mb-xs text-lg font-bold text-text-primary">
            검색 결과가 없습니다
          </h2>
          <p className="text-base font-light text-text-secondary">
            대표숙소 ID 또는 대표숙소명으로 다시 검색하세요.
          </p>
        </Card>
      ) : (
        <Card hover={false}>
          <Table>
            <TableHeader>
              <tr>
                <TableHead>대표숙소 ID</TableHead>
                <TableHead>대표숙소 한글명</TableHead>
                <TableHead>대표숙소 영문명</TableHead>
                <TableHead>타입</TableHead>
                <TableHead align="center">별점</TableHead>
                <TableHead>도시</TableHead>
                <TableHead>상태</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {parentProperties.map((property) => {
                const propertyId = getParentPropertyId(property)

                return (
                  <TableRow
                    key={propertyId}
                    onClick={() => router.push(`/master-properties/${propertyId}`)}
                  >
                    <TableCell className="font-light text-text-tertiary">
                      {propertyId}
                    </TableCell>
                    <TableCell>
                      <p className="truncate font-bold text-text-primary">
                        {property.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="truncate font-light text-text-tertiary">
                        {property.enName}
                      </p>
                    </TableCell>
                    <TableCell className="font-medium text-text-secondary">
                      {getTypeLabel(property.type)}
                    </TableCell>
                    <TableCell align="center">
                      {property.stars}성
                    </TableCell>
                    <TableCell className="font-medium text-text-secondary">
                      {getCity(property.address)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex h-control-sm items-center rounded bg-primary-bg px-control-px-sm py-none text-base font-bold text-primary">
                        {getStatusLabel(property.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
