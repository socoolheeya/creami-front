'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@creami/ui'
import { useProperty } from '@/hooks/useProperties'
import { PropertyEditForm } from '../../components/PropertyEditForm'

export default function EditAccommodationPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const propertyId = params.id ?? ''
  const { data: accommodation, isLoading, isError } = useProperty(propertyId)

  if (isLoading) {
    return (
      <Card className="p-lg" hover={false}>
        <p className="text-base font-medium text-text-secondary">숙소 정보를 조회하는 중입니다.</p>
      </Card>
    )
  }

  if (isError || !accommodation) {
    return (
      <div>
        <Link
          href="/properties"
          className="mb-lg inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          숙소 목록으로
        </Link>
        <Card className="p-lg" hover={false}>
          <h1 className="text-xl font-bold text-text-primary">숙소를 찾을 수 없습니다</h1>
        </Card>
      </div>
    )
  }

  return (
    <PropertyEditForm
      key={accommodation.id}
      accommodation={accommodation}
      propertyId={propertyId}
      onCancel={() => router.push(`/properties/${propertyId}`)}
      onSaved={() => router.push(`/properties/${propertyId}`)}
    />
  )
}
