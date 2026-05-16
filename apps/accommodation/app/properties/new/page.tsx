'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PropertyFormData } from '../../../lib/types/property'
import { useCreateProperty } from '@/hooks/useProperties'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { WizardNavigation } from '../components/wizard/WizardNavigation'
import { Step1Basic } from '../components/wizard/Step1Basic'
import { Step2Description } from '../components/wizard/Step2Description'
import { Step3Images } from '../components/wizard/Step3Images'
import { Step4Policy } from '../components/wizard/Step4Policy'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notifySaveError, notifySaveSuccess } from '@creami/ui'

const STEPS = ['기본 정보', '상세 설명', '이미지', '요금 정책']
const STORAGE_KEY = 'accommodation-draft'

export default function NewAccommodationPage() {
  const router = useRouter()
  const createProperty = useCreateProperty()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 초기 상태를 함수로 설정 (localStorage에서 불러오기)
  const [formData, setFormData] = useState<PropertyFormData>(() => {
    const defaultData: PropertyFormData = {
      name: '',
      enName: '',
      type: undefined,
      stars: undefined,
      address: '',
      addressDetail: '',
      city: '',
      countryCode: '',
      zipCode: '',
      latitude: undefined,
      longitude: undefined,
      phone: '',
      email: '',
      checkIn: '',
      checkOut: '',
      roomCount: undefined,
      floorCount: undefined,
      description: '',
      enDescription: '',
      amenities: [],
      images: [],
      billingPolicy: {
        currency: '',
        commission: {
          type: 'percentage',
          value: 0
        }
      }
    }

    // localStorage에서 저장된 데이터 불러오기
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return { ...defaultData, ...parsed }
        } catch (e) {
          console.error('Failed to parse saved data:', e)
        }
      }
    }

    return defaultData
  })

  // 자동 저장: 폼 데이터 변경 시 localStorage에 저장
  useEffect(() => {
    if (formData.name || formData.description || (formData.images && formData.images.length > 0)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  const handleDataChange = (data: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  // 각 단계별 유효성 검증
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.name?.trim() &&
          formData.enName?.trim() &&
          formData.type &&
          formData.stars &&
          formData.address?.trim() &&
          formData.addressDetail?.trim() &&
          formData.city?.trim() &&
          formData.countryCode?.trim() &&
          formData.zipCode?.trim() &&
          formData.latitude !== undefined &&
          formData.longitude !== undefined &&
          formData.phone?.trim() &&
          formData.checkIn &&
          formData.checkOut &&
          formData.roomCount &&
          formData.floorCount
        )
      case 2:
        return !!(
          formData.description?.trim() &&
          formData.enDescription?.trim() &&
          formData.amenities &&
          formData.amenities.length > 0
        )
      case 3:
        return !!(formData.images && formData.images.length > 0)
      case 4:
        return !!(
          formData.billingPolicy?.currency &&
          formData.billingPolicy?.commission?.type &&
          formData.billingPolicy?.commission?.value !== undefined
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep) || isSubmitting) return

    setIsSubmitting(true)

    try {
      // formData를 API가 요구하는 형식으로 변환
      const accommodationData = {
        name: formData.name!,
        enName: formData.enName!,
        type: formData.type!,
        stars: formData.stars!,
        address: formData.address!,
        addressDetail: formData.addressDetail!,
        city: formData.city!,
        countryCode: formData.countryCode!,
        zipCode: formData.zipCode!,
        latitude: formData.latitude!,
        longitude: formData.longitude!,
        phone: formData.phone!,
        email: formData.email,
        checkIn: formData.checkIn!,
        checkOut: formData.checkOut!,
        roomCount: formData.roomCount!,
        floorCount: formData.floorCount!,
        description: formData.description!,
        enDescription: formData.enDescription!,
        amenities: formData.amenities || [],
        images: formData.images || [],
        billingPolicy: {
          currency: formData.billingPolicy?.currency || 'KRW',
          commission: {
            type: formData.billingPolicy?.commission?.type || 'percentage',
            value: formData.billingPolicy?.commission?.value || 0
          }
        },
        status: 'draft' as const
      }

      // API 호출하여 숙소 생성
      await createProperty.mutateAsync(accommodationData)

      // 임시 저장 데이터 삭제
      localStorage.removeItem(STORAGE_KEY)

      notifySaveSuccess('저장이 완료되었습니다.')

      // 목록 페이지로 이동
      router.push('/properties')
    } catch (error) {
      console.error('Failed to create property:', error)
      notifySaveError('저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Basic data={formData} onChange={handleDataChange} />
      case 2:
        return <Step2Description data={formData} onChange={handleDataChange} />
      case 3:
        return <Step3Images data={formData} onChange={handleDataChange} />
      case 4:
        return <Step4Policy data={formData} onChange={handleDataChange} />
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 mb-4 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>숙소 목록으로</span>
        </Link>
        <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          새 숙소 등록
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          단계별로 숙소 정보를 입력해주세요. 작성 중인 내용은 자동으로 저장됩니다.
        </p>
      </div>

      {/* 위저드 카드 */}
      <div
        className="rounded-lg p-8 shadow-sm"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* 진행 표시기 */}
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        {/* 현재 단계 폼 */}
        <div className="my-8">{renderStep()}</div>

        {/* 네비게이션 */}
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={validateStep(currentStep) && !isSubmitting}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* 임시 저장 안내 */}
      <div className="mt-4 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
        💾 작성 중인 내용은 자동으로 저장되며, 나중에 이어서 작성할 수 있습니다
      </div>
    </div>
  )
}
