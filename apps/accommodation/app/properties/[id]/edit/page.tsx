'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card } from '@creami/ui'
import { useProperty } from '@/hooks/useProperties'
import { PropertyEditForm } from '../../components/PropertyEditForm'
import { ErrorTemplate } from '@/components/common/ErrorTemplate'

export default function EditAccommodationPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const propertyId = params.id ?? ''
  const { data: accommodation, isLoading } = useProperty(propertyId)

  if (isLoading) {
    return (
      <Card className="p-lg" hover={false}>
        <p className="text-base font-medium text-text-secondary">숙소 정보를 조회하는 중입니다.</p>
      </Card>
    )
  }

  if (!accommodation) {
    return (
      <ErrorTemplate
        title="숙소를 찾을 수 없습니다"
        backHref="/properties"
        backLabel="숙소 목록으로"
      />
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
