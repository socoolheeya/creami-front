'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { RoomFormData } from '@/lib/types/room'
import { useCreateRoom } from '@/hooks/useRooms'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { WizardNavigation } from '../components/wizard/WizardNavigation'
import { Step1Basic } from '../components/wizard/Step1Basic'
import { Step2Details } from '../components/wizard/Step2Details'
import { Step3Occupancy } from '../components/wizard/Step3Occupancy'
import { Step4Description } from '../components/wizard/Step4Description'
import { Step5Features } from '../components/wizard/Step5Features'
import { Step6Images } from '../components/wizard/Step6Images'

const STEPS = ['기본정보', '객실정보', '인원정보', '상세설명', '특징', '이미지']

function NewRoomPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedAccommodationId = searchParams?.get('accommodation') || undefined
  const createRoom = useCreateRoom()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<RoomFormData>({
    accommodationId: preselectedAccommodationId,
    sizeUnit: 'sqm',
    smokingAllowed: false,
    extraBedAvailable: false,
    amenities: [],
    accessibilityFeatures: [],
    bedConfiguration: [],
    images: []
  })

  const handleChange = (data: Partial<RoomFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!(formData.name && formData.type && formData.accommodationId)
      case 2:
        return !!(
          formData.size &&
          formData.size > 0 &&
          formData.floor !== undefined
        )
      case 3:
        return !!(
          formData.bedConfiguration &&
          formData.bedConfiguration.length > 0 &&
          formData.standardOccupancy &&
          formData.standardOccupancy > 0 &&
          formData.maxOccupancy &&
          formData.maxOccupancy >= formData.standardOccupancy
        )
      case 4:
        return true // 상세설명은 선택사항
      case 5:
        return !!(formData.viewType && formData.smokingAllowed !== undefined)
      case 6:
        return true // 이미지는 선택사항
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceed() || isSubmitting) return

    setIsSubmitting(true)

    try {
      // API 호출하여 객실 생성
      await createRoom.mutateAsync(formData)

      // 목록 페이지로 이동
      router.push('/rooms')
    } catch (error) {
      console.error('Failed to create room:', error)
      alert('객실 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div
        className="max-w-4xl mx-auto p-8 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* 헤더 */}
        <div className="mb-8">
          <h1
            className="text-2xl mb-2"
            style={{
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)'
            }}
          >
            신규 객실 등록
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            객실 정보를 단계별로 입력해주세요
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        {/* Form Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <Step1Basic
              formData={formData}
              onChange={handleChange}
              preselectedAccommodationId={preselectedAccommodationId}
            />
          )}
          {currentStep === 2 && (
            <Step2Details formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <Step3Occupancy formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Step4Description formData={formData} onChange={handleChange} />
          )}
          {currentStep === 5 && (
            <Step5Features formData={formData} onChange={handleChange} />
          )}
          {currentStep === 6 && (
            <Step6Images formData={formData} onChange={handleChange} />
          )}
        </div>

        {/* Navigation */}
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={canProceed()}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}

export default function NewRoomPage() {
  return (
    <Suspense fallback={<div className="p-6">로딩 중...</div>}>
      <NewRoomPageContent />
    </Suspense>
  )
}