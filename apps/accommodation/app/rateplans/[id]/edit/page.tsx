import { notFound } from 'next/navigation'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import RatePlanForm from '@/components/rateplans/RatePlanForm'

interface EditRatePlanPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditRatePlanPage({ params }: EditRatePlanPageProps) {
  const { id } = await params
  const ratePlan = mockRatePlans.find(rp => rp.id === id)

  if (!ratePlan) {
    notFound()
  }

  return <RatePlanForm initialData={ratePlan} />
}